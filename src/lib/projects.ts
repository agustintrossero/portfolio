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
  /** Lighter 720p copy, served to screens up to 767px wide. */
  small?: string;
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

export type ExternalLink = {
  /** e.g. "Figma", "Behance", "Live site". */
  label: string;
  href: string;
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
  /** Put the media on the left on wide screens. By default scenes alternate. */
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

  /** Share image, and the hero visual of a case without a main clip. */
  cover?: { src: string; alt: string; width: number; height: number };
  /** Main clip of the case, full width on the project's surface. */
  heroVideo?: CaseClip;
  /** "At a glance" numbers under the hero. */
  stats?: Stat[];
  /** Full-width clip that shows the scope of the work (every screen, every block). */
  mosaic?: CaseClip;
  /** Sub-nav label of the mosaic band when "Scale" does not fit (e.g. "Dashboard"). */
  mosaicLabel?: string;
  /** How the project appears on the home. Projects without one are not shown there. */
  scene?: Scene;

  /* ── Case-study body (all optional; render only when present) ── */

  /** Context + your role. The "what was this and what did I own" paragraph. */
  overview?: string;
  /** The problem framed as several "How might we…" opportunity cards. */
  opportunities?: Opportunity[];
  /** How you solved it, as a sequence of steps. */
  approach?: ApproachStep[];
  /** Results & outcomes. Each string is a bullet; lead with the metric. */
  impact?: string[];
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
      small: "/work/gds/theme-swap-sm.mp4",
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
      small: "/work/gds/block-library-sm.mp4",
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
      small: "/work/lebi/onboarding-sm.mp4",
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
      small: "/work/lebi/screens-sm.mp4",
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

  /* ════════════════════════════ 2b · LEADERBOARD ═════════════════════════ */
  {
    slug: "leaderboard",
    company: "Leaderboard",
    role: "Product designer",
    period: "2025",
    headline: "A hiring challenge, taken all the way to handoff.",
    scene: {
      eyebrow: "Design challenge · Process",
      headline: "The challenge | that got me hired.",
      line: "A gamified leaderboard taken from research to a design system, two prototypes and an annotated handoff.",
      chips: ["Process", "Design systems", "Handoff"],
      teaser: {
        src: "/work/leaderboard/teaser.mp4",
        poster: "/work/leaderboard/teaser.webp",
        alt: "Gold, silver and bronze cards shrink as the leaderboard scrolls, then two players swap places in green and red",
      },
      tint: "101, 197, 231",
      surface: {
        bg: "#120733",
        ink: "#DAF5FF",
        muted: "#9D97C7",
        accent: "#FFE100",
        accentGradient: "linear-gradient(90deg, #FFE100, #65C5E7)",
        line: "rgba(218, 245, 255, 0.14)",
        glow: "radial-gradient(42% 52% at 66% 44%, rgba(101, 197, 231, 0.22), transparent 70%), radial-gradient(30% 38% at 84% 82%, rgba(255, 225, 0, 0.12), transparent 70%)",
      },
      media: {
        kind: "phone",
        video: "/work/leaderboard/motion-phone.mp4",
        poster: "/work/leaderboard/motion-phone.webp",
        alt: "The leaderboard on a phone: the Top 3 shrink as the list scrolls, two players swap places in green and red, and one tap finds your rank",
        float: {
          src: "/work/leaderboard/badge-gold.webp",
          alt: "The gold rank badge with laurels",
          width: 768,
          height: 804,
        },
      },
    },
    summary:
      "The design challenge MoveUp Media gave me while I was interviewing: a gamified leaderboard, taken from research to a design system, mobile and desktop prototypes and an annotated handoff. It got me the job, and part of its thinking lives on in Lebi.",
    tags: [
      "PRODUCT DESIGN",
      "DESIGN SYSTEMS",
      "PROTOTYPING",
      "HANDOFF",
      "GAMIFICATION",
      "MOTION",
    ],
    published: true,
    cover: {
      src: "/work/leaderboard/cover.jpg",
      alt: "The leaderboard on a phone beside the line: Top 3 that shrink as you scroll",
      width: 1200,
      height: 675,
    },
    heroVideo: {
      src: "/work/leaderboard/process.mp4",
      small: "/work/leaderboard/process-sm.mp4",
      poster: "/work/leaderboard/process.webp",
      alt: "A camera tour of the Figma file: introduction, research, the design system, the annotated design decisions, the prototypes and the conclusion",
      caption: "The Figma file as delivered. Every note and screen is the original.",
    },
    stats: [
      { value: "105", label: "components in the design system" },
      { value: "31", label: "annotated design decisions" },
      { value: "23", label: "prototyped mobile screens" },
      { value: "2", label: "prototypes, mobile and desktop" },
    ],
    overview:
      "MoveUp Media gave me this challenge during the interviews, while the company was in the early stages of Lebi: design a leaderboard. I treated it as a real product. Research and a mood board first, then an atomic design system built from vectors I drew myself, every flow prototyped on mobile and desktop, and a handoff that explains each decision next to the UI it belongs to. It got me the job, and part of its thinking was adopted by Lebi.",
    opportunities: [
      {
        title: "More than standings",
        hmw: "How might we turn a list of names and points into a place to compare, follow and talk to other players?",
      },
      {
        title: "Status worth chasing",
        hmw: "How might we make rank feel like an achievement, from the podium to the next class badge?",
      },
      {
        title: "Find yourself fast",
        hmw: "How might we keep every player one tap from their own position, however far down the list?",
      },
      {
        title: "Movement at a glance",
        hmw: "How might we make climbs and drops readable without studying the numbers?",
      },
      {
        title: "A file that explains itself",
        hmw: "How might we hand over a design that carries its own reasoning, flow by flow?",
      },
    ],
    approach: [
      {
        title: "Research first",
        body: "I benchmarked leaderboards in sports platforms and video games, from football and basketball to golf, boxing and Formula 1. Most only listed names and positions, with no way to compare stats, interact or build a community. That gap became the brief. The palette took its cue from the UEFA Champions League: deep blue for trust and precision, violet for a premium feel.",
        image: {
          src: "/work/leaderboard/research.webp",
          alt: "The mood board and the color palette: deep blues, violets and the Champions League references",
          width: 1800,
          height: 502,
        },
      },
      {
        title: "A system before screens",
        body: "Before the screens I built the system, atom by atom: color styles, then icons, class badges and rank shields drawn from my own vectors, then rows, cards and whole sections. 105 components, each with its states. The ranking row alone has seven, from climbing and dropping to you and chat.",
        media: {
          src: "/work/leaderboard/design-system.mp4",
          poster: "/work/leaderboard/design-system.webp",
          alt: "A camera over the design system: class badges and rank shields, the Top 3 cards, every state of the ranking row, icons, compare stats, chat and the trophy room",
        },
      },
      {
        title: "Motion with a purpose",
        body: "Each animation explains something. The Top 3 shrink as you scroll and keep their colors, a player who climbs turns green and one who drops turns red, your row stays pinned to the bottom, and one tap scrolls to your exact rank. Tapping rank 1 brings the podium back.",
        media: {
          src: "/work/leaderboard/motion.mp4",
          poster: "/work/leaderboard/motion.webp",
          alt: "The leaderboard in motion: the Top 3 shrink, two players swap places in green and red, one tap scrolls to your rank and rank 1 brings the podium back",
          caption: "The motion, rebuilt from the Figma components for this case study.",
        },
      },
      {
        title: "A handoff that explains itself",
        body: "Every decision sits next to the UI it explains, 31 notes in all, and the navigation is wired to each flow it opens. The file reads like a spec: what each element is, why it is there and how it behaves.",
        media: {
          src: "/work/leaderboard/handoff.mp4",
          poster: "/work/leaderboard/handoff.webp",
          alt: "The annotated handoff: the menu wired to every flow, then the notes of the leaderboard and user card flows highlighted one by one",
        },
      },
      {
        title: "Prototyped end to end",
        body: "Both prototypes work. On mobile: the leaderboard, player cards, compare stats, chat, your card and the trophy room. On desktop, everything on one screen. Try them yourself from the links above.",
        media: {
          src: "/work/leaderboard/prototype.mp4",
          poster: "/work/leaderboard/prototype.webp",
          alt: "A tour of the mobile prototype: a player card, compare stats, chat, your card and the trophy room",
          caption: "Screens captured from the Figma prototype.",
        },
      },
      {
        title: "One screen on desktop",
        body: "On desktop every section shares one screen. Your card stays in place, and choosing a player turns it into a compare view instead of opening a new page.",
        image: {
          src: "/work/leaderboard/desktop.webp",
          alt: "The desktop layout: your card, the leaderboard, the trophy room and friends on one screen",
          width: 1540,
          height: 982,
        },
      },
    ],
    impact: [
      "It got me the job: MoveUp Media hired me after this challenge.",
      "Part of its thinking was adopted by Lebi, the product MoveUp was starting at the time.",
      "A file that reads as a spec: research, a 105 component system, 31 annotated decisions and two working prototypes.",
    ],
    links: [
      { label: "Try the mobile prototype", href: "https://www.figma.com/proto/JQ3fUpcpVcHI9wXeYipuMo/Leaderboard?page-id=0%3A1&node-id=2325-1889&starting-point-node-id=2325-1889&scaling=scale-down" },
      { label: "Try the desktop prototype", href: "https://www.figma.com/proto/JQ3fUpcpVcHI9wXeYipuMo/Leaderboard?page-id=2547%3A9201&node-id=2325-1884&starting-point-node-id=2325-1884&scaling=scale-down" },
      { label: "Open the Figma file", href: "https://www.figma.com/design/JQ3fUpcpVcHI9wXeYipuMo/Leaderboard?node-id=2547-9239" },
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
      small: "/work/lumio/intro-sm.mp4",
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
      small: "/work/lumio/screens-sm.mp4",
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
      small: "/work/moveup-tools/mosaic-sm.mp4",
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
      small: "/work/foundry/tour-sm.mp4",
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
      small: "/work/foundry/mosaic-sm.mp4",
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
      small: "/work/casino-template-set/phones-sm.mp4",
      poster: "/work/casino-template-set/phones.webp",
      alt: "ItaliaCasinos alone on a phone, then four more sites join: five identities scroll the same sections in sync, open their menus, reach the same review and copy its bonus code",
      caption:
        "The sites run live inside the phones. Operators, figures and codes are the placeholders of the template sets.",
    },
    stats: [
      { value: "8", label: "casino sites on one set of 71 sections" },
      { value: "30", label: "blocks and 59 variants in the library" },
      { value: "75", label: "data fields, every one answered" },
      { value: "67", label: "automated quality checks" },
    ],
    overview:
      "Core Studio is the platform MoveUp runs its sites on, and the casino template set is the set of screens its casino sites are built from: home, intent page, review, bonus page and promo code page, 71 sections in all. I designed the set on ItaliaCasinos, where it was defined and validated, and it became the reference every later site starts from. The set runs eight casino sites; the five shown here were rebuilt from it, each in its own identity, from Italy to LatAm, New Jersey and Switzerland.",
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
      "One template set runs eight casino sites. The five shown here span Italy, LatAm, New Jersey and Switzerland, and the next site starts from the same blocks.",
      "Every figure has a field behind it: 75 fields answered by Core Studio, with a first build phase of 10.",
      "A block library that cannot drift from the product, because it is cut from the final site on every build.",
      "Accessibility and quality checked on every site, with 45 static gates and 22 rendered checks.",
    ],
  },

  /* ══════════════════════ 6b · BLUE HOUSE & GRÓTTA ══════════════════════ */
  {
    slug: "blue-house-grotta",
    company: "Blue House & Grótta",
    role: "Team lead, UX/UI and branding",
    period: "2024",
    headline: "Two guesthouses in Iceland. Two brands, one way to book.",
    scene: {
      eyebrow: "Hospitality · Branding",
      headline: "Two brands, | one booking flow.",
      line: "Two guesthouses on the same Icelandic peninsula, one shared interface: I created both brands and led the team that redesigned their sites, booking and guest communication.",
      chips: ["Branding", "Booking UX", "Research"],
      teaser: {
        src: "/work/blue-house-grotta/teaser.mp4",
        poster: "/work/blue-house-grotta/teaser.webp",
        alt: "The Blue House home page and phone booking screen wipe into the same pages in the Grótta Northern Lights brand",
      },
      tint: "29, 57, 103",
      surface: {
        bg: "#F2F5F8",
        ink: "#16213A",
        muted: "#5C6678",
        accent: "#1D3967",
        accentGradient: "linear-gradient(90deg, #1D3967, #1B686E)",
        line: "rgba(22, 33, 58, 0.14)",
        glow: "radial-gradient(44% 54% at 66% 46%, rgba(27, 104, 110, 0.12), transparent 70%), radial-gradient(34% 40% at 82% 80%, rgba(29, 57, 103, 0.10), transparent 70%)",
      },
      media: {
        kind: "clip",
        video: "/work/blue-house-grotta/scene.mp4",
        poster: "/work/blue-house-grotta/scene.webp",
        alt: "A browser and a phone show the Blue House pages, a line wipes them into Grótta Northern Lights, and both end split in half",
      },
    },
    summary:
      "Two Icelandic guesthouses on one interface: both brand identities, the websites, the booking flow, the guest emails, a help center and a chatbot, designed with the team I led at Siciliamia.",
    tags: ["BRANDING", "UX/UI", "E-COMMERCE", "UX RESEARCH", "DESIGN SYSTEMS", "LEADERSHIP"],
    published: true,
    cover: {
      src: "/work/blue-house-grotta/cover.jpg",
      alt: "The Blue House and Grótta Northern Lights home pages, split in half on a browser and a phone",
      width: 1200,
      height: 675,
    },
    heroVideo: {
      src: "/work/blue-house-grotta/hero.mp4",
      small: "/work/blue-house-grotta/hero-sm.mp4",
      poster: "/work/blue-house-grotta/hero.webp",
      alt: "The Blue House home page scrolls on a browser and a phone, a line wipes both into Grótta Northern Lights, and the two brands end side by side",
      caption: "Rebuilt from the Figma file and the two brand books for this case study.",
    },
    stats: [
      { value: "2", label: "brand identities I created" },
      { value: "38", label: "pages across the two brand books" },
      { value: "18", label: "help articles for guests" },
      { value: "5,667", label: "visits in the heatmap analysis" },
    ],
    overview:
      "Blue House B&B and Grótta Northern Lights are two guesthouses run by the same owner on the Seltjarnarnes peninsula, five minutes from Reykjavík and next to one of the city's best spots for the northern lights. They share three houses, a self-service breakfast and one booking engine, and sell their rooms on the big booking portals as well as on their own websites. At Siciliamia I led the design team that worked for them. I created both brand identities and their brand books, and with the team we redesigned the two websites on one shared interface, the booking flow, the emails guests receive, a help center and a chatbot, starting from what the site's analytics showed.",
    opportunities: [
      {
        title: "Book direct",
        hmw: "How might we make booking on the guesthouses' own websites clearer than on the big portals?",
      },
      {
        title: "Two brands, one team",
        hmw: "How might we give each guesthouse its own identity while one small team keeps a single interface?",
      },
      {
        title: "Fewer, better emails",
        hmw: "How might we tell guests everything they need after booking with fewer emails and less text?",
      },
      {
        title: "Answers before questions",
        hmw: "How might we answer what guests ask most before they have to write to the team?",
      },
    ],
    approach: [
      {
        title: "Two identities, one peninsula",
        body: "Blue House is a house inside a circle, in deep navy with greys and a soft sand. Grótta is the lighthouse at the tip of the peninsula, in deep and northern greens with a touch of aurora pink. I built both brand books on the same structure, from logo, symbol and type to colour, photography, stationery and tone of voice.",
        media: {
          src: "/work/blue-house-grotta/books.mp4",
          poster: "/work/blue-house-grotta/books.webp",
          alt: "The two brand books side by side turn the same sections together: logo, symbol, backgrounds, typography, colour, photography, print, invoices and tone of voice",
          caption: "Pages from my two brand books.",
        },
      },
      {
        title: "One interface, two coats",
        body: "Both websites run on the same layouts and components. Logo, colour and photography change; the structure stays, so the team designs each page once and dresses it in both brands, across four breakpoints from desktop to phone.",
      },
      {
        title: "Read the data first",
        body: "In February 2024 we went through the site's heatmaps and visits: 3,552 on desktop with 80% engaged, 2,074 on mobile with 73.86% engaged, and only 41 on tablet. Half of the visitors never scrolled past the hero and about 17% reached the end of the home page. Day Tours was among the least clicked buttons, nobody opened Support, Forum or Feedback on mobile, so those links went and the map and FAQ moved into general information, and with the cookie banner guests met two pop-ups on arrival.",
        media: {
          src: "/work/blue-house-grotta/data.mp4",
          poster: "/work/blue-house-grotta/data.webp",
          alt: "Visits by device draw in as bars, a marker walks down the home page from 100% to 50% to 17%, and three findings appear",
        },
      },
      {
        title: "Dates, guests, room, done",
        body: "On the phone the booking starts on the home page: dates, guests and one search button. Dates open as a full calendar, guests as three steppers, the results only list what is free on those dates, and each room shows the price for the whole stay once the dates are in.",
        media: {
          src: "/work/blue-house-grotta/mobile.mp4",
          poster: "/work/blue-house-grotta/mobile.webp",
          alt: "On a phone: tap check-in, pick the 3rd and the 6th of January, set two adults, search, open the economy double room, book it and reach the booking details with a voucher field",
        },
      },
      {
        title: "The same steps on a desktop",
        body: "On desktop the fields sit in one bar over the photo of the house, the rooms list below with refundable and non-refundable prices, and the room page keeps the stay at hand in a side panel, with states for rooms that are taken, partly free or need an enquiry.",
        media: {
          src: "/work/blue-house-grotta/desktop.mp4",
          poster: "/work/blue-house-grotta/desktop.webp",
          alt: "In a browser: open the calendar, pick the dates, set the guests, search, book a room from the list and check the dates on the room page",
        },
      },
      {
        title: "Fewer, better emails",
        body: "Guests received a long chain of automatic emails full of text, and most of them scrolled straight through. The brief was to send fewer and still say everything, so the templates were redesigned around icons, short blocks and links to the site: confirmation, breakfast, payment, house rules, northern lights tips and the review after the stay.",
        media: {
          src: "/work/blue-house-grotta/emails.mp4",
          poster: "/work/blue-house-grotta/emails.webp",
          alt: "A wall of the redesigned email templates drifts past while a phone scrolls the booking confirmation",
        },
      },
      {
        title: "Answers before questions",
        body: "A help center in Zoho Desk gathers 18 articles, 11 about the houses and 7 about Iceland. Puffinbot, a chatbot we designed for both houses, greets guests, offers 13 topics and answers with links to those articles, then asks how it went.",
        media: {
          src: "/work/blue-house-grotta/bot.mp4",
          poster: "/work/blue-house-grotta/bot.webp",
          alt: "Puffinbot opens on the Blue House site, greets the guest, offers topics, answers about the northern lights with a photo, asks for a rating and says goodbye",
          caption: "Puffinbot rebuilt from the chat mockup and the script in the file.",
        },
      },
      {
        title: "Built to hand off",
        body: "As team lead I set how files reached the engineers: a checklist before every handoff (delete what is unused, name layers in one convention, give every component its states), a component library with guidelines for developers, and the brief to connect the booking page to Beds24, the guesthouses' booking engine.",
      },
    ],
    impact: [
      "Both websites are live at bluehouse.is and grottanorthernlights.com, one interface in two brands, and their booking pages carry each brand's colours, icons and price promise.",
      "Two complete brand books, from logo and colour to stationery, email signatures and tone of voice.",
      "Led the design team from analytics and research to handoff, with one checklist and one component library for both brands.",
    ],
    mosaic: {
      src: "/work/blue-house-grotta/mosaic.mp4",
      small: "/work/blue-house-grotta/mosaic-sm.mp4",
      poster: "/work/blue-house-grotta/mosaic.webp",
      alt: "A tilted wall of screens from both brands drifts past: home pages, booking states, room pages, emails, pop-ups, the help center and the 404",
      caption: "Screens from the Figma file.",
    },
    mosaicLabel: "Screens",
    links: [
      { label: "Visit Blue House", href: "https://bluehouse.is" },
      { label: "Visit Grótta Northern Lights", href: "https://grottanorthernlights.com" },
      { label: "Blue House brand book", href: "https://www.behance.net/gallery/209828671/Blue-House-B-B" },
      { label: "Grótta brand book", href: "https://www.behance.net/gallery/209834605/Grotta-Northern-Lights-Branding" },
    ],
  },

  /* ═══════════════════════════════ 7 · KARMA ═════════════════════════════ */
  {
    slug: "karma",
    company: "Karma",
    role: "Self-initiated concept for PlayStation",
    period: "2024",
    headline: "Toxic players can ruin a good match. The fix was already in your hands.",
    scene: {
      eyebrow: "Concept for PlayStation",
      headline: "Rate the player, | not just the match.",
      line: "A self-initiated proposal: after an online match, players rate each other with the four face buttons and tag what happened.",
      chips: ["Concept", "Console UI", "Motion"],
      teaser: {
        src: "/work/karma/teaser.mp4",
        poster: "/work/karma/teaser.webp",
        alt: "A player's Karma card opens, the arc of their ratings draws in, and holding R2 with circle rates them red",
      },
      tint: "5, 205, 117",
      surface: {
        bg: "#14161C",
        ink: "#F2F3F5",
        muted: "#A7ADBA",
        accent: "#05CD75",
        accentGradient: "linear-gradient(90deg, #F74545, #D354EF 36%, #05CD75 68%, #2191D1)",
        line: "rgba(242, 243, 245, 0.12)",
        glow: "radial-gradient(42% 52% at 64% 46%, rgba(33, 145, 209, 0.18), transparent 70%), radial-gradient(30% 38% at 82% 80%, rgba(5, 205, 117, 0.12), transparent 70%)",
      },
      media: {
        kind: "clip",
        video: "/work/karma/scene.mp4",
        poster: "/work/karma/scene.webp",
        alt: "The Karma vote on a console card: pick a player from the last match, hold R2, press circle, tag them a Flamer and the vote is saved",
      },
    },
    summary:
      "A self-initiated proposal for PlayStation: players rate each other after online matches with the controller's own face buttons, tag what happened with one of eight badges, and carry the result on their profile.",
    tags: [
      "PRODUCT DESIGN",
      "CONSOLE UI",
      "INTERACTION DESIGN",
      "ILLUSTRATION",
      "PROTOTYPING",
      "MOTION",
    ],
    published: true,
    cover: {
      src: "/work/karma/cover.jpg",
      alt: "The Karma vote card beside a controller, with R2 held and circle pressed",
      width: 1200,
      height: 675,
    },
    heroVideo: {
      src: "/work/karma/vote.mp4",
      small: "/work/karma/vote-sm.mp4",
      poster: "/work/karma/vote.webp",
      alt: "The whole vote: the last match list, a player's card with the arc of their ratings, holding R2 and pressing circle, tagging a Flamer, the saved vote and the player's own Karma card",
      caption: "Rebuilt from the Figma file for this case study. A concept, not affiliated with Sony Interactive Entertainment.",
    },
    stats: [
      { value: "4", label: "ratings, one per face button" },
      { value: "8", label: "behaviour badges I drew" },
      { value: "16", label: "designed vote outcomes" },
      { value: "43", label: "frames in the clickable prototype" },
    ],
    overview:
      "Karma is a feature I designed on my own and propose to PlayStation. One player who insults, trolls or quits can sour a match for everyone, and the tools players have today come after the fact: mute, block, report. Karma lets every player rate the people they just played with, using the controller already in their hands, and turns those ratings into a reputation that follows them across games. I took it from the problem to a clickable prototype: the rating scale, the vote flow, eight behaviour badges, the player card and a weekly dashboard. It is a concept, not affiliated with Sony Interactive Entertainment.",
    opportunities: [
      {
        title: "Speak without typing",
        hmw: "How might we let players say what happened in a match without leaving the controller or writing a word?",
      },
      {
        title: "Reward, not only report",
        hmw: "How might we make good teammates as visible as bad ones?",
      },
      {
        title: "No votes by accident",
        hmw: "How might we keep a rushed button press from turning into a red rating?",
      },
      {
        title: "A reputation that travels",
        hmw: "How might we let a player's behaviour follow them from game to game, on the platform itself?",
      },
    ],
    approach: [
      {
        title: "Start from the console",
        body: "Before drawing anything I studied how people already use the console while a game is running: the Control Center slides up as cards over the game, and the controller does all the talking. Karma had to live there, as cards, driven by the same buttons.",
      },
      {
        title: "Borrow a habit people already have",
        body: "Rating a driver after a ride or a product after a delivery takes a couple of taps and no typing, and everyone knows how it works. Karma borrows that habit for the end of a match: pick the player, give the rating, say why.",
      },
      {
        title: "The scale was already on the controller",
        body: "The face buttons carry meaning. Cross confirms in blue, circle backs out in red, triangle and square sit in between in green and pink. I turned them into four faces, two negative and two positive, with no neutral middle, so every vote says something.",
        media: {
          src: "/work/karma/system.mp4",
          poster: "/work/karma/system.webp",
          alt: "Circle, square, triangle and cross take their colours and turn into the four rating faces, then the symbols return under them",
        },
      },
      {
        title: "Two buttons, on purpose",
        body: "Circle also means back, so a stray press must never become a red vote. Voting asks for R2 held down with a face button, a deliberate two finger gesture, while circle alone still takes you back to the game.",
        media: {
          src: "/work/karma/scene.mp4",
          poster: "/work/karma/scene.webp",
          alt: "The vote card beside a controller: R2 fills as it is held, then circle lights the red face",
        },
      },
      {
        title: "A vocabulary for behaviour",
        body: "After the rating comes the reason. Four badges name what went wrong: offensive language, trolling, flaming and leaving early. Four thank what went right, adapted from Bartle's player types: explorers, socializers, winners and killers. I drew all eight in vector; for this case study they also move.",
        media: {
          src: "/work/karma/badges.mp4",
          poster: "/work/karma/badges.webp",
          alt: "The eight badges in their cards, each one moving: a shouting speech bubble, a fading ghost, a troll sticking its tongue out, a flickering campfire, a turning globe, a handshake, a hopping trophy and a target locking on a skull",
          caption: "The badges are my original vectors from the file, animated for this case study.",
        },
      },
      {
        title: "Sketch, wireframe, interface",
        body: "Each screen went from pencil to grey boxes to the final cards and kept the same structure all the way, so the interface could be checked against the plan.",
        media: {
          src: "/work/karma/process.mp4",
          poster: "/work/karma/process.webp",
          alt: "Three screens, each one going from a pencil sketch to a wireframe to the final interface",
        },
      },
      {
        title: "Karma on your card",
        body: "Each player's own card sits on the main menu: the arc shows how others rated them, split by colour, with the two badges they get most. Opening it leads to a dashboard with the week's ratings, who rated them, who they rated and the players from the last match.",
      },
      {
        title: "What a rating could change",
        body: "Ratings only matter if they lead somewhere. Well rated players could get perks such as PlayStation Plus discounts or matches with other well rated players, and the best could help moderate. Low ratings could limit voice chat and voting, and point players to tips to improve rather than to a ban.",
      },
    ],
    impact: [
      "A working prototype of the whole vote, from the last match list to the saved vote, with the player card and the dashboard.",
      "A rating that needs two buttons and no typing, built on symbols every PlayStation player already reads.",
      "What I would test next: whether players still vote after a loss, how groups could gang up on someone, and how fast karma should fade.",
    ],
    mosaic: {
      src: "/work/karma/dashboard.mp4",
      small: "/work/karma/dashboard-sm.mp4",
      poster: "/work/karma/dashboard.webp",
      alt: "The Karma dashboard assembling itself: badges, the week's ratings as four waves, the score split, the player card, who rated you, who you rated and the last match players",
      caption: "The dashboard from the file, rebuilt to assemble itself.",
    },
    mosaicLabel: "Dashboard",
    links: [
      { label: "Try the prototype", href: "https://www.figma.com/proto/ZLUHzCThXRz3BxzvHJN4zM/Karma?page-id=0%3A1&node-id=138-3335&starting-point-node-id=138-3335&scaling=scale-down" },
    ],
  },

  /* ═══════════════════════ 8 · SAMPLE DATA YOU CAN TRUST ════════════════════ */
  // A self-initiated proposal for n8n, born from a real test in Agustín's own
  // n8n Cloud trial on 3 Oct 2026. "Today" clips and images are real, unedited
  // captures; "Concept" is the proposal. Not affiliated with n8n.
  {
    slug: "n8n-sample-data",
    company: "Sample data you can trust",
    role: "Self-initiated proposal for n8n",
    period: "2026",
    headline: "The test said Succeeded. The job it showed did not exist.",
    scene: {
      eyebrow: "Concept for n8n",
      headline: "Test runs that | never make things up.",
      line: "A self-initiated proposal: when n8n's AI Assistant tests a workflow, it should show what would really happen, not a result it invented.",
      chips: ["Concept", "AI UX", "Design systems"],
      teaser: {
        src: "/work/n8n-sample-data/teaser.mp4",
        poster: "/work/n8n-sample-data/teaser.webp",
        alt: "The save step turns into a Dry run, a tooltip explains that nothing was written, and the output shows the row it would write from the real OLX job",
      },
      tint: "31, 111, 235",
      surface: {
        bg: "#E6E6E9",
        ink: "#18181B",
        muted: "#5F5F68",
        accent: "#1F6FEB",
        accentGradient: "linear-gradient(90deg, #1F6FEB, #7F22FE 52%, #A15C00)",
        line: "rgba(24, 24, 27, 0.14)",
        glow: "radial-gradient(60% 70% at 50% 38%, #F7F7F8, transparent 78%)",
      },
      media: {
        kind: "clip",
        video: "/work/n8n-sample-data/scene.mp4",
        poster: "/work/n8n-sample-data/scene.webp",
        alt: "The three directions side by side at the same moment: first the save step on the canvas, then its output",
      },
    },
    summary:
      "A self-initiated proposal for n8n's AI Assistant: when it tests a workflow without saving anything, show what would really happen, not a result it made up that looks exactly like a real one.",
    tags: ["PRODUCT DESIGN", "AI UX", "INTERACTION DESIGN", "DESIGN SYSTEMS", "UX WRITING", "MOTION"],
    published: true,
    cover: {
      src: "/work/n8n-sample-data/cover.jpg",
      alt: "The three directions side by side, Dry run preview, Sample state and Test run receipt, each showing the save step after a test run",
      width: 1200,
      height: 675,
    },
    heroVideo: {
      src: "/work/n8n-sample-data/hero.mp4",
      small: "/work/n8n-sample-data/hero-sm.mp4",
      poster: "/work/n8n-sample-data/hero.webp",
      alt: "First the real capture: the save step with only a purple pin, and an invented Travelperk job under Success. Then the proposal: the step shows the row it would write from the real OLX job, says nothing was written, and offers one button to run it for real",
      caption: "Today is a real, unedited capture from my n8n Cloud trial. Concept is my proposal, rebuilt in n8n's visual language. Not affiliated with n8n.",
    },
    stats: [
      { value: "19", label: "real jobs the test run read" },
      { value: "1", label: "real job it kept, at OLX" },
      { value: "1", label: "invented job shown as Succeeded" },
      { value: "3", label: "separate approvals for one request" },
    ],
    overview:
      "n8n lets people automate work by connecting steps on a canvas, and its new AI Assistant builds those steps from a plain request. I tried it on a real task of mine: every weekday, find remote Product Designer jobs that hire from Spain and save them to a table. Before switching it on, the Assistant ran a test. So that the test would not save anything, it simulated the last step, and to do that it made up a result: a job at Travelperk, with a salary and a believable link. The run history said Succeeded, every step had a green check, and the real job the workflow had found, at OLX, sat one step earlier. Sample data you can trust is a feature I designed on my own and propose to n8n, so that a test run shows what would really happen instead of results that look real and are not. I took it from that real test to three directions, the screens for each and a component set ready to hand off. It is a concept, not affiliated with n8n.",
    opportunities: [
      {
        title: "Sample looks like sample",
        hmw: "How might we make simulated output impossible to mistake for real output, wherever it shows up: canvas, output, history and chat?",
      },
      {
        title: "Real data first",
        hmw: "How might we show what a step would do with the real item, instead of inventing one?",
      },
      {
        title: "Say what will happen",
        hmw: "How might we tell people in plain words what changes when they run a step for real?",
      },
      {
        title: "Ask once, keep the risky steps",
        hmw: "How might we ask for permission once, without hiding the steps that write, delete or cost money?",
      },
    ],
    approach: [
      {
        title: "What happened, in plain words",
        body: "A test run is a rehearsal: the workflow runs, but steps that change things, like saving a row or sending an email, should not. n8n already lets developers pin data on a step so it returns the same result every time they test. The Assistant used that pin to fake the save step, and nothing on screen said so: only a purple border and a small pin icon, with no tooltip.",
        media: {
          src: "/work/n8n-sample-data/problem.mp4",
          poster: "/work/n8n-sample-data/problem.webp",
          alt: "The real capture: the save step with a purple border and a pin, then its output, a Travelperk job with a salary and a link, under Success in 0s",
          caption: "Real capture from my n8n Cloud trial, 3 Oct 2026.",
        },
      },
      {
        title: "Why it matters",
        body: "When invented data looks like real data, trust breaks both ways: people act on a job, a customer or an invoice that does not exist, or they find out once and stop trusting every green check. Here the chat said the save step was simulated while the panel next to it showed Travelperk, and the Assistant only called the row made up when I asked.",
        image: {
          src: "/work/n8n-sample-data/today-history.webp",
          alt: "The n8n execution history: the test run at 14:24 says Succeeded in 380ms, every step has a green check, and the save step shows the invented Travelperk row",
          width: 1568,
          height: 713,
          caption: "The test run in the execution history: Succeeded, with the invented row. Real capture.",
        },
      },
      {
        title: "Five rules before drawing",
        body: "Sample data looks like sample data everywhere. Show what would happen with the real data instead of inventing it. Say the effect in plain words. Give one clear way to make it real, with the consequence before the click. And fit n8n: extend what it already has, like the pin, the Kept and Discarded tabs on filters and the logs, instead of replacing it.",
      },
      {
        title: "Direction A · Dry run preview",
        body: "Nothing is invented. The save step runs dry and shows the row it would write, built from the real OLX job. Fields that only exist once a row is saved, like the id, say assigned on write. One button, Run this step for real, says what it will do before you click: write 1 row.",
        media: {
          src: "/work/n8n-sample-data/dry-run.mp4",
          poster: "/work/n8n-sample-data/dry-run.webp",
          alt: "Concept A: the save step turns blue and dashed with a Dry run chip, a tooltip says nothing was written, and the output shows the OLX row with id and dates marked assigned on write",
        },
      },
      {
        title: "Direction B · Sample state",
        body: "The smallest change. The simulation stays, but sample data looks like sample everywhere: the node is tinted with a Sample chip, the row is tagged, a banner names the real item from the step before, and the history says 1 step simulated. It grows out of the purple pin n8n already uses.",
        media: {
          src: "/work/n8n-sample-data/sample.mp4",
          poster: "/work/n8n-sample-data/sample.webp",
          alt: "Concept B: the save step is tinted purple with a Sample chip, and the Travelperk row is tinted and tagged, under a banner that says it was made up and that the real item is OLX",
        },
      },
      {
        title: "Direction C · Test run receipt",
        body: "The biggest bet. A test becomes its own kind of run, with side effects off. A step that would write is Skipped, not Succeeded, and the run leaves a receipt of what ran and what was skipped. The canvas, the logs, the history and the chat all read from that one receipt, so they can never disagree.",
        media: {
          src: "/work/n8n-sample-data/receipt.mp4",
          poster: "/work/n8n-sample-data/receipt.webp",
          alt: "Concept C: a test run bar says side effects are off, the save step is Skipped, and a receipt lists what ran, what was skipped and the row it would have written",
        },
      },
      {
        title: "Which one I would build first",
        body: "Direction A. It is the only one that never shows invented data, and it reuses what n8n already has: the real item from the step before. B could ship sooner as a first fix. C is where I would take it next, once a single test can touch many tools at once.",
        media: {
          src: "/work/n8n-sample-data/scene.mp4",
          poster: "/work/n8n-sample-data/scene.webp",
          alt: "The three directions side by side at the same moment: the save step on the canvas, then its output",
        },
      },
      {
        title: "One plan, approved once",
        body: "For one request the Assistant asked three separate times: to read a URL, to create a table and to run the workflow. In the concept it shows its plan first and you approve it once. Anything that writes for real, deletes data or costs money still asks, one by one.",
        media: {
          src: "/work/n8n-sample-data/plan.mp4",
          poster: "/work/n8n-sample-data/plan.webp",
          alt: "Today, three approval cards one after the other. Concept, one plan card listing read, create a table, build a draft and test it once, with Approve plan",
        },
      },
      {
        title: "Examples that follow the request",
        body: "Before I had asked for anything, the Assistant suggested security automations, like 1Password exports and Entra ID alerts. In the concept the examples follow what you are typing, so a job search brings job search examples.",
        media: {
          src: "/work/n8n-sample-data/examples.mp4",
          poster: "/work/n8n-sample-data/examples.webp",
          alt: "Today, security examples on the Assistant home. Concept, a typed request about remote design jobs and four examples about job posts",
        },
      },
      {
        title: "Built to hand off",
        body: "One node with six named states: three that exist today and one new state per direction. Every color is a variable, and the banner all three share is annotated with spacing and type, in a file organized one page per direction: 12 components, 44 color variables and 18 text styles.",
        media: {
          src: "/work/n8n-sample-data/handoff.mp4",
          poster: "/work/n8n-sample-data/handoff.webp",
          alt: "The color variables of each direction, the node in its six states, the banner annotated for developers and the pages of the file",
        },
      },
    ],
    impact: [
      "Three directions, each shown in the same three moments: the editor after a test run, the Assistant chat and the execution history.",
      "A component set ready to hand off: one node with six named states, color variables and annotated specs.",
      "What I would test next: whether people can tell a test from a real run without reading, how often they run a step for real after a preview, and whether the receipt in C is worth its extra weight.",
    ],
    mosaic: {
      src: "/work/n8n-sample-data/screens.mp4",
      small: "/work/n8n-sample-data/screens-sm.mp4",
      poster: "/work/n8n-sample-data/screens.webp",
      alt: "The nine screens: three directions across the same three moments, the editor after the test run, the Assistant chat and the execution history",
      caption: "Three directions, the same three moments: nine screens, one story.",
    },
    mosaicLabel: "Screens",
    images: [
      {
        src: "/work/n8n-sample-data/screen-a-editor.webp",
        alt: "Concept A, the editor after a test run: the save step in Dry run, its tooltip, and the output with the OLX row it would write and the Run this step for real button",
        width: 1920,
        height: 1200,
        caption: "Concept A · Dry run preview, the direction I would build first.",
        span: "wide",
      },
      {
        src: "/work/n8n-sample-data/screen-b-editor.webp",
        alt: "Concept B, the editor after a test run: the save step tinted with a Sample chip and the tagged Travelperk row",
        width: 1920,
        height: 1200,
        caption: "Concept B · Sample state.",
        span: "half",
      },
      {
        src: "/work/n8n-sample-data/screen-c-editor.webp",
        alt: "Concept C, the editor after a test run: the test run bar, the save step Skipped and the receipt of what ran",
        width: 1920,
        height: 1200,
        caption: "Concept C · Test run receipt.",
        span: "half",
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
