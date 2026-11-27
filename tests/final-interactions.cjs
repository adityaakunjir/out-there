const {chromium}=require('playwright-core');
const path=require('path');
(async()=>{
  const browser=await chromium.launch({executablePath:path.join(process.env.LOCALAPPDATA,'ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe')});
  const out=path.resolve(__dirname,'../artifacts/visual-validation');
  try {
    for(const [width,height] of [[1440,900],[390,844]]) {
      const page=await browser.newPage({viewport:{width,height}}),errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto('http://localhost:4173/',{waitUntil:'networkidle'});
      await page.locator('.ot-arc .ot-stage').scrollIntoViewIfNeeded();
      const before=await page.locator('.ot-arc .ot-controls span').innerText();
      const box=await page.locator('.ot-arc .ot-stage').boundingBox();
      await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
      await page.mouse.down();await page.mouse.move(box.x+box.width/2-130,box.y+box.height/2,{steps:10});await page.mouse.up();
      await page.waitForTimeout(350);
      const after=await page.locator('.ot-arc .ot-controls span').innerText();
      await page.screenshot({path:path.join(out,`final-drag-${width}.png`)});
      await page.locator('#contact').scrollIntoViewIfNeeded();
      const cta=page.locator('.contact a[href^="mailto:"]').first();
      if(await cta.count()){await cta.hover();await page.screenshot({path:path.join(out,`final-cta-hover-${width}.png`)});}
      if(errors.length)throw Error(`${width}: ${errors.join('; ')}`);
      console.log(JSON.stringify({width,teamBefore:before.trim(),teamAfter:after.trim(),errors}));
      await page.close();
    }
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
