import { expect, test } from "@playwright/test";

test.describe("DiagramExpandWrapper Modal Size", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/work/resume-chatbot");
		await page.waitForLoadState("networkidle");
	});

	test("modal should not be taller than viewport", async ({ page }) => {
		const expandButton = page.locator("[data-expand-btn]").first();
		await expandButton.click();

		await expect(page.locator(".diagram-modal.active")).toBeVisible();

		const viewportHeight = await page.evaluate(() => window.innerHeight);
		const modalBody = page.locator(".diagram-modal-body").first();
		const modalBodyBox = await modalBody.boundingBox();
		
		console.log(`Viewport: ${viewportHeight}px, Modal body: ${modalBodyBox?.height}px`);

		// Modal body should not exceed viewport height
		expect(modalBodyBox!.height).toBeLessThan(viewportHeight * 0.9);
	});

	test("diagram should be centered in modal", async ({ page }) => {
		const expandButton = page.locator("[data-expand-btn]").first();
		await expandButton.click();

		await expect(page.locator(".diagram-modal.active")).toBeVisible();

		const modalBody = page.locator(".diagram-modal-body").first();
		const modalBodyBox = await modalBody.boundingBox();

		const modalSvg = page.locator(".diagram-modal-svg-container svg").first();
		const svgBox = await modalSvg.boundingBox();

		const modalCenterY = modalBodyBox!.y + modalBodyBox!.height / 2;
		const svgCenterY = svgBox!.y + svgBox!.height / 2;
		const offset = Math.abs(modalCenterY - svgCenterY);
		const maxAllowedOffset = modalBodyBox!.height * 0.2;

		console.log(`Modal center Y: ${modalCenterY}, SVG center Y: ${svgCenterY}, Offset: ${offset}px`);

		expect(offset).toBeLessThan(maxAllowedOffset);
	});

	test("zoom in should increase SVG size", async ({ page }) => {
		const expandButton = page.locator("[data-expand-btn]").first();
		await expandButton.click();

		await expect(page.locator(".diagram-modal.active")).toBeVisible();

		// Get the SVG in the modal (not the button icon)
		const modalSvg = page.locator(".diagram-modal-svg-container svg").first();
		const initialSvgBox = await modalSvg.boundingBox();
		console.log(`Initial SVG at 25%: ${initialSvgBox?.width}px x ${initialSvgBox?.height}px`);

		// Zoom in to 100%
		const zoomInButton = page.locator(".zoom-in").first();
		const zoomLevel = page.locator(".zoom-level").first();

		// Click zoom in 8 times to reach 100% (25% + 8*10% = 105%, clamped to 100%)
		for (let i = 0; i < 8; i++) {
			await zoomInButton.click();
			await page.waitForTimeout(100);
		}

		const finalZoom = await zoomLevel.textContent();
		expect(finalZoom).toBe("100%");

		const zoomedSvgBox = await modalSvg.boundingBox();
		console.log(`Zoomed SVG at 100%: ${zoomedSvgBox?.width}px x ${zoomedSvgBox?.height}px`);

		// The SVG should be larger at 100% zoom than at 25% zoom
		// 100% / 25% = 4x, so SVG should be ~4x larger
		expect(zoomedSvgBox!.width).toBeGreaterThan(initialSvgBox!.width * 3);
		expect(zoomedSvgBox!.height).toBeGreaterThan(initialSvgBox!.height * 3);
	});
});
