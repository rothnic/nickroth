import { test, expect } from '@playwright/test';

/**
 * Tests for scroll position on navigation
 * Ensures fresh navigation to work page scrolls to top
 */

test.describe('Scroll Position on Navigation', () => {
  test('navigating from home to /work via View All Work scrolls to top', async ({ page }) => {
    // Go to home page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll down on home page to simulate user interaction
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100);
    
    // Click "View All Work" button
    const viewAllWork = page.getByRole('link', { name: /view all work/i });
    await expect(viewAllWork).toBeVisible();
    await viewAllWork.click();
    
    // Wait for navigation to complete
    await page.waitForURL('/work');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Allow view transitions to complete
    
    // Check scroll position - should be at or near top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100); // Allow small tolerance for navbar height
  });

  test('navigating from navbar to /work scrolls to top', async ({ page }) => {
    // Go to approach page first
    await page.goto('/approach');
    await page.waitForLoadState('networkidle');
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(100);
    
    // Click Work in navbar
    const navWork = page.locator('.navbar').getByRole('link', { name: /work/i });
    await expect(navWork).toBeVisible();
    await navWork.click();
    
    // Wait for navigation
    await page.waitForURL('/work');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Check scroll position
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('back navigation from work detail restores scroll position', async ({ page }) => {
    // Go to work page
    await page.goto('/work');
    await page.waitForLoadState('networkidle');
    
    // Scroll to a card lower on the page
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(200);
    
    // Click on a work card
    const firstCard = page.locator('[data-work-card]').first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();
    
    // Wait for detail page
    await page.waitForURL(/\/work\/.+/);
    await page.waitForLoadState('networkidle');
    
    // Go back
    await page.goBack();
    await page.waitForURL('/work');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Scroll should be restored near the card (not at top, not at bottom)
    const scrollY = await page.evaluate(() => window.scrollY);
    // Should have some scroll position (restored) but not at very bottom
    expect(scrollY).toBeGreaterThan(50);
  });
});
