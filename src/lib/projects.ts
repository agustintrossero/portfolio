/**
 * PROJECTS: the content layer for every case study.
 *
 * Each entry powers two things automatically:
 *   1. A row in the homepage "Selected Work" list (or "More work" if kind:"gallery").
 *   2. Its own case-study page at /work/<slug>/ (deep cases only).
 *
 * The case-study template renders ONLY the sections you fill in, so a
 * half-finished project won't break: leave fields out and they vanish.
 *
 * To add a project: copy the shape below, give it a unique `slug`, set
 * `published: true` when it's ready to show. That's the only file you touch.
 */

/** A looping 16:9 clip used inside a case study. */
export type CaseClip = {
  /** mp4 path inside /public. */
  src: string;
  /** Still frame shown before playback (path inside /public). */
  poster: string;
  /** Accessible description of what the clip shows. */
  alt: string;
  caption?: string;
};

/** A headline number for the "at a glance" strip. Only confirmed facts. */
export type Stat = {
  value: string;
  label: string;
};

export type ApproachStep = {
  /** Short heading for this part of the approach, e.g. "Research". */
  title: string;
  /** One to three sentences describing what you did and why. */
  body: string;
  /** The clip that proves this step, shown beside it. */
  media?: CaseClip;
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
  /** Accessible alt text. Always describe the image. */
  alt: string;
  /** Intrinsic pixel width, which keeps the aspect ratio correct. */
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

/** The hero visual: a product screen or a looping clip inside a device mockup. */
export type Showcase = {
  /** Which frame to render the screen in. */
  device: "phone" | "tablet" | "browser";
  /** Screen image (path inside /public). Doubles as the video poster. */
  src: string;
  /** Accessible description of what the screen or clip shows. */
  alt: string;
  /** Looping clip (mp4). Plays muted while on screen, with a pause control. */
  video?: string;
  /** Poster for the video (defaults to `src`). */
  poster?: string;
  /** Optional caption under the device. */
  caption?: string;
};

/** A project's own colours. They ignore the site theme, so each project
 *  keeps its identity and its videos blend into the background. */
export type Surface = {
  /** The exact colour behind the project's videos. */
  bg: string;
  ink: string;
  muted: string;
  /** Colour of the first half of the two-tone headline (defaults to ink). */
  lead?: string;
  /** Colour of the second half of the two-tone headline. */
  accent: string;
  /** Optional gradient for the accent text (wins over `accent`). */
  accentGradient?: string;
  /** Hairlines and chip borders. */
  line: string;
  /** Optional light behind the media (any CSS background). */
  glow?: string;
};

/** What a project shows in its home scene. */
export type SceneMedia =
  // The live GDS Match Card cycling through the brands.
  | { kind: "brand-swap" }
  // A phone playing a screen-only clip, with optional layers.
  | {
      kind: "phone";
      video: string;
      poster: string;
      alt: string;
      /** A second phone behind, showing a still screen. */
      back?: { src: string; alt: string };
      /** A transparent image floating beside the phone. */
      float?: { src: string; alt: string; width: number; height: number };
    }
  // A browser window playing a loop, with an optional phone in front.
  | {
      kind: "browser";
      video: string;
      poster: string;
      alt: string;
      phone?: { video: string; poster: string; alt: string };
    };

/** How a project introduces itself on the home. */
export type Scene = {
  /** The discipline, shown above the headline. */
  eyebrow: string;
  /** Two-tone headline: text before "|" is the lead, the rest takes the accent. */
  headline: string;
  /** One sentence of context. */
  line: string;
  /** Three short chips. */
  chips: string[];
  surface: Surface;
  media: SceneMedia;
  /** Put the media on the left on wide screens. */
  flip?: boolean;
};

export type Project = {
  /** URL slug. Must be unique, lowercase, no spaces. */
  slug: string;
  /** Company or client, e.g. "PayPal". */
  company: string;
  /** Your role, e.g. "Lead UX/UI Designer". */
  role: string;
  /** Year or range, e.g. "2024" or "2022 to 2023". */
  period?: string;
  /** Big hero statement, the case's thesis, e.g. "Designing flexibility for growth." */
  headline?: string;
  /** One or two lines for the homepage list. Keep it tight. */
  summary: string;
  /** Discipline tags shown in UPPERCASE, e.g. ["UX", "Design Systems"]. */
  tags: string[];
  /** Set true when the project is ready to be public. */
  published: boolean;
  /** "gallery" = quick-scan item (compact card, no deep page). Default: deep case. */
  kind?: "case" | "gallery";

  /** Cover image for the case-study header (path inside /public). */
  cover?: { src: string; alt: string; width: number; height: number };
  /** Hero visual: a screen or a looping clip inside a device mockup. */
  showcase?: Showcase;
  /** Full-bleed hero image (a pre-composed mockup); no frame. Beats showcase/cover. */
  heroImage?: { src: string; alt: string; width: number; height: number };
  /** Main clip of the case, full width on the project's surface. Beats every other hero visual. */
  heroVideo?: CaseClip;
  /** "At a glance" numbers under the hero. */
  stats?: Stat[];
  /** Full-width clip that shows the scope of the work (every screen, every block). */
  mosaic?: CaseClip;
  /** How the project appears on the home. Projects without one are not shown there. */
  scene?: Scene;

  /* ── Case-study body (all optional; render only when present) ── */

  /** Context + your role. The "what was this and what did I own" paragraph. */
  overview?: string;
  /** The problem / opportunity, as one paragraph. What needed solving and why. */
  challenge?: string;
  /** The problem framed as several "How might we…" opportunity cards. */
  opportunities?: Opportunity[];
  /** How you solved it, as a sequence of steps. */
  approach?: ApproachStep[];
  /** Results & outcomes. Each string is a bullet; lead with the metric. */
  impact?: string[];
  /** A clip where movement is the argument (theme swaps, live interaction). */
  video?: CaseVideo;
  /** "A glimpse of outputs": screenshots of Figma files or final screens. */
  images?: CaseImage[];
  /** Optional outbound links (Figma, Behance, live site). */
  links?: ExternalLink[];
};

export const projects: Project[] = [
  /* ═══════════════════════════════ 1 · GDS ═══════════════════════════════ */
  {
    slug: "gds-toffee",
    company: "Global Design System",
    role: "Creator and lead",
    period: "2025 to present",
    headline: "Build once. Ship every brand.",
    scene: {
      eyebrow: "Design system",
      headline: "Build once. | Ship every brand.",
      line: "One source of 161 tokens behind sixteen sites: seven media brands, Affily.bet and eight casino sites.",
      chips: ["Design systems", "Tokens", "Multi-brand"],
      surface: {
        bg: "#0A0A0C",
        ink: "#F3F3F1",
        muted: "#A0A09B",
        lead: "#7C7C78",
        accent: "#F3F3F1",
        line: "rgba(243, 243, 241, 0.16)",
        glow: "radial-gradient(60% 55% at 70% 45%, rgba(96, 120, 190, 0.22), transparent 70%)",
      },
      media: { kind: "brand-swap" },
    },
    summary:
      "The design system I created for Core Studio, MoveUp Media's site platform: one source of tokens and blocks shared by sixteen sites, each with its own brand.",
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
      src: "/work/gds/cover.jpg",
      alt: "The Match Card and the token matrix of the Global Design System",
      width: 1200,
      height: 675,
    },
    heroVideo: {
      src: "/work/gds/theme-swap.mp4",
      poster: "/work/gds/theme-swap.webp",
      alt: "One token cycling through seven brands, the 161 tokens of the collection, and the Match Card re-skinning brand by brand",
    },
    stats: [
      { value: "16", label: "sites on one system" },
      { value: "161", label: "design tokens" },
      { value: "51", label: "section blocks" },
      { value: "7", label: "brand themes in Figma" },
    ],
    overview:
      "I created and lead the Global Design System, the token system behind Core Studio, the platform MoveUp Media runs its sites on. The rule is simple: every site reuses the same blocks, and only the brand changes. One Figma collection of 161 tokens defines seven media brands, from The Playoffs to the dark theme of Prensa Futbol, and the same foundation now carries Affily.bet and a casino template that powers eight casino sites, each with its own identity.",
    opportunities: [
      {
        title: "Reuse across brands",
        hmw: "How might we let the same blocks power many sites with different brands, without rebuilding each one from scratch?",
      },
      {
        title: "Light and dark",
        hmw: "How might we make one component work in opposite themes from a single source, instead of keeping separate design files?",
      },
      {
        title: "Responsive by default",
        hmw: "How might we make every block behave from desktop to mobile, so no team has to solve responsiveness page by page?",
      },
      {
        title: "New brands, fast",
        hmw: "How might we launch a new brand as new values on an existing system, not as a new design?",
      },
      {
        title: "Coherence at scale",
        hmw: "How might we keep sixteen sites coherent while each one keeps its own identity?",
      },
    ],
    approach: [
      {
        title: "The brand lives in tokens",
        body: "I moved every brand decision (colour, type, radius, spacing, buttons) into one Figma collection of 161 variables, with one mode per brand. Blocks read those tokens and never hard-code a value, so a new brand is a new set of values, not a new design.",
      },
      {
        title: "One block, any theme",
        body: "Light and dark are just another set of values. The Odds Comparison Table is the same component in The Playoffs and in the dark theme of Prensa Futbol, with nothing redrawn.",
        media: {
          src: "/work/gds/light-dark.mp4",
          poster: "/work/gds/light-dark.webp",
          alt: "The Odds Comparison Table in The Playoffs, light, and in Prensa Futbol, dark",
        },
      },
      {
        title: "Responsive by contract",
        body: "Each block defines how it behaves from desktop to mobile, so responsiveness is solved once in the block instead of page by page.",
        media: {
          src: "/work/gds/responsive.mp4",
          poster: "/work/gds/responsive.webp",
          alt: "The Brand Offer List block going from a 1280 pixel desktop layout to a 375 pixel mobile layout",
        },
      },
      {
        title: "A library, not pages",
        body: "Sites are assembled from 51 section blocks grouped in six families, so a new page is a composition of blocks that already work in every brand.",
      },
      {
        title: "Toffee Web as the proof",
        body: "Toffee Web is where the system shows itself end to end: the tokens, the blocks and the layouts working together the way they were designed to.",
      },
    ],
    impact: [
      "Sixteen sites run on one system: seven media brands, Affily.bet and a casino template behind eight casino sites.",
      "A new brand is a new set of token values, not a new design.",
      "Light and dark, desktop and mobile are solved once, inside each block, instead of site by site.",
    ],
    mosaic: {
      src: "/work/gds/block-library.mp4",
      poster: "/work/gds/block-library.webp",
      alt: "The 51 section blocks of the library, grouped in six families, with a wave switching the brand of the whole collection",
    },
  },

  /* ══════════════════════════════ 2 · LEBI ═══════════════════════════════ */
  {
    slug: "lebi",
    company: "Lebi", // client: MoveUp Media
    role: "Design Lead", // created it + led the design team (confirm exact title)
    period: "2025",
    headline: "It began as scattered ideas. I gave it a spine.",
    scene: {
      eyebrow: "SaaS platform · Leadership",
      headline: "Free predictions. | Real prizes.",
      line: "A sports predictions platform I created and led at MoveUp Media, where brands launch sponsored leagues on one template.",
      chips: ["SaaS", "Leadership", "Gamification"],
      surface: {
        bg: "#F5F1FF",
        ink: "#16161D",
        muted: "#5D5D6B",
        accent: "#6B3CF0",
        line: "rgba(22, 22, 29, 0.14)",
        glow: "radial-gradient(45% 50% at 72% 30%, rgba(107, 60, 240, 0.16), transparent 70%), radial-gradient(35% 40% at 28% 85%, rgba(255, 194, 26, 0.2), transparent 70%)",
      },
      media: {
        kind: "phone",
        video: "/work/lebi/onboarding-phone.mp4",
        poster: "/work/lebi/onboarding-phone.webp",
        alt: "Lebi onboarding on mobile: email code, basic details, name and avatar, then the challenges home",
        float: {
          src: "/work/lebi/mascot-cheer.webp",
          alt: "Lebi's mascot, a purple bird, celebrating",
          width: 408,
          height: 576,
        },
      },
      flip: true,
    },
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
      src: "/work/lebi/mockup-1.webp",
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
        src: "/work/lebi/user-journey.webp",
        alt: "User-journey map for a football-fan persona, across awareness to loyalty",
        caption:
          "User-journey map — 4 personas, and the friction in the first-prediction flow.",
        span: "wide",
        width: 1800,
        height: 800,
      },
      {
        src: "/work/lebi/before-guest-logged.webp",
        alt: "The earlier Lebi experience — one dense journey for everyone",
        caption: "Before — one experience for everyone.",
        span: "half",
        width: 1800,
        height: 1155,
      },
      {
        src: "/work/lebi/after-guest-logged.webp",
        alt: "The redesigned Lebi experience — guest discovery split from the power dashboard",
        caption: "After — guest discovery, split from the power dashboard.",
        span: "half",
        width: 1800,
        height: 1155,
      },
      {
        src: "/work/lebi/dashboard-guest.webp",
        alt: "The guest landing — a lighter discovery experience for newcomers",
        caption: "The guest landing — discovery for newcomers.",
        span: "half",
        width: 1800,
        height: 1155,
      },
      {
        src: "/work/lebi/landing-page-1.webp",
        alt: "A Lebi landing page built from the app's own component library",
        caption: "A landing page, built from the app's own design system.",
        span: "half",
        width: 1800,
        height: 1155,
      },
    ],
    links: [{ label: "Figma", href: "#" }],
  },

  /* ══════════════════════════════ 3 · LUMIO ══════════════════════════════ */
  {
    slug: "lumio",
    company: "Lumio",
    role: "Lead Product Designer", // (confirm actual title/scope)
    period: "2025",
    headline: "Odds are everywhere. Confidence isn't.",
    scene: {
      eyebrow: "Consumer app · Payments",
      headline: "Stop betting | in the dark.",
      line: "An AI analysis app that gives every match a confidence score, designed and built in house from onboarding to upgrade.",
      chips: ["Product design", "AI product", "Monetization"],
      surface: {
        bg: "#060606",
        ink: "#F5F5F2",
        muted: "#9A9A96",
        accent: "#FFCC00",
        line: "rgba(245, 245, 242, 0.14)",
        glow: "radial-gradient(40% 50% at 66% 42%, rgba(255, 204, 0, 0.2), transparent 70%)",
      },
      media: {
        kind: "phone",
        video: "/work/lumio/tour-phone.mp4",
        poster: "/work/lumio/tour-phone.webp",
        alt: "A tour of the Lumio app: the Lumio Index, plans, Apple Pay and the wallet",
        back: {
          src: "/work/lumio/screen-index.webp",
          alt: "The Lumio Index detail for a match, with its confidence score",
        },
      },
    },
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
      src: "/work/lumio/tour-phone.webp",
      alt: "A tour of the Lumio app: the Lumio Index, plans, Apple Pay and the wallet",
      video: "/work/lumio/tour-phone.mp4",
      caption:
        "A tour of the app. The wallet and Apple Pay screens are concepts designed for this case study.",
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

  /* ══════════════════════════ 4 · MOVEUP TOOLS ══════════════════════════ */
  {
    slug: "moveup-tools",
    company: "MoveUp Tools",
    role: "Lead UX/UI Designer", // (confirm how to credit design and build)
    headline: "One portal. Every tool.",
    scene: {
      eyebrow: "Internal SaaS · AI tools",
      headline: "One portal, | every tool.",
      line: "The internal platform I designed and built for MoveUp Media: the portal and six tools, from AI video production to brand assets.",
      chips: ["SaaS", "AI tools", "Design engineering"],
      surface: {
        bg: "#0A0712",
        ink: "#F4F1FA",
        muted: "#9C93B0",
        accent: "#D6246E",
        accentGradient: "linear-gradient(90deg, #D6246E, #9446D8 55%, #4B7BEA)",
        line: "rgba(244, 241, 250, 0.14)",
        glow: "radial-gradient(45% 55% at 30% 50%, rgba(148, 70, 216, 0.28), transparent 70%), radial-gradient(35% 45% at 12% 80%, rgba(214, 36, 110, 0.18), transparent 70%)",
      },
      media: {
        kind: "browser",
        video: "/work/moveup-tools/portal-filter.mp4",
        poster: "/work/moveup-tools/portal-filter.webp",
        alt: "The MoveUp Tools portal filtering its apps by category",
        phone: {
          video: "/work/moveup-tools/phone-portal.mp4",
          poster: "/work/moveup-tools/phone-portal.webp",
          alt: "The MoveUp Tools portal on mobile",
        },
      },
      flip: true,
    },
    summary:
      "The internal SaaS of MoveUp Media: the company's apps and news behind one sign-in. I designed and built the portal and six of its tools, from AI video to brand assets.",
    tags: ["SAAS", "INTERNAL PLATFORM", "AI TOOLS", "DESIGN ENGINEERING"],
    published: true,
    showcase: {
      device: "phone",
      src: "/work/moveup-tools/tour-phone.webp",
      alt: "A tour of MoveUp Tools on mobile: the portal, Video Studio, Brand Assets, news and a survey",
      video: "/work/moveup-tools/tour-phone.mp4",
      caption: "The portal and its tools on mobile. Colleagues' names are fictional.",
    },
  },

  /* ════════════════════════════ GALLERY (quick) ══════════════════════════ */
  {
    slug: "dima-world-cup",
    company: "Dima World Cup Challenge",
    role: "Product Designer",
    kind: "gallery",
    published: true,
    summary:
      "An internal World Cup prediction game the whole company ended up playing: designed for pull, not mandate, and picked up by every team.",
    tags: ["PRODUCT DESIGN", "ENGAGEMENT", "UX/UI", "INTERNAL PRODUCT", "GAMIFICATION"],
  },
  {
    slug: "super-dritta",
    company: "Super Dritta",
    role: "Brand & Social Designer",
    kind: "gallery",
    published: true,
    summary:
      "Branding and social for Super Dritta: Telegram sticker packs and matchday assets that carry one voice across feeds.",
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
