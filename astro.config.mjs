import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	integrations: [mdx()],

	output: "static",

	// Markdown configuration
	markdown: {
		shikiConfig: {
			// Dual themes for light/dark mode
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
			// Enable word wrap to prevent horizontal scrolling
			wrap: true,
		},
	},

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

	// Experimental fonts API - handles subsetting, caching, and optimization
	// See: https://docs.astro.build/en/reference/experimental-flags/fonts/
	experimental: {
		fonts: [
			{
				// Primary display font
				name: "Space Grotesk",
				cssVariable: "--font-display",
				provider: fontProviders.fontsource(),
				weights: [500, 600, 700, 900], // Only weights actually used
				styles: ["normal"],
				subsets: ["latin"],
				formats: ["woff2"],
				fallbacks: ["system-ui", "sans-serif"],
			},
			{
				// Monospace font for code
				name: "JetBrains Mono",
				cssVariable: "--font-mono",
				provider: fontProviders.fontsource(),
				weights: [400, 500, 600, 700],
				styles: ["normal"],
				subsets: ["latin"],
				formats: ["woff2"],
				fallbacks: ["ui-monospace", "monospace"],
			},
			{
				// Glitch effect font - only used for "NICK ROTH" text
				name: "Rubik Glitch",
				cssVariable: "--font-glitch",
				provider: fontProviders.fontsource(),
				weights: [400],
				styles: ["normal"],
				subsets: ["latin"],
				formats: ["woff2"],
				fallbacks: ["cursive"],
			},
		],
	},
});
