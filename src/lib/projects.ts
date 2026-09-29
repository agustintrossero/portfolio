/**
 * PROJECTS — the content layer for every case study.
 *
 * Each entry powers two things automatically:
 *   1. A row in the homepage "Selected Work" list (or "More work" if kind:"gallery").
 *   2. Its own case-study page at /work/<slug>/ (deep cases only).
 *
 * The case-study template renders ONLY the sections you fill in, so a
 * half-finished project won't break — leave fields out and they vanish.
 *
 * To add a project: copy the shape below, give it a unique `slug`, set
 * `published: true` when it's ready to show. That's the only file you touch.
 */

export type ApproachStep = {
  /** Short heading for this part of the approach, e.g. "Research". */
  title: string;
  /** 1–3 sentences describing what you did and why. */
  body: string;
};

/** A framed opportunity, shown as a "How might we…" card. */
export type Opportunity = {
  /** Short label for the opportunity, e.g. "Multiple Cardholders". */
  title: string;
  /** The "How might we…" question this opportunity opens. */
  hmw: string;
};

export type CaseImage = {
  /** Path inside /public, e.g. "/work/paypal/flow.png". */
  src: string;
  /** Accessible alt text — always describe the image. */
  alt: string;
  /** Intrinsic pixel width — keeps aspect ratio correct (no distortion). */
  width: number;
  /** Intrinsic pixel height. */
  height: number;
  /** Optional short caption shown under the image. */
  caption?: string;
  /** "wide" spans the full content width; "half" sits in a 2-up grid. */
  span?: "wide" | "half";
};

/** A short clip shown where the *motion* is the argument. */
export type CaseVideo = {
  /** Path to the mp4 inside /public, e.g. "/work/gds/theme-swap.mp4". */
  src: string;
  /** Poster image shown before play (path inside /public). */
  poster?: string;
  /** Optional caption under the video. */
  caption?: string;
};

export type ExternalLink = {
  /** e.g. "Figma", "Behance", "Live site". */
  label: string;
  href: string;
};

/** The hero visual — a product screen shown inside a device mockup. */
export type Showcase = {
  /** Which frame to render the screen in. */
  device: "phone" | "tablet" | "browser";
  /** Screen image (path inside /public). */
  src: string;
  /** Accessible alt text. */
  alt: string;
  /** Real prototype clip (mp4). If set, a play button plays it inline. */
  video?: string;
  /** Poster for the video (defaults to `src`). */
  poster?: string;
  /** Show a decorative play button + "Prototype" chip until a clip exists. */
  videoSlot?: boolean;
  /** Optional caption under the device. */
  caption?: string;
};

export type Project = {
  /** URL slug — must be unique, lowercase, no spaces. */
  slug: string;
  /** Company or client, e.g. "PayPal". */
  company: string;
  /** Your role, e.g. "Lead UX/UI Designer". */
  role: string;
  /** Year or range, e.g. "2024" or "2022–2023". */
  period?: string;
  /** Big hero statement — the case's thesis, e.g. "Designing flexibility for growth." */
  headline?: string;
  /** 1–2 line description for the homepage list. Keep it tight. */
  summary: string;
  /** Discipline tags shown in UPPERCASE, e.g. ["UX", "Design Systems"]. */
  tags: string[];
  /** Set true when the project is ready to be public. */
  published: boolean;
  /** "gallery" = quick-scan item (compact card, no deep page). Default: deep case. */
  kind?: "case" | "gallery";

  /** Cover image for the case-study header (path inside /public). */
  cover?: { src: string; alt: string; width: number; height: number };
  /** Hero visual — a screen inside a device mockup (phone/tablet/browser). */
  showcase?: Showcase;
  /** Full-bleed hero image (a pre-composed mockup); no frame. Beats showcase/cover. */
  heroImage?: { src: string; alt: string; width: number; height: number };

  /* ── Case-study body (all optional; render only when present) ── */

  /** Context + your role. The "what was this and what did I own" paragraph. */
  overview?: string;
  /** The problem / opportunity, as one paragraph. What needed solving and why. */
  challenge?: string;
  /** The problem framed as several "How might we…" opportunity cards. */
  opportunities?: Opportunity[];
  /** How you solved it — a sequence of steps. */
  approach?: ApproachStep[];
  /** Results & outcomes. Each string is a bullet; lead with the metric. */
  impact?: string[];
  /** A clip where movement is the argument (theme swaps, live interaction). */
  video?: CaseVideo;
  /** "A glimpse of outputs" — screenshots of Figma files / final screens. */
  images?: CaseImage[];
  /** Optional outbound links (Figma, Behance, live site). */
  links?: ExternalLink[];
};

export const projects: Project[] = [
  /* ═══════════════════════════════ 1 · GDS ═══════════════════════════════ */
  {
    slug: "gds-toffee",
    company: "Global Design System",
    role: "Design Systems Lead",
    period: "2023 — Present", // TODO: confirm exact range
    headline: "Build once. Ship every brand.",
    summary:
      "The Global Design System that lets one set of tokens and blocks power many products across brands and themes — with Toffee Web as the proof it executes right.",
    tags: [
      "DESIGN SYSTEMS",
      "TOKENS",
      "COMPONENTS",
      "THEMING",
      "RESPONSIVE",
      "MULTI-BRAND",
    ],
    published: true,
    cover: {
      src: "/work/gds/cover.svg",
      alt: "Placeholder cover — Global Design System, one block rendered across several brand themes",
      width: 1600,
      height: 900,
    },
    showcase: {
      device: "browser",
      src: "/work/gds/screen.svg",
      alt: "Placeholder — the Global Design System composed into a product UI",
      videoSlot: true,
      caption:
        "The same block adapting across brands, themes and breakpoints — prototype video.",
    },
    overview:
      "I lead the Global Design System (GDS) — the token architecture, the library of reusable blocks, and the responsive layout rules that sit underneath a family of products. The problem it solves is repetition: the same blocks had to live across many assets, each with its own brand and its own light/dark theme. GDS turns that into one source of truth, and Toffee Web is the reference product that shows the system executed correctly, end to end.",
    opportunities: [
      {
        title: "Reuse across brands",
        hmw: "How might we let the same blocks power many products with different brands, without rebuilding each one from scratch?",
      },
      {
        title: "Theming, light & dark",
        hmw: "How might we make a single component adapt to opposite themes from one source of truth, instead of maintaining divergent design files?",
      },
      {
        title: "Responsive by default",
        hmw: "How might we guarantee every block behaves correctly across breakpoints for every team, so responsiveness isn't re-solved page by page?",
      },
      {
        title: "Speed for teams",
        hmw: "How might we let product teams assemble a new page in hours by composing existing blocks, rather than in weeks?",
      },
      {
        title: "Coherence at scale",
        hmw: "How might we keep many products visually coherent while each one keeps its own identity?",
      },
    ],
    approach: [
      {
        title: "Layered token architecture",
        body: "Defined tokens in layers — primitive → semantic → per-asset — so a single change cascades correctly across themes and brands. Components consume semantic tokens, never hard-coded values, which is what makes one block render right anywhere.",
      },
      {
        title: "Theme-agnostic blocks",
        body: "Designed blocks as self-contained units that read from tokens, so the same block flips between light and dark and between brands without a redraw. The block is the contract; the theme is just data.",
      },
      {
        title: "Responsive contracts",
        body: "Set breakpoint behavior at the block level, so responsiveness is a property the system guarantees rather than something each team re-solves per screen.",
      },
      {
        title: "Toffee Web as the reference build",
        body: "Used Toffee Web as the proof of correct execution — the product that demonstrates the tokens, blocks and layouts working together as intended, and the benchmark new products are measured against.",
      },
      {
        title: "Design–dev lockstep",
        body: "Partnered with engineering so tokens and blocks map one-to-one to code. Design and build share the same vocabulary, which keeps the system honest and adoption cheap.",
      },
    ],
    impact: [
      "One system now powers 8+ products across distinct brands and themes. (confirm exact count)",
      "New pages assembled in hours by composing blocks, instead of rebuilt per product.",
      "Light/dark and per-brand theming from a single token source — no divergent design files.",
      "Adopted as the baseline every new product starts from.",
    ],
    // video: {
    //   src: "/work/gds/theme-swap.mp4",
    //   poster: "/work/gds/theme-swap-poster.jpg",
    //   caption: "The same block adapting across brands, themes and breakpoints.",
    // },
    images: [
      {
        src: "/work/gds/block-1.svg",
        alt: "Placeholder — the same block rendered in a light brand theme",
        caption: "One block, light theme.",
        span: "half",
        width: 1200,
        height: 900,
      },
      {
        src: "/work/gds/block-2.svg",
        alt: "Placeholder — the same block rendered in a dark brand theme",
        caption: "Same block, dark theme.",
        span: "half",
        width: 1200,
        height: 900,
      },
    ],
    links: [{ label: "Figma", href: "#" }],
  },

  /* ══════════════════════════════ 2 · LUMIO ══════════════════════════════ */
  {
    slug: "lumio",
    company: "Lumio",
    role: "Lead Product Designer", // (confirm actual title/scope)
    period: "2024–2025", // (confirm)
    headline: "Odds are everywhere. Confidence isn't.",
    summary:
      "An AI analysis layer over the betting market — not a sportsbook. It scores every bet with the Lumio Index and shows where the value actually sits.",
    tags: [
      "PRODUCT DESIGN",
      "UX/UI",
      "DATA VISUALIZATION",
      "INFORMATION DESIGN",
      "AI PRODUCT",
      "INTERACTION DESIGN",
    ],
    published: true,
    cover: {
      src: "/work/lumio/cover.svg",
      alt: "Placeholder cover — Lumio, a dark data-first betting analysis interface",
      width: 1600,
      height: 900,
    },
    showcase: {
      device: "phone",
      src: "/work/lumio/screen.svg",
      alt: "Placeholder — the Lumio Index and bookmaker comparison on mobile",
      videoSlot: true,
      caption:
        "The Lumio Index expanding into the factors behind the score — prototype video.",
    },
    overview:
      "Lumio is an analysis platform for sports betting — explicitly not a sportsbook, casino, or tipster service. It reads odds across bookmakers and turns them into a single decision aid: the Lumio Index, a confidence score, paired with value detection and side-by-side bookmaker comparison. I led product design (confirm scope) — owning the core interaction model for the Index, the comparison experience, and the dark, data-first system that holds them together. The through-line was clarity: making a noisy, distrusted category legible enough to think in.",
    opportunities: [
      {
        title: "From odds to a read",
        hmw: "How might we turn a scatter of bookmaker odds into a single number a user can trust at a glance?",
      },
      {
        title: "Analysis, not tips",
        hmw: "How might we express confidence in a bet without promising an outcome or reading as a tipster service?",
      },
      {
        title: "Where the value hides",
        hmw: "How might we surface where a bet is mispriced across bookmakers, instead of leaving the user to compare tables by hand?",
      },
      {
        title: "Legible AI",
        hmw: "How might we show why the Lumio Index landed on a score, so the number feels earned rather than arbitrary?",
      },
      {
        title: "Not a sportsbook",
        hmw: "How might we make the product unmistakably a place to analyze bets, not place them?",
      },
      {
        title: "Calm at high density",
        hmw: "How might we keep a data-dense product quiet enough to actually think in?",
      },
    ],
    approach: [
      {
        title: "The Index as the spine",
        body: "Made the Lumio Index the primary object on every screen — one confidence score the eye lands on first. Odds, books and context are arranged as support for that number, so the interface answers 'is this worth it?' before it answers anything else.",
      },
      {
        title: "Motion that explains the score",
        body: "Designed the Index as an interaction, not a static badge: opening it decomposes the score into the factors behind it. Motion carries the causality — the number expands into its reasoning — which is what turns an AI output into something a user can interrogate rather than simply accept. (confirm final interaction)",
      },
      {
        title: "Comparison built to find value, not list it",
        body: "Rejected the standard odds-table dump. Bookmaker comparison is framed around the outlier — the book pricing a bet differently from the market — so value detection is the default reading of the screen instead of something the user has to calculate.",
      },
      {
        title: "A hard line from the sportsbook",
        body: "Kept every affordance on the analysis side of the line — no 'place bet' moment, no casino cues. The product reads as a lens on the market, which protects both its positioning and the user's trust in it as an impartial read. (confirm regulatory framing)",
      },
      {
        title: "Dark, quiet, data-first",
        body: "Chose a dark, low-chroma system so the data carries the color and nothing competes with it. In a category that usually shouts, the restraint is deliberate — it frames the product as something to think with, not something selling to you.",
      },
      {
        title: "Confidence, framed honestly",
        body: "Calibrated the Index to communicate confidence, not certainty — language and visual weight tuned so a high score never reads as a guarantee. Getting this framing right is what keeps an analysis product credible past the first session. (confirm)",
      },
    ],
    impact: [
      "A dense, multi-bookmaker market compressed into one read — the Lumio Index — so a bet can be judged at a glance instead of by parsing tables across books. (confirm with testing)",
      "Value detection made the default reading of the screen: the product points to where a bet is mispriced across books, rather than leaving the user to find it. (confirm)",
      "The Index is built to be questioned — its score decomposes into the factors behind it, so the AI output can be interrogated rather than taken on faith. (confirm the UI exposes this)",
      "Reads unmistakably as analysis, not a sportsbook — protecting both the positioning and the user's trust in the score. (confirm)",
      "A dark, low-noise system that stays legible at high data density — a deliberate break from the category's cluttered norm.",
    ],
    // video: {
    //   src: "/work/lumio/index-interaction.mp4",
    //   poster: "/work/lumio/index-poster.jpg",
    //   caption: "The Lumio Index expanding into the factors behind the score.",
    // },
    images: [
      {
        src: "/work/lumio/block-1.svg",
        alt: "Placeholder — the Lumio Index, collapsed and expanded",
        caption: "The Lumio Index — the confidence score at the center.",
        span: "half",
        width: 1200,
        height: 900,
      },
      {
        src: "/work/lumio/block-2.svg",
        alt: "Placeholder — bookmaker comparison surfacing the value outlier",
        caption: "Bookmaker comparison, framed around the value outlier.",
        span: "half",
        width: 1200,
        height: 900,
      },
    ],
    links: [{ label: "Figma", href: "#" }],
  },

  /* ═══════════════════════ 3 · CONTENT CREATOR AI ════════════════════════ */
  {
    slug: "content-creator-ai",
    company: "Content Creator AI", // (workflow proposed "MoveUp"; using the tool's name — confirm)
    role: "Product Designer — AI Workflow", // (confirm — adjust to Lead/Senior if that's the real title)
    period: "2024", // (confirm)
    headline: "Automate the busywork. Keep the human call.",
    summary:
      "An AI workflow that finds sports-betting articles, generates the featured image, and drafts the social post — turning a manual, multi-tool routine into one review-and-approve step, with a person deciding what ships.",
    tags: [
      "PRODUCT DESIGN",
      "AI WORKFLOW",
      "AUTOMATION",
      "HUMAN-IN-THE-LOOP",
      "CONTENT OPS",
      "EDITORIAL TOOLING",
    ],
    published: true,
    cover: {
      src: "/work/content-creator-ai/cover.svg",
      alt: "Placeholder cover — an AI content workflow ending in a human approval step",
      width: 1600,
      height: 900,
    },
    showcase: {
      device: "browser",
      src: "/work/content-creator-ai/screen.svg",
      alt: "Placeholder — the AI content workflow and its human approval step",
      videoSlot: true,
      caption:
        "The workflow end to end — source, image, post, human approval — prototype video.",
    },
    overview:
      "A content team was sourcing sports-betting articles, producing a featured image, and writing each social post by hand — repetitive work that ate hours and scaled badly. I designed the AI workflow that automates the three mechanical steps — discovery, image generation, and post assembly — while deliberately leaving editorial judgment and the publish decision to a person. I owned the product decisions: what to automate, where the human belongs, and how to keep output on-brand and safe to release.",
    opportunities: [
      {
        title: "Busywork vs. judgment",
        hmw: "How might we remove the repetitive find-image-write steps without removing the editorial judgment that makes a post worth publishing?",
      },
      {
        title: "Where the human belongs",
        hmw: "How might we place the person at the one point where their judgment changes the outcome, instead of gating every step?",
      },
      {
        title: "On-brand generation",
        hmw: "How might we make an AI-generated image and caption read as ours, rather than as generic model output an editor has to rebuild?",
      },
      {
        title: "Trust in an automated draft",
        hmw: "How might we let an editor approve or reject in seconds, with enough context to trust a draft they didn't write?",
      },
      {
        title: "Compliance in betting content",
        hmw: "How might we keep automated sports-betting copy inside legal and responsible-gambling limits before anything reaches approval?",
      },
      {
        title: "Failure without silence",
        hmw: "How might we surface a dead source or a failed image instead of quietly shipping a broken post?",
      },
    ],
    approach: [
      {
        title: "Automate the mechanics, not the judgment",
        body: "Split the routine into mechanical steps — find, generate, assemble — and one judgment step — approve. Only the mechanical steps were automated. The person's value was never the copy-paste; it was deciding whether a given article and angle should go out at all.",
      },
      {
        title: "One human gate, placed last",
        body: "Put a single review at the end, on a fully assembled draft, rather than a sign-off at each stage. One finished artifact is faster to judge than four partial ones, and it keeps the decision at the last point where a person can still stop a bad post.",
      },
      {
        title: "Draft, never auto-publish",
        body: "The workflow builds a ready-to-post draft and stops there. Auto-publishing sports-betting content carries brand and compliance risk no automation should absorb alone, so the publish action stays with the person — a deliberate limit on what the system is allowed to do.",
      },
      {
        title: "Constrain the generation",
        body: "Fed image and caption generation brand and format constraints instead of open prompts, so output arrives close to publishable. The trade-off is less variety for far less editing — the editor tweaks rather than rebuilds.",
      },
      {
        title: "Make the draft inspectable",
        body: "Showed the source article, the generated image, and the assembled post together at the approval step. An editor has to see why a draft looks the way it does to trust it; a black-box output just gets rewritten from scratch, erasing the time the automation saved.",
      },
      {
        title: "Fail loud, not silent",
        body: "Designed explicit failure states for dead sources and failed generations, so the pipeline flags them for a person instead of shipping something broken. One silently bad post would cost more trust than the whole workflow saves.",
      },
    ],
    impact: [
      "A multi-tool manual routine collapsed to one review-and-approve action per post, cutting production time substantially (confirm).",
      "The team shifted from assembling posts to deciding which ones ship — same output, far less mechanical work.",
      "Editorial judgment and the publish decision stayed with a person, keeping brand and compliance risk off the model.",
      "Output arrives near-publishable, so the editor reviews and tweaks instead of rebuilding from scratch.",
      "The workflow can take on more posts per day without adding manual hours (confirm).",
    ],
    // video: {
    //   src: "/work/content-creator-ai/workflow-run.mp4",
    //   poster: "/work/content-creator-ai/workflow-poster.jpg",
    //   caption: "The workflow end to end — source found, image generated, post assembled, human approves.",
    // },
    images: [
      {
        src: "/work/content-creator-ai/block-1.svg",
        alt: "Placeholder — the approval step showing source, generated image and assembled post together",
        caption: "The approval step: source, image and post, side by side.",
        span: "half",
        width: 1200,
        height: 900,
      },
      {
        src: "/work/content-creator-ai/block-2.svg",
        alt: "Placeholder — before/after: the old manual routine vs. one approval view",
        caption: "Before/after — a multi-tool routine, collapsed to one gate.",
        span: "half",
        width: 1200,
        height: 900,
      },
    ],
    links: [{ label: "Figma", href: "#" }],
  },

  /* ══════════════════════════════ 4 · LEBI ═══════════════════════════════ */
  {
    slug: "lebi",
    company: "Lebi", // client: MoveUp Media
    role: "Design Lead", // created it + led the design team (confirm exact title)
    period: "2024–2025",
    headline: "It began as scattered ideas. I gave it a spine.",
    summary:
      "A gamified sports-predictions SaaS I created and led at MoveUp Media — from positioning and a modular design system to the calls that turned scattered ideas into a shipped product.",
    tags: [
      "DESIGN LEADERSHIP",
      "PRODUCT DIRECTION",
      "DESIGN SYSTEMS",
      "UX RESEARCH",
      "PLG",
      "AI PROTOTYPING",
    ],
    published: true,
    cover: {
      src: "/work/lebi/cover.jpg",
      alt: "Lebi — brand cover illustration",
      width: 1800,
      height: 1200,
    },
    heroImage: {
      src: "/work/lebi/mockup-1.png",
      alt: "Lebi's gamified dashboard shown on a laptop, with the Lebi mascot",
      width: 1800,
      height: 1155,
    },
    overview:
      "Lebi is a gamified sports-predictions platform — a game to play, not a betting product — that I created and led at MoveUp Media. It started with scattered ideas and no identity; my job was less drawing screens than engineering a product: setting the positioning, standing up a modular design system, and making the calls that moved it from concept to a shipped SaaS. I led the design end to end and directed the designers building alongside me.",
    opportunities: [
      {
        title: "Structure from chaos",
        hmw: "How might we turn scattered ideas and no identity into a product with a clear spine, quickly?",
      },
      {
        title: "A game, not a bet",
        hmw: "How might we position Lebi as a game to play — not a betting product — and hold that line across the whole experience?",
      },
      {
        title: "Design that feeds delivery",
        hmw: "How might we set up design to feed fast, continuous development instead of blocking it?",
      },
      {
        title: "Newcomer vs. power user",
        hmw: "How might we serve a curious newcomer and a data-hungry power user without overwhelming either?",
      },
      {
        title: "Validate before building",
        hmw: "How might we test game mechanics early, before engineering commits a sprint to them?",
      },
      {
        title: "Marketing that keeps its promise",
        hmw: "How might we make the landing pages promise exactly what the product delivers?",
      },
    ],
    approach: [
      {
        title: "Positioning first: game, not bet",
        body: "Before any screen, I fixed what Lebi was — a game to play, not a betting product — and made every later call answer to it. Naming the category up front kept the team from drifting toward the sportsbook mental model.",
      },
      {
        title: "A modular design system from day one",
        body: "Built a component system before the product, not after. It let a small team ship continuously and kept product and marketing visually one thing — the leverage the whole pace depended on.",
      },
      {
        title: "Validate mechanics with AI prototypes",
        body: "Used AI-driven prototypes to simulate the game mechanics and pressure-test them before engineering committed. It's far cheaper to learn a mechanic doesn't land in a prototype than in a sprint.",
      },
      {
        title: "The pivot: split the journeys",
        body: "Our first bet was one landing experience for everyone. 20+ interviews killed it — newcomers drowned in data built for power users. I restructured the architecture to separate a Guest discovery journey from a logged-in power dashboard. Holding the nerve to pivot on the research was the call that mattered most.",
      },
      {
        title: "Handoff as a product",
        body: "Shipped behavior specs, motion guidelines and edge cases — not just redlines. Treating handoff as a deliverable cut engineering's design questions by ~40% and kept sprint velocity up. (confirm 40%)",
      },
      {
        title: "Marketing on the same system",
        body: "Built two landing pages — general onboarding and a pre-launch NBA challenge — from the same component library as the app, so the promise made in marketing matched the product exactly.",
      },
    ],
    impact: [
      "Took Lebi from no identity and scattered ideas to a structured, shipped SaaS with a clear game-vs-bet positioning.",
      "A modular design system from day one let a small team ship continuously and kept product + marketing visually one.",
      "The research-driven pivot — Guest journey vs. power dashboard — cut newcomer overwhelm and smoothed onboarding. (confirm onboarding metric)",
      "Handoff-as-a-product cut engineering design Q&A by ~40% and kept sprint velocity high. (confirm)",
      "Directed the design team and aligned engineering and stakeholders on one shared definition of the product.",
    ],
    images: [
      {
        src: "/work/lebi/user-journey.png",
        alt: "User-journey map for a football-fan persona, across awareness to loyalty",
        caption:
          "User-journey map — 4 personas, and the friction in the first-prediction flow.",
        span: "wide",
        width: 1800,
        height: 800,
      },
      {
        src: "/work/lebi/before-guest-logged.png",
        alt: "The earlier Lebi experience — one dense journey for everyone",
        caption: "Before — one experience for everyone.",
        span: "half",
        width: 1800,
        height: 1155,
      },
      {
        src: "/work/lebi/after-guest-logged.png",
        alt: "The redesigned Lebi experience — guest discovery split from the power dashboard",
        caption: "After — guest discovery, split from the power dashboard.",
        span: "half",
        width: 1800,
        height: 1155,
      },
      {
        src: "/work/lebi/dashboard-guest.png",
        alt: "The guest landing — a lighter discovery experience for newcomers",
        caption: "The guest landing — discovery for newcomers.",
        span: "half",
        width: 1800,
        height: 1155,
      },
      {
        src: "/work/lebi/landing-page-1.png",
        alt: "A Lebi landing page built from the app's own component library",
        caption: "A landing page, built from the app's own design system.",
        span: "half",
        width: 1800,
        height: 1155,
      },
    ],
    links: [{ label: "Figma", href: "#" }],
  },

  /* ════════════════════════════ GALLERY (quick) ══════════════════════════ */
  {
    slug: "brand-asset-manager",
    company: "Brand Asset Manager",
    role: "Product Designer",
    kind: "gallery",
    published: true,
    summary:
      "A self-serve library where teams find and pull brand assets on demand — logos, marks and source files — instead of routing every request through design.",
    tags: ["INTERNAL TOOL", "PRODUCT DESIGN", "UX/UI", "DESIGN OPS", "ASSET LIBRARY"],
  },
  {
    slug: "dima-world-cup",
    company: "Dima World Cup Challenge",
    role: "Product Designer",
    kind: "gallery",
    published: true,
    summary:
      "An internal World Cup prediction game the entire company ended up playing — designed for pull, not mandate, and picked up across every team.",
    tags: ["PRODUCT DESIGN", "ENGAGEMENT", "UX/UI", "INTERNAL PRODUCT", "GAMIFICATION"],
  },
  {
    slug: "super-dritta",
    company: "Super Dritta",
    role: "Brand & Social Designer",
    kind: "gallery",
    published: true,
    summary:
      "Branding and social for Super Dritta — Telegram sticker packs and matchday assets built to carry one voice across feeds.",
    tags: ["BRANDING", "SOCIAL", "ILLUSTRATION", "STICKER DESIGN", "SPORTS"],
  },
];

/** Only published projects, in declared order — used everywhere public. */
export const publishedProjects = (): Project[] =>
  projects.filter((p) => p.published);

/** Published deep case studies (everything that isn't a gallery item). */
export const caseStudies = (): Project[] =>
  publishedProjects().filter((p) => p.kind !== "gallery");

/** Published quick-scan gallery items. */
export const galleryItems = (): Project[] =>
  publishedProjects().filter((p) => p.kind === "gallery");

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
