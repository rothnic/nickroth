import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	integrations: [mdx()],

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
		plugins: [tailwindcss()],
	},
});
