import { Fragment, type CSSProperties } from "react";
import Link from "next/link";
import HeroShowcase, { type ShowcaseItem } from "@/components/HeroShowcase";
import ProjectScene from "@/components/ProjectScene";
import Reveal from "@/components/Reveal";
import { caseStudies, galleryItems } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  const cases = caseStudies().filter((project) => project.scene);
  const gallery = galleryItems();

  // The tagline arrives word by word: muted lead-in, ink on the last two words.
  const words = site.tagline.replace(/\.$/, "").split(" ");
  const lead = words.length - 2;

  // The hero deck: one card per case, with its short clip and glow colour.
  const deck: ShowcaseItem[] = cases.flatMap((project) => {
    const scene = project.scene;
    if (!scene?.teaser || !scene.tint) return [];
    return [
      {
        slug: project.slug,
        company: project.company,
        eyebrow: scene.eyebrow,
        bg: scene.surface.bg,
        tint: scene.tint,
        teaser: scene.teaser,
      },
    ];
  });

  return (
    <>
      {/* Hero: the intro beside a live deck of the case studies */}
      <HeroShowcase items={deck}>
        <Reveal>
          <p className="eyebrow mb-5">{site.role}</p>
        </Reveal>
        <h1 className="text-balance text-[2.5rem] font-semibold leading-[1.03] tracking-tight sm:text-[3.4rem] lg:text-[3.1rem] xl:text-[3.4rem]">
          {words.map((word, i) => (
            <Fragment key={i}>
              <span
                className={`hero-word ${i < lead ? "text-muted-2" : "text-ink"}`}
                style={{ "--i": i } as CSSProperties}
              >
                {word}
                {i === words.length - 1 && "."}
              </span>
              {i < words.length - 1 && " "}
            </Fragment>
          ))}
        </h1>
        <Reveal delay={420}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            A focused look at the work: the role, the problem, and how I
            solved it. Want the longer story?{" "}
            <Link
              href="/about"
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
            >
              More about me
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={520}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper transition-opacity hover:opacity-90"
            >
              View work ↓
            </a>
            <Link
              href="/reel"
              className="rounded-full border border-line-strong px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-ink"
            >
              Watch the reel <span className="text-muted-2">· 1 min</span>
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-line-strong px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-ink"
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </HeroShowcase>

      {/* Selected work: one full-width scene per project */}
      <section id="work" aria-labelledby="work-heading" className="scroll-mt-16">
        <h2 id="work-heading" className="sr-only">
          Selected work
        </h2>
        {cases.map((project, i) => (
          <ProjectScene key={project.slug} project={project} index={i} />
        ))}
      </section>

      {/* More work: short entries without a case study */}
      {gallery.length > 0 && (
        <section aria-labelledby="more-heading" className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
          <h2 id="more-heading" className="eyebrow mb-6">
            More work
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {gallery.map((project, i) => (
              <Reveal as="li" key={project.slug} delay={i * 80} className="grid gap-1 py-5 sm:grid-cols-[240px_1fr] sm:gap-8">
                  <p className="text-[15px] font-medium text-ink">{project.company}</p>
                  <p className="text-[15px] leading-relaxed text-muted">{project.summary}</p>
                </Reveal>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
