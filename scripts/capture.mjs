import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});

await mkdir(".impeccable/review", { recursive: true });

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000, path: "/" },
  { name: "mobile", width: 390, height: 844, path: "/" },
  { name: "watch-desktop", width: 1440, height: 1000, path: "/izle/8878" },
  { name: "season-mobile", width: 390, height: 844, path: "/sezonlar/1" },
]) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:3100${viewport.path}`, { waitUntil: "networkidle" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * .8) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `.impeccable/review/${viewport.name}.png`, fullPage: true });
  await page.close();
}

await browser.close();
