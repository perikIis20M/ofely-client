const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const {chromium} = require('playwright');

async function main() {
  const {projects} = await import('./data.mjs');
  const output = path.join(__dirname, 'qa-output');
  await fs.mkdir(output, {recursive: true});
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  try {
  const failures = [];
  const report = [];
  const page = await browser.newPage();
  page.on('pageerror', error => failures.push(error.message));
  page.on('response', response => {if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);});
  const routes = ['/', '/projects/', '/team/', '/smps/', ...projects.map(p=>`/${p.slug}/`)];
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({width, height: width > 800 ? 1000 : 844});
    for (const route of routes) {
      const response = await page.goto(`http://127.0.0.1:4178${route}`);
      assert.equal(response.status(), 200, route);
      await page.evaluate(()=>document.fonts.ready);
      await page.evaluate(async()=>{
        for (const image of document.images) image.loading = 'eager';
        await Promise.all([...document.images].map(image=>image.complete ? Promise.resolve() : new Promise(resolve=>{image.onload=resolve;image.onerror=resolve;})));
      });
      const result = await page.evaluate(()=>({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        h1: document.querySelector('h1')?.textContent,
        brokenImages: [...document.images].filter(image=>!image.complete || image.naturalWidth===0).map(image=>image.src),
        clipped: [...document.querySelectorAll('h1,h2,h3,.button,.member-role')].filter(el=>el.scrollWidth>el.clientWidth+2).map(el=>el.textContent),
        brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(el=>!document.getElementById(el.getAttribute('href').slice(1))).map(el=>el.getAttribute('href')),
      }));
      assert.equal(result.overflow, false, `Page overflow: ${width} ${route}`);
      assert.deepEqual(result.brokenImages, [], `Broken images: ${width} ${route}`);
      assert.deepEqual(result.clipped, [], `Clipped text: ${width} ${route}`);
      assert.deepEqual(result.brokenAnchors, [], `Broken section links: ${width} ${route}`);
      assert.ok(result.h1, `Missing main heading: ${route}`);
      report.push({width,route,...result});
      if ((width === 1440 || width === 390) && ['/', '/projects/', '/ofely/', '/bountysmp/', '/rowglide/', '/quitkeybind/', '/op-login/', '/bwhitelist/', '/combat-log-detector/', '/improved-advancements-screen/'].includes(route)) {
        await page.screenshot({path:path.join(output,`${width}-${route==='/'?'home':route.split('/')[1]}.png`),fullPage:true});
      }
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:4178/projects/');
  await page.locator('[data-filter="Mod"]').click();
  assert.equal(await page.locator('.catalog-grid .project-card:visible').count(), 4);
  await page.locator('#project-search').fill('nothing-matches-this');
  assert.equal(await page.locator('.catalog-grid .project-card:visible').count(), 0);
  assert.equal(await page.locator('.empty-state').isVisible(), true);
  await page.locator('#reset-filters').click();
  assert.equal(await page.locator('.catalog-grid .project-card:visible').count(), 11);
  await page.locator('#project-search').fill('bounty');
  assert.equal(await page.locator('.catalog-grid .project-card:visible').count(), 1);
  await page.reload();
  assert.equal(await page.locator('#project-search').inputValue(), 'bounty');
  assert.equal(await page.locator('.catalog-grid .project-card:visible').count(), 1);
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:4178/');
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('#mobile-menu').isVisible(), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#mobile-menu').isVisible(), false);
  const position = await page.locator('.island-main').evaluate(el=>getComputedStyle(el).transform);
  await page.waitForTimeout(500);
  const moved = await page.locator('.island-main').evaluate(el=>getComputedStyle(el).transform);
  assert.notEqual(position,moved,'Island animation must change its position.');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('.island-main').evaluate(el=>getComputedStyle(el).animationName),'none');
  const texts = await Promise.all(routes.map(async route=>{
    const response = await fetch(`http://127.0.0.1:4178${route}`);
    const html = await response.text();
    assert.ok(!html.includes('MANU_mc2015'), `Hidden Minecraft name exposed at ${route}`);
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const target = match[1];
      const head = await fetch(`http://127.0.0.1:4178${target}`,{method:'HEAD'});
      assert.equal(head.status,200,`Broken internal URL ${target} from ${route}`);
    }
    return route;
  }));
  assert.equal(texts.length,routes.length);
  assert.deepEqual(failures,[],'Browser errors or failed resources');
  await fs.writeFile(path.join(output,'report.json'),JSON.stringify({pages:routes.length,viewports:4,checks:report.length,filters:true,navigation:true,animation:true,reducedMotion:true,hiddenUsername:true,internalLinks:true,failures},null,2));
  console.log(`PASS: ${report.length} page/viewport checks; all images, internal links, filters, mobile menu, animation, reduced motion, and hidden username verified.`);
  } finally {
    await browser.close();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
