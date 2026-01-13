import { test, expect, type Page } from '@playwright/test';

/**
 * Work Card Scroll Preservation Tests
 * 
 * These tests verify that when navigating from work listing to detail and back,
 * the scroll position is preserved ONLY when the card being navigated to is
 * already fully visible in the viewport.
 * 
 * Expected behavior:
 * - If entire work card is visible in viewport → DON'T scroll, preserve exact position
 * - If work card is partially or fully outside viewport → DO scroll to make it visible
 */

const VIEWPORT_SIZES = {
  desktop: { width: 1280, height: 720 },
  mobile: { width: 375, height: 812 },
};

// Helper to wait for page to be ready
async function waitForPageReady(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500); // Allow view transitions to complete
}

// Helper to get scroll position
async function getScrollPosition(page: Page) {
  return page.evaluate(() => ({
    x: window.scrollX,
    y: window.scrollY,
  }));
}

// Helper to check if an element is fully visible in viewport
async function isElementFullyVisible(page: Page, selector: string) {
  return page.evaluate((sel: string) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= viewportHeight &&
      rect.right <= viewportWidth
    );
  }, selector);
}

// Helper to get element position info
async function getElementInfo(page: Page, selector: string) {
  return page.evaluate((sel: string) => {
    const element = document.querySelector(sel);
    if (!element) return null;
    
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      height: rect.height,
      width: rect.width,
      isFullyVisible: rect.top >= 0 && rect.bottom <= window.innerHeight,
    };
  }, selector);
}

test.describe('Work Card Scroll Preservation', () => {
  
  test.describe('Desktop viewport', () => {
    
    test('should preserve exact scroll position when card is fully visible', async ({ page }) => {
      await page.setViewportSize(VIEWPORT_SIZES.desktop);
      await page.goto('/work');
      await waitForPageReady(page);
      
      // Don't scroll at all - stay at top of page
      const initialScroll = await getScrollPosition(page);
      expect(initialScroll.y).toBe(0);
      
      // Find the first work card - it should be fully visible
      const firstCard = '[data-card-id="ai-assisted-design"]';
      const cardInfo = await getElementInfo(page, firstCard);
      expect(cardInfo).not.toBeNull();
      console.log('Card info before navigation:', cardInfo);
      
      // Verify card is fully visible
      const isVisible = await isElementFullyVisible(page, firstCard);
      expect(isVisible).toBe(true);
      
      // Click the card to navigate to detail page
      await page.click(`${firstCard} a`);
      await page.waitForURL(/\/work\/ai-assisted-design$/);
      await waitForPageReady(page);
      
      // Navigate back using browser back
      await page.goBack();
      await page.waitForURL('/work');
      await waitForPageReady(page);
      
      // CRITICAL: Scroll position should be EXACTLY preserved
      // Since the card was already fully visible, there should be NO scrolling
      const finalScroll = await getScrollPosition(page);
      console.log('Scroll position - Initial:', initialScroll.y, 'Final:', finalScroll.y);
      
      // This test should FAIL with current implementation because it scrolls unnecessarily
      expect(finalScroll.y).toBe(initialScroll.y);
      expect(finalScroll.x).toBe(initialScroll.x);
    });
    
    test('should scroll to card when it is not fully visible', async ({ page }) => {
      await page.setViewportSize(VIEWPORT_SIZES.desktop);
      await page.goto('/work');
      await waitForPageReady(page);
      
      // Scroll down so first card is partially out of view
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(100);
      
      const scrollBeforeClick = await getScrollPosition(page);
      expect(scrollBeforeClick.y).toBe(500);
      
      // First card should NOT be fully visible now
      const firstCard = '[data-card-id="ai-assisted-design"]';
      const isVisible = await isElementFullyVisible(page, firstCard);
      expect(isVisible).toBe(false);
      
      // Click the card
      await page.click(`${firstCard} a`);
      await page.waitForURL(/\/work\/ai-assisted-design$/);
      await waitForPageReady(page);
      
      // Navigate back
      await page.goBack();
      await page.waitForURL('/work');
      await waitForPageReady(page);
      
      // Scroll position SHOULD change to make card visible
      const finalScroll = await getScrollPosition(page);
      
      // Should scroll to make card visible (not the same as before)
      expect(finalScroll.y).not.toBe(scrollBeforeClick.y);
      
      // Card should now be fully visible
      const isVisibleAfter = await isElementFullyVisible(page, firstCard);
      expect(isVisibleAfter).toBe(true);
    });
  });
  
  test.describe('Mobile viewport', () => {
    
    test('should preserve exact scroll position when card is fully visible', async ({ page }) => {
      await page.setViewportSize(VIEWPORT_SIZES.mobile);
      await page.goto('/work');
      await waitForPageReady(page);
      
      // Scroll to a position where a card is fully visible
      await page.evaluate(() => window.scrollTo(0, 600));
      await page.waitForTimeout(100);
      
      const initialScroll = await getScrollPosition(page);
      expect(initialScroll.y).toBe(600);
      
      // Find a card that should be fully visible at this scroll position
      // Third card is typically visible around 600px scroll on mobile
      const cardSelector = '[data-card-id="datocms-form-outlet-optimization"]';
      const cardInfo = await getElementInfo(page, cardSelector);
      console.log('Card info at 600px scroll:', cardInfo);
      
      // Verify card is fully visible
      const isVisible = await isElementFullyVisible(page, cardSelector);
      if (!isVisible) {
        // Skip test if card isn't visible at this position (layout may have changed)
        test.skip();
        return;
      }
      
      // Click the card
      await page.click(`${cardSelector} a`);
      await page.waitForURL(/\/work\/datocms-form-outlet-optimization$/);
      await waitForPageReady(page);
      
      // Navigate back
      await page.goBack();
      await page.waitForURL('/work');
      await waitForPageReady(page);
      
      // Scroll position should be EXACTLY preserved
      const finalScroll = await getScrollPosition(page);
      console.log('Scroll position - Initial:', initialScroll.y, 'Final:', finalScroll.y);
      
      // This test should FAIL with current implementation
      expect(finalScroll.y).toBe(initialScroll.y);
      expect(finalScroll.x).toBe(initialScroll.x);
    });
  });
  
  test.describe('Edge cases', () => {
    
    test('should handle card at the very top of page', async ({ page }) => {
      await page.setViewportSize(VIEWPORT_SIZES.desktop);
      await page.goto('/work');
      await waitForPageReady(page);
      
      // First card at top should be fully visible
      const firstCard = '[data-card-id="ai-assisted-design"]';
      const isVisible = await isElementFullyVisible(page, firstCard);
      expect(isVisible).toBe(true);
      
      const initialScroll = await getScrollPosition(page);
      
      // Click and go back
      await page.click(`${firstCard} a`);
      await page.waitForURL(/\/work\/ai-assisted-design$/);
      await waitForPageReady(page);
      
      await page.goBack();
      await page.waitForURL('/work');
      await waitForPageReady(page);
      
      // Should stay at top (scroll position 0)
      const finalScroll = await getScrollPosition(page);
      expect(finalScroll.y).toBe(initialScroll.y);
      expect(finalScroll.y).toBe(0);
    });
    
    test('should scroll when card is partially visible at bottom of viewport', async ({ page }) => {
      await page.setViewportSize(VIEWPORT_SIZES.desktop);
      await page.goto('/work');
      await waitForPageReady(page);
      
      // Scroll to a position where a card is only partially visible at the bottom
      await page.evaluate(() => window.scrollTo(0, 400));
      await page.waitForTimeout(100);
      
      // Find a card that's partially visible at bottom
      const cards = await page.$$('[data-work-card]');
      let partiallyVisibleCard: string | null = null;
      
      for (const card of cards) {
        const cardId = await card.getAttribute('data-card-id');
        if (!cardId) continue;
        
        const info = await getElementInfo(page, `[data-card-id="${cardId}"]`);
        if (info && !info.isFullyVisible && info.top >= 0 && info.bottom > window.innerHeight) {
          partiallyVisibleCard = cardId;
          break;
        }
      }
      
      if (!partiallyVisibleCard) {
        test.skip(); // No partially visible card found
        return;
      }
      
      const scrollBefore = await getScrollPosition(page);
      
      // Click the partially visible card
      await page.click(`[data-card-id="${partiallyVisibleCard}"] a`);
      await page.waitForURL(new RegExp(`/work/${partiallyVisibleCard}$`));
      await waitForPageReady(page);
      
      await page.goBack();
      await page.waitForURL('/work');
      await waitForPageReady(page);
      
      const scrollAfter = await getScrollPosition(page);
      
      // Should scroll to make card fully visible
      expect(scrollAfter.y).not.toBe(scrollBefore.y);
      
      // Card should now be fully visible
      const isVisible = await isElementFullyVisible(page, `[data-card-id="${partiallyVisibleCard}"]`);
      expect(isVisible).toBe(true);
    });
  });
});
