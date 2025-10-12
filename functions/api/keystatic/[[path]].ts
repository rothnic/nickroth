import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";
import { Buffer } from "buffer";
import process from "process";
import keystaticConfig from "../../../keystatic.config";
import type { PagesFunction } from "@cloudflare/workers-types";

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
};

const SLUG_ENV_NAME = "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG";

const ensureProcessEnv = (env: KeystaticEnv) => {
        const runtimeProcess = globalScope.process ?? process;

        if (!runtimeProcess.env) {
                runtimeProcess.env = {} as NodeJS.ProcessEnv;
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

type KeystaticContext = Parameters<PagesFunction<KeystaticEnv>>[0];
type KeystaticResponse = Awaited<ReturnType<PagesFunction<KeystaticEnv>>>;

const API_BASE_PATH = "/api/keystatic";

const joinPathSegments = (segments: string[]): string =>
        segments
                .map((segment) => segment.replace(/^\/+|\/+$/g, ""))
                .filter(Boolean)
                .join("/");

const normaliseRequestForHandler = (context: KeystaticContext): Request => {
        const { request, params } = context;
        const url = new URL(request.url);

        if (url.pathname.startsWith(API_BASE_PATH)) {
                return request;
        }

        const suffixParam = params?.path;
        const suffix = Array.isArray(suffixParam)
                ? joinPathSegments(suffixParam)
                : suffixParam ?? "";

        url.pathname = suffix ? `${API_BASE_PATH}/${suffix}` : API_BASE_PATH;

        return new Request(url.toString(), request);
};

const handleRequest = async (context: KeystaticContext): Promise<KeystaticResponse> => {
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
                ) as unknown as KeystaticResponse;
        }

        try {
                const result = await handler(request);

                if (result instanceof Response) {
                        return result as unknown as KeystaticResponse;
                }

                const { body, headers, status } = result ?? {};
                const normalizedHeaders = normalizeHeaders(headers);
                const responseBody = normalizeBody(body);
                const init: ResponseInit = { status: status ?? 200 };

                if (normalizedHeaders) {
                        init.headers = normalizedHeaders;
                }

                return new Response(responseBody, init) as unknown as KeystaticResponse;
        } catch (error) {
                console.error("Keystatic API request failed", error);
                return new Response("Failed to process Keystatic request.", {
                        status: 500,
                        headers: { "Content-Type": "text/plain; charset=utf-8" },
                }) as unknown as KeystaticResponse;
        }
};

export const onRequest: PagesFunction<KeystaticEnv> = (context) => handleRequest(context);
