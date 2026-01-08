import { test, expect } from '@playwright/test';

/**
 * WorkCategoryFilter Playwright Tests
 * 
 * Tests the horizontal filter bar behavior across different screen sizes,
 * verifying scroll accessibility and correct positioning after navigation.
 */

const VIEWPORT_SIZES = {
  mobile: { width: 375, height: 812 },    // iPhone 12/13
};

// Helper to wait for filter bar to be ready
async function waitForFilterBar(page: ReturnType<typeof test['_pageType']>) {
  await page.waitForSelector('#work-category-nav', { state: 'attached' });
  // Wait for JS to initialize
  await page.waitForTimeout(300);
}

// Helper to get filter nav scroll info
async function getNavScrollInfo(page: ReturnType<typeof test['_pageType']>) {
  return page.evaluate(() => {
    const nav = document.getElementById('work-category-nav');
    if (!nav) return null;
    
    const activeFilter = nav.querySelector('.btn-accent') as HTMLElement;
    const firstFilter = nav.querySelector('a') as HTMLElement;
    
    return {
      scrollLeft: nav.scrollLeft,
      scrollWidth: nav.scrollWidth,
      clientWidth: nav.clientWidth,
      maxScroll: nav.scrollWidth - nav.clientWidth,
      hasOverflow: nav.scrollWidth > nav.clientWidth,
      activeFilterOffsetLeft: activeFilter?.offsetLeft ?? null,
      firstFilterOffsetLeft: firstFilter?.offsetLeft ?? null,
      activeFilterHref: activeFilter?.getAttribute('href') ?? null,
    };
  });
}

// Helper to check if element is fully visible within container
async function isFilterVisible(page: ReturnType<typeof test['_pageType']>, filterText: string) {
  return page.evaluate((text) => {
    const nav = document.getElementById('work-category-nav');
    if (!nav) return false;
    
    const filter = Array.from(nav.querySelectorAll('a')).find(
      a => a.textContent?.trim() === text
    );
    if (!filter) return false;
    
    const navRect = nav.getBoundingClientRect();
    const filterRect = filter.getBoundingClientRect();
    
    return filterRect.left >= navRect.left && filterRect.right <= navRect.right;
  }, filterText);
}

// Helper to manually scroll the nav
async function scrollNavTo(page: ReturnType<typeof test['_pageType']>, scrollLeft: number) {
  await page.evaluate((left) => {
    const nav = document.getElementById('work-category-nav');
    if (nav) nav.scrollLeft = left;
  }, scrollLeft);
  // Wait for scroll event to fire
  await page.waitForTimeout(100);
}

test.describe('WorkCategoryFilter', () => {
  
  test.describe('Scroll accessibility', () => {
    
    test('all filters should be accessible via scrolling at mobile width', async ({ page }) => {
      await page.setViewportSize(VIEWPORT_SIZES.mobile);
      await page.goto('/work');
      await waitForFilterBar(page);
      
      const info = await getNavScrollInfo(page);
      expect(info).not.toBeNull();
      
      // At mobile width, there should be overflow
      expect(info!.hasOverflow).toBe(true);
      
      // Should start at scroll position 0 (on /work, ALL PROJECTS is active)
      expect(info!.scrollLeft).toBe(0);
      
      // ALL PROJECTS should be visible at start
      const allProjectsVisible = await isFilterVisible(page, 'ALL PROJECTS');
      expect(allProjectsVisible).toBe(true);
      
      // Should be able to scroll to the end
      await scrollNavTo(page, info!.maxScroll);
      const infoAfterScroll = await getNavScrollInfo(page);
      expect(infoAfterScroll!.scrollLeft).toBeCloseTo(info!.maxScroll, 0);
      
      // Should be able to scroll back to start
      await scrollNavTo(page, 0);
      const infoAfterScrollBack = await getNavScrollInfo(page);
      expect(infoAfterScrollBack!.scrollLeft).toBe(0);
    });
    
    test('no justify-center with overflow (prevents left scroll)', async ({ page }) => {
      // This test ensures the CSS bug doesn't return
      await page.setViewportSize(VIEWPORT_SIZES.mobile);
      await page.goto('/work/category/automation-ai');
      await waitForFilterBar(page);
      
      const justifyContent = await page.evaluate(() => {
        const nav = document.getElementById('work-category-nav');
        return nav ? window.getComputedStyle(nav).justifyContent : null;
      });
      
      const info = await getNavScrollInfo(page);
      
      // If there's overflow, justify-content must NOT be center
      if (info?.hasOverflow) {
        expect(justifyContent).not.toBe('center');
      }
    });
  });
  
  test.describe('Navigation and scroll position', () => {
    
    test('clicking a filter should scroll it into view', async ({ page }) => {
      await page.setViewportSize(VIEWPORT_SIZES.mobile);
      await page.goto('/work');
      await waitForFilterBar(page);
      
      // Click on a filter that might be off-screen
      const filterToClick = page.locator('#work-category-nav a', { hasText: 'AUTOMATION & AI' });
      await filterToClick.click();
      
      // Wait for navigation and filter bar to reinitialize
      await page.waitForURL(/automation-ai/);
      await waitForFilterBar(page);
      
      // The clicked filter should now be active
      const info = await getNavScrollInfo(page);
      expect(info!.activeFilterHref).toContain('automation-ai');
      
      // Active filter should be visible in the viewport
      const isActive = await isFilterVisible(page, 'AUTOMATION & AI');
      expect(isActive).toBe(true);
    });
    
    test('active filter should be visible after direct navigation', async ({ page }) => {
      await page.setViewportSize(VIEWPORT_SIZES.mobile);
      await page.goto('/work/category/headless-cms');
      await waitForFilterBar(page);
      
      // Active filter should be visible in the viewport
      const isActive = await isFilterVisible(page, 'HEADLESS CMS');
      expect(isActive).toBe(true);
    });
  });
  
  test.describe('Scroll depth preservation', () => {
    
    test('scroll position should be preserved after clicking work card and using browser back', async ({ page }) => {
      await page.setViewportSize(VIEWPORT_SIZES.mobile);
      await page.goto('/work');
      await waitForFilterBar(page);
      
      // Scroll down to a specific position
      const targetScrollY = 300;
      await page.evaluate((y) => window.scrollTo(0, y), targetScrollY);
      await page.waitForTimeout(100);
      
      // Verify we're scrolled
      const scrollYBefore = await page.evaluate(() => window.scrollY);
      expect(scrollYBefore).toBeGreaterThanOrEqual(targetScrollY - 10);
      
      // Click on a work card
      const workCard = page.locator('[data-work-card] a').first();
      await workCard.click();
      
      // Wait for navigation to detail page
      await page.waitForURL(/\/work\/[^/]+$/);
      await page.waitForTimeout(300);
      
      // Use browser back button
      await page.goBack();
      
      // Wait for navigation back to work listing
      await page.waitForURL('/work');
      await waitForFilterBar(page);
      
      // Check scroll position is preserved (within tolerance)
      const scrollYAfter = await page.evaluate(() => window.scrollY);
      expect(scrollYAfter).toBeGreaterThanOrEqual(targetScrollY - 50);
      expect(scrollYAfter).toBeLessThanOrEqual(targetScrollY + 50);
    });
  });
  
});
