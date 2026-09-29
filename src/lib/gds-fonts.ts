import {
  Barlow_Condensed,
  IBM_Plex_Sans,
  Inter,
  Plus_Jakarta_Sans,
  Poppins,
  Space_Grotesk,
  Work_Sans,
} from "next/font/google";

// Brand fonts of the Global Design System, used only by the live Match Card.
// preload is off, so a font downloads when a brand that uses it is rendered,
// never on first load. Variable names match scripts/gds-tokens.mjs.

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gds-jakarta",
  preload: false,
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-gds-work",
  preload: false,
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-gds-poppins",
  preload: false,
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-gds-inter",
  preload: false,
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-gds-barlow",
  preload: false,
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gds-plex",
  preload: false,
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-gds-grotesk",
  preload: false,
  display: "swap",
});

/** Class names that define the --font-gds-* variables on an element. */
export const gdsFontVariables = [jakarta, workSans, poppins, inter, barlow, plex, grotesk]
  .map((font) => font.variable)
  .join(" ");
