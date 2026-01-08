/**
 * Record View Transition Comparison Demo
 * 
 * Creates two recordings showing WITH and WITHOUT view transitions.
 * 
 * Run: pnpm exec playwright test tests/record-transition-demo.spec.ts
 * Output: .visual-review/recordings/
 */

import { test } from '@playwright/test';
import { join } from 'path';

const OUTPUT_DIR = join(process.cwd(), '.visual-review', 'recordings');
const BASE_URL = 'http://localhost:4321';

// Set 60 second timeout per test
test.setTimeout(60000);

test.describe('Record View Transition Demo', () => {
  
  test('WITH view transitions', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: OUTPUT_DIR,
        size: { width: 1280, height: 720 },
      },
    });

    const page = await context.newPage();
    
    console.log('Navigating to /work...');
    await page.goto(`${BASE_URL}/work`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1000);

    // Click through a few categories
    const categoryLinks = ['WEB PLATFORMS', 'AUTOMATION & AI', 'ALL PROJECTS'];

    for (const text of categoryLinks) {
      console.log(`Clicking: ${text}`);
      const link = page.locator(`a:has-text("${text}")`).first();
      await link.click({ timeout: 5000 });
      await page.waitForTimeout(800);
    }

    await page.waitForTimeout(500);
    await context.close();
    console.log('📹 WITH view transitions video saved');
  });

  test('WITHOUT view transitions', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: OUTPUT_DIR,
        size: { width: 1280, height: 720 },
      },
    });

    const page = await context.newPage();
    
    // Navigate directly to each URL
    const urls = ['/work', '/work/category/web-platforms', '/work/category/automation-ai', '/work'];

    for (const url of urls) {
      console.log(`Navigating to: ${url}`);
      await page.goto(`${BASE_URL}${url}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await page.waitForTimeout(600);
    }

    await page.waitForTimeout(500);
    await context.close();
    console.log('📹 WITHOUT view transitions video saved');
  });
});
