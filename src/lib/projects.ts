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
    company: "Lebi",
    role: "Creator and design lead",
    period: "2024 to 2025",
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
      "Lumio is an AI analysis app for sports bettors. It reads match data and gives every match a confidence score, the Lumio Index, so a bet starts from probability instead of a hunch. I created Lumio and led its design end to end: onboarding, sign up, the Index, plans, payment and profile, 95 screens and states in all. The engineering team built it in house.",
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
      "Designed Lumio end to end, 95 screens and states from the first onboarding slide to the legal pages, built in house by the engineering team.",
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
