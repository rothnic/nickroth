/**
 * Visual Review System
 * 
 * Captures full-page screenshots of key pages in both light and dark mode
 * for manual review before pushing code. Run with:
 * 
 *   pnpm run visual-review
 * 
 * Screenshots are saved to .visual-review/screenshots/
 * Findings should be tracked in .visual-review/review-log.md
 */

import { test, expect } from '@playwright/test';

// Key pages that contain unique element types
const REVIEW_PAGES = [
  { path: '/', name: 'home', description: 'Homepage with hero and navigation' },
  { path: '/work', name: 'work-listing', description: 'Work listing with filter bar and cards' },
  { path: '/work/view-transitions-filter-bar', name: 'work-article', description: 'Article with prose, code blocks, tables, lists' },
  { path: '/approach', name: 'approach', description: 'Approach page with capabilities' },
  { path: '/background', name: 'background', description: 'Background page with timeline' },
  { path: '/contact', name: 'contact', description: 'Contact page with form' },
];

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 375, height: 812, name: 'mobile' },
];

const THEMES = ['neobrutalism-light', 'neobrutalism-dark'];

test.describe('Visual Review', () => {
  for (const page of REVIEW_PAGES) {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) {
        test(`${page.name} - ${viewport.name} - ${theme}`, async ({ page: browserPage }) => {
          // Set viewport
          await browserPage.setViewportSize({ width: viewport.width, height: viewport.height });
          
          // Navigate to page
          await browserPage.goto(page.path);
          
          // Set theme
          await browserPage.evaluate((themeName) => {
            document.documentElement.setAttribute('data-theme', themeName);
            localStorage.setItem('color-scheme', themeName.includes('dark') ? 'dark' : 'light');
          }, theme);
          
          // Wait for any transitions/animations to settle
          await browserPage.waitForTimeout(500);
          
          // Capture full-page screenshot
          const screenshotName = `${page.name}-${viewport.name}-${theme}.png`;
          await browserPage.screenshot({
            path: `.visual-review/screenshots/${screenshotName}`,
            fullPage: true,
          });
          
          // Log for review
          console.log(`📸 Captured: ${screenshotName}`);
        });
      }
    }
  }
});
