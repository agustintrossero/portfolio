/**
 * Global site configuration: the single source of truth for identity,
 * contact, and social links. Edit here; every page reads from this.
 */
export const site = {
  name: "Agustín Trossero",
  role: "Lead UX/UI Designer",
  // One-line positioning statement shown in the top bar / about.
  tagline: "Turning product vision into measurable outcomes.",
  email: "agustintrossero@gmail.com",
  // Path to the CV inside /public. Drop the PDF there with this exact name.
  resume: "/Agustin-Trossero-CV.pdf",
  location: "Argentina",
  baseUrl: "https://agustin-trossero-portfolio.netlify.app",

  // TODO: confirm/replace these URLs with your real profiles.
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
