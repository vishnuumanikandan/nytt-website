/* End-to-end smoke test against a running dev server (port 3456).
   Run: node scripts/e2e.mjs */
import puppeteer from "puppeteer-core";

const BASE = "http://localhost:3456";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const stamp = Date.now().toString(36);
const TEST_EMAIL = `e2e-${stamp}@example.org`;
const TEST_SCHOOL = `E2E Test School ${stamp}`;

let failures = 0;
function check(name, ok, extra = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? `  (${extra})` : ""}`);
  if (!ok) failures++;
}

async function text(page) {
  return page.evaluate(() => document.body.innerText);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });

  /* 1. Register a chapter */
  await page.goto(`${BASE}/register`, { waitUntil: "networkidle0" });
  await page.type("#schoolName", TEST_SCHOOL);
  await page.type("#city", "Testville");
  await page.type("#state", "PA");
  await page.type("#contactName", "Avery Quintero");
  await page.type("#contactTitle", "Student");
  await page.type("#email", TEST_EMAIL);
  await page.type("#phone", "(215) 555-0144");
  await page.type("#password", "correct-horse-9");
  await page.type(
    "#motivation",
    "Our school wants to research local transit policy and publish findings our county council will actually read.",
  );
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 }),
    page.click("button[type=submit]"),
  ]);
  check("register redirects to dashboard", page.url().endsWith("/dashboard"), page.url());
  let body = await text(page);
  check("dashboard shows school name", body.includes(TEST_SCHOOL));
  check("dashboard shows pending status", body.includes("Pending review"));

  /* 2. Log out */
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click("form button[type=submit]"),
  ]);
  check("logout lands on home", page.url() === `${BASE}/` || page.url() === `${BASE}`);

  /* 3. Log back in with wrong password, then right one */
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle0" });
  await page.type("#email", TEST_EMAIL);
  await page.type("#password", "wrong-password");
  await page.click("button[type=submit]");
  await page.waitForSelector('[role="alert"]', { timeout: 15000 });
  check("wrong password shows error", true);
  await page.click("#password", { clickCount: 3 });
  await page.type("#password", "correct-horse-9");
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 }),
    page.click("button[type=submit]"),
  ]);
  check("correct password reaches dashboard", page.url().endsWith("/dashboard"));

  /* 4. Admin login (own browser context: separate cookie jar) */
  const adminCtx = await browser.createBrowserContext();
  const admin = await adminCtx.newPage();
  await admin.goto(`${BASE}/admin-login`, { waitUntil: "networkidle0" });
  await admin.type("#username", "admin");
  await admin.type("#password", "nytt-admin");
  await Promise.all([
    admin.waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 }),
    admin.click("button[type=submit]"),
  ]);
  check("admin login reaches /admin", admin.url().endsWith("/admin"), admin.url());
  body = await text(admin);
  check("admin sees pending application", body.includes(TEST_SCHOOL));

  /* 5. Approve the chapter */
  await admin.evaluate((school) => {
    const article = [...document.querySelectorAll("article")].find((a) =>
      a.textContent.includes(school),
    );
    article.querySelector("form button[type=submit]").click();
  }, TEST_SCHOOL);
  await new Promise((r) => setTimeout(r, 2500));
  await admin.goto(`${BASE}/chapters`, { waitUntil: "networkidle0" });
  body = await text(admin);
  check("approved chapter appears in public directory", body.includes(TEST_SCHOOL));

  /* 6. Admin creates an event */
  await admin.goto(`${BASE}/admin#events`, { waitUntil: "networkidle0" });
  await admin.type("#event-title", `E2E Workshop ${stamp}`);
  await admin.type("#event-format", "Workshop");
  await admin.type(
    "#event-description",
    "A test workshop created by the automated end-to-end check.",
  );
  // Set datetime-local programmatically: keystroke entry is locale-dependent.
  await admin.evaluate(() => {
    document.querySelector("#event-starts").value = "2027-03-12T16:00";
  });
  await admin.type("#event-location", "Virtual");
  await admin.evaluate(() => {
    const form = document.querySelector("#event-starts").closest("form");
    form.querySelector("button[type=submit]").click();
  });
  await new Promise((r) => setTimeout(r, 2500));
  await admin.goto(`${BASE}/events`, { waitUntil: "networkidle0" });
  body = await text(admin);
  check("event appears on public events page", body.includes(`E2E Workshop ${stamp}`));

  /* 7. Chapter registers for the event */
  await page.goto(`${BASE}/events`, { waitUntil: "networkidle0" });
  await page.evaluate((s) => {
    const article = [...document.querySelectorAll("article")].find((a) =>
      a.textContent.includes(`E2E Workshop ${s}`),
    );
    const btn = [...article.querySelectorAll("button")].find((b) =>
      b.textContent.includes("Register your school"),
    );
    btn.click();
  }, stamp);
  await new Promise((r) => setTimeout(r, 2500));
  await page.goto(`${BASE}/events`, { waitUntil: "networkidle0" });
  const registeredState = await page.evaluate((s) => {
    const article = [...document.querySelectorAll("article")].find((a) =>
      a.textContent.includes(`E2E Workshop ${s}`),
    );
    return article?.textContent.includes("Your school is registered") ?? false;
  }, stamp);
  check("event page shows registered state", registeredState);
  await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle0" });
  body = await text(page);
  const dashOk = body.includes(`E2E Workshop ${stamp}`);
  check("dashboard lists the registration", dashOk);
  if (!dashOk) {
    const section = body.split("Your event registrations")[1];
    console.log("  dashboard events section:", JSON.stringify(section?.slice(0, 300)));
  }

  /* 8. Admin publishes a journal post */
  await admin.goto(`${BASE}/admin#journal`, { waitUntil: "networkidle0" });
  await admin.type("#post-title", `E2E Post ${stamp}`);
  await admin.type("#post-author", "Test Author");
  await admin.type("#post-excerpt", "An automated test post.");
  await admin.type(
    "#post-body",
    "First paragraph of the test post.\n\nSecond paragraph of the test post.",
  );
  await admin.evaluate(() => {
    const form = document.querySelector("#post-body").closest("form");
    form.querySelector("button[type=submit]").click();
  });
  await new Promise((r) => setTimeout(r, 2500));
  await admin.goto(`${BASE}/blog`, { waitUntil: "networkidle0" });
  body = await text(admin);
  check("post appears on the Journal", body.includes(`E2E Post ${stamp}`));
  const link = await admin.evaluate(() => {
    const a = [...document.querySelectorAll("a")].find((x) =>
      x.textContent.includes("E2E Post"),
    );
    return a ? a.href : null;
  });
  await admin.goto(link, { waitUntil: "networkidle0" });
  body = await text(admin);
  check("post page renders paragraphs", body.includes("Second paragraph"));

  /* 9. Security: no password data anywhere in rendered HTML */
  const dirHtml = await (await fetch(`${BASE}/chapters`)).text();
  check(
    "no password fields leak into public pages",
    !/password_hash|\$2b\$10/.test(dirHtml),
  );

  /* 10. Protected routes redirect when logged out */
  const anonCtx = await browser.createBrowserContext();
  const anon = await anonCtx.newPage();
  await anon.goto(`${BASE}/admin`, { waitUntil: "networkidle0" });
  check("anonymous /admin redirects to admin login", anon.url().includes("/admin-login"));

  /* Cleanup: delete test post, event, chapter */
  await admin.goto(`${BASE}/admin`, { waitUntil: "networkidle0" });
  await admin.evaluate((s) => {
    const li = [...document.querySelectorAll("li")].find((x) =>
      x.textContent.includes(`E2E Post ${s}`),
    );
    li?.querySelector("form button[type=submit]")?.click();
  }, stamp);
  await new Promise((r) => setTimeout(r, 1800));
  await admin.goto(`${BASE}/admin`, { waitUntil: "networkidle0" });
  await admin.evaluate((s) => {
    const li = [...document.querySelectorAll("li")].find((x) =>
      x.textContent.includes(`E2E Workshop ${s}`),
    );
    li?.querySelector("form button[type=submit]")?.click();
  }, stamp);
  await new Promise((r) => setTimeout(r, 1800));
  await admin.goto(`${BASE}/admin`, { waitUntil: "networkidle0" });
  await admin.evaluate((school) => {
    const row = [...document.querySelectorAll("tr")].find((x) =>
      x.textContent.includes(school),
    );
    row?.querySelector("form button[type=submit]")?.click();
  }, TEST_SCHOOL);
  await new Promise((r) => setTimeout(r, 1800));
  const finalHtml = await (await fetch(`${BASE}/chapters`)).text();
  check("cleanup removed the test chapter", !finalHtml.includes(TEST_SCHOOL));
} finally {
  await browser.close();
}

console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
