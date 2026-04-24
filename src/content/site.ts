export const site = {
  name: "Bridge Four",
  domain: "bridgefour.co",
  tagline: "Still at the desk job. Still building the thing.",
  // Brand identity, not a role pitch. Role targeting lives on the resume.
  positioning: "Toronto · Account Manager · Builds AI products",
  thesis:
    "Two AI products, shipped solo from the desk job. One helps other people find work. One rewrites my training week when sleep, soreness, and heart rate say the plan is wrong.",
  author: {
    name: "Josh Bocas",
    handle: "Bowgull",
    role: "Account manager. Builds AI-native tools.",
    email: "bocas.joshua@gmail.com",
    linkedin: "https://linkedin.com/in/joshua-bocas",
    github: "https://github.com/Bowgull",
    resume: "/assets/resume.pdf",
  },
  // Sygnalist voice: direct, tactical, concrete. No HR sludge.
  heroLeft: {
    label: "Sygnalist",
    lines: [
      "Job hunting is broken.",
      "I built the radar.",
    ],
    sub: "Ten job sources into one ranked inbox. Tiered scoring, why-fit reasoning, a Gmail parser that catches what the APIs miss. One rule: every action manual, every decision visible.",
  },
  // Waymark voice canon: no em dashes, no exclamations, no congratulations.
  heroRight: {
    label: "Waymark",
    lines: [
      "A coach that thinks.",
      "Not a calendar.",
    ],
    sub: "Reads Strava, sleep, soreness, heart rate, pace. Runs through Claude with mandatory tool use. Rewrites the week when the pattern disagrees with the plan. Spotify keeps playing.",
  },
  // Three stories. What I watched. How I read it. What I built.
  howIWork: [
    {
      tag: "Sygnalist",
      headline: "Friends were losing weekends to a broken job search.",
      problem:
        "LinkedIn alerts, Greenhouse digests, direct pitches, Indeed roll-ups. A job seeker burns Sunday sorting the pile by hand, scoring fit against their own profile, tracking who is worth a real application and who is noise.",
      move:
        "V1 shipped inside Google Apps Script so people could use it without a new login. Once it earned the rebuild, I moved it to Next.js on Vercel with Supabase and multi-profile from day one. Ten job sources fan into one ranked inbox. Twenty-five enrichments run in parallel. Every fetch manual, every promotion visible, every decision logged.",
      stack: ["Next.js 16", "Supabase", "Vercel cron", "Claude API", "OpenAI", "Gmail API", "Apps Script (v1)"],
    },
    {
      tag: "Waymark",
      headline: "My training plan ignored the week I actually had.",
      problem:
        "Sleep was short. Soreness hit four out of five. HR drifted high on a Zone 2 run. Every app rendered the old schedule like nothing happened and marked me as behind. The pattern tells the truth, not the plan.",
      move:
        "Every Strava ride, every wellness entry, every skipped session feeds one signal bundle. A pre-filter decides if there is real signal worth a model call. If yes, Claude Sonnet runs with a cached system prompt, interleaved thinking, mandatory tool use, a 512-token output ceiling. The model returns one structured action. The week changes silently. You open the app, the plan has moved.",
      stack: ["Cloudflare Workers", "D1", "Hono + Drizzle", "Claude Sonnet 4.6", "Strava (webhook + poll)", "Capacitor iOS", "Swift (AVFoundation, ActivityKit)"],
    },
    {
      tag: "Day job",
      headline: "Every role closed a real gap with numbers attached.",
      problem:
        "Industrial manufacturing with 12 reps across 6 states kept eating backorders. A digital agency was burning 5 to 8 hours a day on onboarding calls, repeating the same account-linking fixes. A higher-ed payments platform had client IT and internal product talking past each other on ERP reconciliation.",
      move:
        "IPEX: delivery accuracy to ~95% by surfacing order issues before they hit the dock. Backorders down ~20% after cleaning CRM data that was jamming the flow. Skytale: campaign activation time down ~15% with SOPs and Loom walkthroughs. Tickets down ~30%. PayMyTuition: own reconciliation across Ellucian Banner, Colleague, PeopleSoft. Translate between client IT and internal product.",
      stack: ["CRM hygiene", "Order management", "SOPs + Loom", "Ellucian Banner / Colleague / PeopleSoft", "Multi-currency + FX"],
    },
  ],
  experience: [
    {
      role: "Account Manager",
      company: "PayMyTuition",
      period: "2026. Present.",
      summary:
        "Higher-ed payments platform. Onboard colleges and universities for domestic and cross-border tuition, including multi-currency and FX. Train finance, registrar, and IT teams on how payments flow through ERP/SIS stacks like Ellucian Banner, Colleague, and PeopleSoft. Own reconciliation and settlement so student billing lines up across systems. Translation layer between client IT and internal product.",
    },
    {
      role: "Customer Success and Operations",
      company: "IPEX by Aliaxis",
      period: "2023. 2025.",
      summary:
        "North American industrial manufacturing. Delivery accuracy up to ~95% by surfacing order issues early. Backorders down ~20% after cleaning the CRM data that was jamming the flow. Covered 6 states, 12 reps, 40 to 60 weekly customer conversations. Partnered with sales to reset expectations early and cut repeat escalations.",
    },
    {
      role: "Digital Onboarding Specialist",
      company: "Skytale Digital",
      period: "2022. 2023.",
      summary:
        "Digital marketing agency. Onboarded 30+ restaurant clients through 5 to 8 daily Zoom sessions across Meta, TikTok, and Google Ads. Campaign activation time down ~15% by troubleshooting account-linking, 2FA, and verification blockers. Support tickets down ~30% after SOPs and Loom walkthroughs the team adopted.",
    },
    {
      role: "Customer Experience Manager",
      company: "The Donnelly Group",
      period: "2019. 2022.",
      summary:
        "Hospitality. Front-of-house operations and team leadership. Led FOH teams in a high-volume environment, trained and coached staff, managed scheduling and inventory, reinforced a customer-first culture across shifts.",
    },
  ],
};
