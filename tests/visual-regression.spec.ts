import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests
 * 
 * These tests capture screenshots of key pages and components to detect
 * unintended visual changes. Run with:
 *   pnpm test:visual
 * 
 * To update baselines after intentional changes:
 *   pnpm test:visual:update
 */

const pages = [
  { name: 'home', path: '/' },
  { name: 'work', path: '/work' },
  { name: 'approach', path: '/approach' },
  { name: 'background', path: '/background' },
  { name: 'contact', path: '/contact' },
];

test.describe('Visual Regression - Pages', () => {
  for (const page of pages) {
    test(`${page.name} page should match baseline`, async ({ page: playwright }) => {
      await playwright.goto(page.path);
      
      // Wait for animations to settle
      await playwright.waitForLoadState('networkidle');
      await playwright.waitForTimeout(500); // Allow CSS animations to complete
      
      // Capture full page screenshot
      await expect(playwright).toHaveScreenshot(`${page.name}-full.png`, {
        fullPage: true,
      });
    });
  }
});

test.describe('Visual Regression - Components', () => {
  test('navbar should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const navbar = page.locator('.navbar').first();
    await expect(navbar).toHaveScreenshot('navbar.png');
  });
  
  test('footer should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const footer = page.locator('footer').first();
    await expect(footer).toHaveScreenshot('footer.png');
  });
  
  test('page header should match baseline', async ({ page }) => {
    await page.goto('/work');
    await page.waitForLoadState('networkidle');
    
    // Use more reliable selector
    const header = page.locator('.text-center.mb-16').first();
    await expect(header).toHaveScreenshot('page-header.png');
  });
  
  test('work category filter should match baseline', async ({ page }) => {
    await page.goto('/work');
    await page.waitForLoadState('networkidle');
    
    // Use stable ID and select parent wrapper to capture blur/fade
    const filter = page.locator('div', { has: page.locator('#work-category-nav') }).first();
    await expect(filter).toHaveScreenshot('work-category-filter.png');
  });
});

test.describe('Visual Regression - Work Categories', () => {
  const categories = [
    { name: 'automation-ai', path: '/work/category/automation-ai' },
    { name: 'headless-cms', path: '/work/category/headless-cms' },
  ];
  
  for (const category of categories) {
    test(`${category.name} should match baseline`, async ({ page }) => {
      await page.goto(category.path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot(`category-${category.name}.png`, {
        fullPage: true,
      });
    });
  }
});

// Skip theme toggle test for now - requires more complex setup
test.describe.skip('Visual Regression - Theme', () => {
  test('dark mode should match baseline', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Toggle to dark mode using the label
    await page.locator('label.swap').first().click();
    await page.waitForTimeout(300); // Allow theme transition
    
    await expect(page).toHaveScreenshot('home-dark.png', {
      fullPage: true,
    });
  });
});
