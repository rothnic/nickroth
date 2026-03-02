import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4322/work/resume-chatbot');

// Scroll to diagram to trigger load
const container = await page.locator('.excalidraw-container[data-lazy="true"]').first();
await container.scrollIntoViewIfNeeded();
await page.waitForTimeout(3000);

// Set dark mode
await page.evaluate(() => {
  document.documentElement.setAttribute('data-theme', 'neobrutalism-dark');
});
await page.waitForTimeout(500);

await page.screenshot({ path: '/Users/nroth/workspace/nickroth/tmp/diagram-final.png' });

// Check stroke colors
const strokeInfo = await page.evaluate(() => {
  const paths = document.querySelectorAll('.excalidraw-container svg.excalidraw-svg path');
  const info = [];
  paths.forEach((p, i) => {
    if (i < 10) {
      const computedStroke = getComputedStyle(p).stroke;
      info.push({
        index: i,
        class: p.getAttribute('class'),
        computedStroke: computedStroke.substring(0, 50)
      });
    }
  });
  return info;
});

console.log('First 10 paths with computed strokes:');
console.log(JSON.stringify(strokeInfo, null, 2));

await browser.close();
