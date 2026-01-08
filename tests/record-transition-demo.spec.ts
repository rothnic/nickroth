/**
 * Record View Transition Demo - Synchronized Timing
 * 
 * Both recordings use the same timeline of fixed timestamps
 * to ensure identical duration for side-by-side comparison.
 */

import { test, chromium, type Page } from '@playwright/test';
import { join } from 'path';

const OUTPUT_DIR = join(process.cwd(), '.visual-review', 'recordings');
const BASE_URL = 'http://localhost:4321';

const VIEWPORT = { width: 390, height: 844 };

test.describe.configure({ mode: 'serial' });
test.setTimeout(120000);

// Timeline timestamps (ms from start)
// Each action happens at these fixed times in both recordings
const TIMELINE = {
  START: 0,
  SHOW_INTRO: 500,
  NAV_BACKGROUND_LABEL: 3000,
  NAV_BACKGROUND_ACTION: 5500,
  NAV_WORK_LABEL: 9000,
  NAV_WORK_ACTION: 11500,
  WORK_PAGE_LABEL: 15000,
  AI_FILTER_LABEL: 18000,
  AI_FILTER_ACTION: 20500,
  MARKETING_LABEL: 24000,
  MARKETING_ACTION: 27500,
  MARKETING_RESULT: 30000,
  ALL_PROJECTS_LABEL: 33000,
  ALL_PROJECTS_ACTION: 35500,
  FINAL_LABEL: 39000,
  END: 42000,
};

// Wait until specific timestamp from startTime
async function waitUntil(startTime: number, targetTime: number) {
  const elapsed = Date.now() - startTime;
  const remaining = targetTime - elapsed;
  if (remaining > 0) {
    await new Promise(resolve => setTimeout(resolve, remaining));
  }
}

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
  await page.mouse.move(195, 400);
}

// Show two-line label
async function showLabel(page: Page, title: string, description: string) {
  await page.evaluate(({ title, description }) => {
    document.getElementById('demo-label')?.remove();
    
    const label = document.createElement('div');
    label.id = 'demo-label';
    label.innerHTML = `
      <div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">${title}</div>
      <div style="font-size: 12px; font-weight: 400; opacity: 0.9;">${description}</div>
    `;
    label.style.cssText = `
      position: fixed;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.95);
      color: white;
      padding: 12px 20px;
      font-family: system-ui, sans-serif;
      border-radius: 8px;
      z-index: 99999999;
      text-align: center;
      max-width: 360px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    `;
    document.body.appendChild(label);
  }, { title, description });
}

/**
 * Animate cursor smoothly from current position to target.
 * Uses explicit step-by-step movement with delays for visibility.
 */
async function animateCursorTo(page: Page, targetX: number, targetY: number) {
  // Get current cursor position via page evaluation
  const currentPos = await page.evaluate(() => {
    const cursor = document.getElementById('demo-cursor');
    if (!cursor) return { x: 195, y: 400 };
    const transform = cursor.style.transform;
    const match = transform.match(/translate\((\d+(?:\.\d+)?)px,\s*(\d+(?:\.\d+)?)px\)/);
    if (match) {
      return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
    }
    return { x: 195, y: 400 };
  });
  
  const startX = currentPos.x;
  const startY = currentPos.y;
  const steps = 40; // More steps for smoother animation
  const stepDelay = 12; // ms between each step
  
  for (let i = 1; i <= steps; i++) {
    const progress = i / steps;
    // Ease out for natural deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    const x = startX + (targetX - startX) * eased;
    const y = startY + (targetY - startY) * eased;
    
    await page.mouse.move(x, y);
    if (i < steps) {
      await page.waitForTimeout(stepDelay);
    }
  }
  
  // Final pause at destination
  await page.waitForTimeout(200);
}

/**
 * Click an element with visible cursor animation
 */
async function clickElement(page: Page, locator: ReturnType<Page['locator']>) {
  const box = await locator.boundingBox();
  if (box) {
    const targetX = box.x + box.width / 2;
    const targetY = box.y + box.height / 2;
    
    await animateCursorTo(page, targetX, targetY);
    await page.mouse.click(targetX, targetY);
    await page.waitForTimeout(200);
  }
}

// Scroll filter bar visibly with cursor drag
async function scrollFilterTo(page: Page, targetSelector: string) {
  const nav = page.locator('#work-category-nav');
  const navBox = await nav.boundingBox();
  const target = page.locator(targetSelector);
  
  if (navBox) {
    // Animate cursor to filter bar
    const startX = navBox.x + navBox.width * 0.7;
    const startY = navBox.y + navBox.height / 2;
    await animateCursorTo(page, startX, startY);
    
    // Drag to scroll with visible animation
    await page.mouse.down();
    
    // Animate the drag
    const endX = startX - 150;
    const dragSteps = 20;
    for (let i = 1; i <= dragSteps; i++) {
      const x = startX + (endX - startX) * (i / dragSteps);
      await page.mouse.move(x, startY);
      await page.waitForTimeout(15);
    }
    
    await page.mouse.up();
    await page.waitForTimeout(200);
  }
  
  // Ensure target is visible
  await target.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
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
    const startTime = Date.now();
    
    // Load home
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 10000 });
    await injectCursor(page);
    
    // INTRO
    await waitUntil(startTime, TIMELINE.SHOW_INTRO);
    await showLabel(page, '🏠 With View Transitions', 'Smooth navigation experience');
    
    // NAV TO BACKGROUND
    await waitUntil(startTime, TIMELINE.NAV_BACKGROUND_LABEL);
    await showLabel(page, 'Navigate: Home → Background', 'Watch title fade transition');
    
    await waitUntil(startTime, TIMELINE.NAV_BACKGROUND_ACTION);
    await clickElement(page, page.locator('[aria-label="Open navigation menu"]'));
    await page.waitForTimeout(300);
    await clickElement(page, page.locator('.dropdown-content a[href="/background"]'));
    await injectCursor(page);
    
    // NAV TO WORK
    await waitUntil(startTime, TIMELINE.NAV_WORK_LABEL);
    await showLabel(page, 'Navigate: Background → Work', 'Filter bar smoothly appears');
    
    await waitUntil(startTime, TIMELINE.NAV_WORK_ACTION);
    await clickElement(page, page.locator('[aria-label="Open navigation menu"]'));
    await page.waitForTimeout(300);
    await clickElement(page, page.locator('.dropdown-content a[href="/work"]'));
    await injectCursor(page);
    
    // WORK PAGE
    await waitUntil(startTime, TIMELINE.WORK_PAGE_LABEL);
    await showLabel(page, '💼 Work Page', 'Filter bar uses transition:persist');
    
    // AI FILTER
    await waitUntil(startTime, TIMELINE.AI_FILTER_LABEL);
    await showLabel(page, 'Click: AI APPLICATION', 'Filter bar stays stable');
    
    await waitUntil(startTime, TIMELINE.AI_FILTER_ACTION);
    await clickElement(page, page.locator('#work-category-nav a[href="/work/category/ai-application"]'));
    await injectCursor(page);
    
    // MARKETING
    await waitUntil(startTime, TIMELINE.MARKETING_LABEL);
    await showLabel(page, 'Click: MARKETING AUTOMATION', '"PROJECTS" will animate DOWN');
    
    await waitUntil(startTime, TIMELINE.MARKETING_ACTION);
    await scrollFilterTo(page, '#work-category-nav a[href="/work/category/marketing-automation"]');
    await clickElement(page, page.locator('#work-category-nav a[href="/work/category/marketing-automation"]'));
    await injectCursor(page);
    
    await waitUntil(startTime, TIMELINE.MARKETING_RESULT);
    await showLabel(page, '✨ Text Morphing', '"PROJECTS" smoothly moved down!');
    
    // ALL PROJECTS
    await waitUntil(startTime, TIMELINE.ALL_PROJECTS_LABEL);
    await showLabel(page, 'Click: ALL PROJECTS', 'Watch "PROJECTS" animate UP');
    
    await waitUntil(startTime, TIMELINE.ALL_PROJECTS_ACTION);
    await scrollFilterTo(page, '#work-category-nav a:has-text("ALL PROJECTS")');
    await clickElement(page, page.locator('#work-category-nav a:has-text("ALL PROJECTS")'));
    await injectCursor(page);
    
    // FINAL
    await waitUntil(startTime, TIMELINE.FINAL_LABEL);
    await showLabel(page, '✓ MPA + SPA Experience', 'Smooth transitions, no reloads');
    
    await waitUntil(startTime, TIMELINE.END);
    await context.close();
    await browser.close();
    console.log('📹 WITH transitions saved');
  });

  test('WITHOUT view transitions', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: VIEWPORT,
      hasTouch: true,
      recordVideo: { dir: OUTPUT_DIR, size: VIEWPORT },
    });
    const page = await context.newPage();
    const startTime = Date.now();
    
    // Load home
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 10000 });
    await injectCursor(page);
    
    // INTRO
    await waitUntil(startTime, TIMELINE.SHOW_INTRO);
    await showLabel(page, '🏠 Without View Transitions', 'Full page reloads');
    
    // NAV TO BACKGROUND
    await waitUntil(startTime, TIMELINE.NAV_BACKGROUND_LABEL);
    await showLabel(page, 'Navigate: Home → Background', 'Jarring flash on reload');
    
    await waitUntil(startTime, TIMELINE.NAV_BACKGROUND_ACTION);
    await page.goto(`${BASE_URL}/background`, { waitUntil: 'networkidle' });
    await injectCursor(page);
    
    // NAV TO WORK  
    await waitUntil(startTime, TIMELINE.NAV_WORK_LABEL);
    await showLabel(page, 'Navigate: Background → Work', 'Full page reload');
    
    await waitUntil(startTime, TIMELINE.NAV_WORK_ACTION);
    await page.goto(`${BASE_URL}/work`, { waitUntil: 'networkidle' });
    await injectCursor(page);
    
    // WORK PAGE
    await waitUntil(startTime, TIMELINE.WORK_PAGE_LABEL);
    await showLabel(page, '💼 Work Page', 'Filter bar reloads completely');
    
    // AI FILTER
    await waitUntil(startTime, TIMELINE.AI_FILTER_LABEL);
    await showLabel(page, 'Click: AI APPLICATION', 'Filter bar reloads');
    
    await waitUntil(startTime, TIMELINE.AI_FILTER_ACTION);
    await page.goto(`${BASE_URL}/work/category/ai-application`, { waitUntil: 'networkidle' });
    await injectCursor(page);
    
    // MARKETING
    await waitUntil(startTime, TIMELINE.MARKETING_LABEL);
    await showLabel(page, 'Click: MARKETING AUTOMATION', 'No animation — just jumps');
    
    await waitUntil(startTime, TIMELINE.MARKETING_ACTION);
    await page.goto(`${BASE_URL}/work/category/marketing-automation`, { waitUntil: 'networkidle' });
    await injectCursor(page);
    
    await waitUntil(startTime, TIMELINE.MARKETING_RESULT);
    await showLabel(page, '✗ No Text Morphing', 'Layout just jumps instantly');
    
    // ALL PROJECTS
    await waitUntil(startTime, TIMELINE.ALL_PROJECTS_LABEL);
    await showLabel(page, 'Navigate: ALL PROJECTS', 'Another flash');
    
    await waitUntil(startTime, TIMELINE.ALL_PROJECTS_ACTION);
    await page.goto(`${BASE_URL}/work`, { waitUntil: 'networkidle' });
    await injectCursor(page);
    
    // FINAL
    await waitUntil(startTime, TIMELINE.FINAL_LABEL);
    await showLabel(page, '✗ Traditional MPA', 'Jarring experience');
    
    await waitUntil(startTime, TIMELINE.END);
    await context.close();
    await browser.close();
    console.log('📹 WITHOUT transitions saved');
  });
});
