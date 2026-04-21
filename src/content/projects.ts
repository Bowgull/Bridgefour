export type Screen = {
  file: string; // filename in public/assets/[slug]/screens/
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: string;
  role: string;
  year: string;
  stack: string[];
  color: string; // accent color for this project's page
  // 5-beat spine
  problem: {
    headline: string;
    body: string;
    beforeImage?: string; // filename in public/assets/[slug]/
  };
  approach: {
    headline: string;
    body: string;
    architectureImage?: string;
  };
  product: {
    headline: string;
    screens: Screen[];
    videoFile?: string; // filename in public/assets/[slug]/
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
};

export const projects: Project[] = [
  {
    slug: "sygnalist",
    title: "Sygnalist",
    tagline: "A job search radar for people drowning in noise. Signal surfaced, control kept.",
    status: "Controlled prototype. Live internal use.",
    role: "Founder, Lead Systems Engineer. Solo build.",
    year: "2025. Present.",
    stack: ["Google Apps Script", "OpenAI API", "Google Sheets", "HTML/CSS portals", "LockService"],
    color: "#4ACAAA",
    problem: {
      headline: "Job hunting is broken. Everyone knows. Nobody fixes it.",
      body:
        "Aggregator emails, LinkedIn alerts, direct pitches, newsletter roll-ups. A job seeker burns their evening sorting all of it, scoring fit against their own profile, tracking who is worth applying to and who is noise. The tools that claim to help mostly add more noise. I watched friends and family grind through it, spend hours getting nowhere, and lose faith in a market that is supposed to connect them to work. The system deserved a rebuild. So I built the radar. For them.",
      beforeImage: "before.png",
    },
    approach: {
      headline: "Ten sources. One ranked inbox. One click to apply.",
      body:
        "Sygnalist pulls from ten sources in one fetch. Remotive, RemoteOK, Jooble (which back-feeds Indeed, Monster, Glassdoor), Adzuna US, Adzuna Canada, USAJobs, plus a gated RapidAPI fallback for JSearch, LinkedIn last-7-days, and an ATS feed when the primary sources come back thin. A Gmail newsletter parser catches everything else: LinkedIn alerts, Greenhouse, Lever, Workday, Ashby, Breezy, Jobvite, iCIMS, SmartRecruiters. Each source has its own adapter with request builder, response parser, and company-name normaliser. All of it runs behind one hard law: no scheduled jobs, no onEdit calling external APIs, every action manual and visible. A user triggers a fetch, 25 OpenAI enrichment requests fan out in parallel, a rule-based scorer applies hard disqualifiers and soft weights, every job gets tiered S through X, and the user sees one ranked inbox. Multi-profile from day one: one Engine Workbook as system of record, each user gets their own Portal sheet mirrored from it.",
      architectureImage: "architecture.png",
    },
    product: {
      headline: "Three surfaces. One source of truth.",
      screens: [
        { file: "01.png", caption: "Fetch. Ten sources, 25 enrichments in parallel, tiered S through X. Five seconds, not fifty." },
        { file: "02.png", caption: "Client portal. Tier chip, role lane, why-fit bullets on the flip side. One click promotes to Tracker." },
        { file: "03.png", caption: "Admin tab. Profile soft-lock, analytics per source, logs export with emoji status grouping." },
      ],
      videoFile: "walkthrough.mp4",
    },
    tools: {
      headline: "Ten APIs. One stack. Zero servers.",
      body:
        "Google Apps Script so the whole thing lives inside tools users already have, no login, no new tab. Ten job-source integrations behind a unified adapter dispatch. API keys managed through Script Properties, never in code. OpenAI ChatCompletions for enrichment and why-fit reasoning, batched twenty-five in parallel to cut latency ten times. Sheets as the data layer: one Engine Workbook as system of record, per-profile Portal sheets mirror it. LockService per profile and operation so concurrent fetches do not collide. PropertiesService for throttle state. A 📓 Logs sheet captures every fetch, promote, and error with structured details for audit. Non-destructive by design. Soft-lock a profile, it stops accepting writes but every past action stays on the record.",
      list: ["Google Apps Script", "Gmail API", "OpenAI ChatCompletions", "Remotive API", "RemoteOK API", "Jooble API", "Adzuna API", "USAJobs API", "RapidAPI (JSearch, LinkedIn, ATS)", "Google Sheets", "LockService"],
    },
    proof: {
      headline: "What this proves about how I work",
      body:
        "Sygnalist is not for me. I already have a job. I built it because the people around me were losing whole weekends to a broken system and nobody with the skills to fix it was bothering. 60-plus modules. Around 13,500 lines across Apps Script and HTML. A 1,860-line BLUEPRINT that governs every decision, from voice rules (no corporate HR sludge, plain language, short sentences) to the core law (manual, explicit, visible). The philosophy is the interesting part. Most AI tooling takes control away. Sygnalist refuses to. It amplifies signal and shows its reasoning, so the human stays in charge. That is a design decision, not a feature.",
      stat: "13.5K LOC",
      statLabel: "60 modules, 1,860-line spec, multi-profile, zero autonomous actions",
    },
  },
  {
    slug: "waymark",
    title: "Waymark",
    tagline: "A smart coach that eats Strava, sleep, soreness, RPE, and rewrites the week. Silently.",
    status: "Active build. Strava ingestion live.",
    role: "Solo build. Product, design, engineering, prompt architecture.",
    year: "2025. Present.",
    stack: ["TypeScript", "React", "Capacitor", "Cloudflare Workers", "D1 SQLite", "Drizzle ORM", "Claude Sonnet", "Swift"],
    color: "#E8C860",
    problem: {
      headline: "Every training app assumes the plan is the truth.",
      body:
        "The plan is never the truth. Sleep was short. Soreness hit four out of five. HR drifted high on what was supposed to be a Zone 2 run. You skipped Tuesday, doubled Wednesday, ran harder than prescribed, ran without the strap. Every app ignores all of that and keeps rendering the old schedule like nothing happened. Then marks you as behind. I have trained for years and watched every app fail at the same thing. The pattern tells the truth, not the plan. So I built one that reads the pattern.",
      beforeImage: "before.png",
    },
    approach: {
      headline: "A coach that reads everything, says nothing, acts quietly.",
      body:
        "Every workout logged, every run from Strava, every wellness entry feeds one continuous signal bundle. HR zones per split pulled from Strava webhooks and polling. Pace drift against prescribed targets. Type divergence when you did Muay Thai instead of strength. Soreness scores, sleep hours, RPE, athlete notes, block adherence, last-2-hour history. Five event types fire into the reactive layer: session completed, skipped, replaced, wellness logged, nightly rollover. A pre-filter gate decides if there is real signal worth a model call. If yes, the bundle goes to Claude Sonnet 4.6 with a cached system prompt, interleaved thinking enabled, mandatory tool use, a 512-token output ceiling. The model returns one structured action: move, swap, reduce intensity, add recovery, hold. A two-hour debounce prevents second-guessing. The change writes to weekAdjustments with status accepted. No push, no toast, no badge. You see the new plan the next time you open the app.",
      architectureImage: "architecture.png",
    },
    product: {
      headline: "A coach on the lock screen. Music still playing.",
      screens: [
        { file: "01.png", caption: "Today. Morning report, mobility block, bag work rounds. Plain language, no congratulations." },
        { file: "02.png", caption: "Ledger. Completion rings, HR zone distribution from Strava splits, the chart telling the truth." },
        { file: "03.png", caption: "Live Activity. Round 3 of 12, 0:47 left. Pause, resume, advance, end — all live from the lock screen while Spotify keeps playing." },
      ],
      videoFile: "walkthrough.mp4",
    },
    tools: {
      headline: "Edge-first backend. Native where it counts.",
      body:
        "Cloudflare Workers with D1 SQLite for the backend, Hono for routing, Drizzle for the schema. 29,500 lines of TypeScript on top. React through Capacitor wraps into a real iOS shell so I can reach AVFoundation and ActivityKit directly. The audio plugin uses playback category with mixWithOthers and duckOthers, so round-start bells and 10-second finish warnings slip under Spotify and auto-restore with notifyOthersOnDeactivation. The Live Activity plugin exposes Pause, Resume, Advance, and End as bidirectional controls; an internal end-tracker singleton disambiguates app-initiated ends from user swipe-to-dismiss so the session tears down cleanly either way. Strava integration runs webhook for fast ingestion and poll as a safety net, with auto-matching to planned sessions by date and sport. Claude Sonnet 4.6 via the Anthropic SDK, prompt caching on by default, interleaved-thinking beta enabled, tool use mandatory for every coaching call.",
      list: ["Cloudflare Workers", "D1 SQLite", "Hono", "Drizzle ORM", "React + Capacitor", "Swift (AVFoundation, ActivityKit)", "Claude Sonnet 4.6 (Anthropic SDK)", "Strava (webhook + poll)", "Prompt caching", "Interleaved thinking"],
    },
    proof: {
      headline: "What this proves about how I work",
      body:
        "29,500 lines of TypeScript. 53 feature screens. Eight AI coaching systems, each with pre-filter gates so the model is only called when rules cannot decide on their own. A Cloudflare Workers backend handling Strava webhooks and scheduled polling. Two Swift plugins I wrote to reach the iOS surfaces React cannot. A voice canon enforced at every string: no exclamation marks, no em dashes, no congratulations. The app does not applaud me for training. It reads the pattern, thinks, and tells me the truth. That is the point.",
      stat: "29.5K LOC",
      statLabel: "53 screens, 8 AI systems, Strava live, bidirectional Live Activity, prompt caching + interleaved thinking",
    },
  },
];
