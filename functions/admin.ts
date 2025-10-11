import type { PagesFunction, Response as WorkerResponse } from "@cloudflare/workers-types";

const toWorkerResponse = (response: Response): WorkerResponse => response as unknown as WorkerResponse;

const TARGET = "/keystatic";

export const onRequest: PagesFunction = function onRequest({ request }): WorkerResponse {
        if (request.method !== "GET" && request.method !== "HEAD") {
                return toWorkerResponse(new Response("Method Not Allowed", {
                        status: 405,
                        headers: { Allow: "GET, HEAD" },
                }));
        }

        const url = new URL(request.url);
        url.pathname = TARGET;
        url.search = "";

        return toWorkerResponse(Response.redirect(url.toString(), 302));
};
