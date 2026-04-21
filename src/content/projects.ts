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
    tagline: "Gmail-native AI that turns a recruiter's inbox into a structured pipeline.",
    status: "In production",
    role: "Solo build — design, architecture, development",
    year: "2024–2025",
    stack: ["Google Apps Script", "TypeScript", "Gmail API", "Gemini AI", "Google Sheets"],
    color: "#4a9d7f",
    problem: {
      headline: "Recruitment runs on email. Email is chaos.",
      body:
        "Recruiters live in Gmail. Every new candidate, every client update, every interview confirmation lands as an unstructured email. There's no automatic pipeline — someone has to read, categorise, score, and move each one by hand. I was that someone. So I stopped doing it manually.",
      beforeImage: "before.png",
    },
    approach: {
      headline: "Email in. Structured intelligence out.",
      body:
        "Sygnalist hooks directly into Gmail as a sidebar. When a recruitment email arrives, it ingests the raw text, runs it through an AI parsing and enrichment pipeline, extracts candidate details and job context, scores the candidate against open roles, and writes a structured profile card — all without leaving Gmail. An admin portal surfaces the full pipeline; a client portal gives hiring managers a clean view of their candidates.",
      architectureImage: "architecture.png",
    },
    product: {
      headline: "The three moments that matter",
      screens: [
        { file: "01.png", caption: "Gmail sidebar: email ingested, candidate card populated automatically" },
        { file: "02.png", caption: "Admin portal: full pipeline view, scoring, filtering by role and status" },
        { file: "03.png", caption: "Client portal: clean candidate view for hiring managers, no inbox access needed" },
      ],
      videoFile: "walkthrough.mp4",
    },
    tools: {
      headline: "What I used and why",
      body:
        "Built on Google Apps Script to live natively inside the tools recruiters already use — no new login, no new tab. AI enrichment and scoring via Gemini. Sheets as the database keeps everything auditable and portable. TypeScript throughout for a codebase that doesn't collapse as it grows.",
      list: ["Google Apps Script", "Gmail API", "Gemini AI", "Google Sheets", "TypeScript", "HTML/CSS portals"],
    },
    proof: {
      headline: "What this proves about how I work",
      body:
        "I built Sygnalist because I was the manual process. I understood the problem from the inside, mapped the data flow, designed the AI integration, and shipped it solo. It replaced hours of repetitive email triage with a pipeline that runs automatically. That's the pattern: find a broken system, understand it completely, rebuild it with AI where AI actually helps.",
      stat: "Automated",
      statLabel: "A workflow that previously ran on manual email triage",
    },
  },
  {
    slug: "waymark",
    title: "Waymark",
    tagline: "An AI strength coach that adjusts in real time when life gets in the way.",
    status: "In development (TestFlight)",
    role: "Solo build — product, design, iOS development",
    year: "2025–ongoing",
    stack: ["Swift", "SwiftUI", "Claude AI", "Core Data", "HealthKit", "AVFoundation"],
    color: "#c9a961",
    problem: {
      headline: "Every training app assumes you'll follow the plan.",
      body:
        "Most training apps give you a program and expect you to execute it. But real life — missed sessions, fatigue, injury, a week of travel — makes that impossible. The app doesn't care. It just sits there, marking you as behind. I've trained for years and watched every app fail at this same thing. So I built one that doesn't.",
      beforeImage: "before.png",
    },
    approach: {
      headline: "Watch what actually happens. Adjust accordingly.",
      body:
        "Waymark generates a structured strength program from your profile. But the intelligence lives in the reactive layer: every time you log, skip, or modify a session, an event fires. The AI coach reads your recent training history, your fatigue signals, your upcoming schedule, and replans the week silently. You don't get a hold/adjust prompt. You get a plan that already accounts for what happened.",
      architectureImage: "architecture.png",
    },
    product: {
      headline: "A coach, not a calendar",
      screens: [
        { file: "01.png", caption: "Week view: the live training plan, adjusted after every session" },
        { file: "02.png", caption: "Workout view: guided session with exercise tracking and coach cues" },
        { file: "03.png", caption: "Lock screen: Live Activity shows your current set, rep, and rest timer" },
      ],
      videoFile: "walkthrough.mp4",
    },
    tools: {
      headline: "What I used and why",
      body:
        "Swift and SwiftUI for a native iOS feel that no cross-platform framework can match when you care about animations and haptics. Claude AI for the coach intelligence — structured output, context-aware replanning, and a voice that doesn't sound like a chatbot. HealthKit for passive data. AVFoundation for audio that ducks politely under your music instead of killing it.",
      list: ["Swift", "SwiftUI", "Claude AI (Anthropic)", "Core Data", "HealthKit", "AVFoundation", "Live Activities"],
    },
    proof: {
      headline: "What this proves about how I work",
      body:
        "Waymark is a solo iOS app with a production-quality AI integration, a custom audio system, Live Activities on the lock screen, and a reactive planning engine that fires on real user behaviour. I scoped it, designed it, and built it. It's not a side project that runs on demo data — it's a real app with real complexity, built because the problem was real.",
      stat: "Solo",
      statLabel: "iOS app with AI coaching, live activities, and reactive replanning",
    },
  },
];
