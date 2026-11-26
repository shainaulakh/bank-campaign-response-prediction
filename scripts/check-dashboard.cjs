// Run in CI with Playwright Core and the runner's Chrome installation.
const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

async function check() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1120, height: 820 } });
    await page.goto(process.argv[2] || pathToFileURL(path.resolve('dashboard/index.html')).href);
    const data = await page.locator('#data').evaluate(node => JSON.parse(node.textContent));
    const metrics = () => page.locator('#metrics dd').allTextContents();
    const defaults = ['2095 / 6179', '1150', '945', '1226', '54.9%', '48.4%'];
    assert.deepEqual(await metrics(), defaults);
    if (!process.argv[2]) await page.screenshot({path:'dashboard/preview.png', fullPage:true});
    for (const [key, score] of Object.entries(data.lookup)) {
      const [job, previous, outcome] = JSON.parse(key);
      await page.selectOption('#job', job);
      await page.selectOption('#previous', String(previous));
      await page.selectOption('#outcome', outcome);
      assert.equal(await page.locator('#score').textContent(), (100 * score).toFixed(2) + '%');
      assert.equal(await page.locator('#decision').textContent(),
        score >= data.cutoff ? 'Flag for a call' : 'Below the call cutoff');
    }
    const slider = page.locator('#cutoff');
    await slider.focus();
    await slider.press('Home');
    assert.equal((await metrics())[0], '6179 / 6179');
    await slider.press('End');
    assert.equal((await metrics())[0], '0 / 6179');
    await page.click('#reset');
    assert.deepEqual(await metrics(), defaults);
    await page.setViewportSize({width:390,height:844});
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
    console.log('Verified all 84 examples, cutoff extremes, reset and mobile width.');
  } finally { await browser.close(); }
}
check().catch(error => { console.error(error); process.exitCode = 1; });
