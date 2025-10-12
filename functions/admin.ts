const TARGET_PATH = "/keystatic";

interface AdminContext {
        request: Request;
}

export const onRequest = ({ request }: AdminContext): Response => {
        if (request.method !== "GET" && request.method !== "HEAD") {
                return new Response("Method Not Allowed", {
                        status: 405,
                        headers: { Allow: "GET, HEAD" },
                });
        }

        const url = new URL(request.url);
        url.pathname = TARGET_PATH;
        url.search = "";

        return Response.redirect(url.toString(), 302);
};
