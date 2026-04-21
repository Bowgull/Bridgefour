export const site = {
  name: "Bridge Four",
  domain: "bridgefour.co",
  tagline: "Still at the desk job. Still building the thing.",
  positioning:
    "Fintech AM · Ships AI-native tools · Open to Solutions Engineer, Forward Deployed, Technical AM, AI Implementation",
  thesis:
    "Two AI products. One helps other people find work. One rewrites my training week when the body says otherwise. Both solo, both shipping, both from the desk job.",
  author: {
    name: "Josh Bocas",
    handle: "Bowgull",
    role: "Fintech Account Manager. Builder of AI-native tools.",
    email: "bocas.joshua@gmail.com",
    linkedin: "https://linkedin.com/in/joshua-bocas",
    github: "https://github.com/Bowgull",
    resume: "/assets/resume.pdf",
  },
  // Sygnalist voice: direct, tactical, concrete. Zero HR sludge. Sharp AM walking
  // someone through the signal.
  heroLeft: {
    label: "Sygnalist",
    lines: [
      "Job hunting is broken.",
      "I built the radar.",
    ],
    sub: "Ten job sources. One ranked inbox. Tiered scoring, why-fit reasoning, a Gmail parser that catches the rest. One hard rule: no autonomous actions.",
  },
  // Waymark voice: dark, sparse, observation before instruction. No em dashes,
  // no exclamations, no congratulations. Numbers stated plainly.
  heroRight: {
    label: "Waymark",
    lines: [
      "A coach that thinks.",
      "Not a calendar.",
    ],
    sub: "Reads Strava, sleep, soreness, RPE, pace. Thinks with Claude Sonnet under mandatory tool use. Rewrites the week. Spotify keeps playing.",
  },
  // Three real stories. Problem I watched. How I read it. What I built. Tools.
  howIWork: [
    {
      tag: "Sygnalist",
      headline: "Friends were losing weekends to a broken job search.",
      problem:
        "LinkedIn alerts, Greenhouse digests, direct pitches, Indeed roll-ups. A job seeker burns Sunday sorting the pile by hand, scoring fit against their own profile, tracking who is worth applying to and who is noise.",
      move:
        "Shipped v1 in Google Apps Script so people could use it without a new login. Once it earned the rebuild, moved it to Next.js 16 on Vercel with Supabase SSR and multi-profile from day one. Ten job sources fan into one ranked inbox. Twenty-five enrichments run in parallel. One hard law: no autonomous actions. Every fetch manual, every promotion visible, every decision logged.",
      stack: ["Next.js 16", "Supabase", "Vercel cron", "Claude API", "OpenAI", "Gmail API", "Apps Script (v1)"],
    },
    {
      tag: "Waymark",
      headline: "My training plan ignored the week I actually had.",
      problem:
        "Sleep was short. Soreness hit four out of five. HR drifted high on a Zone 2 run. Every app rendered the old schedule like nothing happened and marked me as behind. The pattern tells the truth, not the plan.",
      move:
        "Every Strava ride, every wellness entry, every skipped session feeds one signal bundle. A pre-filter gate decides if there is real signal worth a model call. If yes, Claude Sonnet 4.6 runs with cached system prompt, interleaved thinking, mandatory tool use, 512-token output ceiling. The model returns one structured action and the week changes silently. No push. No toast. You open the app, the plan has moved.",
      stack: ["Cloudflare Workers", "D1", "Hono + Drizzle", "Claude Sonnet 4.6", "Strava (webhook + poll)", "Capacitor iOS", "Swift (AVFoundation, ActivityKit)"],
    },
    {
      tag: "Day job",
      headline: "Every role closed a real gap with numbers attached.",
      problem:
        "Industrial manufacturing with 12 reps across 6 states kept eating backorders. A digital agency was burning 5 to 8 hours a day on onboarding calls repeating the same account-linking fixes. A higher-ed payments platform had client IT and internal product speaking past each other on ERP reconciliation.",
      move:
        "At IPEX: lifted delivery accuracy to roughly 95% by surfacing order issues before they hit the dock, cut backorders roughly 20% after cleaning the CRM data that was jamming the flow. At Skytale: cut campaign activation time roughly 15% with SOPs and Loom walkthroughs, tickets down roughly 30%. At PayMyTuition: own reconciliation across Ellucian Banner, Colleague, PeopleSoft and translate between client IT and internal product.",
      stack: ["CRM hygiene", "Order management", "SOPs + Loom", "Ellucian Banner / Colleague / PeopleSoft", "Multi-currency + FX"],
    },
  ],
  experience: [
    {
      role: "Account Manager",
      company: "PayMyTuition",
      period: "2026. Present.",
      summary:
        "Higher-ed payments platform. Domestic and cross-border tuition. Onboard colleges and universities for multi-currency and FX scenarios. Train finance, registrar, and IT teams on how payments flow through ERP/SIS stacks like Ellucian Banner, Colleague, and PeopleSoft. Own reconciliation and settlement so student billing lines up across systems. Translation layer between client IT and internal product and support.",
    },
    {
      role: "Customer Success and Operations",
      company: "IPEX by Aliaxis",
      period: "2023. 2025.",
      summary:
        "North American industrial manufacturing. Order management, CRM, delivery ops. Lifted delivery accuracy to roughly 95% by surfacing order issues early. Cut backorders roughly 20% after cleaning the CRM data that was jamming the flow. Covered 6 states, 12 reps, 40 to 60 weekly customer conversations. Partnered with sales to reset expectations early and reduce repeat escalations.",
    },
    {
      role: "Digital Onboarding Specialist",
      company: "Skytale Digital",
      period: "2022. 2023.",
      summary:
        "Digital marketing agency. Client onboarding for restaurant ad campaigns. Onboarded 30+ restaurant clients through 5 to 8 daily Zoom sessions across Meta, TikTok, Google Ads. Cut campaign activation time roughly 15% by troubleshooting account-linking, 2FA, and verification blockers. Support tickets down roughly 30% after SOPs and Loom walkthroughs the team adopted.",
    },
    {
      role: "Customer Experience Manager",
      company: "The Donnelly Group",
      period: "2019. 2022.",
      summary:
        "Hospitality. Front-of-house operations and team leadership. Led FOH teams in a high-volume environment. Trained and coached staff, resolved real-time escalations, managed scheduling and inventory, reinforced a customer-first culture across shifts.",
    },
  ],
};
