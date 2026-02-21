import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import {
	rehypeMermaidPlugin,
	rehypeExpressiveCodePlugin,
} from "./rehype.config.mjs";

// https://astro.build/config
export default defineConfig({
	prefetch: true,

	integrations: [
		mdx({
			// Disable default syntax highlighting so expressive-code can take over
			syntaxHighlight: false,
			rehypePlugins: [
				// Process mermaid diagrams FIRST (before expressive-code)
				// This prevents expressive-code from capturing mermaid blocks
				rehypeMermaidPlugin,
				// Then process code blocks with expressive-code
				rehypeExpressiveCodePlugin,
			],
		}),
	],

	// Note: expressive-code handles syntax highlighting automatically
	// Do not set markdown.syntaxHighlight when using astro-expressive-code

	// Configure expressive-code for regular Markdown files (.md)
	// MDX files use the mdx() integration above
	markdown: {
		syntaxHighlight: false,
		rehypePlugins: [rehypeMermaidPlugin, rehypeExpressiveCodePlugin],
	},

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
		// SVG optimization via SVGO at build time
		// Applies to SVG files imported as components (e.g. import Logo from '../assets/logo.svg')
		svgo: {
			plugins: [
				"preset-default",
				{
					name: "removeViewBox",
					active: false, // Preserve viewBox for responsive scaling
				},
			],
			floatPrecision: 2,
			multipass: true,
		},
	},
});
