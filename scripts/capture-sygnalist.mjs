// Sygnalist production capture.
// First run: a Chrome window opens. Log into sygnalist-brain.vercel.app,
// then hit Enter in this terminal. The profile persists in .puppeteer-profile/,
// so every future run skips the login step and just captures.
//
//   node scripts/capture-sygnalist.mjs
//
import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs";
import readline from "node:readline";

const ROOT = path.resolve(".");
const out = path.join(ROOT, "public/assets/sygnalist/screens");
const outRoot = path.join(ROOT, "public/assets/sygnalist");
fs.mkdirSync(out, { recursive: true });

const PROFILE = path.join(ROOT, ".puppeteer-profile");
fs.mkdirSync(PROFILE, { recursive: true });

const BASE = "https://sygnalist-brain.vercel.app";
// View as Luther Bocas — real client profile with populated inbox + tracker + logs.
const VIEW_AS = "79474193-4336-4431-958c-ff8ea127d89f";
const q = `?view_as=${VIEW_AS}`;

const shots = [
  { url: `${BASE}/inbox${q}`,            file: path.join(outRoot, "hero.png") },
  { url: `${BASE}/inbox${q}`,            file: path.join(out, "01.png") },
  { url: `${BASE}/tracker${q}`,          file: path.join(out, "02.png") },
  { url: `${BASE}/admin${q}`,            file: path.join(out, "03.png") },
  { url: `${BASE}/admin/job-bank${q}`,   file: path.join(out, "04.png") },
  { url: `${BASE}/admin/messages${q}`,   file: path.join(out, "05.png") },
  { url: `${BASE}/admin/analytics${q}`,  file: path.join(out, "06.png") },
  { url: `${BASE}/admin/logs${q}`,       file: path.join(out, "07.png") },
  { url: `${BASE}/messages${q}`,         file: path.join(out, "08.png") },
  { url: `${BASE}/profile${q}`,          file: path.join(out, "09.png") },
];

const ask = (q) =>
  new Promise((res) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(q, (a) => { rl.close(); res(a); });
  });

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null,
  userDataDir: PROFILE,
  args: ["--window-size=1440,900"],
});

const [page] = await browser.pages();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

await page.goto(`${BASE}/inbox`, { waitUntil: "domcontentloaded" });
await new Promise((r) => setTimeout(r, 1500));

const currentUrl = page.url();
if (currentUrl.includes("/login")) {
  console.log("\n→ Log in in the Chrome window, then press Enter here.");
  await ask("");
}

for (const { url, file } of shots) {
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
    await new Promise((r) => setTimeout(r, 1600));
    await page.screenshot({ path: file, type: "png" });
    console.log("  wrote", path.relative(ROOT, file));
  } catch (e) {
    console.log("  skip", url, "-", e.message);
  }
}

await browser.close();
console.log("\ndone. shots in public/assets/sygnalist/");
