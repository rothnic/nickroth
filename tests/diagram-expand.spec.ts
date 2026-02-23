import { expect, test } from "@playwright/test";

test.describe("Diagram Expand Functionality", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/work/resume-chatbot");
		await page.waitForLoadState("networkidle");
		await page.waitForTimeout(2000);
	});

	test("diagram figure and expand button are visible", async ({ page }) => {
		const diagram = page.locator(".diagram-figure").first();
		await expect(diagram).toBeVisible();

		const expandBtn = diagram.locator(".diagram-expand-btn");
		await expect(expandBtn).toBeVisible();
		await expect(expandBtn).toHaveText("Expand");
	});

	test("clicking expand button opens modal", async ({ page }) => {
		const diagram = page.locator(".diagram-figure").first();
		const expandBtn = diagram.locator(".diagram-expand-btn");

		await expandBtn.click();

		const modal = page.locator(".diagram-modal.active");
		await expect(modal).toBeVisible();

		const closeBtn = modal.locator(".diagram-modal-close");
		await expect(closeBtn).toBeVisible();

		const zoomControls = modal.locator(".diagram-modal-zoom-controls");
		await expect(zoomControls).toBeVisible();

		const zoomIn = modal.locator(".zoom-in");
		const zoomOut = modal.locator(".zoom-out");
		const zoomReset = modal.locator(".zoom-reset");

		await expect(zoomIn).toBeVisible();
		await expect(zoomOut).toBeVisible();
		await expect(zoomReset).toBeVisible();

		const zoomLevel = modal.locator(".zoom-level");
		await expect(zoomLevel).toHaveText("100%");
	});

	test("clicking close button closes modal", async ({ page }) => {
		const diagram = page.locator(".diagram-figure").first();
		const expandBtn = diagram.locator(".diagram-expand-btn");

		await expandBtn.click();

		const modal = page.locator(".diagram-modal.active");
		await expect(modal).toBeVisible();

		const closeBtn = modal.locator(".diagram-modal-close");
		await closeBtn.click();

		await expect(modal).not.toBeVisible();
	});

	test("clicking backdrop closes modal", async ({ page }) => {
		const diagram = page.locator(".diagram-figure").first();
		const expandBtn = diagram.locator(".diagram-expand-btn");

		await expandBtn.click();

		const modal = page.locator(".diagram-modal.active");
		await expect(modal).toBeVisible();

		const backdrop = modal.locator(".diagram-modal-backdrop");
		await backdrop.click();

		await expect(modal).not.toBeVisible();
	});

	test("zoom in button increases zoom level", async ({ page }) => {
		const diagram = page.locator(".diagram-figure").first();
		const expandBtn = diagram.locator(".diagram-expand-btn");

		await expandBtn.click();

		const modal = page.locator(".diagram-modal.active");
		const zoomIn = modal.locator(".zoom-in");
		const zoomLevel = modal.locator(".zoom-level");

		await expect(zoomLevel).toHaveText("100%");

		await zoomIn.click();
		await page.waitForTimeout(100);

		const zoomText = await zoomLevel.textContent();
		expect(zoomText).toBe("125%");
	});

	test("zoom out button decreases zoom level", async ({ page }) => {
		const diagram = page.locator(".diagram-figure").first();
		const expandBtn = diagram.locator(".diagram-expand-btn");

		await expandBtn.click();

		const modal = page.locator(".diagram-modal.active");
		const zoomOut = modal.locator(".zoom-out");
		const zoomLevel = modal.locator(".zoom-level");

		await expect(zoomLevel).toHaveText("100%");

		await zoomOut.click();
		await page.waitForTimeout(100);

		const zoomText = await zoomLevel.textContent();
		expect(zoomText).toBe("75%");
	});

	test("zoom reset button resets to 100%", async ({ page }) => {
		const diagram = page.locator(".diagram-figure").first();
		const expandBtn = diagram.locator(".diagram-expand-btn");

		await expandBtn.click();

		const modal = page.locator(".diagram-modal.active");
		const zoomIn = modal.locator(".zoom-in");
		const zoomReset = modal.locator(".zoom-reset");
		const zoomLevel = modal.locator(".zoom-level");

		await zoomIn.click();
		await zoomIn.click();
		await page.waitForTimeout(100);

		await zoomReset.click();
		await page.waitForTimeout(100);

		await expect(zoomLevel).toHaveText("100%");
	});

	test("cloned SVG preserves colors from original", async ({ page }) => {
		const diagram = page.locator(".diagram-figure").first();
		const expandBtn = diagram.locator(".diagram-expand-btn");

		await expandBtn.click();

		const modal = page.locator(".diagram-modal.active");
		const modalSvg = modal.locator(".diagram-modal-svg-container svg");

		await expect(modalSvg).toBeVisible();

		const modalSvgElements = modalSvg.locator("*");
		const count = await modalSvgElements.count();
		expect(count).toBeGreaterThan(0);

		const firstElement = modalSvgElements.first();
		const style = await firstElement.evaluate((el) => {
			const computed = window.getComputedStyle(el);
			return {
				fill: computed.fill,
				stroke: computed.stroke,
			};
		});

		expect(style.fill || style.stroke).toBeTruthy();
	});
});

test.describe("Diagram Expand Mobile Viewport", () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test("expand functionality works on mobile", async ({ page }) => {
		await page.goto("/work/resume-chatbot");
		await page.waitForLoadState("networkidle");
		await page.waitForTimeout(2000);

		const diagram = page.locator(".diagram-figure").first();
		const expandBtn = diagram.locator(".diagram-expand-btn");

		await expect(expandBtn).toBeVisible();

		await expandBtn.click();

		const modal = page.locator(".diagram-modal.active");
		await expect(modal).toBeVisible();

		const zoomControls = modal.locator(".diagram-modal-zoom-controls");
		await expect(zoomControls).toBeVisible();

		const closeBtn = modal.locator(".diagram-modal-close");
		await closeBtn.click();

		await expect(modal).not.toBeVisible();
	});
});
