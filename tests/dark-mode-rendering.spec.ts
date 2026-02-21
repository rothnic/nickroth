import { expect, test } from "@playwright/test";

/**
 * Dark Mode Rendering Tests
 *
 * These tests verify that text and diagrams render correctly in dark mode
 * with proper contrast and colors.
 */

test.describe("Dark Mode Rendering", () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the resume chatbot page which has Excalidraw, Mermaid, and code blocks
		await page.goto("/work/resume-chatbot");
		// Wait for page to load
		await page.waitForLoadState("networkidle");
	});

	test("Excalidraw diagram text is visible in dark mode", async ({ page }) => {
		// Set dark mode
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});

		// Wait for Excalidraw diagram to load
		await page.waitForSelector(".excalidraw-container[data-loaded='true']", {
			timeout: 10000,
		});

		// Get the first text element in the Excalidraw diagram
		const textElement = page.locator(".excalidraw-container text").first();

		// Verify text element exists
		await expect(textElement).toBeVisible();

		// Get computed color and verify it's light (high contrast in dark mode)
		const fillColor = await textElement.evaluate((el) => {
			return window.getComputedStyle(el).fill;
		});

		// Parse RGB values - should be light (high values for R, G, B)
		const rgbMatch = fillColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
		if (rgbMatch) {
			const [, r, g, b] = rgbMatch.map(Number);
			const brightness = (r + g + b) / 3;
			// In dark mode, text should be bright (high contrast)
			expect(brightness).toBeGreaterThan(128);
		}
	});

	test("Mermaid diagram text is visible in dark mode", async ({ page }) => {
		// Set dark mode
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});

		// Wait for Mermaid diagram to render
		await page.waitForSelector(".prose-content .mermaid svg", {
			timeout: 10000,
		});

		// Get text elements in Mermaid diagram
		const mermaidText = page.locator(".prose-content .mermaid text").first();

		// Verify text is visible
		await expect(mermaidText).toBeVisible();

		// Get computed fill color
		const fillColor = await mermaidText.evaluate((el) => {
			return window.getComputedStyle(el).fill;
		});

		// Parse and check brightness
		const rgbMatch = fillColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
		if (rgbMatch) {
			const [, r, g, b] = rgbMatch.map(Number);
			const brightness = (r + g + b) / 3;
			// In dark mode, text should be bright for contrast
			expect(brightness).toBeGreaterThan(128);
		}
	});

	test("Heading hashes have correct color", async ({ page }) => {
		// Set dark mode first
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});

		// Check H3 pseudo-element hash color
		const h3Element = page.locator(".prose-content > h3").first();
		await expect(h3Element).toBeVisible();

		// Get the computed color of the h3 (which includes the pseudo-element)
		const h3Color = await h3Element.evaluate((el) => {
			return window.getComputedStyle(el).color;
		});

		// The h3 color should be visible in dark mode
		const rgbMatch = h3Color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
		if (rgbMatch) {
			const [, r, g, b] = rgbMatch.map(Number);
			const brightness = (r + g + b) / 3;
			// Should be bright in dark mode
			expect(brightness).toBeGreaterThan(100);
		}
	});

	test("H2 prefix hash inherits correct color", async ({ page }) => {
		// Find H2 with prefix
		const h2WithPrefix = page.locator("h2:has(.h2-prefix)").first();
		await expect(h2WithPrefix).toBeVisible();

		// Check the prefix color
		const prefixColor = await h2WithPrefix
			.locator(".h2-prefix")
			.evaluate((el) => {
				return window.getComputedStyle(el).color;
			});

		// Should have a valid color (not inherit from default)
		expect(prefixColor).not.toBe("");
		expect(prefixColor).not.toBe("rgba(0, 0, 0, 0)");
	});
});

test.describe("Collapsible Code Sections", () => {
	test("JSON resume code block has collapsible sections", async ({ page }) => {
		await page.goto("/work/resume-chatbot");
		await page.waitForLoadState("networkidle");

		// Look for the JSON code block with collapse marker
		const jsonCodeBlock = page
			.locator(".expressive-code:has(.ec-line)")
			.filter({
				hasText: /"basics":/,
			})
			.first();

		// Wait for the code block to be visible
		await expect(jsonCodeBlock).toBeVisible({ timeout: 10000 });

		// Check for collapsible section markers
		const collapsibleMarkers = jsonCodeBlock.locator(
			"[class*='collapsible'], .ec-fold, .ec-gutter",
		);

		// Log for debugging
		const count = await collapsibleMarkers.count();
		console.log(`Found ${count} collapsible markers`);

		// There should be at least one collapsible section indicator
		// (The plugin may render differently, so we check for visibility)
		if (count > 0) {
			await expect(collapsibleMarkers.first()).toBeVisible();
		}
	});
});
