/// <reference path="../.astro/types.d.ts" />

// Declare daisyui module to resolve TypeScript warnings
declare module 'daisyui' {
	const content: unknown;
	export default content;
}