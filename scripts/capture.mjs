import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs";

const ROOT = path.resolve(".");
const outW = path.join(ROOT, "public/assets/waymark/screens");
const outWroot = path.join(ROOT, "public/assets/waymark");
const outS = path.join(ROOT, "public/assets/sygnalist/screens");
const outSroot = path.join(ROOT, "public/assets/sygnalist");
fs.mkdirSync(outW, { recursive: true });
fs.mkdirSync(outS, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  defaultViewport: null,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

async function shoot(url, outfile, { width = 390, height = 844, dpr = 2, wait = 1200, scroll = 0, tapSplash = false } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: dpr });
  try {
    const resp = await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
    if (!resp || resp.status() >= 400) {
      console.log("  skipping (bad response):", url, resp && resp.status());
      await page.close();
      return;
    }
  } catch (e) {
    console.log("  skipping (goto failed):", url, e.message);
    await page.close();
    return;
  }
  if (tapSplash) {
    await new Promise((r) => setTimeout(r, 800));
    await page.evaluate(() => {
      try { localStorage.setItem("waymark:splash-seen", "1"); } catch {}
      document.querySelectorAll("button, [role='button']").forEach((b) => {
        const t = (b.textContent || "").toLowerCase();
        if (t.includes("enter") || t.includes("begin") || t.includes("continue") || t.includes("start")) b.click();
      });
      document.body.click();
    });
    await new Promise((r) => setTimeout(r, 1200));
  }
  await new Promise((r) => setTimeout(r, wait));
  if (scroll) await page.evaluate((y) => window.scrollTo(0, y), scroll);
  // Hide dev-only chrome (ApiHealthDevBadge) before shooting
  await page.evaluate(() => {
    document.querySelectorAll("p").forEach((p) => {
      const t = (p.textContent || "").trim();
      if (t.startsWith("DEV API")) p.style.display = "none";
    });
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: outfile, type: "png" });
  console.log("  wrote", path.relative(ROOT, outfile));
  await page.close();
}

// ── WAYMARK (mobile, 390x844) ───────────────────────────
console.log("waymark:");
try {
  const W = { wait: 4500 };
  await shoot("http://localhost:5173/today", path.join(outWroot, "hero.png"), W);
  await shoot("http://localhost:5173/today", path.join(outW, "01.png"), W);
  await shoot("http://localhost:5173/program", path.join(outW, "02.png"), W);
  await shoot("http://localhost:5173/history", path.join(outW, "03.png"), W);
  await shoot("http://localhost:5173/library", path.join(outW, "04.png"), W);
  await shoot("http://localhost:5173/metrics", path.join(outW, "05.png"), W);
  await shoot("http://localhost:5173/settings", path.join(outW, "06.png"), W);
} catch (e) {
  console.log("  waymark failed:", e.message);
}

// ── SYGNALIST (desktop, 1440x900) ───────────────────────
console.log("sygnalist:");
try {
  await shoot("http://localhost:3002/", path.join(outSroot, "hero.png"), { width: 1440, height: 900, dpr: 2 });
  await shoot("http://localhost:3002/", path.join(outS, "01.png"), { width: 1440, height: 900, dpr: 2 });
  await shoot("http://localhost:3002/tracker", path.join(outS, "02.png"), { width: 1440, height: 900, dpr: 2 });
  await shoot("http://localhost:3002/admin", path.join(outS, "03.png"), { width: 1440, height: 900, dpr: 2 });
} catch (e) {
  console.log("  sygnalist failed:", e.message);
}

await browser.close();
console.log("done");
