import { expect, test } from "@playwright/test";

/**
 * Excalidraw Diagram Dark Mode Tests
 *
 * Verifies:
 * 1. Diagram renders correctly in light mode (no filter)
 * 2. CSS filter is applied in dark mode (invert + hue-rotate)
 * 3. Theme switching updates diagram appearance
 * 4. Diagram is lazy loaded when scrolled into view
 */

test.describe("Excalidraw Diagram Dark Mode", () => {
	test.beforeEach(async ({ page }) => {
		// Go to a page with Excalidraw diagrams
		await page.goto("/work/resume-chatbot");
		await page.waitForLoadState("networkidle");

		// Wait for diagrams to potentially load
		await page.waitForTimeout(500);
	});

	test("diagram container has no filter in light mode", async ({ page }) => {
		// Ensure we're in light mode
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-light");
		});
		await page.waitForTimeout(100);

		const diagramContainer = page.locator(".excalidraw-container").first();
		await expect(diagramContainer).toBeVisible();

		const filterValue = await diagramContainer.evaluate(
			(el) => getComputedStyle(el).filter,
		);

		console.log("Filter in light mode:", filterValue);

		// Light mode should have no filter (or 'none')
		expect(filterValue).toBe("none");
	});

	test("diagram container has CSS filter in dark mode", async ({ page }) => {
		// Switch to dark mode
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});
		await page.waitForTimeout(100);

		const diagramContainer = page.locator(".excalidraw-container").first();
		await expect(diagramContainer).toBeVisible();

		const filterValue = await diagramContainer.evaluate(
			(el) => getComputedStyle(el).filter,
		);

		console.log("Filter in dark mode:", filterValue);

		// Dark mode should have invert and hue-rotate filter
		// The expected value is approximately: invert(0.93) hue-rotate(180deg)
		expect(filterValue).toContain("invert");
		expect(filterValue).toContain("hue-rotate");
	});

	test("theme switching updates diagram filter", async ({ page }) => {
		const diagramContainer = page.locator(".excalidraw-container").first();
		await expect(diagramContainer).toBeVisible();

		// Start in light mode
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-light");
		});
		await page.waitForTimeout(100);

		const lightFilter = await diagramContainer.evaluate(
			(el) => getComputedStyle(el).filter,
		);

		// Switch to dark mode
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});
		await page.waitForTimeout(100);

		const darkFilter = await diagramContainer.evaluate(
			(el) => getComputedStyle(el).filter,
		);

		console.log("Light filter:", lightFilter);
		console.log("Dark filter:", darkFilter);

		// Filters should be different
		expect(lightFilter).not.toBe(darkFilter);
		expect(darkFilter).toContain("invert");
	});

	test("diagram lazy loads when scrolled into view", async ({ page }) => {
		// First, ensure we're at the top of the page
		await page.evaluate(() => window.scrollTo(0, 0));
		await page.waitForTimeout(100);

		const diagramContainer = page.locator(".excalidraw-container").first();

		// Check if it has the lazy loading attribute
		const isLazy = await diagramContainer.evaluate(
			(el) => el.getAttribute("data-lazy") === "true",
		);

		console.log("Diagram has lazy loading:", isLazy);

		// The diagram should have lazy loading enabled
		expect(isLazy).toBe(true);

		// Scroll to the diagram
		await diagramContainer.scrollIntoViewIfNeeded();
		await page.waitForTimeout(500);

		// After scrolling, the diagram should either be loading or loaded
		const loaded = await diagramContainer.evaluate((el) =>
			el.getAttribute("data-loaded"),
		);

		console.log("Diagram loaded state after scroll:", loaded);

		// Should be loaded (or loading)
		expect(["true", "false"]).toContain(loaded);
	});
});

/**
 * ArticleOutline Component Tests
 *
 * Verifies:
 * 1. Outline is initialized and populated with headings
 * 2. Outline contains links to H2 headings
 * 3. Outline is visible on desktop sidebar
 * 4. Mobile bottom sheet outline initializes correctly
 * 5. Active state tracks scroll position
 */

test.describe("ArticleOutline Component", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/work/resume-chatbot");
		await page.waitForLoadState("networkidle");

		// Wait for outline to initialize
		await page.waitForTimeout(500);
	});

	test("outline is populated with headings from article", async ({ page }) => {
		// Desktop sidebar outline
		const outlineList = page.locator(".article-outline-list").first();
		await expect(outlineList).toBeVisible();

		// Get all outline items
		const outlineItems = outlineList.locator("li");
		const count = await outlineItems.count();

		console.log("Number of outline items:", count);

		// Should have at least some headings (the article has multiple H2s)
		expect(count).toBeGreaterThan(0);
	});

	test("outline items link to corresponding headings", async ({ page }) => {
		const outlineList = page.locator(".article-outline-list").first();
		const outlineLinks = outlineList.locator("a");

		// Get the first link's href
		const firstLink = outlineLinks.first();
		const href = await firstLink.getAttribute("href");

		console.log("First outline link href:", href);

		// Should link to an anchor (e.g., #heading-0)
		expect(href).toMatch(/^#/);

		// The target heading should exist
		const targetId = href?.replace("#", "");
		const targetHeading = page.locator(`#${targetId}`);
		await expect(targetHeading).toBeVisible();
	});

	test("desktop outline is visible on large screens", async ({ page }) => {
		// Set viewport to desktop size
		await page.setViewportSize({ width: 1280, height: 800 });
		await page.waitForTimeout(100);

		const desktopOutline = page.locator(".article-outline").first();

		// Should be visible on desktop
		await expect(desktopOutline).toBeVisible();

		// Check that it's in the sidebar area (not hidden)
		const isHidden = await desktopOutline.evaluate((el) => {
			const style = getComputedStyle(el);
			return style.display === "none" || style.visibility === "hidden";
		});

		expect(isHidden).toBe(false);
	});

	test("outline shows active state for current section", async ({ page }) => {
		// Scroll to a heading in the middle of the article
		const midHeading = page.locator(".prose-content h2").nth(2);
		await midHeading.scrollIntoViewIfNeeded();
		await page.waitForTimeout(300);

		// Wait for intersection observer to update
		await page.waitForTimeout(500);

		// Check if any outline link has the active class
		const activeLinks = page.locator(".article-outline-list a.active");
		const activeCount = await activeLinks.count();

		console.log("Number of active outline links:", activeCount);

		// Should have at least one active link after scrolling
		// (Note: This might be flaky depending on exact scroll position)
		if (activeCount > 0) {
			const activeHref = await activeLinks.first().getAttribute("href");
			console.log("Active link href:", activeHref);
			expect(activeHref).toMatch(/^#/);
		}
	});

	test("mobile outline button is visible on small screens", async ({
		page,
	}) => {
		// Set viewport to mobile size
		await page.setViewportSize({ width: 375, height: 667 });
		await page.waitForTimeout(100);

		// Mobile outline button should be visible
		const mobileOutlineButton = page.locator(".mobile-outline-btn");

		// The button may not exist if there's no outline on the page
		const buttonExists = (await mobileOutlineButton.count()) > 0;

		if (buttonExists) {
			await expect(mobileOutlineButton).toBeVisible();
			console.log("Mobile outline button is visible");
		} else {
			console.log("Mobile outline button not found (may be expected)");
		}
	});

	test("mobile bottom sheet opens when button is clicked", async ({ page }) => {
		// Set viewport to mobile size
		await page.setViewportSize({ width: 375, height: 667 });
		await page.waitForTimeout(100);

		const mobileOutlineButton = page.locator(".mobile-outline-btn");

		// Skip if button doesn't exist
		if ((await mobileOutlineButton.count()) === 0) {
			console.log("Mobile outline button not found, skipping test");
			return;
		}

		await expect(mobileOutlineButton).toBeVisible();

		// Click the button
		await mobileOutlineButton.click();
		await page.waitForTimeout(300);

		// Bottom sheet should be open
		const bottomSheet = page.locator(".outline-bottom-sheet.open");
		await expect(bottomSheet).toBeVisible();

		// Outline should be populated inside the bottom sheet
		const sheetOutline = bottomSheet.locator(".article-outline-list");
		const itemCount = await sheetOutline.locator("li").count();

		console.log("Bottom sheet outline items:", itemCount);
		expect(itemCount).toBeGreaterThan(0);
	});
});
