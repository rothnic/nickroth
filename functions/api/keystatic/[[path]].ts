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
};

const SLUG_ENV_NAME = "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG";

const createRequestHandler = (env: KeystaticEnv) => {
        const clientId = env.KEYSTATIC_GITHUB_CLIENT_ID;
        const clientSecret = env.KEYSTATIC_GITHUB_CLIENT_SECRET;
        const secret = env.KEYSTATIC_SECRET;

        if (!clientId || !clientSecret || !secret) {
                return null;
        }

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

const handleRequest = async (context: KeystaticContext): Promise<KeystaticResponse> => {
        const { request, env, next } = context;
        const url = new URL(request.url);

        if (!url.pathname.startsWith("/api/keystatic")) {
                return next();
        }

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
                const { body, headers, status } = await handler(request);
                const normalizedHeaders = normalizeHeaders(headers);
                const responseBody = normalizeBody(body);

                return new Response(responseBody, {
                        status: status ?? 200,
                        headers: normalizedHeaders,
                }) as unknown as KeystaticResponse;
        } catch (error) {
                console.error("Keystatic API request failed", error);
                return new Response("Failed to process Keystatic request.", {
                        status: 500,
                        headers: { "Content-Type": "text/plain; charset=utf-8" },
                }) as unknown as KeystaticResponse;
        }
};

export const onRequest: PagesFunction<KeystaticEnv> = (context) => handleRequest(context);
