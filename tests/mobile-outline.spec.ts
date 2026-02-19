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
  
  test('clicking different outline items navigates to correct headings', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.mobile);
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Test clicking on "Practical Tips" heading (near bottom of page)
    await scrollPage(page, 400);
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    // Get position of "Practical Tips" heading
    const practicalTipsY = await getElementScrollY(page, '#practical-tips');
    expect(practicalTipsY).not.toBeNull();
    expect(practicalTipsY).toBeGreaterThan(1000); // Should be far down the page
    
    // Click on "Practical Tips" in outline
    const practicalTipsLink = page.locator('.outline-bottom-sheet a[data-outline-link="practical-tips"]');
    await practicalTipsLink.click();
    await page.waitForTimeout(1000);
    
    // Should scroll near the target (within tolerance)
    const scrollAfterPracticalTips = await page.evaluate(() => window.scrollY);
    expect(Math.abs(scrollAfterPracticalTips - practicalTipsY!)).toBeLessThan(100);
    expect(page.url()).toContain('#practical-tips');
    
    // Now test clicking a heading near the top (Google Stitch)
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    const googleStitchY = await getElementScrollY(page, '#google-stitch');
    expect(googleStitchY).not.toBeNull();
    expect(googleStitchY).toBeLessThan(practicalTipsY!); // Should be higher up the page
    
    // Click on "Google Stitch" in outline
    const googleStitchLink = page.locator('.outline-bottom-sheet a[data-outline-link="google-stitch"]');
    await googleStitchLink.click();
    await page.waitForTimeout(1000);
    
    // Should scroll back UP to the target
    const scrollAfterGoogleStitch = await page.evaluate(() => window.scrollY);
    expect(scrollAfterGoogleStitch).toBeLessThan(scrollAfterPracticalTips); // Scrolled back up
    expect(Math.abs(scrollAfterGoogleStitch - googleStitchY!)).toBeLessThan(100);
    expect(page.url()).toContain('#google-stitch');
  });
  
  test('browser back/forward navigation scrolls to correct heading', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.mobile);
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Navigate to "Practical Tips" via outline
    await scrollPage(page, 400);
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    const practicalTipsLink = page.locator('.outline-bottom-sheet a[data-outline-link="practical-tips"]');
    await practicalTipsLink.click();
    await page.waitForTimeout(1000);
    
    const scrollAtPracticalTips = await page.evaluate(() => window.scrollY);
    expect(page.url()).toContain('#practical-tips');
    
    // Navigate to "Google Stitch" via outline
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    const googleStitchLink = page.locator('.outline-bottom-sheet a[data-outline-link="google-stitch"]');
    await googleStitchLink.click();
    await page.waitForTimeout(1000);
    
    const scrollAtGoogleStitch = await page.evaluate(() => window.scrollY);
    expect(page.url()).toContain('#google-stitch');
    expect(scrollAtGoogleStitch).toBeLessThan(scrollAtPracticalTips);
    
    // Use browser BACK button
    await page.goBack();
    await page.waitForTimeout(1000);
    
    // Should scroll back to "Practical Tips"
    const scrollAfterBack = await page.evaluate(() => window.scrollY);
    expect(page.url()).toContain('#practical-tips');
    expect(Math.abs(scrollAfterBack - scrollAtPracticalTips)).toBeLessThan(100);
    
    // Use browser FORWARD button
    await page.goForward();
    await page.waitForTimeout(1000);
    
    // Should scroll forward to "Google Stitch"
    const scrollAfterForward = await page.evaluate(() => window.scrollY);
    expect(page.url()).toContain('#google-stitch');
    expect(Math.abs(scrollAfterForward - scrollAtGoogleStitch)).toBeLessThan(100);
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
  
  test('scrolling to heading starts from current position, not top', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.mobile);
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Scroll to middle of page (around 1500px)
    await scrollPage(page, 1500);
    
    // Record the current scroll position
    const startScrollY = await page.evaluate(() => window.scrollY);
    expect(startScrollY).toBeGreaterThan(1400); // Verify we're at ~1500px
    
    // Open the bottom sheet
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    // Get position of "Google Stitch" heading (should be near top, ~200-500px)
    const googleStitchY = await getElementScrollY(page, '#google-stitch');
    expect(googleStitchY).not.toBeNull();
    expect(googleStitchY).toBeLessThan(1000); // Heading is above our current position
    
    // Track scroll positions during animation
    const scrollPositions: number[] = [];
    
    // Set up interval to capture scroll positions every 50ms
    await page.evaluate(() => {
      (window as any).scrollPositions = [];
      (window as any).scrollTracker = setInterval(() => {
        (window as any).scrollPositions.push(window.scrollY);
      }, 50);
    });
    
    // Click on "Google Stitch" in the outline (should scroll UP from 1500px to ~300px)
    const googleStitchLink = page.locator('.outline-bottom-sheet a[data-outline-link="google-stitch"]');
    await googleStitchLink.click();
    
    // Wait for animation to complete
    await page.waitForTimeout(1200);
    
    // Stop tracking and get positions
    await page.evaluate(() => {
      clearInterval((window as any).scrollTracker);
    });
    
    const trackedPositions = await page.evaluate(() => (window as any).scrollPositions as number[]);
    
    // Final scroll position should be near the target
    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(Math.abs(finalScrollY - googleStitchY!)).toBeLessThan(100);
    
    // CRITICAL CHECK: Verify scroll animation never went to top (0px)
    // If it started from top, we'd see values close to 0
    // Since we're scrolling from ~1500px to ~300px, all values should be in that range
    const minScrollDuringAnimation = Math.min(...trackedPositions.filter(p => p > 0));
    
    // If animation incorrectly starts from top, minScroll would be near 0
    // If animation correctly starts from current position (1500px), minScroll should be > 200px
    console.log('Start position:', startScrollY);
    console.log('Target position:', googleStitchY);
    console.log('Min scroll during animation:', minScrollDuringAnimation);
    console.log('Final position:', finalScrollY);
    console.log('Tracked positions:', trackedPositions.slice(0, 10)); // First 10 samples
    
    // The minimum scroll position during animation should NOT be near 0
    // It should be at least 200px (accounting for scroll direction and slight overshoot)
    expect(minScrollDuringAnimation).toBeGreaterThan(200);
    
    // Additionally, the first tracked position should be close to our start position
    // (not 0, which would indicate a jump to top)
    if (trackedPositions.length > 0) {
      const firstTrackedPosition = trackedPositions[0];
      // First position should be within 200px of our start position (1500px)
      // Not at 0 or very low value
      expect(firstTrackedPosition).toBeGreaterThan(1000);
    }
  });
  
  test('desktop outline navigation does not create duplicate history entries', async ({ page }) => {
    // Use desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Get initial history length
    const initialHistoryLength = await page.evaluate(() => history.length);
    
    // Click an outline link in the desktop sidebar
    await page.locator('.article-outline:not(.outline-in-sheet) [data-outline-link="choosing-the-right-tool"]').click();
    await page.waitForTimeout(800);
    
    // Verify URL changed
    expect(page.url()).toContain('#choosing-the-right-tool');
    
    // Verify history length hasn't changed (replaceState instead of pushState)
    const afterClickHistoryLength = await page.evaluate(() => history.length);
    expect(afterClickHistoryLength).toBe(initialHistoryLength);
    
    // Click another outline link
    await page.locator('.article-outline:not(.outline-in-sheet) [data-outline-link="google-stitch"]').click();
    await page.waitForTimeout(800);
    
    // Verify URL changed again
    expect(page.url()).toContain('#google-stitch');
    
    // History length still shouldn't have changed
    const afterSecondClickHistoryLength = await page.evaluate(() => history.length);
    expect(afterSecondClickHistoryLength).toBe(initialHistoryLength);
    
    // Now test browser back button
    await page.goBack();
    await page.waitForTimeout(500);
    
    // Should go back to the root page (not to #choosing-the-right-tool)
    // Because we used replaceState, not pushState
    expect(page.url()).not.toContain('#');
  });
  
  test('mobile outline navigation does not create duplicate history entries', async ({ page }) => {
    await page.setViewportSize(VIEWPORT_SIZES.mobile);
    await page.goto('/work/ai-assisted-design');
    await waitForPage(page);
    
    // Get initial history length
    const initialHistoryLength = await page.evaluate(() => history.length);
    
    // Scroll and open sheet
    await scrollPage(page, 400);
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    // Click an outline link
    await page.locator('.outline-bottom-sheet [data-outline-link="choosing-the-right-tool"]').click();
    await page.waitForTimeout(1000);
    
    // Verify URL changed
    expect(page.url()).toContain('#choosing-the-right-tool');
    
    // Verify history length hasn't changed (replaceState instead of pushState)
    const afterClickHistoryLength = await page.evaluate(() => history.length);
    expect(afterClickHistoryLength).toBe(initialHistoryLength);
    
    // Scroll again and open sheet
    await scrollPage(page, 600);
    await page.locator('.outline-trigger').click();
    await page.waitForTimeout(500);
    
    // Click another outline link
    await page.locator('.outline-bottom-sheet [data-outline-link="google-stitch"]').click();
    await page.waitForTimeout(1000);
    
    // Verify URL changed again
    expect(page.url()).toContain('#google-stitch');
    
    // History length still shouldn't have changed
    const afterSecondClickHistoryLength = await page.evaluate(() => history.length);
    expect(afterSecondClickHistoryLength).toBe(initialHistoryLength);
    
    // Now test browser back button
    await page.goBack();
    await page.waitForTimeout(500);
    
    // Should go back to the root page (not to #choosing-the-right-tool)
    // Because we used replaceState, not pushState
    expect(page.url()).not.toContain('#');
  });
  
});
