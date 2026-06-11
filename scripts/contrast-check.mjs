/* WCAG contrast audit: samples real rendered elements in both themes and
   reports any text below AA (4.5:1 normal, 3:1 for >=24px or bold >=18.66px). */
import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3456";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const routes = ["/", "/about", "/mission", "/team", "/chapters", "/events", "/blog", "/formats", "/featured-project", "/register", "/login", "/admin-login"];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900 });

let failures = 0;

for (const theme of ["light", "dark"]) {
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0" });
    await page.evaluate((t) => {
      document.documentElement.setAttribute("data-theme", t);
    }, theme);
    await new Promise((r) => setTimeout(r, 300));

    const problems = await page.evaluate(() => {
      function lum(rgb) {
        const [r, g, b] = rgb.map((v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }
      function parse(c) {
        const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
        if (!m) return null;
        return { rgb: [+m[1], +m[2], +m[3]], a: m[4] === undefined ? 1 : +m[4] };
      }
      function blend(fg, bg) {
        return fg.rgb.map((v, i) => v * fg.a + bg[i] * (1 - fg.a));
      }
      function effectiveBg(el) {
        let bg = [255, 255, 255];
        const chain = [];
        let node = el;
        while (node && node !== document.documentElement) {
          chain.unshift(node);
          node = node.parentElement;
        }
        const rootC = parse(getComputedStyle(document.body).backgroundColor);
        if (rootC && rootC.a > 0) bg = blend(rootC, bg);
        for (const n of chain) {
          const c = parse(getComputedStyle(n).backgroundColor);
          if (c && c.a > 0) bg = blend(c, bg);
        }
        return bg;
      }
      const out = [];
      const els = document.querySelectorAll("p, a, h1, h2, h3, dt, dd, span, button, li, label, th, td, figcaption, footer");
      const seen = new Set();
      for (const el of els) {
        if (el.closest("[aria-hidden=true], .ghost-type, .marquee-track")) continue;
        const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join("");
        if (!text || text.length < 3) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity < 0.5) continue;
        const fg = parse(cs.color);
        if (!fg) continue;
        const bg = effectiveBg(el);
        const fgRgb = blend(fg, bg);
        const L1 = lum(fgRgb), L2 = lum(bg);
        const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        const size = parseFloat(cs.fontSize);
        const weight = +cs.fontWeight || 400;
        const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
        const min = isLarge ? 3 : 4.5;
        if (ratio < min) {
          const key = `${cs.color}|${bg.join(",")}|${Math.round(size)}`;
          if (seen.has(key)) continue;
          seen.add(key);
          out.push({ text: text.slice(0, 42), ratio: +ratio.toFixed(2), min, size: Math.round(size), color: cs.color });
        }
      }
      return out;
    });

    for (const p of problems) {
      failures++;
      console.log(`FAIL ${theme} ${route} "${p.text}" ratio=${p.ratio} (min ${p.min}, ${p.size}px, ${p.color})`);
    }
  }
}

await browser.close();
console.log(failures === 0 ? "ALL TEXT PASSES WCAG AA IN BOTH THEMES" : `${failures} contrast failure(s)`);
process.exit(failures === 0 ? 0 : 1);
