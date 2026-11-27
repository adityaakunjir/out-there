const { chromium } = require('playwright-core');
const path = require('path');

const executablePath = path.join(process.env.LOCALAPPDATA, 'ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe');
const url = process.env.PORTFOLIO_URL || 'http://localhost:4173/';

(async () => {
  const browser = await chromium.launch({ executablePath });
  const results = [];
  try {
    for (const [width, height] of [[1440, 900], [390, 844]]) {
      const page = await browser.newPage({ viewport: { width, height }, isMobile: width < 800, hasTouch: width < 800 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.locator('.process').scrollIntoViewIfNeeded();
      await page.mouse.wheel(0, 360);
      await page.waitForTimeout(180);
      const forward = await page.evaluate(() => ({
        y: Math.round(scrollY),
        work: document.querySelector('.work-count strong')?.textContent,
        processX: getComputedStyle(document.querySelector('.process-track')).getPropertyValue('--mobile-process-x') || getComputedStyle(document.querySelector('.process-track')).transform
      }));
      await page.mouse.wheel(0, -360);
      await page.waitForTimeout(220);
      const reverse = await page.evaluate(() => ({ y: Math.round(scrollY), overflow: document.documentElement.scrollWidth > innerWidth }));
      results.push({ viewport: `${width}x${height}`, forward, reverse, errors });
      await page.close();
    }
  } finally {
    await browser.close();
  }
  if (results.some(result => result.errors.length || result.reverse.overflow)) throw Error(JSON.stringify(results));
  console.log(JSON.stringify(results));
})().catch(error => { console.error(error); process.exitCode = 1; });
