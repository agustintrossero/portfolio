import Link from "next/link";
import ProjectScene from "@/components/ProjectScene";
import Reveal from "@/components/Reveal";
import { caseStudies, galleryItems } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  const cases = caseStudies().filter((project) => project.scene);
  const gallery = galleryItems();

  // Two-tone the tagline: muted lead-in, ink on the last two words.
  const words = site.tagline.replace(/\.$/, "").split(" ");
  const head = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");

  return (
    <>
      {/* Hero: short positioning, then an index of the work below it */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[440px] hero-glow"
        />
        <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-16">
          <Reveal>
            <p className="eyebrow mb-5">{site.role}</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="max-w-3xl text-balance text-[2.5rem] font-semibold leading-[1.03] tracking-tight sm:text-[3.6rem]">
              <span className="text-muted-2">{head} </span>
              <span className="text-ink">{tail}.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
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
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper transition-opacity hover:opacity-90"
              >
                View work ↓
              </a>
              <a
                href={`mailto:${site.email}`}
                className="rounded-full border border-line-strong px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-ink"
              >
                Get in touch
              </a>
            </div>
          </Reveal>

          {/* Quick index for fast readers: jump straight to a project */}
          <Reveal delay={340}>
            <nav
              aria-label="Projects"
              className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4"
            >
              {cases.map((project, i) => (
                <a key={project.slug} href={`#${project.slug}`} className="group">
                  <span className="font-mono text-[11px] tabular-nums text-muted-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-[15px] font-medium text-ink transition-colors duration-200 group-hover:text-accent">
                    {project.company}
                  </span>
                  <span className="block text-[13px] text-muted">
                    {project.scene?.eyebrow}
                  </span>
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

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
