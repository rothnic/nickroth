import { expect, test } from "@playwright/test";

/**
 * Tests for blog content styling verification
 * These tests ensure our styling changes are actually applied and not overridden
 */

test.describe("Blog Content Styling", () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the resume-chatbot article
		await page.goto("/work/resume-chatbot");
		// Wait for the page to fully load
		await page.waitForLoadState("networkidle");
	});

	test.describe("Mermaid Diagrams", () => {
		test("sequence diagram actors should use theme colors", async ({
			page,
		}) => {
			// Find the mermaid diagram
			const mermaidContainer = page.locator(".prose-content .mermaid").first();
			await expect(mermaidContainer).toBeVisible();

			// Get the computed style of actor rectangles
			const actorRect = mermaidContainer.locator("g.actor rect").first();

			// Check that the fill color is not the default cream/beige
			const fillColor = await actorRect.evaluate((el) => {
				const style = window.getComputedStyle(el);
				return style.fill;
			});

			// The color should be one of our theme colors, not the default #fdf4e3 (cream)
			expect(fillColor).not.toBe("rgb(253, 244, 227)");
			expect(fillColor).not.toBe("#fdf4e3");
			expect(fillColor).not.toContain("253"); // Red component of cream color
		});

		test("mermaid diagram should have proper background", async ({ page }) => {
			const mermaidContainer = page.locator(".prose-content .mermaid").first();
			await expect(mermaidContainer).toBeVisible();

			const backgroundColor = await mermaidContainer.evaluate((el) => {
				const style = window.getComputedStyle(el);
				return style.backgroundColor;
			});

			// Should not be transparent
			expect(backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
			expect(backgroundColor).not.toBe("transparent");
		});
	});

	test.describe("Code Blocks", () => {
		test("code blocks should have laserwave theme styling", async ({
			page,
		}) => {
			// Find a code block
			const codeBlock = page.locator(".expressive-code").first();
			await expect(codeBlock).toBeVisible({ timeout: 10000 });

			// Get the background color - laserwave has a distinctive dark purple/blue background
			const backgroundColor = await codeBlock.evaluate((el) => {
				const style = window.getComputedStyle(el);
				return style.backgroundColor;
			});

			// Should not be white/light - laserwave is dark themed
			const rgb = backgroundColor.match(/\d+/g)?.map(Number) || [0, 0, 0];
			const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

			// Laserwave is dark, so brightness should be low
			expect(brightness).toBeLessThan(100);
		});

		test("code blocks should have word wrapping enabled", async ({ page }) => {
			const codeBlock = page.locator(".expressive-code").first();
			await expect(codeBlock).toBeVisible({ timeout: 10000 });

			// Find the code element
			const codeElement = codeBlock.locator("code").first();

			// Check white-space property
			const whiteSpace = await codeElement.evaluate((el) => {
				const style = window.getComputedStyle(el);
				return style.whiteSpace;
			});

			// With word wrap enabled, white-space should be 'pre-wrap' or similar
			expect(["pre-wrap", "break-spaces"]).toContain(whiteSpace);
		});

		test("code blocks should have neobrutalism border styling", async ({
			page,
		}) => {
			const codeBlock = page.locator(".expressive-code").first();
			await expect(codeBlock).toBeVisible({ timeout: 10000 });

			const borderWidth = await codeBlock.evaluate((el) => {
				const style = window.getComputedStyle(el);
				return style.borderWidth;
			});

			// Should have the 2px border we configured
			expect(borderWidth).toBe("2px");
		});
	});

	test.describe("Feature Cards", () => {
		test("feature cards should have base-200 background", async ({ page }) => {
			// Look for feature cards
			const featureCard = page.locator(".feature-card").first();

			// Only test if feature cards exist on this page
			if (await featureCard.isVisible().catch(() => false)) {
				const backgroundColor = await featureCard.evaluate((el) => {
					const style = window.getComputedStyle(el);
					return style.backgroundColor;
				});

				// Should not be transparent - should have base-200 background
				expect(backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
				expect(backgroundColor).not.toBe("transparent");
			}
		});
	});
});

test.describe("Dark Mode Theme Toggle", () => {
	test("theme toggle should change mermaid diagram colors", async ({
		page,
	}) => {
		await page.goto("/work/resume-chatbot");
		await page.waitForLoadState("networkidle");

		const mermaidContainer = page.locator(".prose-content .mermaid").first();
		await expect(mermaidContainer).toBeVisible();

		// Get light mode color
		const lightModeColor = await mermaidContainer.evaluate((el) => {
			const style = window.getComputedStyle(el);
			return style.backgroundColor;
		});

		// Toggle to dark mode
		const themeToggle = page
			.locator('button[aria-label*="theme"], .swap')
			.first();
		if (await themeToggle.isVisible().catch(() => false)) {
			await themeToggle.click();
			await page.waitForTimeout(500); // Wait for theme transition

			// Get dark mode color
			const darkModeColor = await mermaidContainer.evaluate((el) => {
				const style = window.getComputedStyle(el);
				return style.backgroundColor;
			});

			// Colors should be different in light vs dark mode
			expect(lightModeColor).not.toBe(darkModeColor);
		}
	});
});
