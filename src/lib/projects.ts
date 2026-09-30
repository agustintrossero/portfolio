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
  /** Or a still (a research artifact, a screen) when a clip is not the proof. */
  image?: CaseImage;
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
    }
  // A clip that already carries its own devices, shown without a frame.
  | { kind: "clip"; video: string; poster: string; alt: string };

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
  /** Short loop for the card in the home hero deck. */
  teaser?: CaseClip;
  /** "r, g, b" of the glow the home hero takes while this card is in front. */
  tint?: string;
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
      teaser: {
        src: "/work/gds/teaser.mp4",
        poster: "/work/gds/teaser.webp",
        alt: "One match card switching brands as its tokens change",
      },
      tint: "96, 120, 190",
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
    company: "Lebi",
    role: "Creator and design lead",
    period: "2025",
    headline: "It began as scattered ideas. I gave it a spine.",
    scene: {
      eyebrow: "SaaS platform · Leadership",
      headline: "Free predictions. | Real prizes.",
      line: "A sports predictions platform I created and led at MoveUp Media, where brands launch sponsored leagues on one template.",
      chips: ["SaaS", "Leadership", "Gamification"],
      teaser: {
        src: "/work/lebi/teaser.mp4",
        poster: "/work/lebi/teaser.webp",
        alt: "The Lebi mascot cheering next to free predictions, real prizes, then the sign up on a phone",
      },
      tint: "107, 60, 240",
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
      "A free sports predictions platform I created and led at MoveUp Media: players compete for real prizes, and brands launch sponsored leagues on the same template.",
    tags: [
      "DESIGN LEADERSHIP",
      "PRODUCT DIRECTION",
      "SAAS",
      "DESIGN SYSTEMS",
      "UX RESEARCH",
      "GAMIFICATION",
    ],
    published: true,
    cover: {
      src: "/work/lebi/cover.jpg",
      alt: "Lebi brand illustration: a jersey, a trophy, coins and a phone",
      width: 1800,
      height: 1200,
    },
    heroVideo: {
      src: "/work/lebi/onboarding.mp4",
      poster: "/work/lebi/onboarding.webp",
      alt: "Lebi's mascot says let's play, then the onboarding on a phone: email, verification code, basic details, name and avatar, and the challenges home",
      caption: "Shown in English with prizes in US dollars. The product runs in Portuguese, for Brazil.",
    },
    stats: [
      { value: "20+", label: "user interviews" },
      { value: "4", label: "personas mapped" },
      { value: "40%", label: "fewer design questions from engineering" },
      { value: "81", label: "screens in the light theme" },
    ],
    overview:
      "Lebi is a free sports predictions platform. Players compete by predicting matches and win real prizes, and brands launch sponsored leagues on the same template. I created it and led its design at MoveUp Media, taking it from scattered ideas with no identity to a shipped SaaS: the positioning, a modular design system from day one, the research, and the calls that shaped the product.",
    opportunities: [
      {
        title: "Structure from chaos",
        hmw: "How might we turn scattered ideas and no identity into a product with a clear spine, quickly?",
      },
      {
        title: "A game, not a bet",
        hmw: "How might we position Lebi as a game to play, not a betting product, and hold that line across the whole experience?",
      },
      {
        title: "Newcomer and power user",
        hmw: "How might we serve a curious newcomer and a data-hungry power user without overwhelming either?",
      },
      {
        title: "Validate before building",
        hmw: "How might we test game mechanics early, before engineering commits a sprint to them?",
      },
      {
        title: "Prizes people can trust",
        hmw: "How might we pay out real prizes safely without scaring away players who just want to play?",
      },
      {
        title: "Any sponsor, same template",
        hmw: "How might we let a brand launch its own league without new design work?",
      },
    ],
    approach: [
      {
        title: "Positioning first: a game, not a bet",
        body: "Before any screen, I fixed what Lebi was: a game to play, not a betting product. Every later call answered to that, which kept the team away from the sportsbook mental model.",
      },
      {
        title: "A design system from day one",
        body: "I built a modular component system before the product, not after, so a small team could ship continuously. The same library later built the marketing landing pages, including a pre-launch NBA challenge, so marketing promised exactly what the product delivered.",
      },
      {
        title: "Validate mechanics before building",
        body: "I used AI prototypes to simulate the game mechanics and pressure-test them before engineering committed. Learning that a mechanic does not land is cheaper in a prototype than in a sprint.",
      },
      {
        title: "The pivot: split the journeys",
        body: "Research across four personas mapped the friction in the first prediction. Our first bet was one landing for everyone, and more than 20 interviews showed newcomers drowning in data meant for power users. I restructured the architecture into a guest discovery journey and a logged-in dashboard.",
        image: {
          src: "/work/lebi/user-journey.webp",
          alt: "User journey map for a football fan persona, from awareness to loyalty",
          width: 1800,
          height: 800,
        },
      },
      {
        title: "Prizes people can trust",
        body: "Real prizes need real identities. Winnings stay locked until the player verifies in five steps (details, document, a selfie with the document, an email code and a confirmation), then a review; approved players cash out as gift cards on a partner platform. The mascot accompanies the key moments, so security never feels cold.",
        media: {
          src: "/work/lebi/wallet.mp4",
          poster: "/work/lebi/wallet.webp",
          alt: "Locked winnings, the five step identity verification with the mascot, the approval and the cash out",
        },
      },
      {
        title: "One template, any sponsor",
        body: "Leagues are a template: any sponsor, any sport, any prize. Brands such as Betnacional launch their own sponsored leagues without new design work.",
        media: {
          src: "/work/lebi/sponsors.mp4",
          poster: "/work/lebi/sponsors.webp",
          alt: "Sponsored leagues by Betnacional: League Fusion, Brasileirão, Conexão NBA and Libertadores",
        },
      },
      {
        title: "Handoff as a product",
        body: "I delivered behavior specs, motion guidelines and edge cases, not just redlines. Treating handoff as a deliverable cut engineering's design questions by 40% and kept sprints moving.",
      },
    ],
    impact: [
      "Took Lebi from scattered ideas with no identity to a shipped SaaS with a clear position: a game, not a bet.",
      "After more than 20 interviews, newcomers get a lighter discovery journey and power users keep their full dashboard.",
      "Engineering's design questions dropped by 40% once handoff became a deliverable.",
      "Brands launch sponsored leagues on one template: any sponsor, any sport, any prize.",
    ],
    mosaic: {
      src: "/work/lebi/screens.mp4",
      poster: "/work/lebi/screens.webp",
      alt: "A 3D wall of 81 light theme screens: sign up, sign in, predictions, rankings, prizes, wallet and verification",
    },
    images: [
      {
        src: "/work/lebi/mockup-1.webp",
        alt: "The logged-in dashboard in the dark theme, on desktop and laptop, with the Lebi mascot",
        caption: "The logged-in dashboard, dark theme.",
        span: "wide",
        width: 1800,
        height: 1155,
      },
      {
        src: "/work/lebi/before-guest-logged.webp",
        alt: "The earlier Lebi experience, one dense journey for everyone",
        caption: "Before: one experience for everyone.",
        span: "half",
        width: 1800,
        height: 1155,
      },
      {
        src: "/work/lebi/after-guest-logged.webp",
        alt: "The redesigned Lebi experience, guest discovery split from the logged-in dashboard",
        caption: "After: guest discovery, split from the dashboard.",
        span: "half",
        width: 1800,
        height: 1155,
      },
      {
        src: "/work/lebi/dashboard-guest.webp",
        alt: "The guest landing, a lighter discovery experience for newcomers",
        caption: "The guest landing.",
        span: "half",
        width: 1800,
        height: 1155,
      },
      {
        src: "/work/lebi/landing-page-1.webp",
        alt: "A Lebi landing page built from the app's own component library",
        caption: "A landing page built from the product's own design system.",
        span: "half",
        width: 1800,
        height: 1155,
      },
    ],
  },

  /* ══════════════════════════════ 3 · LUMIO ══════════════════════════════ */
  {
    slug: "lumio",
    company: "Lumio",
    role: "Creator and design lead",
    period: "2025",
    headline: "Odds are everywhere. Confidence isn't.",
    scene: {
      eyebrow: "Consumer app · Payments",
      headline: "Stop betting | in the dark.",
      line: "An AI analysis app that gives every match a confidence score, designed and built in house from onboarding to upgrade.",
      chips: ["Product design", "AI product", "Monetization"],
      teaser: {
        src: "/work/lumio/teaser.mp4",
        poster: "/work/lumio/teaser.webp",
        alt: "The O in lumio lights up in the dark: stop betting in the dark",
      },
      tint: "255, 196, 0",
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
      "An AI analysis app for sports bettors: every match gets a confidence score, the Lumio Index, and the reasons behind it. I created it and led the design end to end, and the team built it in house.",
    tags: [
      "PRODUCT DESIGN",
      "UX/UI",
      "AI PRODUCT",
      "DATA VISUALIZATION",
      "MONETIZATION",
      "PAYMENTS",
      "BRANDING",
    ],
    published: true,
    cover: {
      src: "/work/lumio/cover.jpg",
      alt: "The lumio logo with its O lit like a bulb, over the line no guru, no promises, just data",
      width: 1200,
      height: 675,
    },
    heroVideo: {
      src: "/work/lumio/intro.mp4",
      poster: "/work/lumio/intro.webp",
      alt: "The O in lumio lights up like a bulb in the dark and its light reveals the app: stop betting in the dark, see every stat, not a hunch but probability, choose your level of play, invite friends",
      caption: "Shown in English with prices in US dollars. The product runs in Portuguese, for Brazil.",
    },
    stats: [
      { value: "95", label: "screens and states" },
      { value: "5", label: "optional sign up questions" },
      { value: "3", label: "risk levels, color coded" },
      { value: "2", label: "themes, light and dark" },
    ],
    overview:
      "Lumio is an AI analysis app for sports bettors. It reads match data and gives every match a confidence score, the Lumio Index, so a bet starts from probability instead of a hunch. I created Lumio and led its design end to end, from the brand identity to the full app: onboarding, sign up, the Index, plans, payment and profile, 95 screens and states in all. The engineering team built it in house.",
    opportunities: [
      {
        title: "Clarity over noise",
        hmw: "How might we cut through tips, promises and promos with one number a bettor can read at a glance?",
      },
      {
        title: "A score that explains itself",
        hmw: "How might we show the reasons behind the Lumio Index, so it reads as analysis and not as one more tip?",
      },
      {
        title: "Personal, never pushy",
        hmw: "How might we learn enough at sign up to personalize the picks, without forcing anyone to answer?",
      },
      {
        title: "Free that works",
        hmw: "How might we make the free plan useful on its own and Pro clearly worth paying for?",
      },
      {
        title: "Payment without doubt",
        hmw: "How might we make paying feel certain, even while a payment is still processing?",
      },
      {
        title: "No dead ends",
        hmw: "How might we keep people oriented when there is no data, no connection or no analysis for a match?",
      },
    ],
    approach: [
      {
        title: "Name the problem first",
        body: "The onboarding names the problem before it sells anything: tips, promises and promos everywhere, very little clarity. Then it shows Lumio's answer, from data to context to a decision, on a real card. For the launch I designed a First Club: the first 1,000 players get full access, with a live count of the places left.",
      },
      {
        title: "Personal from the first pick",
        body: "Sign up asks five quick questions, and every one is optional: the sportsbooks you use, your team, your experience, your risk level and how you want alerts. Risk is framed in plain odds (for a cautious player, anything over 1.5 is too risky), so the picks match the player from day one. It all stays editable later in a cards configurator.",
        image: {
          src: "/work/lumio/signup.webp",
          alt: "Four sign up steps: which sportsbooks do you use, your favorite team, how experienced a bettor you are, and your level of risk",
          width: 1600,
          height: 900,
        },
      },
      {
        title: "One number, with its reasons",
        body: "Every card leads with the Lumio Index, a confidence score shown as a bar and a percentage, next to its risk level and the best odds available. Risk is color coded from green to red, so it reads before the number does. Open a card and the score explains itself: supporting stats, recent results and the reasons for the pick in plain language, with odds from partner sportsbooks one tap away.",
        media: {
          src: "/work/lumio/index.mp4",
          poster: "/work/lumio/index.webp",
          alt: "The home with the top probabilities, then the Lumio Index detail for Manchester City: 82 percent, recent matches and why this pick",
        },
      },
      {
        title: "Free that works, Pro worth paying for",
        body: "The free plan works on its own: three cards a day, with the odds capped. Pro unlocks every card, including the rare, epic and legendary daily cards, plus early access to new stats and Telegram alerts, billed daily, weekly or monthly. Around the plans sit the growth loops: a three day VIP trial for early users, a free VIP day for a seven day streak, coupons, and a month of Pro for inviting three friends.",
        media: {
          src: "/work/lumio/pro.mp4",
          poster: "/work/lumio/pro.webp",
          alt: "From the free plan to the upgrade screen: rare, epic and legendary cards, billed daily, weekly or monthly, then the payment method",
        },
      },
      {
        title: "Payment without doubt",
        body: "Payment covers every outcome: a new card, a saved one or an instant method, then processing, success or a decline with a clear way out. The processing screen says what happens next, and success confirms the plan with a full summary, so nobody wonders whether they paid.",
        media: {
          src: "/work/lumio/payment.mp4",
          poster: "/work/lumio/payment.webp",
          alt: "Paying for Pro with Apple Pay and Face ID, then the processing screen, the success summary, the active Pro plan and the wallet",
          caption:
            "Apple Pay stands in for Pix, the instant payment the product uses in Brazil, and the wallet at the end is a concept designed for this case study. The Apple Pay sheet and Face ID recreate the system UI.",
        },
      },
      {
        title: "No dead ends",
        body: "The 95 screens and states include the unhappy paths: no picks today, a failed load, no connection, not enough data for a match, a declined payment, a cancellation that asks why. Each one says what happened and what to do next.",
        image: {
          src: "/work/lumio/states.webp",
          alt: "Four unhappy states: no picks available today, no internet connection, no analysis available for a match, and a declined payment",
          width: 1600,
          height: 900,
        },
      },
    ],
    impact: [
      "Live in Brazil: designed end to end, from the brand identity to 95 screens and states, and built in house by the engineering team.",
      "Every pick leads with one confidence score, color coded by risk and explained in plain language.",
      "A complete path from free to Pro, with a trial, rewards, referrals and a payment flow designed for every outcome, unhappy paths included.",
    ],
    mosaic: {
      src: "/work/lumio/screens.mp4",
      poster: "/work/lumio/screens.webp",
      alt: "A wall of 95 Lumio screens and states lit by the glowing O: onboarding, registration, home, the Lumio Index, plans, payment, wallet, profile, modals and legal",
    },
    images: [
      {
        src: "/work/lumio/themes.webp",
        alt: "The home and the Lumio Index detail, in the light theme and in the dark theme",
        caption: "The home and the Lumio Index, in light and dark.",
        span: "wide",
        width: 1600,
        height: 900,
      },
    ],
  },

  /* ══════════════════════════ 4 · MOVEUP TOOLS ══════════════════════════ */
  {
    slug: "moveup-tools",
    company: "MoveUp Tools",
    role: "Creator and design engineer",
    period: "2026 to present",
    headline: "Internal tools are products too. I treated them that way.",
    scene: {
      eyebrow: "Internal SaaS · AI tools",
      headline: "One portal, | every tool.",
      line: "The internal platform I designed and built for MoveUp Media: the portal and six tools, from AI video production to brand assets.",
      chips: ["SaaS", "AI tools", "Design engineering"],
      teaser: {
        src: "/work/moveup-tools/teaser.mp4",
        poster: "/work/moveup-tools/teaser.webp",
        alt: "The portal home pulling back into a wall of screens: seven tools, one platform",
      },
      tint: "214, 36, 110",
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
      "The internal platform of MoveUp Media: one portal, behind the company's Google sign in, for its apps and news. I designed and built the portal and six of its tools, from AI video production to brand assets.",
    tags: [
      "PRODUCT DESIGN",
      "DESIGN ENGINEERING",
      "SAAS",
      "AI PRODUCT",
      "INTERNAL TOOLS",
      "DATA VISUALIZATION",
    ],
    published: true,
    cover: {
      src: "/work/moveup-tools/cover.jpg",
      alt: "Seven tools, one platform: a wall of MoveUp Tools screens",
      width: 1200,
      height: 675,
    },
    heroVideo: {
      src: "/work/moveup-tools/mosaic.mp4",
      poster: "/work/moveup-tools/mosaic.webp",
      alt: "The portal home pulls back into a wall of screens from the seven tools: seven tools, one platform, then the MoveUp Tools logo",
      caption: "Captured from the live product. Colleagues' names are fictional.",
    },
    stats: [
      { value: "11", label: "apps in one portal" },
      { value: "7", label: "tools I designed and built" },
      { value: "3", label: "AI services in Video Studio" },
      { value: "$1.51", label: "for a 10 second AI clip, estimated at $1.80" },
    ],
    overview:
      "MoveUp Tools is the internal platform of MoveUp Media, a digital media group with sports and news brands. One portal, behind the company's Google sign in, brings together 11 apps and the company news. I designed and built the portal and six of its tools: Video Studio, Brand Assets, PODs, Bugs & Tickets, News and Surveys. The other apps, such as the wiki and the help desk, are integrations I did not build.",
    opportunities: [
      {
        title: "One front door",
        hmw: "How might we give every team one place for its tools and the company news, behind the sign in it already has?",
      },
      {
        title: "AI video without surprises",
        hmw: "How might we let the team produce AI video while every paid generation stays deliberate and its cost visible?",
      },
      {
        title: "Brands on tap",
        hmw: "How might we let anyone find the right logo for any brand, and adapt a promo banner without waiting for a designer?",
      },
      {
        title: "Delivery at a glance",
        hmw: "How might we show each POD's roadmap and the team's quality trends without digging through Jira?",
      },
      {
        title: "Notices that land",
        hmw: "How might we make sure the notices that need action are seen before their deadline?",
      },
      {
        title: "Many tools, one platform",
        hmw: "How might we give each tool its own character and still make them feel like one product?",
      },
    ],
    approach: [
      {
        title: "One portal, one sign in",
        body: "Everything sits behind Google sign in, open only to company accounts. The portal groups 11 apps into five categories, with search, pinned favorites and the company news beside them, and a shared top bar jumps between apps without going back home.",
        media: {
          src: "/work/moveup-tools/portal-filter.mp4",
          poster: "/work/moveup-tools/portal-filter.webp",
          alt: "The portal home filtered to Studio and Creative: Video Studio and Brand Assets, with the news feed beside them",
        },
      },
      {
        title: "One platform, many voices",
        body: "Designing and building it myself let each tool keep its own character inside one platform: Video Studio in burgundy, Brand Assets in pink, all on one type system (Bai Jamjuree, Manrope and Fira Code), one gradient and one top bar.",
      },
      {
        title: "From brief to video",
        body: "Video Studio turns a story into a short AI video. The editor works in five steps (brief, references, scenes, generate and clips) with a node canvas that shows how every piece connects, and Autopilot goes from a news link to a script read by an avatar with a fixed voice and style. Automations add intros, outros and music, or turn an article into a 16:9 video. It runs on Seedance, ElevenLabs and Gemini, in Portuguese and English.",
        media: {
          src: "/work/moveup-tools/studio-brief.mp4",
          poster: "/work/moveup-tools/studio-brief.webp",
          alt: "Video Studio: the studio home, the projects, then the brief, the references and the scenes of a project",
        },
      },
      {
        title: "Real clips, real costs",
        body: "Every generation costs money, so none happens by accident. The studio shows the estimated cost before generating, asks for a payload preview and an explicit click for anything paid, and shows the final cost on every clip. A 10 second clip came in at $1.51 against an estimate of $1.80.",
        media: {
          src: "/work/moveup-tools/studio-clips.mp4",
          poster: "/work/moveup-tools/studio-clips.webp",
          alt: "The generated clip with its final cost of $1.51, then the node canvas linking the brief, the character sheet and the scene",
        },
      },
      {
        title: "Every brand, one library",
        body: "Brand Assets keeps the logos and formats of every brand, own and partner, in one library with a brand filter, search and upload, plus the management of users and brands. Its Image Creator re-skins a promo banner for another operator: it swaps the logo and the bonus code and leaves the background untouched. A chat assistant is always one click away.",
        media: {
          src: "/work/moveup-tools/brand-assets.mp4",
          poster: "/work/moveup-tools/brand-assets.webp",
          alt: "Brand Assets: the dashboard, the library filtered by brand, brand management and the Image Creator",
        },
      },
      {
        title: "Delivery and quality at a glance",
        body: "PODs reads Jira and draws each POD's roadmap on a timeline by month or quarter, filtered by person and exportable as HTML. Bugs & Tickets searches the WordPress and help desk tickets, splits bugs by where they came from with a 30 day trend, and its QA tab follows time in QA, reopen rate, bugs that reached production and automated coverage.",
        media: {
          src: "/work/moveup-tools/pods.mp4",
          poster: "/work/moveup-tools/pods.webp",
          alt: "The PODs timeline: each POD's epics as bars across the months, filtered by person",
        },
      },
      {
        title: "News and polls, built in",
        body: "News sorts company notices by category, marks what is unread and flags what needs action before a deadline, with each article in a side panel. Surveys keep answers private and show the results as bars.",
        media: {
          src: "/work/moveup-tools/survey.mp4",
          poster: "/work/moveup-tools/survey.webp",
          alt: "The results of a project retrospective survey filling in as bars",
        },
      },
    ],
    impact: [
      "The front door every department uses: 11 apps and the company news behind one Google sign in.",
      "AI video without surprise bills: the cost is visible before any paid generation, and a 10 second clip came in at $1.51 against a $1.80 estimate.",
      "Seven tools, the portal included, designed and built end to end by me and running in production.",
    ],
    images: [
      {
        src: "/work/moveup-tools/mobile.webp",
        alt: "The portal, Video Studio, Brand Assets and News on mobile",
        caption: "The portal and three of its tools on mobile.",
        span: "wide",
        width: 1600,
        height: 900,
      },
    ],
  },

  /* ═══════════════════════════════ 5 · FOUNDRY ═══════════════════════════ */
  {
    slug: "foundry",
    company: "Foundry",
    role: "Product and design lead",
    period: "2026",
    headline: "Reuse first. Then build.",
    scene: {
      eyebrow: "Internal tool · Design to code",
      headline: "Reuse first. | Then build.",
      line: "The block registry of seven sites: see where every block runs, reuse it, or take a new design all the way to a pull request.",
      chips: ["Product design", "Design systems", "Design to code"],
      teaser: {
        src: "/work/foundry/teaser.mp4",
        poster: "/work/foundry/teaser.webp",
        alt: "Real block previews pulling back into a wall of blocks: 176 blocks, one registry",
      },
      tint: "155, 81, 224",
      surface: {
        bg: "#08070C",
        ink: "#EFECF5",
        muted: "#A8A2BA",
        accent: "#FF2E9A",
        accentGradient: "linear-gradient(90deg, #FF2E9A, #9B51E0 55%, #22D3EE)",
        line: "rgba(239, 236, 245, 0.12)",
        glow: "radial-gradient(45% 55% at 68% 45%, rgba(155, 81, 224, 0.26), transparent 70%), radial-gradient(30% 40% at 92% 85%, rgba(34, 211, 238, 0.14), transparent 70%)",
      },
      media: {
        kind: "browser",
        video: "/work/foundry/library.mp4",
        poster: "/work/foundry/library.webp",
        alt: "Searching the Foundry library: every block with its preview, engine and one dot per site",
      },
    },
    summary:
      "The block registry of MoveUp Console: every block of seven sites in one place, and a path from a design to a pull request. The idea and the design are mine; an engineer on the team built it.",
    tags: [
      "PRODUCT DESIGN",
      "DESIGN SYSTEMS",
      "DESIGN TO CODE",
      "INTERNAL TOOLS",
      "WORKFLOW",
      "DEVELOPER EXPERIENCE",
    ],
    published: true,
    cover: {
      src: "/work/foundry/cover.jpg",
      alt: "A wall of real block previews: 176 blocks, one registry",
      width: 1200,
      height: 675,
    },
    heroVideo: {
      src: "/work/foundry/tour.mp4",
      poster: "/work/foundry/tour.webp",
      alt: "Foundry in MoveUp Console: searching the block library and opening a block that runs on all seven sites",
      caption:
        "Captured from the live tool, read only, with interactions animated over real captures. Registry figures as of September 2026.",
    },
    stats: [
      { value: "176", label: "blocks in one registry" },
      { value: "7", label: "sites on two engines" },
      { value: "70%", label: "of blocks run on two or more sites" },
      { value: "9", label: "blocks run on all seven" },
    ],
    overview:
      "Foundry is the first module of MoveUp Console, an internal suite to build the components, publish the content and read the numbers across every site in the network. It is the registry of the blocks behind seven sites on two engines, and it answers one question: which blocks exist, on which site, on which engine, and where each one is in the pipeline. The idea and the design are mine, from the library to the flow that takes a design to a pull request. An engineer on the team built it in code and added what developers need to receive new blocks and updates.",
    opportunities: [
      {
        title: "One source of truth",
        hmw: "How might we know, for any block, where it runs and where it stands, without anyone keeping a list by hand?",
      },
      {
        title: "Reuse before building",
        hmw: "How might we make reusing an existing block the easiest path, before anyone designs a new one?",
      },
      {
        title: "A design developers can plug in",
        hmw: "How might we hand over a new block in a shape developers can plug into a site, with no back and forth?",
      },
      {
        title: "Safe by default",
        hmw: "How might we let anyone ask for a deploy without anything running blindly in production?",
      },
    ],
    approach: [
      {
        title: "Read from the sites, not typed",
        body: "Nobody keeps the registry by hand. Foundry reads the blocks each site actually registers: UAT tells it a block exists and production tells it the block is live. The library lists every block with its live preview, data contract, engine and repo, and one dot per site: live, in UAT, draft or absent.",
        media: {
          src: "/work/foundry/library.mp4",
          poster: "/work/foundry/library.webp",
          alt: "Searching the library: each block with its preview, engine and one dot per site",
        },
      },
      {
        title: "One block, seven sites",
        body: "Reuse starts with a search. A block page shows every site the block already runs on, with its engine and stage, so a team can pick it up instead of drawing it again. Foundry lists and never merges: the same block can run on seven sites with different code, one rendering per site.",
        media: {
          src: "/work/foundry/present-on.mp4",
          poster: "/work/foundry/present-on.webp",
          alt: "A block page listing its seven sites: deployed on three, in UAT on four, each with a deploy request",
        },
      },
      {
        title: "The data contract comes first",
        body: "Making a block is a four step wizard: data and site, design, map and tokens, publish. It starts with the data contract, the fields the block reads from one of the shared data objects, so design and code agree on the data before anything is drawn.",
        media: {
          src: "/work/foundry/contract.mp4",
          poster: "/work/foundry/contract.webp",
          alt: "The first step of Make a block: the block name, the target site and the data object it reads",
        },
      },
      {
        title: "Design in. Block out.",
        body: "The design arrives as a zip: a preview, the HTML and CSS, the editable fields and a note. The designer sets the look, the sample content and the fields, with no PHP and no data wiring. Foundry renders it live and opens a draft pull request in the right repo, with a scaffold a developer refines before the merge.",
        media: {
          src: "/work/foundry/design-to-pr.mp4",
          poster: "/work/foundry/design-to-pr.webp",
          alt: "Uploading the design zip, the live preview of the new block, then Open PR",
        },
      },
      {
        title: "Tested on a real request",
        body: "I ran the whole flow on a real request: an editorial popup with three operators for ToffeeWeb, closable and responsive. A similar modal already lived in the ToffeeWeb theme, so I designed an editorial variant in Claude Design with ToffeeWeb's real tokens, packed it as a zip and opened the pull request from Foundry. The test also caught a failing upload of binary files, fixed the same day. The block now waits in review with its live preview.",
        image: {
          src: "/work/foundry/pull-request.webp",
          alt: "The draft pull request for the new block: twelve files, labelled for ToffeeWeb",
          width: 760,
          height: 530,
          caption: "The pull request card recreates the real draft pull request, without its author.",
        },
      },
      {
        title: "Reuse, measured",
        body: "Reuse is counted, not assumed. The 176 blocks make 458 placements across the seven sites: 229 live, 227 in UAT and 2 in draft. 123 blocks, 70% of the registry, already run on two or more sites, and 9 run on all seven.",
        media: {
          src: "/work/foundry/reuse.mp4",
          poster: "/work/foundry/reuse.webp",
          alt: "A matrix of 176 blocks by seven sites filling in, live, in UAT or draft",
        },
      },
      {
        title: "Deploys stay deliberate",
        body: "Every block moves through Draft, pull request with preview, In UAT, To deploy and Deployed, and its stage comes from the app, GitHub, UAT and production, never from someone updating a status. Deploy to production never runs anything blindly: it records who asked for which block on which site, and hands back the exact steps for the manual deploy.",
      },
    ],
    impact: [
      "One registry for seven sites: 176 blocks, each with its sites, engine and stage, read from the sites themselves.",
      "Reuse made visible: 123 blocks already run on two or more sites, and nine on all seven.",
      "A path from a design to a draft pull request, tested end to end on a real ToffeeWeb request.",
      "Deploys that stay deliberate: every request to production is recorded, and nothing runs on its own.",
    ],
    mosaic: {
      src: "/work/foundry/mosaic.mp4",
      poster: "/work/foundry/mosaic.webp",
      alt: "A wall of 38 real block previews, each with its engine and sites: 176 blocks, one registry",
    },
  },

  /* ═════════════════════════ 6 · CASINO TEMPLATE SET ═════════════════════════ */
  {
    slug: "casino-template-set",
    company: "Casino Template Set",
    role: "Design lead",
    period: "2026",
    headline: "Same blocks. Same data. Five identities.",
    scene: {
      eyebrow: "Template system · Data design",
      headline: "Same blocks. Same data. | Five identities.",
      line: "The template set behind MoveUp's casino sites: designed once, then rebuilt in five identities from one block library and one data model.",
      chips: ["Design systems", "Data design", "Multi-site"],
      teaser: {
        src: "/work/casino-template-set/teaser.mp4",
        poster: "/work/casino-template-set/teaser.webp",
        alt: "Five casino sites in five identities scrolling their home in sync",
      },
      tint: "190, 44, 64",
      surface: {
        bg: "#0A0A0C",
        ink: "#F3F3F1",
        muted: "#A0A09B",
        lead: "#7C7C78",
        accent: "#F3F3F1",
        line: "rgba(243, 243, 241, 0.16)",
        glow: "radial-gradient(50% 55% at 40% 48%, rgba(170, 36, 56, 0.24), transparent 70%)",
      },
      media: {
        kind: "clip",
        video: "/work/casino-template-set/scene.mp4",
        poster: "/work/casino-template-set/scene.webp",
        alt: "Five phones with five casino sites, each in its own identity, scrolling the same home sections in sync",
      },
      flip: true,
    },
    summary:
      "The set of screens MoveUp's casino sites are built from on Core Studio. I designed it on ItaliaCasinos, cut its block library from the final site and wrote down every field its screens need, so each new site keeps the blocks and the data and changes only its identity.",
    tags: [
      "DESIGN SYSTEMS",
      "TEMPLATES",
      "DATA DESIGN",
      "MULTI-SITE",
      "ACCESSIBILITY",
      "DESIGN QA",
    ],
    published: true,
    cover: {
      src: "/work/casino-template-set/cover.jpg",
      alt: "Five phones with five casino sites built from one template set",
      width: 1200,
      height: 675,
    },
    heroVideo: {
      src: "/work/casino-template-set/phones.mp4",
      poster: "/work/casino-template-set/phones.webp",
      alt: "ItaliaCasinos alone on a phone, then four more sites join: five identities scroll the same sections in sync, open their menus, reach the same review and copy its bonus code",
      caption:
        "The sites run live inside the phones. Operators, figures and codes are the placeholders of the template sets.",
    },
    stats: [
      { value: "5", label: "sites on one set of 71 sections" },
      { value: "30", label: "blocks and 59 variants in the library" },
      { value: "75", label: "data fields, every one answered" },
      { value: "67", label: "automated quality checks" },
    ],
    overview:
      "Core Studio is the platform MoveUp runs its sites on, and the casino template set is the set of screens its casino sites are built from: home, intent page, review, bonus page and promo code page, 71 sections in all. I designed the set on ItaliaCasinos, where it was defined and validated, and it became the reference every later site starts from. Five sites have been rebuilt from it so far, from Italy to LatAm, New Jersey and Switzerland, each in its own identity.",
    opportunities: [
      {
        title: "A new site, not a redesign",
        hmw: "How might we launch a new casino site from the same set, and still give it its own identity?",
      },
      {
        title: "Every figure needs a field",
        hmw: "How might we make sure every figure on every screen has a real data field behind it?",
      },
      {
        title: "A library that cannot drift",
        hmw: "How might we keep the block library identical to the sites built with it?",
      },
      {
        title: "Markets as data",
        hmw: "How might we change country, currency, regulator and language without touching the design?",
      },
    ],
    approach: [
      {
        title: "Defined once",
        body: "I designed the set on ItaliaCasinos, the first site, and validated it there. The rule for everything after it: same blocks, same data, a different identity, market and HTML structure. A new site does not redesign the set; it reuses its sections and blocks, and every site carries its own class prefix, so no two share the same markup.",
      },
      {
        title: "Every figure needs a field",
        body: "Each figure on each screen reads a field, and nobody could say whether those fields existed: the list had never been written in one place. I wrote it down: 75 fields in 9 records, from the operator and the offer to the market profile and the page settings, each with the value it shows on screen and the name the library uses, so every figure traces back to the block that reads it. Core Studio answered all 75: 11 confirmed, 25 to create, 8 derived or computed, 19 in WordPress, 5 kept by hand and 7 to decide. The first build phase takes 10 of them.",
        media: {
          src: "/work/casino-template-set/data-matrix.mp4",
          poster: "/work/casino-template-set/data-matrix.webp",
          alt: "A casino card with 13 figures tied to their fields, then 75 fields in nine records, the answers coming in and the build plan",
        },
      },
      {
        title: "Cut from the final site",
        body: "The block library has no copy of its own: every block is cut from the final ItaliaCasinos site at build time, so it can never fall behind the site. The rule: a block is a component a developer builds once, and a list, a grid or a section is not a block. That turned the 33 entries of the first version into 21 real components, and the final site added 9: 30 blocks and 59 variants in 8 families.",
        media: {
          src: "/work/casino-template-set/library.mp4",
          poster: "/work/casino-template-set/library.webp",
          alt: "Eleven blocks marked on the ItaliaCasinos home fly into the library, then the wall of 30 blocks in eight families",
        },
      },
      {
        title: "Carried to every site",
        body: "Each new site keeps the blocks and the data and changes the identity. Top Casinos Latino came first, with a dark header: white on its brand red measured 4.00:1 and failed AA, so its button carries near black text. Then Play US Casinos for New Jersey, REX Casinos, light first at the client's request, and casinotell for Switzerland, where promo codes do not exist.",
        media: {
          src: "/work/casino-template-set/every-site.mp4",
          poster: "/work/casino-template-set/every-site.webp",
          alt: "Ten blocks side by side across the five sites, with an empty column for the next one",
        },
      },
      {
        title: "The market is data",
        body: "A market is a record, not a pile of literals: country, locale, currency, separators, legal age, regulator and helplines. The market formats the money; the language only changes the words.",
      },
      {
        title: "Quality gates on every site",
        body: "Every site passes 45 static gates and 22 rendered checks, from grid gaps and overlaps to contrast and touch targets. Each new gate is proven by breaking a site on purpose.",
      },
    ],
    impact: [
      "One template set now runs five sites in five identities, from Italy to LatAm, New Jersey and Switzerland, and the next site starts from the same blocks.",
      "Every figure has a field behind it: 75 fields answered by Core Studio, with a first build phase of 10.",
      "A block library that cannot drift from the product, because it is cut from the final site on every build.",
      "Accessibility and quality checked on every site, with 45 static gates and 22 rendered checks.",
    ],
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

/** Only published projects, in declared order. Used everywhere public. */
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
