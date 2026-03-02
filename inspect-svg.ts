import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:4322/work/resume-chatbot');
await page.waitForTimeout(5000);

// Set dark mode
await page.evaluate(() => {
  document.documentElement.setAttribute('data-theme', 'neobrutalism-dark');
});
await page.waitForTimeout(1000);

// Get the SVG HTML
const svgHtml = await page.evaluate(() => {
  const svg = document.querySelector('.excalidraw-container svg');
  return svg ? svg.outerHTML.substring(0, 3000) : 'SVG not found';
});

console.log('SVG HTML (first 3000 chars):');
console.log(svgHtml);

// Check for paths with strokes
const strokeInfo = await page.evaluate(() => {
  const paths = document.querySelectorAll('.excalidraw-container svg path');
  const info = [];
  paths.forEach((p, i) => {
    if (i < 5) {
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

console.log('\nFirst 5 paths:');
console.log(JSON.stringify(strokeInfo, null, 2));

await browser.close();
