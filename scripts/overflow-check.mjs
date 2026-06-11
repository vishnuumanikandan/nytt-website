/* Checks every public page at mobile width for horizontal overflow. */
import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3456";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const routes = ["/", "/about", "/mission", "/team", "/chapters", "/events",
  "/blog", "/formats", "/featured-project", "/register", "/login", "/admin-login"];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
let bad = 0;

for (const width of [360, 390, 768, 1024]) {
  await page.setViewport({ width, height: 900 });
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0" });
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      if (docWidth <= window.innerWidth) return null;
      const offenders = [...document.querySelectorAll("*")]
        .filter((el) => el.scrollWidth > window.innerWidth + 1 && !el.closest(".marquee-track"))
        .filter((el) => !el.classList.contains("marquee-track"))
        .slice(0, 3)
        .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join(".")}`);
      return { docWidth, offenders };
    });
    if (overflow) {
      bad++;
      console.log(`OVERFLOW ${width}px ${route}: doc=${overflow.docWidth} ${overflow.offenders.join(" | ")}`);
    }
  }
}
await browser.close();
console.log(bad === 0 ? "NO HORIZONTAL OVERFLOW on any page at 360/390/768/1024" : `${bad} overflow(s)`);
