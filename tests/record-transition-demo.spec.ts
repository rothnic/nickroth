/**
 * Record View Transition Demo
 * 
 * Captures a video of filter navigation to demonstrate view transitions.
 * Run: pnpm exec playwright test scripts/record-transition-demo.spec.ts
 * 
 * Output: .visual-review/recordings/filter-transitions.webm
 */

import { test } from '@playwright/test';
import { join } from 'path';

const OUTPUT_DIR = join(process.cwd(), '.visual-review', 'recordings');

test.describe('Record View Transition Demo', () => {
  test('filter navigation demo', async ({ browser }) => {
    // Standard viewport for consistent recording
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: OUTPUT_DIR,
        size: { width: 1280, height: 720 },
      },
    });

    const page = await context.newPage();

    // Navigate to work page
    await page.goto('http://localhost:4322/work');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Click through categories with pauses to show animations
    const categories = [
      'WEB PLATFORMS',
      'MARKETING AUTOMATION', 
      'HEADLESS CMS',
      'AUTOMATION & AI',
      'ALL PROJECTS',
    ];

    for (const category of categories) {
      // Find and click the filter button
      const button = page.locator(`a:has-text("${category}")`).first();
      await button.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300); // Let scroll settle
      await button.click();
      
      // Wait for transition to complete
      await page.waitForTimeout(800);
    }

    // Final pause
    await page.waitForTimeout(1000);

    // Close to save the video
    await context.close();

    console.log(`\n📹 Video saved to: ${OUTPUT_DIR}`);
    console.log('\nTo convert to GIF, run:');
    console.log('ffmpeg -i filter-transitions.webm -vf "fps=15,scale=640:-1:flags=lanczos" -loop 0 filter-transitions.gif');
  });
});
