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

// Get the SVG HTML
const svgHtml = await page.evaluate(() => {
  const svg = document.querySelector('.excalidraw-container svg.excalidraw-svg');
  return svg ? svg.outerHTML.substring(0, 5000) : 'SVG not found';
});

console.log('SVG HTML (first 5000 chars):');
console.log(svgHtml);

// Check for paths with strokes
const strokeInfo = await page.evaluate(() => {
  const paths = document.querySelectorAll('.excalidraw-container svg.excalidraw-svg path');
  const info = [];
  paths.forEach((p, i) => {
    if (i < 10) {
      info.push({
        index: i,
        class: p.getAttribute('class'),
        stroke: p.getAttribute('stroke'),
        fill: p.getAttribute('fill'),
        parent: p.parentElement?.className || 'none'
      });
    }
  });
  return info;
});

console.log('\nFirst 10 paths:');
console.log(JSON.stringify(strokeInfo, null, 2));

await browser.close();
