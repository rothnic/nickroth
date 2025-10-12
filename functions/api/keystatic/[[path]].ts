import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";
import { Buffer } from "buffer";
import process from "process";
import keystaticConfig from "../../../keystatic.config";

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

type KeystaticEnv = {
        KEYSTATIC_GITHUB_CLIENT_ID?: string;
        KEYSTATIC_GITHUB_CLIENT_SECRET?: string;
        KEYSTATIC_SECRET?: string;
        PUBLIC_KEYSTATIC_GITHUB_APP_SLUG?: string;
        PUBLIC_KEYSTATIC_BASE_URL?: string;
};

const SLUG_ENV_NAME = "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG";

const ensureProcessEnv = (env: KeystaticEnv) => {
        const runtimeProcess = globalScope.process ?? process;

        if (!runtimeProcess.env) {
                runtimeProcess.env = {} as Record<string, string | undefined>;
        }

        const assignments: Array<[string, string | undefined]> = [
                ["KEYSTATIC_GITHUB_CLIENT_ID", env.KEYSTATIC_GITHUB_CLIENT_ID],
                ["KEYSTATIC_GITHUB_CLIENT_SECRET", env.KEYSTATIC_GITHUB_CLIENT_SECRET],
                ["KEYSTATIC_SECRET", env.KEYSTATIC_SECRET],
                [SLUG_ENV_NAME, env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG],
        ];

        for (const [key, value] of assignments) {
                if (value && runtimeProcess.env[key] !== value) {
                        runtimeProcess.env[key] = value;
                }
        }
};

const createRequestHandler = (env: KeystaticEnv) => {
        const clientId = env.KEYSTATIC_GITHUB_CLIENT_ID;
        const clientSecret = env.KEYSTATIC_GITHUB_CLIENT_SECRET;
        const secret = env.KEYSTATIC_SECRET;

        if (!clientId || !clientSecret || !secret) {
                return null;
        }

        ensureProcessEnv(env);

        return makeGenericAPIRouteHandler(
                {
                        clientId,
                        clientSecret,
                        secret,
                        config: keystaticConfig,
                },
                { slugEnvName: SLUG_ENV_NAME },
        );
};

type HeaderValue = string | string[] | undefined;
type HeaderCollection =
        | Headers
        | [string, string][]
        | Record<string, HeaderValue>
        | Map<string, HeaderValue>;

const normalizeHeaders = (headers?: HeaderCollection): Headers | undefined => {
        if (!headers) {
                return undefined;
        }

        if (headers instanceof Headers) {
                return headers;
        }

        const normalized = new Headers();

        if (Array.isArray(headers)) {
                for (const [key, value] of headers) {
                        normalized.append(key, value);
                }
                return normalized;
        }

        if (headers instanceof Map) {
                for (const [key, values] of headers.entries()) {
                        const entries = Array.isArray(values) ? values : values ? [values] : [];
                        for (const value of entries) {
                                normalized.append(key, value);
                        }
                }
                return normalized;
        }

        for (const [key, value] of Object.entries(headers)) {
                const entries = Array.isArray(value) ? value : value ? [value] : [];
                for (const entry of entries) {
                        normalized.append(key, entry);
                }
        }

        return normalized;
};

const normalizeBody = (body: unknown): BodyInit | null => {
        if (body === null || body === undefined) {
                return null;
        }

        if (
                typeof body === "string" ||
                body instanceof Blob ||
                body instanceof ArrayBuffer ||
                body instanceof FormData ||
                body instanceof URLSearchParams ||
                body instanceof ReadableStream
        ) {
                return body;
        }

        if (body instanceof Uint8Array) {
                return body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength) as ArrayBuffer;
        }

        return JSON.stringify(body);
};

type RouteParams = Record<string, string | string[] | undefined> | undefined;

interface KeystaticContext {
        request: Request;
        env: KeystaticEnv;
        params?: RouteParams;
}

const API_BASE_PATH = "/api/keystatic";

const joinPathSegments = (segments: string[]): string =>
        segments
                .map((segment) => segment.replace(/^\/+|\/+$/g, ""))
                .filter(Boolean)
                .join("/");

const cloneRequestWithPathname = (
        request: Request,
        pathname: string,
        baseOverride?: URL,
        originalHost?: string,
): Request => {
        const targetUrl = new URL(request.url);
        targetUrl.pathname = pathname;

        if (baseOverride) {
                targetUrl.protocol = baseOverride.protocol;
                targetUrl.hostname = baseOverride.hostname;
                targetUrl.port = baseOverride.port;
        }

        const cloned = request.clone();
        const method = cloned.method ?? "GET";
        const headers = new Headers(cloned.headers);

        if (baseOverride) {
                headers.set("host", baseOverride.host);
                if (originalHost) {
                        headers.set("x-forwarded-host", originalHost);
                }
        }

        const init: RequestInit = {
                method,
                headers,
        };

        if (method !== "GET" && method !== "HEAD") {
                init.body = cloned.body;
        }

        return new Request(targetUrl.toString(), init);
};

const getBaseOverride = (env: KeystaticEnv): URL | null => {
        const base = env.PUBLIC_KEYSTATIC_BASE_URL;

        if (!base) {
                return null;
        }

        try {
                return new URL(base);
        } catch (error) {
                console.warn("Invalid PUBLIC_KEYSTATIC_BASE_URL provided", error);
                return null;
        }
};

const normaliseRequestForHandler = (context: KeystaticContext): Request => {
        const { request, params, env } = context;
        const url = new URL(request.url);
        const suffixParam = params && "path" in params ? params.path : undefined;
        const suffix = Array.isArray(suffixParam)
                ? joinPathSegments(suffixParam)
                : suffixParam ?? "";

        const pathname = url.pathname.startsWith(API_BASE_PATH)
                ? url.pathname
                : suffix
                        ? `${API_BASE_PATH}/${suffix}`
                        : API_BASE_PATH;

        const baseOverride = getBaseOverride(env);
        const originalHost = url.host;

        return cloneRequestWithPathname(request, pathname, baseOverride ?? undefined, originalHost);
};

const handleRequest = async (context: KeystaticContext): Promise<Response> => {
        const { env } = context;
        const request = normaliseRequestForHandler(context);

        const handler = createRequestHandler(env);

        if (!handler) {
                return new Response(
                        "Keystatic API environment variables are missing. Set KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, and KEYSTATIC_SECRET.",
                        {
                                status: 500,
                                headers: { "Content-Type": "text/plain; charset=utf-8" },
                        },
                );
        }

        try {
                const result = await handler(request);

                if (result instanceof Response) {
                        return result;
                }

                const { body, headers, status } = result ?? {};
                const normalizedHeaders = normalizeHeaders(headers);
                const responseBody = normalizeBody(body);
                const init: ResponseInit = { status: status ?? 200 };

                if (normalizedHeaders) {
                        init.headers = normalizedHeaders;
                }

                return new Response(responseBody, init);
        } catch (error) {
                console.error("Keystatic API request failed", error);
                return new Response("Failed to process Keystatic request.", {
                        status: 500,
                        headers: { "Content-Type": "text/plain; charset=utf-8" },
                });
        }
};

export const onRequest = (context: KeystaticContext): Promise<Response> => handleRequest(context);
