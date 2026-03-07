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

await page.screenshot({ path: '/Users/nroth/workspace/nickroth/tmp/diagram-dark-2.png' });
console.log('Dark mode screenshot saved');

await browser.close();
