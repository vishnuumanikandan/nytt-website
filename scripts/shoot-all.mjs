/* Full-page screenshots of every route in both themes. */
import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3456";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const routes = {
  home: "/", mission: "/mission", about: "/about", team: "/team",
  chapters: "/chapters", events: "/events", blog: "/blog", formats: "/formats",
  featured: "/featured-project", register: "/register", login: "/login",
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();

for (const theme of ["light", "dark"]) {
  await page.setViewport({ width: 1440, height: 1000 });
  for (const [name, route] of Object.entries(routes)) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0" });
    await page.evaluate((t) => {
      document.documentElement.setAttribute("data-theme", t);
      localStorage.setItem("nytt-theme", t);
    }, theme);
    // Scroll through the page (instant, with dwell) so IntersectionObserver
    // reveals fire, then return to top before capturing.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += 600;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 130);
          else {
            window.scrollTo(0, 0);
            setTimeout(resolve, 600);
          }
        };
        step();
      });
    });
    await page.screenshot({ path: `/tmp/nytt-shots/v2-${name}-${theme}.png`, fullPage: true });
  }
}
// mobile dark homepage
await page.setViewport({ width: 390, height: 850 });
await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
await page.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  await new Promise((resolve) => {
    let y = 0;
    const step = () => {
      y += 600;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 130);
      else {
        window.scrollTo(0, 0);
        setTimeout(resolve, 600);
      }
    };
    step();
  });
});
await page.screenshot({ path: "/tmp/nytt-shots/v2-home-mobile-dark.png", fullPage: true });

await browser.close();
console.log("all shots taken");
