/**
 * Record View Transition Comparison Demo
 * 
 * Creates two recordings:
 * 1. WITH view transitions enabled (normal navigation)
 * 2. WITHOUT view transitions (full page reload simulation)
 * 
 * Run: pnpm exec playwright test tests/record-transition-demo.spec.ts
 * 
 * Output: .visual-review/recordings/
 */

import { test } from '@playwright/test';
import { join } from 'path';

const OUTPUT_DIR = join(process.cwd(), '.visual-review', 'recordings');
const BASE_URL = 'http://localhost:4321';

const CATEGORIES = [
  'WEB PLATFORMS',
  'MARKETING AUTOMATION', 
  'HEADLESS CMS',
  'AUTOMATION & AI',
  'ALL PROJECTS',
];

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
    
    // Add label overlay
    await page.goto(`${BASE_URL}/work`);
    await page.waitForLoadState('networkidle');
    
    // Inject "WITH View Transitions" label
    await page.evaluate(() => {
      const label = document.createElement('div');
      label.id = 'demo-label';
      label.textContent = '✓ WITH View Transitions';
      label.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #a855f7;
        color: white;
        padding: 12px 24px;
        font-weight: bold;
        font-size: 16px;
        z-index: 99999;
        border: 3px solid black;
        box-shadow: 4px 4px 0 black;
        font-family: system-ui;
      `;
      document.body.appendChild(label);
    });
    
    await page.waitForTimeout(1500);

    // Click through categories
    for (const category of CATEGORIES) {
      const button = page.locator(`a:has-text("${category}")`).first();
      await button.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await button.click();
      await page.waitForTimeout(600);
      
      // Re-inject label after navigation (it gets replaced)
      await page.evaluate(() => {
        if (!document.getElementById('demo-label')) {
          const label = document.createElement('div');
          label.id = 'demo-label';
          label.textContent = '✓ WITH View Transitions';
          label.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #a855f7;
            color: white;
            padding: 12px 24px;
            font-weight: bold;
            font-size: 16px;
            z-index: 99999;
            border: 3px solid black;
            box-shadow: 4px 4px 0 black;
            font-family: system-ui;
          `;
          document.body.appendChild(label);
        }
      });
    }

    await page.waitForTimeout(1000);
    await context.close();
    console.log('📹 WITH transitions video saved');
  });

  test('WITHOUT view transitions (simulated)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: {
        dir: OUTPUT_DIR,
        size: { width: 1280, height: 720 },
      },
    });

    const page = await context.newPage();
    
    // Build URL map for categories
    const categoryUrls: Record<string, string> = {
      'WEB PLATFORMS': '/work/category/web-platforms',
      'MARKETING AUTOMATION': '/work/category/marketing-automation',
      'HEADLESS CMS': '/work/category/headless-cms',
      'AUTOMATION & AI': '/work/category/automation-ai',
      'ALL PROJECTS': '/work',
    };
    
    await page.goto(`${BASE_URL}/work`);
    await page.waitForLoadState('networkidle');
    
    // Inject "WITHOUT View Transitions" label
    const injectLabel = async () => {
      await page.evaluate(() => {
        const existing = document.getElementById('demo-label');
        if (existing) existing.remove();
        
        const label = document.createElement('div');
        label.id = 'demo-label';
        label.textContent = '✗ WITHOUT View Transitions';
        label.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #ef4444;
          color: white;
          padding: 12px 24px;
          font-weight: bold;
          font-size: 16px;
          z-index: 99999;
          border: 3px solid black;
          box-shadow: 4px 4px 0 black;
          font-family: system-ui;
        `;
        document.body.appendChild(label);
      });
    };
    
    await injectLabel();
    await page.waitForTimeout(1500);

    // Navigate using full page loads (bypassing view transitions)
    for (const category of CATEGORIES) {
      const url = categoryUrls[category];
      
      // Force full navigation by going to URL directly
      await page.goto(`${BASE_URL}${url}`, { waitUntil: 'networkidle' });
      await injectLabel();
      await page.waitForTimeout(600);
    }

    await page.waitForTimeout(1000);
    await context.close();
    console.log('📹 WITHOUT transitions video saved');
  });
});
