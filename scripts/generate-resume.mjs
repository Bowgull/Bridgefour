import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public/assets");
fs.mkdirSync(OUT_DIR, { recursive: true });

// ── VARIANTS ─────────────────────────────────────────────
// Each variant rewrites the summary, the core-skills ordering, and the
// projects-vs-experience emphasis. Nothing is fabricated. Bullets and
// metrics are identical to the source resume.

const base = {
  name: "Joshua Bocas",
  location: "Toronto, ON",
  phone: "647-330-2044",
  email: "bocas.joshua@gmail.com",
  links: [
    { label: "linkedin.com/in/joshua-bocas", href: "https://linkedin.com/in/joshua-bocas" },
    { label: "github.com/Bowgull", href: "https://github.com/Bowgull" },
    { label: "bridgefour.co", href: "https://bridgefour.co" },
  ],
  experience: [
    {
      role: "Account Manager",
      company: "PayMyTuition",
      period: "Jan 2026 – Present",
      blurb: "Higher-ed payments platform, domestic and cross-border tuition.",
      bullets: [
        "Onboard colleges and universities onto the platform for domestic and international tuition payments, including multi-currency and FX scenarios.",
        "Train finance, registrar, and IT teams on how payments flow through PayMyTuition into ERP/SIS systems (Ellucian Banner, Colleague, PeopleSoft).",
        "Support payment posting, reconciliation, and settlement workflows so student billing data lines up across systems without surprises.",
        "Troubleshoot integration issues between school systems and PayMyTuition; act as the translation layer between client IT and internal product/support.",
        "Build reusable checklists, walkthroughs, and documentation to accelerate future onboardings.",
      ],
    },
    {
      role: "Customer Success & Operations",
      company: "IPEX by Aliaxis",
      period: "Jun 2023 – Nov 2025",
      blurb: "North American industrial manufacturing, order management, CRM, and delivery operations.",
      bullets: [
        "Lifted delivery accuracy to ~95% by identifying order issues early and tightening communication between sales reps and warehouses.",
        "Reduced backorders by ~20% after surfacing systemic gaps and cleaning up CRM data that was blocking order flow.",
        "Managed coverage across 6 states, 12 reps, and multiple partner companies; kept information consistent across teams so orders didn't get lost between handoffs.",
        "Handled 40–60+ customer conversations weekly on access, orders, and escalations; resolved issues before they spiraled.",
        "Partnered with sales to reset client expectations early, reducing repeat escalations.",
      ],
    },
    {
      role: "Digital Onboarding Specialist",
      company: "Skytale Digital",
      period: "Feb 2022 – Nov 2023",
      blurb: "Digital marketing agency, client onboarding for restaurant ad campaigns.",
      bullets: [
        "Onboarded 30+ restaurant clients through 5–8 daily Zoom sessions, guiding them end-to-end through Meta, TikTok, and Google Ads setup.",
        "Cut campaign activation time by ~15% by troubleshooting account-linking, 2FA, and verification blockers that were stalling launches.",
        "Reduced support tickets by ~30% after building SOPs and Loom walkthroughs adopted team-wide.",
        "Served as the client-facing technical translator, converting platform errors and policy issues into plain-language fixes and next steps.",
      ],
    },
    {
      role: "Customer Experience Manager",
      company: "The Donnelly Group",
      period: "Apr 2019 – Sep 2022",
      blurb: "Hospitality, front-of-house operations and team leadership.",
      bullets: [
        "Led FOH teams in a high-volume environment; trained and coached staff, resolved real-time escalations, managed scheduling and inventory, and reinforced a customer-first culture across shifts.",
      ],
    },
  ],
  projects: [
    {
      name: "Sygnalist",
      role: "Founder & lead builder",
      period: "2025 – Present",
      blurb: "A decision-support system that turns ten noisy job sources into one ranked inbox.",
      bullets: [
        "Designed and built an end-to-end pipeline: ingestion across ten job APIs, normalization, dedupe, rule-based scoring, and Claude/OpenAI enrichment fan-out.",
        "Shipped multi-portal web app (admin + client views) with a Gmail parser catching what the APIs miss. Next.js on Vercel, Supabase SSR auth, multi-profile from day one.",
        "Owned full product cycle: problem definition, architecture, shipping, iteration against real users. Non-destructive audit log on every action.",
      ],
      stack: "TypeScript, Next.js 16, Supabase, Tailwind, Vercel, Claude API, OpenAI API, Gmail API, Google Apps Script (v1)",
    },
    {
      name: "Waymark",
      role: "Solo build",
      period: "2025",
      blurb: "A training coach that reads Strava, sleep, soreness, HR, then rewrites the week silently.",
      bullets: [
        "Built a cross-platform app (web + iOS via Capacitor) with an edge-first backend on Cloudflare Workers + D1 SQLite.",
        "Integrated Strava via webhook and polling, with pre-filter gates so Claude Sonnet is only called when rule-based logic cannot decide.",
        "Authored a full brand and UI style guide; wrote two Swift plugins to reach iOS surfaces (AVFoundation audio mixing, ActivityKit Live Activities).",
      ],
      stack: "React, TypeScript, Capacitor (iOS), Cloudflare Workers, D1, Hono, Drizzle ORM, Tailwind, Claude Sonnet 4.6, Swift",
    },
  ],
};

const variants = {
  se: {
    filename: "resume-se.pdf",
    targetRole: "Solutions Engineer",
    summary:
      "Customer-facing operator with 6+ years bridging stakeholders and systems across payments, ERP/SIS reconciliation, and integration workflows. Ships real products end-to-end with modern tooling (Next.js, Cloudflare Workers, Claude, Cursor). Comfortable in a client call, a reconciliation spreadsheet, or a codebase, and fluent translating between all three.",
    coreSkills: [
      { label: "Technical Demos & Integration", value: "Discovery calls, technical scoping, client IT translation, integration troubleshooting, demo design" },
      { label: "Systems & Integrations", value: "CRM, ERP/SIS (Ellucian Banner, Colleague, PeopleSoft), Payments & FX, ACH/Wire, Reconciliation Workflows, Data Normalization" },
      { label: "Technical", value: "TypeScript, JavaScript, React, Next.js, Google Apps Script, Google Sheets API, Gmail API, SQL basics, Git/GitHub, Vercel, Cloudflare Workers" },
      { label: "Customer Success & Ops", value: "Client Onboarding, Stakeholder Management, Training & Enablement, Technical Troubleshooting, SOPs & Documentation, Escalation Management" },
      { label: "AI-assisted Dev", value: "Claude (Anthropic SDK), OpenAI API, Cursor, prompt caching, tool-use patterns" },
    ],
    sectionOrder: ["projects", "experience"],
  },
  fde: {
    filename: "resume-fde.pdf",
    targetRole: "Forward Deployed Engineer",
    summary:
      "Operator who sits where customer problems are observed and ships tools that solve them. 6+ years in customer-facing roles across payments, CRM/ERP, and ad operations. Shipped two production AI products solo using modern tooling (Next.js on Vercel, Cloudflare Workers + D1, Claude Sonnet via the Anthropic SDK). Most recent domain: higher-ed payments and ERP/SIS reconciliation.",
    coreSkills: [
      { label: "Customer-Facing Build", value: "Observing workflow gaps on-site, prototyping tools for client problems, onboarding integrations, iterating against real users" },
      { label: "Systems & Integrations", value: "CRM, ERP/SIS (Ellucian Banner, Colleague, PeopleSoft), Payments & FX, ACH/Wire, Reconciliation Workflows, Data Normalization" },
      { label: "Technical", value: "TypeScript, React, Next.js, Cloudflare Workers (D1, Hono, Drizzle), Supabase (SSR auth), Google Apps Script, Gmail/Sheets API, SQL basics, Git/GitHub" },
      { label: "AI Product Build", value: "Claude (Anthropic SDK), OpenAI API, tool use with mandatory pre-filter gates, prompt caching, interleaved thinking, structured audit logs" },
      { label: "Working Style", value: "Documentation-first, systems thinking, comfortable in ambiguity, cross-functional communication" },
    ],
    sectionOrder: ["projects", "experience"],
  },
};

// ── HTML TEMPLATE ────────────────────────────────────────

function escape(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderCoreSkills(skills) {
  return skills
    .map(
      (s) => `<div class="skill-row">
  <div class="skill-label">${escape(s.label)}</div>
  <div class="skill-value">${escape(s.value)}</div>
</div>`
    )
    .join("\n");
}

function renderExperience(experience) {
  return experience
    .map(
      (job) => `<div class="job">
  <div class="job-head">
    <div>
      <div class="job-role"><strong>${escape(job.role)}</strong> · ${escape(job.company)}</div>
      <div class="job-blurb">${escape(job.blurb)}</div>
    </div>
    <div class="job-period">${escape(job.period)}</div>
  </div>
  <ul>
    ${job.bullets.map((b) => `<li>${escape(b)}</li>`).join("\n    ")}
  </ul>
</div>`
    )
    .join("\n");
}

function renderProjects(projects) {
  return projects
    .map(
      (p) => `<div class="project">
  <div class="job-head">
    <div>
      <div class="job-role"><strong>${escape(p.name)}</strong> · ${escape(p.role)}</div>
      <div class="job-blurb">${escape(p.blurb)}</div>
    </div>
    <div class="job-period">${escape(p.period)}</div>
  </div>
  <ul>
    ${p.bullets.map((b) => `<li>${escape(b)}</li>`).join("\n    ")}
  </ul>
  <div class="stack">Stack: ${escape(p.stack)}</div>
</div>`
    )
    .join("\n");
}

function renderHTML(variant) {
  const sections = {
    projects: `<h2>Projects</h2>\n${renderProjects(base.projects)}`,
    experience: `<h2>Experience</h2>\n${renderExperience(base.experience)}`,
  };
  const orderedSections = variant.sectionOrder.map((k) => sections[k]).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escape(base.name)} · ${escape(variant.targetRole)}</title>
<style>
  @page { size: Letter; margin: 0.5in; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
    font-size: 10.25pt;
    line-height: 1.42;
    color: #1a1a1a;
    -webkit-print-color-adjust: exact;
  }
  header {
    text-align: center;
    margin-bottom: 14px;
  }
  header h1 {
    font-size: 22pt;
    letter-spacing: 0.12em;
    font-weight: 600;
    margin: 0 0 4px;
    text-transform: uppercase;
  }
  header .sub {
    font-size: 9pt;
    color: #3a3a3a;
    letter-spacing: 0.02em;
  }
  header .contact {
    margin-top: 6px;
    font-size: 9pt;
    color: #333;
  }
  header a { color: #1a1a1a; text-decoration: none; border-bottom: 0.5px solid #888; }
  h2 {
    font-size: 10pt;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    margin: 18px 0 6px;
    padding-bottom: 2px;
    border-bottom: 1px solid #1a1a1a;
    font-weight: 700;
  }
  .summary {
    margin: 6px 0 2px;
    font-size: 10pt;
    line-height: 1.5;
  }
  .skill-row {
    display: flex;
    gap: 10px;
    margin: 3px 0;
    font-size: 9.75pt;
  }
  .skill-label {
    flex: 0 0 140px;
    font-weight: 600;
  }
  .skill-value { flex: 1; }
  .job, .project { margin: 8px 0 10px; page-break-inside: avoid; }
  .job-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
  }
  .job-role { font-size: 10.25pt; }
  .job-blurb {
    font-style: italic;
    color: #555;
    font-size: 9.5pt;
    margin-top: 1px;
  }
  .job-period {
    color: #444;
    font-size: 9.5pt;
    white-space: nowrap;
  }
  ul {
    margin: 4px 0 0 18px;
    padding: 0;
  }
  li {
    margin: 2px 0;
    font-size: 10pt;
  }
  .stack {
    margin-top: 4px;
    font-size: 9.25pt;
    color: #444;
  }
  .role-target {
    display: inline-block;
    margin-top: 4px;
    font-size: 8.5pt;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #444;
    border: 0.5px solid #444;
    padding: 2px 8px;
    border-radius: 999px;
  }
</style>
</head>
<body>
<header>
  <h1>${escape(base.name)}</h1>
  <div class="sub">${escape(variant.targetRole)} · ${escape(base.location)}</div>
  <div class="contact">
    ${escape(base.phone)} ·
    <a href="mailto:${escape(base.email)}">${escape(base.email)}</a> ·
    ${base.links.map((l) => `<a href="${escape(l.href)}">${escape(l.label)}</a>`).join(" · ")}
  </div>
</header>

<div class="summary">${escape(variant.summary)}</div>

<h2>Core Skills</h2>
${renderCoreSkills(variant.coreSkills)}

${orderedSections}
</body>
</html>`;
}

// ── RENDER LOOP ──────────────────────────────────────────

const keys = process.argv.slice(2).length
  ? process.argv.slice(2)
  : Object.keys(variants);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

for (const key of keys) {
  const variant = variants[key];
  if (!variant) {
    console.log(`unknown variant: ${key}, skipping`);
    continue;
  }
  const html = renderHTML(variant);
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const out = path.join(OUT_DIR, variant.filename);
  await page.pdf({
    path: out,
    format: "Letter",
    printBackground: true,
    margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
  });
  console.log(`  wrote ${path.relative(ROOT, out)}`);
  await page.close();
}

await browser.close();
console.log("done");
