/**
 * Record View Transition Comparison Demo
 * 
 * Creates 2 synced recordings in mobile viewport showing how "PROJECTS"
 * moves down when category titles wrap to two lines.
 * 
 * Run: pnpm exec playwright test tests/record-transition-demo.spec.ts --project=chromium
 */

import { test, chromium } from '@playwright/test';
import { join } from 'path';

const OUTPUT_DIR = join(process.cwd(), '.visual-review', 'recordings');
const BASE_URL = 'http://localhost:4321';

// Mobile viewport to show title wrapping
const MOBILE_VIEWPORT = { width: 390, height: 844 };

// Run serially
test.describe.configure({ mode: 'serial' });
test.setTimeout(90000);

// Fixed timing for synced videos
const PAUSE_AFTER_LOAD = 1500;
const PAUSE_BEFORE_CLICK = 600;
const PAUSE_AFTER_CLICK = 1400;

// Categories: include MARKETING AUTOMATION which wraps on mobile
// This demonstrates PROJECTS moving down when title takes two lines
const FILTERS = [
  'WEB PLATFORMS',           // Two lines on mobile
  'AI APPLICATION',          // One line
  'MARKETING AUTOMATION',    // Two lines - PROJECTS moves down!
  'ALL PROJECTS',            // Back to one line
];

test.describe('Record View Transition Demo', () => {
  
  test('WITH view transitions', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: MOBILE_VIEWPORT,
      recordVideo: {
        dir: OUTPUT_DIR,
        size: MOBILE_VIEWPORT,
      },
    });

    const page = await context.newPage();
    
    // Start at /work (ALL PROJECTS)
    console.log('Loading /work...');
    await page.goto(`${BASE_URL}/work`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(PAUSE_AFTER_LOAD);
    
    // Click through each filter
    for (const filter of FILTERS) {
      console.log(`Clicking: ${filter}`);
      const link = page.locator(`a:has-text("${filter}")`).first();
      await link.scrollIntoViewIfNeeded();
      await page.waitForTimeout(PAUSE_BEFORE_CLICK);
      await link.hover();
      await page.waitForTimeout(400);
      await link.click({ timeout: 5000 });
      await page.waitForTimeout(PAUSE_AFTER_CLICK);
    }

    await context.close();
    await browser.close();
    console.log('📹 WITH view transitions video saved');
  });

  test('WITHOUT view transitions', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: MOBILE_VIEWPORT,
      recordVideo: {
        dir: OUTPUT_DIR,
        size: MOBILE_VIEWPORT,
      },
    });

    const page = await context.newPage();
    
    // URL map for direct navigation
    const urlMap: Record<string, string> = {
      'WEB PLATFORMS': '/work/category/web-platforms',
      'AI APPLICATION': '/work/category/ai-application',
      'MARKETING AUTOMATION': '/work/category/marketing-automation',
      'ALL PROJECTS': '/work',
    };
    
    // Start at /work (ALL PROJECTS)
    console.log('Loading /work...');
    await page.goto(`${BASE_URL}/work`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(PAUSE_AFTER_LOAD);
    
    // Navigate directly to each page (no view transitions)
    for (const filter of FILTERS) {
      console.log(`Loading: ${filter}`);
      const url = urlMap[filter];
      await page.waitForTimeout(PAUSE_BEFORE_CLICK + 400); // Match hover timing
      await page.goto(`${BASE_URL}${url}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(PAUSE_AFTER_CLICK);
    }

    await context.close();
    await browser.close();
    console.log('📹 WITHOUT view transitions video saved');
  });
});
