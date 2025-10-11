import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import keystatic from "@keystatic/astro";
import { defineConfig } from "astro/config";

const enableKeystaticIntegration = process.env.SKIP_KEYSTATIC !== "true";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
        integrations: [
                mdx(),
                ...(enableKeystaticIntegration ? [keystatic()] : []),
        ],

	output: "static",

	// Update with your Cloudflare Pages URL
	site: "https://www.nickroth.com",

	build: {
		format: "directory",
	},

	image: {
		// Sharp is used at BUILD TIME for image optimization
		// This works for Cloudflare Pages (static builds) - not Workers
		// Sharp automatically generates multiple responsive WebP sizes
		service: {
			entrypoint: "astro/assets/services/sharp",
		},
	},

        vite: {
                define: {
                        global: "globalThis",
                        "process.env": "{}",
                },
                optimizeDeps: {
                        include: ["buffer", "process", "undici"],
                },
                plugins: [tailwindcss()],
                resolve: {
                        alias: {
                                buffer: "buffer",
                                process: "process/browser",
                        },
                },
                ssr: {
                        noExternal: ["@keystatic/core", "@keystatic/astro"],
                },
        },
});
