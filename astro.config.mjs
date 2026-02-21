import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import rehypeMermaid from "rehype-mermaid";
import rehypeExpressiveCode from "rehype-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

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
				// Then process code blocks with expressive-code
				[
					rehypeExpressiveCode,
					{
						themes: ['laserwave'],
						plugins: [pluginCollapsibleSections],
						styleOverrides: {
							borderRadius: '0',
							borderWidth: '2px',
							borderColor: 'var(--nr-border-color, #000)',
							codeFontFamily: 'var(--font-mono), ui-monospace, monospace',
							codeFontSize: '0.875rem',
							codeLineHeight: '1.6',
						},
						useThemedScrollbars: false,
						useThemedSelectionColors: false,
						wrap: true,
					},
				],
			],
		}),
	],

	// Note: expressive-code handles syntax highlighting automatically
	// Do not set markdown.syntaxHighlight when using astro-expressive-code

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
				'preset-default',
				{
					name: 'removeViewBox',
					active: false, // Preserve viewBox for responsive scaling
				},
			],
			floatPrecision: 2,
			multipass: true,
		},
	},
});
