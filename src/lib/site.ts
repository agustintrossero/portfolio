/**
 * Global site configuration: the single source of truth for identity,
 * contact, and social links. Edit here; every page reads from this.
 */
export const site = {
  name: "Agustín Trossero",
  role: "Senior Product UX/UI Designer",
  // One-line positioning statement shown in the top bar / about.
  tagline: "Turning product vision into measurable outcomes.",
  email: "agustintrossero@gmail.com",
  // The CV inside /public, copied from Desktop/Agus/CV by scripts/media.sh.
  resume: "/Agustin_Trossero_CV.pdf",
  location: "Madrid, Spain",
  baseUrl: "https://agustin-trossero-portfolio.netlify.app",

  // The same profiles as the previous portfolio (checked 2026-09-30).
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/agustintrossero" },
    { label: "Behance", href: "https://www.behance.net/agustintrossero" },
    { label: "GitHub", href: "https://github.com/agustintrossero" },
    { label: "Instagram", href: "https://www.instagram.com/agustrossero_tattoo" },
  ],
} as const;

export const nav = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
] as const;
