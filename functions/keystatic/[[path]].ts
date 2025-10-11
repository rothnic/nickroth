import { Buffer } from "buffer";
import process from "process";
import type { PagesFunction, Response as WorkerResponse } from "@cloudflare/workers-types";

import keystaticConfig from "../../keystatic.config";

type AdminEnv = {
        KEYSTATIC_GITHUB_CLIENT_ID?: string;
        KEYSTATIC_GITHUB_CLIENT_SECRET?: string;
        KEYSTATIC_SECRET?: string;
        PUBLIC_KEYSTATIC_GITHUB_APP_SLUG?: string;
};

const globalScope = globalThis as typeof globalThis & {
        Buffer?: typeof Buffer;
        process?: typeof process;
};

if (!globalScope.Buffer) {
        globalScope.Buffer = Buffer;
}

if (!globalScope.process) {
        globalScope.process = process;
}

const ADMIN_BASE_PATH = "/keystatic";
const APP_SLUG_ENV_NAME = "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG";
const CDN_REACT = "https://esm.sh/react@19.2.0?pin=v135";
const CDN_REACT_DOM = "https://esm.sh/react-dom@19.2.0/client?pin=v135&deps=react@19.2.0";
const CDN_KEYSTATIC =
        "https://esm.sh/@keystatic/core@0.5.48/ui?pin=v135&bundle&deps=react@19.2.0,react-dom@19.2.0";

const toWorkerResponse = (response: Response): WorkerResponse => response as unknown as WorkerResponse;

const serializeConfig = (config: unknown): string => {
        try {
                return JSON.stringify(config);
        } catch (error) {
                console.error("Failed to serialise Keystatic config", error);
                return "{}";
        }
};

const createHtmlResponse = (config: unknown, appSlug: string): string => {
        const configJson = serializeConfig(config);
        const safeAppSlug = JSON.stringify(appSlug);

        return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Keystatic Admin · Nick Roth</title>
    <style>
      html, body, #keystatic-root { height: 100%; margin: 0; }
      body { background: #111; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    </style>
  </head>
  <body>
    <div id="keystatic-root"></div>
    <script type="module">
      const ADMIN_BASE_PATH = ${JSON.stringify(ADMIN_BASE_PATH)};
      if (!location.pathname.startsWith(ADMIN_BASE_PATH)) {
        const redirectTarget = new URL(ADMIN_BASE_PATH, location.origin);
        location.replace(redirectTarget.toString());
      }

      window.process = window.process || { env: { NODE_ENV: "production" } };

      const bootstrap = async () => {
        const [React, ReactDOM, keystatic] = await Promise.all([
          import(${JSON.stringify(CDN_REACT)}),
          import(${JSON.stringify(CDN_REACT_DOM)}),
          import(${JSON.stringify(CDN_KEYSTATIC)}),
        ]);

        const config = ${configJson};
        const appSlug = { envName: ${JSON.stringify(APP_SLUG_ENV_NAME)}, value: ${safeAppSlug} };
        const container = document.getElementById("keystatic-root");

        if (!container) {
          throw new Error("Keystatic root element not found");
        }

        const root = ReactDOM.createRoot(container);
        root.render(React.createElement(keystatic.Keystatic, { config, appSlug }));
      };

      bootstrap().catch((error) => {
        console.error("Failed to initialise Keystatic admin", error);
        const container = document.getElementById("keystatic-root");
        if (container) {
          container.innerHTML = '<main style="padding:1.5rem;max-width:40rem;margin:0 auto;">
            <h1 style="font-size:1.5rem;margin-bottom:0.75rem;">Keystatic admin failed to load</h1>
            <p style="line-height:1.5;">
              Check the browser console for the detailed error message.
            </p>
          </main>';
        }
      });
    </script>
  </body>
</html>`;
};

const isAdminRequest = (pathname: string) => pathname === ADMIN_BASE_PATH || pathname.startsWith(`${ADMIN_BASE_PATH}/`);

export const onRequest: PagesFunction<AdminEnv> = function onRequest({ request, env }): WorkerResponse {
        const url = new URL(request.url);

        if (!isAdminRequest(url.pathname)) {
                return toWorkerResponse(new Response(null, { status: 404 }));
        }

        if (request.method !== "GET" && request.method !== "HEAD") {
                return toWorkerResponse(
                        new Response("Method Not Allowed", {
                                status: 405,
                                headers: { Allow: "GET, HEAD" },
                        }),
                );
        }

        const appSlug = env[APP_SLUG_ENV_NAME];

        if (!appSlug) {
                return toWorkerResponse(
                        new Response(
                                `Missing ${APP_SLUG_ENV_NAME}. Configure the environment variable so the Keystatic admin can complete GitHub OAuth.`,
                                {
                                        status: 500,
                                        headers: { "Content-Type": "text/plain; charset=utf-8" },
                                },
                        ),
                );
        }

        const body = request.method === "HEAD" ? undefined : createHtmlResponse(keystaticConfig, appSlug);

        return toWorkerResponse(
                new Response(body, {
                        status: 200,
                        headers: {
                                "Content-Type": "text/html; charset=utf-8",
                                "Cache-Control": "no-store",
                        },
                }),
        );
};
