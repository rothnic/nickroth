/**
 * Record View Transition Demo - Mobile
 * 
 * Shows labels BEFORE actions so viewer knows what to watch for.
 * Visible cursor, touch scrolling, hamburger menu.
 */

import { test, chromium, type Page } from '@playwright/test';
import { join } from 'path';

const OUTPUT_DIR = join(process.cwd(), '.visual-review', 'recordings');
const BASE_URL = 'http://localhost:4321';

const VIEWPORT = { width: 390, height: 844 };

test.describe.configure({ mode: 'serial' });
test.setTimeout(90000);

// Inject visible pink cursor
async function injectCursor(page: Page) {
  await page.evaluate(() => {
    document.getElementById('demo-cursor')?.remove();
    
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    cursor.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="#FF1493" stroke="black" stroke-width="2"/>
      </svg>
    `;
    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 99999999;
      transform: translate(195px, 400px);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      const c = document.getElementById('demo-cursor');
      if (c) c.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  });
  // Move cursor to center to trigger the event
  await page.mouse.move(195, 400);
}

// Show label - stays visible until next label or explicit removal
async function showLabel(page: Page, text: string, duration: number = 2000) {
  await page.evaluate(({ text }) => {
    document.getElementById('demo-label')?.remove();
    
    const label = document.createElement('div');
    label.id = 'demo-label';
    label.textContent = text;
    label.style.cssText = `
      position: fixed;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.95);
      color: white;
      padding: 14px 24px;
      font-size: 13px;
      font-weight: 600;
      font-family: system-ui, sans-serif;
      border-radius: 8px;
      z-index: 99999999;
      text-align: center;
      max-width: 95%;
      line-height: 1.4;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    `;
    document.body.appendChild(label);
  }, { text });
  
  await page.waitForTimeout(duration);
  await page.evaluate(() => document.getElementById('demo-label')?.remove());
}

// Move cursor smoothly
async function moveCursor(page: Page, x: number, y: number) {
  await page.mouse.move(x, y, { steps: 25 });
  await page.waitForTimeout(100);
}

// Click element with cursor movement
async function clickElement(page: Page, locator: ReturnType<Page['locator']>) {
  const box = await locator.boundingBox();
  if (box) {
    await moveCursor(page, box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(150);
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(200);
  }
}

// Touch scroll filter nav
async function touchDragScroll(page: Page, scrollAmount: number) {
  const navBox = await page.locator('#work-category-nav').boundingBox();
  if (navBox) {
    const startX = navBox.x + navBox.width * 0.8;
    const startY = navBox.y + navBox.height / 2;
    
    await moveCursor(page, startX, startY);
    await page.waitForTimeout(150);
    
    await page.evaluate(({ scrollAmount }) => {
      const nav = document.getElementById('work-category-nav');
      if (nav) nav.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }, { scrollAmount });
    
    await page.waitForTimeout(400);
  }
}

test.describe('Record View Transition Demo', () => {
  
  test('WITH view transitions', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: VIEWPORT,
      hasTouch: true,
      recordVideo: { dir: OUTPUT_DIR, size: VIEWPORT },
    });

    const page = await context.newPage();
    
    // Home
    console.log('Loading home...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 10000 });
    await injectCursor(page);
    await page.waitForTimeout(500);
    await showLabel(page, '🏠 Home Page — starting demo', 2000);
    
    // Navigate to Background
    console.log('Clicking hamburger...');
    await showLabel(page, '➡️ Click BACKGROUND — watch fade transition', 2000);
    const hamburger = page.locator('[aria-label="Open navigation menu"]');
    await clickElement(page, hamburger);
    await page.waitForTimeout(300);
    const bgLink = page.locator('.dropdown-content a[href="/background"]');
    await clickElement(page, bgLink);
    await injectCursor(page);
    await page.waitForTimeout(600);
    
    // Navigate to Work
    console.log('Clicking hamburger for Work...');
    await showLabel(page, '➡️ Click WORK — filter bar will persist', 2000);
    await clickElement(page, page.locator('[aria-label="Open navigation menu"]'));
    await page.waitForTimeout(300);
    const workLink = page.locator('.dropdown-content a[href="/work"]');
    await clickElement(page, workLink);
    await injectCursor(page);
    await page.waitForTimeout(600);
    await showLabel(page, '💼 Work Page — filter bar uses transition:persist', 2000);
    
    // Click AI APPLICATION
    console.log('Clicking AI APPLICATION...');
    await showLabel(page, '🔍 Clicking filter — bar stays stable!', 2000);
    const aiFilter = page.locator('#work-category-nav a[href="/work/category/ai-application"]');
    await clickElement(page, aiFilter);
    await injectCursor(page);
    await page.waitForTimeout(600);
    
    // MARKETING - the key demo!
    console.log('Scrolling to MARKETING AUTOMATION...');
    await showLabel(page, '➡️ MARKETING wraps to 2 lines — watch "PROJECTS" animate DOWN', 3000);
    
    // Scroll MARKETING into view first
    const marketingFilter = page.locator('#work-category-nav a[href="/work/category/marketing-automation"]');
    await marketingFilter.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    
    // Now click it
    await clickElement(page, marketingFilter);
    await injectCursor(page);
    await page.waitForTimeout(800);
    await showLabel(page, '✨ "PROJECTS" smoothly morphed down!', 2000);
    
    // ALL PROJECTS
    console.log('Clicking ALL PROJECTS...');
    await showLabel(page, '➡️ Now watch "PROJECTS" animate back UP', 2500);
    await touchDragScroll(page, -200);
    const allFilter = page.locator('#work-category-nav a:has-text("ALL PROJECTS")');
    await clickElement(page, allFilter);
    await injectCursor(page);
    await page.waitForTimeout(600);
    await showLabel(page, '✓ MPA with SPA-like transitions!', 2500);
    
    await page.waitForTimeout(500);
    await context.close();
    await browser.close();
    console.log('📹 WITH transitions saved');
  });

  test('WITHOUT view transitions', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: VIEWPORT,
      recordVideo: { dir: OUTPUT_DIR, size: VIEWPORT },
    });

    const page = await context.newPage();
    
    console.log('Recording WITHOUT...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(500);
    await showLabel(page, '🏠 Home — direct navigation (no transitions)', 2000);
    
    await page.goto(`${BASE_URL}/background`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await showLabel(page, '📋 Background — jarring flash on reload', 2000);
    
    await page.goto(`${BASE_URL}/work`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await showLabel(page, '💼 Work — full page reload', 2000);
    
    await page.goto(`${BASE_URL}/work/category/ai-application`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await showLabel(page, '🔍 AI APPLICATION — flash, filter bar reloads', 2000);
    
    await page.goto(`${BASE_URL}/work/category/marketing-automation`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await showLabel(page, '➡️ MARKETING — no smooth animation, just jumps', 2500);
    
    await page.goto(`${BASE_URL}/work`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await showLabel(page, '✗ No smooth transitions — jarring experience', 2500);
    
    await page.waitForTimeout(500);
    await context.close();
    await browser.close();
    console.log('📹 WITHOUT transitions saved');
  });
});
