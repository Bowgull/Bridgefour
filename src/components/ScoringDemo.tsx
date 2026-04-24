"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Scoring logic ──────────────────────────────────────────────
// Mirrors the spirit of the Sygnalist scorer. Rules are hand-picked
// against Josh's actual target profile (see PROFILE below). Everything
// runs client-side with no API calls.

type Rule = {
  id: string;
  label: string;
  weight: number;
  // `hit(text)` runs against a lowercased version of the job description.
  hit: (t: string) => boolean;
  // Positive rules add to score. Disqualifiers subtract and flag.
  kind: "positive" | "disqualifier";
};

const PROFILE = {
  titleTargets: [
    "solutions engineer",
    "sales engineer",
    "forward deployed",
    "technical account manager",
    "ai implementation",
    "ai solutions",
    "integration engineer",
    "implementation engineer",
    "customer success engineer",
    "customer engineer",
  ],
  stackPositive: [
    "typescript",
    "javascript",
    "react",
    "next.js",
    "nextjs",
    "supabase",
    "vercel",
    "cloudflare",
    "claude",
    "anthropic",
    "openai",
    "llm",
    "fintech",
    "payments",
    "stripe",
    "erp",
    "banner",
    "peoplesoft",
    "sql",
    "api",
  ],
  locations: ["toronto", "canada", "remote", "hybrid", "ontario"],
};

const RULES: Rule[] = [
  {
    id: "role-match",
    kind: "positive",
    weight: 35,
    label: "Role matches target titles (SE, FDE, TAM, AI Implementation)",
    hit: (t) => PROFILE.titleTargets.some((r) => t.includes(r)),
  },
  {
    id: "customer-facing",
    kind: "positive",
    weight: 12,
    label: "Customer-facing: works directly with clients, not pure backend",
    hit: (t) =>
      /(customer|client|onboarding|implementation|stakeholder|demo|presales|post-sales)/i.test(
        t
      ),
  },
  {
    id: "stack-overlap",
    kind: "positive",
    weight: 15,
    label: "Stack overlap (TypeScript / React / Next / Claude / OpenAI / Supabase / Cloudflare)",
    hit: (t) => {
      const hits = PROFILE.stackPositive.filter((s) => t.includes(s));
      return hits.length >= 2;
    },
  },
  {
    id: "payments-domain",
    kind: "positive",
    weight: 10,
    label: "Payments, fintech, or ERP/SIS domain — Josh's deepest domain",
    hit: (t) =>
      /(payments|fintech|reconciliation|erp|sis|banner|colleague|peoplesoft|tuition|billing|treasury|acct\b|accounting)/i.test(
        t
      ),
  },
  {
    id: "ai-native",
    kind: "positive",
    weight: 10,
    label: "AI-native product (LLM, Claude, OpenAI, vector, RAG)",
    hit: (t) => /(llm|claude|anthropic|openai|gpt|rag|embedding|vector|agent)/i.test(t),
  },
  {
    id: "remote-or-toronto",
    kind: "positive",
    weight: 8,
    label: "Remote, hybrid, or Toronto / Canada location",
    hit: (t) => PROFILE.locations.some((l) => t.includes(l)),
  },
  {
    id: "shipping-culture",
    kind: "positive",
    weight: 6,
    label: "Signal of a shipping culture (ships, fast, iterate, owner, autonomy)",
    hit: (t) => /(ship\b|shipping|fast-paced|autonom|ownership|own the|end-to-end)/i.test(t),
  },
  {
    id: "too-senior",
    kind: "disqualifier",
    weight: -60,
    label: "Hard disqualifier: requires 10+ years engineering experience",
    hit: (t) => /(10\+\s*years|12\+\s*years|15\+\s*years|staff engineer|principal engineer)/i.test(t),
  },
  {
    id: "phd-required",
    kind: "disqualifier",
    weight: -55,
    label: "Hard disqualifier: PhD or research science required",
    hit: (t) => /(phd|ph\.d|doctorate|research scientist)/i.test(t),
  },
  {
    id: "us-citizen",
    kind: "disqualifier",
    weight: -50,
    label: "Hard disqualifier: US citizenship or clearance required",
    hit: (t) =>
      /(us citizen|u\.s\. citizen|security clearance|secret clearance|tscr|only\s+us|must be us)/i.test(
        t
      ),
  },
  {
    id: "pure-backend",
    kind: "disqualifier",
    weight: -20,
    label: "Pure backend / infra only — no customer or product surface",
    hit: (t) =>
      /(distributed systems|kernel|compiler|hadoop|spark|kubernetes administrator)/i.test(t) &&
      !/(customer|client|product)/i.test(t),
  },
];

type Result = {
  score: number;
  tier: "S" | "A" | "B" | "C" | "X";
  hits: Rule[];
  flags: Rule[];
};

function score(jd: string): Result {
  const t = jd.toLowerCase();
  const hits: Rule[] = [];
  const flags: Rule[] = [];
  let total = 0;
  for (const rule of RULES) {
    if (rule.hit(t)) {
      if (rule.kind === "positive") {
        hits.push(rule);
        total += rule.weight;
      } else {
        flags.push(rule);
        total += rule.weight;
      }
    }
  }
  const clamped = Math.max(0, Math.min(100, total));
  let tier: Result["tier"] = "X";
  if (flags.length > 0) tier = "X";
  else if (clamped >= 75) tier = "S";
  else if (clamped >= 60) tier = "A";
  else if (clamped >= 45) tier = "B";
  else if (clamped >= 30) tier = "C";
  return { score: clamped, tier, hits, flags };
}

// ── Presets ─────────────────────────────────────────────────────

const PRESETS: { label: string; short: string; jd: string }[] = [
  {
    label: "Forward Deployed Engineer · Anthropic",
    short: "FDE · AI company",
    jd: `We're hiring a Forward Deployed Engineer to sit between our customers and our product team. You'll ship TypeScript and React integrations on-site at enterprise client accounts, work directly with customer engineering leads, and feed learnings back into our roadmap. Experience with LLM tool use, Claude or OpenAI APIs, and client onboarding strongly preferred. Remote-friendly; Toronto, NYC, or SF. End-to-end ownership. Fast-paced shipping culture.`,
  },
  {
    label: "Solutions Engineer · Fintech SaaS",
    short: "SE · Payments",
    jd: `Senior Solutions Engineer to lead technical demos and integrations for a B2B payments platform. You'll own discovery calls with customer CFO / IT stakeholders, scope ERP reconciliation workflows, and partner with product to translate client needs into the roadmap. Experience with fintech, Stripe, treasury, ACH, or ERP integrations required. React / TypeScript a plus. Hybrid in Toronto.`,
  },
  {
    label: "Principal Backend Engineer · BigTech",
    short: "Backend · 12+ yrs",
    jd: `Principal Engineer to lead our distributed systems team. 12+ years of experience required. Deep expertise in Kubernetes, Spark, and compiler optimization. US citizens only, TS/SCI security clearance required. No customer interaction.`,
  },
];

// ── UI ──────────────────────────────────────────────────────────

const TIER_COLOR: Record<Result["tier"], { bg: string; fg: string; ring: string }> = {
  S: { bg: "rgba(250, 215, 106, 0.14)", fg: "#FAD76A", ring: "rgba(250, 215, 106, 0.55)" },
  A: { bg: "rgba(106, 215, 163, 0.14)", fg: "#6AD7A3", ring: "rgba(106, 215, 163, 0.55)" },
  B: { bg: "rgba(74, 202, 170, 0.12)", fg: "#4ACAAA", ring: "rgba(74, 202, 170, 0.45)" },
  C: { bg: "rgba(154, 146, 135, 0.14)", fg: "#9a9287", ring: "rgba(154, 146, 135, 0.45)" },
  X: { bg: "rgba(255, 95, 87, 0.10)", fg: "#ff8c83", ring: "rgba(255, 95, 87, 0.45)" },
};

export default function ScoringDemo() {
  const [jd, setJd] = useState<string>(PRESETS[0].jd);
  const [activePreset, setActivePreset] = useState<number>(0);

  const result = useMemo(() => (jd.trim() ? score(jd) : null), [jd]);

  return (
    <div
      className="tint-sygnalist rounded-sm"
      style={{ border: "1px solid var(--rule)", padding: "28px" }}
    >
      <div className="flex items-center gap-4 mb-5">
        <span
          className="mono text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "var(--sygnalist-green)", opacity: 0.9 }}
        >
          Live · Scoring demo
        </span>
        <span
          aria-hidden
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(90deg, var(--sygnalist-green)55, transparent)`,
          }}
        />
      </div>

      <h3
        className="serif mb-3"
        style={{
          fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "var(--foreground)",
        }}
      >
        Paste a job. Watch it get tiered.
      </h3>

      <p
        className="mb-6"
        style={{
          fontSize: "var(--text-small)",
          color: "var(--foreground-muted)",
          lineHeight: 1.6,
          maxWidth: "64ch",
        }}
      >
        A simplified version of Sygnalist&apos;s scorer runs here in your
        browser. No API calls. Real rules, real weights, trained against the
        profile I use for my own search.
      </p>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => {
              setJd(p.jd);
              setActivePreset(i);
            }}
            className="mono text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 border transition-colors"
            style={{
              color: activePreset === i ? "var(--foreground)" : "var(--foreground-muted)",
              borderColor: activePreset === i ? "var(--sygnalist-green)" : "var(--rule)",
              background: activePreset === i ? "rgba(106,215,163,0.08)" : "transparent",
              cursor: "pointer",
            }}
            aria-pressed={activePreset === i}
          >
            {p.short}
          </button>
        ))}
        <button
          onClick={() => {
            setJd("");
            setActivePreset(-1);
          }}
          className="mono text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 border transition-colors"
          style={{
            color: "var(--foreground-dim)",
            borderColor: "var(--rule)",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
        <div>
          <label
            htmlFor="jd-input"
            className="mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "var(--foreground-dim)" }}
          >
            Job description
          </label>
          <textarea
            id="jd-input"
            value={jd}
            onChange={(e) => {
              setJd(e.target.value);
              setActivePreset(-1);
            }}
            spellCheck={false}
            rows={10}
            placeholder="Paste a job description here to see how the scorer ranks it..."
            className="mono w-full mt-2 p-4 rounded-sm"
            style={{
              fontSize: "12px",
              lineHeight: 1.55,
              background: "rgba(0,0,0,0.25)",
              color: "var(--foreground)",
              border: "1px solid var(--rule)",
              resize: "vertical",
              minHeight: 200,
              fontFamily: "var(--font-mono), ui-monospace, monospace",
            }}
          />
        </div>

        <div>
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={`${result.tier}-${result.score}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  className="mono text-[10px] tracking-[0.2em] uppercase block mb-2"
                  style={{ color: "var(--foreground-dim)" }}
                >
                  Result
                </label>

                <div
                  className="rounded-sm p-5"
                  style={{
                    border: `1px solid ${TIER_COLOR[result.tier].ring}`,
                    background: TIER_COLOR[result.tier].bg,
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <span
                      className="display"
                      style={{
                        fontSize: "3.5rem",
                        lineHeight: 1,
                        color: TIER_COLOR[result.tier].fg,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {result.tier}
                    </span>
                    <span
                      className="mono text-xs"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {result.score}/100
                    </span>
                  </div>
                  <p
                    className="mono text-[10px] tracking-[0.2em] uppercase mt-3"
                    style={{ color: "var(--foreground-dim)" }}
                  >
                    {result.flags.length > 0
                      ? "Auto-disqualified"
                      : result.tier === "S"
                      ? "High fit"
                      : result.tier === "A"
                      ? "Strong fit"
                      : result.tier === "B"
                      ? "Partial fit"
                      : result.tier === "C"
                      ? "Weak fit"
                      : "No fit"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {result && (result.hits.length > 0 || result.flags.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-6 pt-5"
          style={{ borderTop: "1px solid var(--rule)" }}
        >
          {result.flags.length > 0 && (
            <div className="mb-4">
              <p
                className="mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "#ff8c83" }}
              >
                Disqualifiers ({result.flags.length})
              </p>
              <ul className="space-y-1">
                {result.flags.map((f) => (
                  <li
                    key={f.id}
                    style={{
                      fontSize: "var(--text-small)",
                      color: "var(--foreground-muted)",
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ color: "#ff8c83" }}>✕</span>{" "}
                    <span>{f.label}</span>{" "}
                    <span className="mono text-[11px]" style={{ color: "var(--foreground-dim)" }}>
                      ({f.weight})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.hits.length > 0 && (
            <div>
              <p
                className="mono text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "var(--sygnalist-green)" }}
              >
                Why-fit ({result.hits.length} rules hit)
              </p>
              <ul className="space-y-1">
                {result.hits.map((h) => (
                  <li
                    key={h.id}
                    style={{
                      fontSize: "var(--text-small)",
                      color: "var(--foreground-muted)",
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ color: "var(--sygnalist-green)" }}>+</span>{" "}
                    <span>{h.label}</span>{" "}
                    <span className="mono text-[11px]" style={{ color: "var(--foreground-dim)" }}>
                      (+{h.weight})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      <p
        className="mono text-[10px] tracking-[0.2em] uppercase mt-6"
        style={{ color: "var(--foreground-dim)" }}
      >
        Runs in your browser. No network calls. No keys. No data leaves this tab.
      </p>
    </div>
  );
}
