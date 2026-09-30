import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.name} · ${site.role}`,
    description: site.tagline,
    url: site.baseUrl,
    siteName: site.name,
    type: "website",
    // The home hero at 1200x630, captured still (reduced motion) from the
    // built site. Case pages override it with their own cover.
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "The home of the portfolio: the headline beside a deck of four case studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description: site.tagline,
    images: ["/og.jpg"],
  },
};

// Runs before the first paint: applies a saved dark choice so the page
// never flashes the wrong theme. Light is the default and needs no attribute.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The theme script may add data-theme before hydration, so React is told
    // not to flag that attribute on <html>. data-scroll-behavior keeps smooth
    // scrolling for in-page anchors but lets route changes jump to the top.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
