import { test, expect, type Page } from '@playwright/test';

/**
 * Mobile Outline Bottom Sheet E2E Tests
 * 
 * Tests the mobile content outline functionality including:
 * - Outline button appears after scroll
 * - Bottom sheet opens with populated outline
 * - Clicking outline items scrolls to headings
 * - Bottom sheet closes after navigation
 */

const VIEWPORT_SIZES = {
  mobile: { width: 375, height: 667 },    // iPhone SE
};

// Helper to wait for page to be ready
async function waitForPage(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
}

// Helper to scroll page
async function scrollPage(page: Page, y: number) {
  await page.evaluate((scrollY) => {
    window.scrollTo(0, scrollY);
  }, y);
  await page.waitForTimeout(300);
}

// Helper to check if element is visible
async function isElementVisible(page: Page, selector: string): Promise<boolean> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return rect.height > 0 && 
           rect.width > 0 && 
           style.opacity !== '0' && 
           style.visibility !== 'hidden' &&
           style.display !== 'none';
  }, selector);
}

// Helper to get element position
async function getElementScrollY(page: Page, selector: string): Promise<number | null> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    return el.getBoundingClientRect().top + window.scrollY;
  }, selector);
}

test.describe('Mobile Outline Bottom Sheet', () => {
  
  test('outline button appears after scrolling past 300px', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.mobile);
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Button should not be visible initially
    const initialVisible = await isElementVisible(page, '.outline-trigger');
    expect(initialVisible).toBe(false);
    
    // Scroll past 300px
    await scrollPage(page, 400);
    
    // Button should now be visible
    const afterScrollVisible = await isElementVisible(page, '.outline-trigger');
    expect(afterScrollVisible).toBe(true);
  });
  
  test('bottom sheet opens with populated outline', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.mobile);
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Scroll to make button visible
    await scrollPage(page, 400);
    
    // Click the Contents button
    const trigger = page.locator('.outline-trigger');
    await trigger.click();
    await page.waitForTimeout(500);
    
    // Bottom sheet should be open
    const sheetOpen = await page.evaluate(() => {
      const container = document.querySelector('.outline-bottom-sheet-container');
      return container?.classList.contains('open');
    });
    expect(sheetOpen).toBe(true);
    
    // Outline should be populated (not showing "Loading outline...")
    const outlineLinks = await page.locator('.outline-bottom-sheet [data-outline-link]').count();
    expect(outlineLinks).toBeGreaterThan(0);
    
    // Check that at least one expected heading is present
    const hasHeading = await page.locator('.outline-bottom-sheet a', { hasText: 'Google Stitch' }).count();
    expect(hasHeading).toBeGreaterThan(0);
  });
  
  test('clicking outline item scrolls to heading and closes sheet', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.mobile);
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    // Scroll to make button visible
    await scrollPage(page, 400);
    
    // Open the bottom sheet
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    // Find the target heading position before clicking
    const targetHeadingY = await getElementScrollY(page, '#google-stitch');
    expect(targetHeadingY).not.toBeNull();
    
    // Click on "Google Stitch" in the outline
    const outlineLink = page.locator('.outline-bottom-sheet a[data-outline-link="google-stitch"]');
    await outlineLink.click();
    
    // Wait for animation (sheet closing + scroll)
    await page.waitForTimeout(1000);
    
    // Bottom sheet should be closed
    const sheetClosed = await page.evaluate(() => {
      const container = document.querySelector('.outline-bottom-sheet-container');
      return !container?.classList.contains('open');
    });
    expect(sheetClosed).toBe(true);
    
    // Page should have scrolled to the heading (within tolerance)
    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(finalScrollY).toBeGreaterThan(initialScrollY);
    
    // Should be close to the target heading position
    const tolerance = 100; // Allow 100px tolerance for header offset, etc.
    expect(Math.abs(finalScrollY - targetHeadingY!)).toBeLessThan(tolerance);
    
    // URL hash should be updated
    const url = page.url();
    expect(url).toContain('#google-stitch');
  });
  
  test('bottom sheet can be closed by clicking backdrop', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.mobile);
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Scroll and open sheet
    await scrollPage(page, 400);
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    // Verify sheet is open
    let sheetOpen = await page.evaluate(() => {
      const container = document.querySelector('.outline-bottom-sheet-container');
      return container?.classList.contains('open');
    });
    expect(sheetOpen).toBe(true);
    
    // Click the backdrop
    await page.locator('.outline-backdrop').click();
    await page.waitForTimeout(500);
    
    // Sheet should be closed
    sheetOpen = await page.evaluate(() => {
      const container = document.querySelector('.outline-bottom-sheet-container');
      return container?.classList.contains('open');
    });
    expect(sheetOpen).toBe(false);
  });
  
  test('bottom sheet can be closed with close button', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.mobile);
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Scroll and open sheet
    await scrollPage(page, 400);
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    // Click the close button
    await page.locator('.outline-close').click();
    await page.waitForTimeout(500);
    
    // Sheet should be closed
    const sheetOpen = await page.evaluate(() => {
      const container = document.querySelector('.outline-bottom-sheet-container');
      return container?.classList.contains('open');
    });
    expect(sheetOpen).toBe(false);
  });
  
  test('bottom sheet can be closed with ESC key', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.mobile);
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Scroll and open sheet
    await scrollPage(page, 400);
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    // Press ESC key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    // Sheet should be closed
    const sheetOpen = await page.evaluate(() => {
      const container = document.querySelector('.outline-bottom-sheet-container');
      return container?.classList.contains('open');
    });
    expect(sheetOpen).toBe(false);
  });
  
});
