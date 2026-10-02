import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { caseStudies } from "@/lib/projects";
import { site } from "@/lib/site";

const description =
  "Two 60 second videos: a reel of seven projects, and a cut of the SaaS and design system work.";

export const metadata: Metadata = {
  title: "Reel",
  description,
  openGraph: {
    title: `Reel · ${site.name}`,
    description,
    images: [{ url: "/reel/cover.jpg", alt: "The opening title of the reel: Agustín Trossero, product designer who builds" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Reel · ${site.name}`,
    description,
    images: ["/reel/cover.jpg"],
  },
};

// Both videos are rendered from the case study clips in Desktop/idea/reel-video
// and copied to public/reel by scripts/media.sh. They have no sound.
const reels = [
  {
    id: "reel",
    title: "Reel",
    summary:
      "Seven projects in a minute, from the design system behind 16 sites to apps, internal tools and a concept for PlayStation.",
    src: "/reel/reel.mp4",
    small: "/reel/reel-sm.mp4",
    poster: "/reel/reel.webp",
    cases: ["gds-toffee", "moveup-tools", "lebi", "foundry", "lumio", "casino-template-set", "karma"],
  },
  {
    id: "saas",
    title: "SaaS and design systems",
    summary:
      "Tokens and brand themes in Figma, the internal platform every department uses, a registry that takes a new design to a pull request, and a SaaS for brands.",
    src: "/reel/saas.mp4",
    small: "/reel/saas-sm.mp4",
    poster: "/reel/saas.webp",
    cases: ["gds-toffee", "moveup-tools", "foundry", "lebi", "casino-template-set", "karma"],
  },
];

export default function ReelPage() {
  const names = new Map(caseStudies().map((p) => [p.slug, p.company]));

  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8">
      <section className="relative pt-16 pb-6 sm:pt-24 sm:pb-10">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-24 h-[380px] hero-glow" />
        <Reveal>
          <p className="eyebrow mb-5">Reel</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="relative max-w-2xl text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.75rem]">
            <span className="text-muted-2">The work, </span>
            <span className="text-ink">a minute at a time.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="relative mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            Two short videos made from the case studies. They have no sound,
            so they play anywhere.
          </p>
        </Reveal>
      </section>

      {reels.map((reel, i) => (
        <section
          key={reel.id}
          id={reel.id}
          aria-labelledby={`${reel.id}-title`}
          className="scroll-mt-20 border-t border-line py-12 sm:py-16"
        >
          <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 id={`${reel.id}-title`} className="text-[1.5rem] font-semibold tracking-tight text-ink">
              <span className="mr-3 font-mono text-[13px] font-normal text-muted-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {reel.title}
            </h2>
            <p className="font-mono text-[12px] text-muted-2">1 min · no sound</p>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">{reel.summary}</p>
          </Reveal>
          <Reveal delay={120} variant="scale">
            <video
              controls
              playsInline
              preload="metadata"
              poster={reel.poster}
              aria-label={`${reel.title}, a 60 second video without sound`}
              className="mt-8 block aspect-video w-full rounded-2xl border border-line bg-black"
            >
              <source src={reel.small} type="video/mp4" media="(max-width: 767px)" />
              <source src={reel.src} type="video/mp4" />
            </video>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[14px] leading-relaxed text-muted">
              <span className="text-muted-2">In this video: </span>
              {reel.cases.map((slug, k) => (
                <span key={slug}>
                  <Link
                    href={`/work/${slug}`}
                    className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {names.get(slug) ?? slug}
                  </Link>
                  {k < reel.cases.length - 1 && ", "}
                </span>
              ))}
            </p>
          </Reveal>
        </section>
      ))}
    </div>
  );
}
