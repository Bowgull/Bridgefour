export type Screen = {
  file: string;
  caption: string;
  featured?: boolean;
};

export type DemoStep = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: string;
  role: string;
  year: string;
  stack: string[];
  color: string;
  problem: {
    headline: string;
    body: string;
  };
  approach: {
    headline: string;
    body: string;
  };
  product: {
    headline: string;
    screens: Screen[];
  };
  tools: {
    headline: string;
    body: string;
    list: string[];
  };
  proof: {
    headline: string;
    body: string;
    stat?: string;
    statLabel?: string;
  };
  demoSteps?: DemoStep[];
};

export const projects: Project[] = [
  {
    slug: "sygnalist",
    title: "Sygnalist",
    // Sygnalist voice: direct, tactical, concrete. No HR sludge. Short sentences.
    tagline: "A job-search radar for people drowning in noise. Signal surfaced, control kept.",
    status: "Live on Vercel. Multi-profile.",
    role: "Founder and lead builder. Solo build with Cursor + Claude.",
    year: "2025. Present.",
    stack: [
      "Next.js 16",
      "Supabase (SSR auth)",
      "Tailwind",
      "Vercel",
      "Vercel cron",
      "Claude API",
      "OpenAI API",
      "Cursor + Claude (build tooling)",
    ],
    color: "#4ACAAA",
    problem: {
      headline: "Job hunting is broken. Everyone knows. Nobody fixes it.",
      body:
        "Aggregator emails. LinkedIn alerts. Direct pitches. Newsletter roll-ups. A job seeker burns the evening sorting the pile, scoring fit against their own profile, tracking who is worth applying to and who is noise. Most tools that claim to help add more noise. I watched people around me lose whole weekends to this and decided the pattern deserved a rebuild. So I built the radar. For them.",
    },
    approach: {
      headline: "Ten sources. One ranked inbox. One click to apply.",
      body:
        "Sygnalist pulls from ten sources in one fetch. Remotive, RemoteOK, Jooble (which back-feeds Indeed, Monster, Glassdoor), Adzuna US, Adzuna Canada, USAJobs, plus a gated RapidAPI fallback for JSearch, LinkedIn last-7-days, and an ATS feed when the primary sources come back thin. A Gmail newsletter parser catches the rest: LinkedIn alerts, Greenhouse, Lever, Workday, Ashby, Breezy, Jobvite, iCIMS, SmartRecruiters. Each source has its own adapter with a request builder, response parser, and company-name normaliser. All of it runs behind one law: no scheduled jobs, no hidden triggers, every action manual and visible. A user triggers a fetch. Twenty-five OpenAI enrichment requests fan out in parallel. A rule-based scorer applies hard disqualifiers and soft weights. Every job gets tiered S through X. The user sees one ranked inbox. Multi-profile from day one: one workbook as system of record, each user gets their own portal mirrored from it.",
    },
    product: {
      headline: "Three surfaces. One source of truth.",
      screens: [
        { file: "02.png", caption: "Tracker. Prospect, Applied, Interview, Final, Offer. Stage-colored with pending GoodFit checks and day-count chips. The pipeline as a living workflow.", featured: true },
        { file: "01.png", caption: "Inbox viewed as Luther Bocas, a real client. Live signals from Rogers, Salesforce, Wella/Sephora, Gallagher. Tiered A, B, C with fit reasoning inline.", featured: true },
        { file: "06.png", caption: "Analytics. Per-source hit rate, enrichment latency, tier distribution over time. Ten sources, one ranked inbox — with the numbers to prove it.", featured: true },
        { file: "03.png", caption: "Admin OPS. 2 active clients, 8 in pipeline, DB 112ms, unresolved errors surfaced next to system health." },
        { file: "07.png", caption: "Logs. Every fetch, promote, login, access-denied, ticket created. Structured, filterable by domain and result. The manual-explicit-visible law on screen." },
        { file: "05.png", caption: "Messages admin. Client threads, drafts, AI suggestions, send-as-admin." },
        { file: "04.png", caption: "Job Bank. Cross-client dedupe store with source, tier, and first-seen timestamp." },
        { file: "09.png", caption: "Profile. Role lanes, hard disqualifiers, resume parse, score weights. The tuning layer per client." },
        { file: "08.png", caption: "Tickets + OPS. Support surface inside admin, created and updated, status-grouped alongside live client metrics." },
      ],
    },
    tools: {
      headline: "Ten APIs. Full stack. One ranked inbox.",
      body:
        "Sygnalist started as a Google Apps Script prototype so the v1 could live inside tools users already had. No login, no new tab. Once the idea held, I rebuilt it as a real fullstack app. Next.js 16 on Vercel for the portal, Supabase with SSR for auth and multi-profile data, Tailwind for the UI, Vercel cron for periodic fetches, digests, and stale-job cleanup. Ten job-source integrations behind a unified adapter dispatch: Remotive, RemoteOK, Jooble (Indeed, Monster, Glassdoor back-feed), Adzuna US, Adzuna Canada, USAJobs, plus a gated RapidAPI fallback for JSearch, LinkedIn last-7-days, and ATS feeds. A Gmail newsletter parser catches the rest. Claude and OpenAI both in the enrichment layer. Claude for why-fit narratives. OpenAI for structured classification. Twenty-five enrichments fan out in parallel to cut latency ten times. Every fetch, promote, and error writes to a structured audit log. Non-destructive by design. Soft-lock a profile, it stops accepting writes, but every past action stays on the record.",
      list: [
        "Next.js 16",
        "Supabase (SSR auth, multi-profile)",
        "Tailwind",
        "Vercel + Vercel cron",
        "Claude API (why-fit)",
        "OpenAI API (classification)",
        "Gmail API",
        "Remotive, RemoteOK, Jooble, Adzuna, USAJobs, RapidAPI",
        "Google Apps Script (legacy v1)",
      ],
    },
    proof: {
      headline: "What this proves about how I work",
      body:
        "Sygnalist is not for me. I already have a job. I built it because people around me were losing weekends to a broken system and nobody with the skills to fix it was bothering. Proved the concept on Google Apps Script first. Rebuilt as a proper Next.js + Supabase app on Vercel once it earned that. A 1,860-line BLUEPRINT governs every decision, from voice rules (no corporate HR sludge, plain language, short sentences) to the core law: manual, explicit, visible. The philosophy is the interesting part. Most AI tooling takes control away. Sygnalist refuses to. It amplifies signal and shows its reasoning so the human stays in charge. That is a design decision, not a feature.",
      stat: "2 rebuilds",
      statLabel: "Apps Script v1 to Next.js + Supabase on Vercel. Multi-profile. Zero autonomous actions.",
    },
    demoSteps: [
      { title: "Sign in", body: "Credentials are pre-filled. Hit sign in to enter the Engine Room as admin." },
      { title: "Inbox", body: "Live signals from 10 sources, ranked A to C by fit score against the active client's profile. Each job shows the reasoning inline." },
      { title: "GoodFit score", body: "The badge on each job is AI-derived: role alignment, seniority, location, hard disqualifiers. The score is additive across weighted lanes — not a black box." },
      { title: "Source badges", body: "Each job shows which feed it came from: Remotive, Adzuna, Jooble, LinkedIn digest, Gmail parse, or ATS. Ten sources behind one ranked inbox." },
      { title: "Promote to tracker", body: "Hit Add to Tracker on any job to move it into the pipeline. Stage auto-sets to Prospect. One click." },
      { title: "Tracker", body: "Pipeline by stage: Prospect, Applied, Interview, Final, Offer. Stage-colored with day-count chips and pending GoodFit checks per card." },
      { title: "Client view", body: "Hit the eye icon next to a client name to switch into their portal. Exactly what they see — no admin chrome, no extra columns." },
      { title: "Role lanes", body: "Lanes define what a Tier A job looks like for each client. Each lane carries a weight. Add a lane and every existing score recalculates." },
    ],
  },
  {
    slug: "waymark",
    title: "Waymark",
    // Waymark voice (locked canon). Dark humor, sparse, observation before
    // instruction. No em dashes. No exclamations. No congratulations.
    tagline: "A coach that reads Strava, sleep, soreness, RPE. Then rewrites the week. Silently.",
    status: "Active build. Strava ingestion live. iOS Live Activity shipping.",
    role: "Solo build with Claude. Product, design, engineering, prompt architecture.",
    year: "2025. Present.",
    stack: [
      "TypeScript",
      "React 19",
      "Capacitor 8 (iOS)",
      "Cloudflare Workers",
      "D1 SQLite",
      "Hono",
      "Drizzle ORM",
      "Claude Sonnet 4.6",
      "Claude Haiku",
      "Swift (AVFoundation + ActivityKit)",
      "Claude (build tooling)",
    ],
    color: "#E8C860",
    problem: {
      headline: "Every training app assumes the plan is the truth.",
      body:
        "The plan is never the truth. Sleep was short. Soreness hit four out of five. HR drifted high on what was supposed to be a Zone 2 run. You skipped Tuesday, doubled Wednesday, ran harder than prescribed, ran without the strap. Every app ignores all of that and keeps rendering the old schedule like nothing happened. Then marks you as behind. The pattern tells the truth, not the plan.",
    },
    approach: {
      headline: "Read everything. Say nothing. Move the week.",
      body:
        "Every workout logged, every run from Strava, every wellness entry feeds one continuous signal bundle. HR zones per split pulled from Strava webhooks and polling. Pace drift against prescribed targets. Type divergence when you did Muay Thai instead of strength. Soreness scores, sleep hours, RPE, athlete notes, block adherence, last-2-hour history. Five event types fire into the reactive layer: session completed, skipped, replaced, wellness logged, nightly rollover. A pre-filter gate decides if there is real signal worth a model call. If yes, the bundle goes to Claude Sonnet 4.6 with a cached system prompt, interleaved thinking enabled, mandatory tool use, a 512-token output ceiling. The model returns one structured action: move, swap, reduce intensity, add recovery, hold. A two-hour debounce prevents second-guessing. The change writes to weekAdjustments with status accepted. No push. No toast. No badge. You see the new plan the next time you open the app.",
    },
    product: {
      headline: "A coach on the lock screen. Music still playing.",
      screens: [
        { file: "01.png", caption: "Today. Morning report with sleep, herb, alcohol, soreness. Waybook for athlete notes. Gold LOG button. No congratulations.", featured: true },
        { file: "03.png", caption: "Ledger. 8 of 12 complete. New PR on Bulgarian Split Squat. Week vs last-week deltas. The chart telling the truth.", featured: true },
        { file: "02.png", caption: "Program. Block Zero, Foundation. Corrective work, light loading. Week grid with AM and PM swim lanes per day.", featured: true },
        { file: "04.png", caption: "Library. 85+ techniques. Strength, Core, Foundation, Mobility, Bagwork. Waybook anchored to the bottom." },
        { file: "05.png", caption: "Body Metrics. Weight, resting HR, bodyfat, morning notes. One commit per day, history on the same card." },
        { file: "06.png", caption: "Settings. 7 days until redeploy, MT class day calendar, morning alarm, bag work technique chips by category." },
      ],
    },
    tools: {
      headline: "Edge-first backend. Native where it counts.",
      body:
        "Cloudflare Workers with D1 SQLite for the backend. Hono for routing. Drizzle for the schema. 29,500 lines of TypeScript on top. React through Capacitor wraps into a real iOS shell so I can reach AVFoundation and ActivityKit directly. The audio plugin uses playback category with mixWithOthers and duckOthers, so round-start bells and 10-second finish warnings slip under Spotify and auto-restore with notifyOthersOnDeactivation. The Live Activity plugin exposes Pause, Resume, Advance, and End as bidirectional controls. An internal end-tracker singleton disambiguates app-initiated ends from user swipe-to-dismiss so the session tears down cleanly either way. Strava integration runs webhook for fast ingestion and poll as a safety net, with auto-matching to planned sessions by date and sport. Claude Sonnet 4.6 via the Anthropic SDK. Prompt caching on by default. Interleaved-thinking beta enabled. Tool use mandatory for every coaching call.",
      list: [
        "Cloudflare Workers",
        "D1 SQLite",
        "Hono",
        "Drizzle ORM",
        "React + Capacitor",
        "Swift (AVFoundation, ActivityKit)",
        "Claude Sonnet 4.6 (Anthropic SDK)",
        "Strava (webhook + poll)",
        "Prompt caching",
        "Interleaved thinking",
      ],
    },
    proof: {
      headline: "What this proves about how I work",
      body:
        "29,500 lines of TypeScript. 53 feature screens. Eight AI coaching systems, each with pre-filter gates so the model is only called when rules cannot decide on their own. A Cloudflare Workers backend handling Strava webhooks and scheduled polling. Two Swift plugins written to reach the iOS surfaces React cannot. A voice canon enforced at every string. No exclamation marks. No em dashes. No congratulations. The app does not applaud me for training. It reads the pattern, thinks, and tells me the truth. That is the point.",
      stat: "29.5K LOC",
      statLabel: "53 screens. 8 AI systems. Strava live. Bidirectional Live Activity. Prompt caching and interleaved thinking.",
    },
    demoSteps: [
      { title: "Morning report", body: "Tap LOG to check in. Sleep, soreness, RPE, herb, alcohol, notes. The coaching layer reads this before deciding whether to move anything." },
      { title: "Today timeline", body: "Sessions for the day in AM and PM swim lanes. Tap any row to expand it and see the full session detail." },
      { title: "Session actions", body: "Mark Completed when done. Replace swaps the session with an equivalent from the library. Skip logs the miss and flags it for the coach." },
      { title: "Program view", body: "Your full training block as a week grid. Foundation phase, corrective work, light loading. Tap any day to drill into its sessions." },
      { title: "Library", body: "85+ techniques across Strength, Core, Mobility, Bagwork, and Foundation. Tap any technique to see sets, reps, and coaching cues." },
      { title: "Waybook", body: "Personal health journal anchored to the Library tab. Locked behind a second auth. The coach reads it. Nobody else does." },
      { title: "Settings", body: "Morning alarm, Muay Thai class days, bag work category chips. The redeploy counter shows days until the next training block." },
      { title: "Ledger", body: "Weekly summary: sessions complete vs planned, new PRs, volume delta vs last week. The chart telling the truth, not the plan." },
      { title: "Strava bridge", body: "Every run routes into the coaching layer automatically via webhook. HR zones pulled per split. Pace drift against targets. Type divergence flagged when you did Muay Thai instead of strength." },
    ],
  },
];
