import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import expressiveCode from "astro-expressive-code";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
	prefetch: true,

	// Expressive Code must come BEFORE mdx()
	integrations: [
		expressiveCode({
			// Dual themes for light/dark mode
			themes: ["github-light", "github-dark"],
			// Map to our neobrutalism theme names
			themeCssSelector: (theme) =>
				theme.type === "light"
					? '[data-theme="neobrutalism-light"]'
					: '[data-theme="neobrutalism-dark"]',
			// Default word wrap enabled
			defaultProps: {
				wrap: true,
			},
			// Style frames to match neobrutalism
			styleOverrides: {
				borderRadius: "0",
				borderWidth: "3px",
				frames: {
					shadowColor: "transparent",
				},
			},
		}),
		mdx({
			rehypePlugins: [
				[
					rehypeMermaid,
					{
						strategy: "inline-svg",
						mermaidConfig: {
							theme: "base",
							themeVariables: {
								fontFamily: "JetBrains Mono, ui-monospace, monospace",
								fontSize: "15px",
							},
						},
					},
				],
			],
		}),
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
