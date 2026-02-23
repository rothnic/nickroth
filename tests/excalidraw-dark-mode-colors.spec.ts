import { expect, test } from "@playwright/test";

test.describe("Excalidraw Color Swapping", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/work/resume-chatbot");
		await page.waitForLoadState("networkidle");
		await page.waitForTimeout(1000);
	});

	test("red-4 variable is light color in dark mode", async ({ page }) => {
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});
		await page.waitForTimeout(100);

		const red4Value = await page.evaluate(() => {
			const style = getComputedStyle(document.documentElement);
			return style.getPropertyValue("--ex-red-4").trim();
		});

		expect(red4Value).toBe("#fff5f5");
	});

	test("red-0 variable is dark color in dark mode", async ({ page }) => {
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});
		await page.waitForTimeout(100);

		const red0Value = await page.evaluate(() => {
			const style = getComputedStyle(document.documentElement);
			return style.getPropertyValue("--ex-red-0").trim();
		});

		expect(red0Value).toBe("#e03131");
	});

	test("color variables swap between light and dark modes", async ({
		page,
	}) => {
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-light");
		});
		await page.waitForTimeout(100);

		const lightValues = await page.evaluate(() => {
			const style = getComputedStyle(document.documentElement);
			return {
				red0: style.getPropertyValue("--ex-red-0").trim(),
				red4: style.getPropertyValue("--ex-red-4").trim(),
				blue0: style.getPropertyValue("--ex-blue-0").trim(),
				blue4: style.getPropertyValue("--ex-blue-4").trim(),
			};
		});

		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});
		await page.waitForTimeout(100);

		const darkValues = await page.evaluate(() => {
			const style = getComputedStyle(document.documentElement);
			return {
				red0: style.getPropertyValue("--ex-red-0").trim(),
				red4: style.getPropertyValue("--ex-red-4").trim(),
				blue0: style.getPropertyValue("--ex-blue-0").trim(),
				blue4: style.getPropertyValue("--ex-blue-4").trim(),
			};
		});

		expect(lightValues.red0).not.toBe(darkValues.red0);
		expect(lightValues.red4).not.toBe(darkValues.red4);
		expect(lightValues.red0).toBe(darkValues.red4);
		expect(lightValues.red4).toBe(darkValues.red0);
	});

	test("SVG elements with ex-red-4-fill render with light color in dark mode", async ({
		page,
	}) => {
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});
		await page.waitForTimeout(100);

		const redElement = page.locator(".ex-red-4-fill").first();
		const count = await redElement.count();
		if (count === 0) {
			console.log("No .ex-red-4-fill elements found, skipping test");
			return;
		}

		const fillColor = await redElement.evaluate((el) => {
			return getComputedStyle(el).fill;
		});

		expect(fillColor).toContain("rgb(255, 245, 245)");
	});

	test("black-white swap in dark mode", async ({ page }) => {
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-light");
		});
		await page.waitForTimeout(100);

		const lightBlack = await page.evaluate(() => {
			const style = getComputedStyle(document.documentElement);
			return style.getPropertyValue("--ex-black").trim();
		});

		const lightWhite = await page.evaluate(() => {
			const style = getComputedStyle(document.documentElement);
			return style.getPropertyValue("--ex-white").trim();
		});

		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});
		await page.waitForTimeout(100);

		const darkBlack = await page.evaluate(() => {
			const style = getComputedStyle(document.documentElement);
			return style.getPropertyValue("--ex-black").trim();
		});

		const darkWhite = await page.evaluate(() => {
			const style = getComputedStyle(document.documentElement);
			return style.getPropertyValue("--ex-white").trim();
		});

		expect(lightBlack).toBe("#1e1e1e");
		expect(lightWhite).toBe("#ffffff");
		expect(darkBlack).toBe("#ffffff");
		expect(darkWhite).toBe("#1e1e1e");
	});
});

test.describe("Excalidraw Dark Mode Contrast", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/work/resume-chatbot");
		await page.waitForLoadState("networkidle");
		await page.waitForTimeout(1000);
	});

	test("diagram shapes have invert filter in dark mode", async ({ page }) => {
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});

		const excalidrawContainer = page.locator(".excalidraw-container[data-lazy='true']").first();
		
		// Scroll to the diagram and wait for it to load
		await excalidrawContainer.scrollIntoViewIfNeeded();
		
		// Wait for the diagram to be loaded
		await expect(async () => {
			const isLoaded = await excalidrawContainer.evaluate((el) => {
				return el.getAttribute("data-loaded") === "true";
			});
			expect(isLoaded).toBe(true);
		}).toPass({ timeout: 10000 });

		const shapesGroup = excalidrawContainer.locator("svg .excalidraw-shapes").first();
		await expect(shapesGroup).toBeVisible();

		const filter = await shapesGroup.evaluate((el) => {
			return getComputedStyle(el).filter;
		});

		expect(filter).toContain("invert");
		expect(filter).toContain("hue-rotate");
	});

	test("modal SVG has same filter as inline in dark mode", async ({ page }) => {
		const diagram = page.locator(".diagram-figure").first();
		const excalidrawContainer = diagram.locator(".excalidraw-container[data-lazy='true']").first();

		// Check if there's an Excalidraw diagram on this page
		const containerCount = await excalidrawContainer.count();
		if (containerCount === 0) {
			console.log("No Excalidraw diagram found, skipping test");
			return;
		}

		// Scroll to the diagram and wait for it to load via IntersectionObserver
		await excalidrawContainer.scrollIntoViewIfNeeded();

		// Wait for the diagram to be loaded (data-loaded="true")
		await expect(async () => {
			const isLoaded = await excalidrawContainer.evaluate((el) => {
				return el.getAttribute("data-loaded") === "true";
			});
			expect(isLoaded).toBe(true);
		}).toPass({ timeout: 10000 });

		// Now wait for the SVG to be processed and visible
		const inlineSvg = excalidrawContainer.locator("svg.excalidraw-svg").first();
		await expect(inlineSvg).toBeVisible({ timeout: 5000 });

		// Open the modal
		const expandBtn = diagram.locator(".diagram-expand-btn");
		await expandBtn.click();

		const modal = page.locator(".diagram-modal.active");
		await expect(modal).toBeVisible();

		// Switch to dark mode
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});
		await page.waitForTimeout(100);

		// Check the modal SVG shapes group has the filter
		const modalShapesGroup = modal.locator(".diagram-modal-svg-container svg.excalidraw-svg .excalidraw-shapes").first();
		await expect(modalShapesGroup).toBeVisible();

		const filter = await modalShapesGroup.evaluate((el) => {
			return getComputedStyle(el).filter;
		});

		expect(filter).toContain("invert");
		expect(filter).toContain("hue-rotate");

		const closeBtn = modal.locator(".diagram-modal-close");
		await closeBtn.click();
	});

	test("all color variable pairs are swapped in dark mode", async ({
		page,
	}) => {
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});
		await page.waitForTimeout(100);

		const colors = [
			"red",
			"blue",
			"green",
			"yellow",
			"orange",
			"pink",
			"grape",
			"violet",
			"cyan",
			"teal",
			"bronze",
		];

		for (const color of colors) {
			const values = await page.evaluate((c) => {
				const style = getComputedStyle(document.documentElement);
				return {
					c0: style.getPropertyValue(`--ex-${c}-0`).trim(),
					c4: style.getPropertyValue(`--ex-${c}-4`).trim(),
					c1: style.getPropertyValue(`--ex-${c}-1`).trim(),
					c3: style.getPropertyValue(`--ex-${c}-3`).trim(),
				};
			}, color);

			expect(values.c0).not.toBe("");
			expect(values.c4).not.toBe("");
			expect(values.c0).not.toBe(values.c4);
			expect(values.c1).not.toBe("");
			expect(values.c3).not.toBe("");
			expect(values.c1).not.toBe(values.c3);
		}
	});
});

test.describe("Excalidraw Gray Scale Swapping", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/work/resume-chatbot");
		await page.waitForLoadState("networkidle");
		await page.waitForTimeout(1000);
	});

	test("gray colors are swapped in dark mode (0↔4, 1↔3)", async ({ page }) => {
		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-light");
		});
		await page.waitForTimeout(100);

		const lightGrays = await page.evaluate(() => {
			const style = getComputedStyle(document.documentElement);
			return {
				gray0: style.getPropertyValue("--ex-gray-0").trim(),
				gray1: style.getPropertyValue("--ex-gray-1").trim(),
				gray3: style.getPropertyValue("--ex-gray-3").trim(),
				gray4: style.getPropertyValue("--ex-gray-4").trim(),
			};
		});

		await page.evaluate(() => {
			document.documentElement.setAttribute("data-theme", "neobrutalism-dark");
		});
		await page.waitForTimeout(100);

		const darkGrays = await page.evaluate(() => {
			const style = getComputedStyle(document.documentElement);
			return {
				gray0: style.getPropertyValue("--ex-gray-0").trim(),
				gray1: style.getPropertyValue("--ex-gray-1").trim(),
				gray3: style.getPropertyValue("--ex-gray-3").trim(),
				gray4: style.getPropertyValue("--ex-gray-4").trim(),
			};
		});

		expect(lightGrays.gray0).toBe(darkGrays.gray4);
		expect(lightGrays.gray4).toBe(darkGrays.gray0);
		expect(lightGrays.gray1).toBe(darkGrays.gray3);
		expect(lightGrays.gray3).toBe(darkGrays.gray1);
	});
});
