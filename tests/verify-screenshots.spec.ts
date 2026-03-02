import { expect, test } from "@playwright/test";

test("capture light and dark mode screenshots for verification", async ({
	page,
}) => {
	await page.goto("/");
	await page.waitForTimeout(2000);
	await page.screenshot({ path: "test-results/verify-light-mode.png" });
	const themeToggle = page.locator('button[aria-label="Toggle theme"]').first();
	await themeToggle.click();
	await page.waitForTimeout(2000);
	await page.screenshot({ path: "test-results/verify-dark-mode.png" });
	const diagram = page.locator(".excalidraw-container").first();
	await expect(diagram).toBeVisible();
	const theme = await page.evaluate(() =>
		document.documentElement.getAttribute("data-theme"),
	);
	console.log("Current theme:", theme);
});
