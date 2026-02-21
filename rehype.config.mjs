// Rehype plugin configurations for Astro
// Extracted from astro.config.mjs to eliminate duplication

import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import rehypeExpressiveCode from "rehype-expressive-code";
import rehypeMermaid from "rehype-mermaid";

// Mermaid theme variables - shared between MDX and Markdown processing
export const mermaidThemeVariables = {
	// Typography
	fontFamily: "JetBrains Mono, ui-monospace, monospace",
	fontSize: "15px",

	// Base colors (light mode - neobrutalism-light theme)
	background: "#fcfcfc",
	primaryColor: "#f3f3f5",
	primaryTextColor: "#262626",
	primaryBorderColor: "#d946ef",

	// Secondary colors
	secondaryColor: "#a3e635",
	secondaryTextColor: "#262626",
	secondaryBorderColor: "#262626",

	// Lines and text
	lineColor: "#262626",
	textColor: "#262626",

	// Notes
	noteBkgColor: "#d946ef",
	noteTextColor: "#ffffff",
	noteBorderColor: "#d946ef",

	// Sequence diagram specific
	actorBkg: "#f3f3f5",
	actorBorder: "#d946ef",
	actorTextColor: "#262626",
	actorLineColor: "#e8e8eb",

	// Activation boxes
	activationBkgColor: "#e8e8eb",
	activationBorderColor: "#262626",

	// Edge labels
	edgeLabelBackground: "#fcfcfc",

	// Loop and alt sections
	loopTextColor: "#262626",
	loopLineColor: "#262626",

	// Flowchart specific
	nodeBorder: "#d946ef",
	nodeTextColor: "#262626",

	// Dark mode flag - set to false for light mode base
	darkMode: false,
};

// Expressive Code configuration - shared between MDX and Markdown processing
export const expressiveCodeConfig = {
	themes: ["laserwave"],
	plugins: [pluginCollapsibleSections],
	styleOverrides: {
		borderRadius: "0",
		borderWidth: "2px",
		borderColor: "var(--nr-border-color, #000)",
		codeFontFamily: "var(--font-mono), ui-monospace, monospace",
		codeFontSize: "0.875rem",
		codeLineHeight: "1.6",
	},
	useThemedScrollbars: false,
	useThemedSelectionColors: false,
	wrap: true,
};

// Rehype Mermaid plugin configuration
export const rehypeMermaidPlugin = [
	rehypeMermaid,
	{
		strategy: "inline-svg",
		mermaidConfig: {
			theme: "base",
			themeVariables: mermaidThemeVariables,
		},
	},
];

// Rehype Expressive Code plugin configuration
export const rehypeExpressiveCodePlugin = [
	rehypeExpressiveCode,
	expressiveCodeConfig,
];
