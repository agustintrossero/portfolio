import Link from "next/link";
import WorkList from "@/components/WorkList";
import Reveal from "@/components/Reveal";
import DeviceFrame from "@/components/DeviceFrame";
import { caseStudies, galleryItems } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  const cases = caseStudies();
  const gallery = galleryItems();

  // Two-tone the tagline: muted lead-in, ink on the last two words.
  const words = site.tagline.replace(/\.$/, "").split(" ");
  const head = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");

  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8">
      {/* Hero — positioning on the left, a floating device on the right */}
      <section className="relative pt-14 pb-14 sm:pt-20 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[440px] hero-glow"
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">{site.role}</p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="max-w-2xl text-balance text-[2.35rem] font-semibold leading-[1.04] tracking-tight sm:text-[3.1rem]">
                <span className="text-muted-2">{head} </span>
                <span className="text-ink">{tail}.</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted">
                A focused look at the work — the role, the problem, and how I
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
          </div>

          {/* Floating device composition */}
          <Reveal variant="right" delay={200}>
            <div className="relative mx-auto w-full max-w-[300px] lg:ml-auto lg:mr-0">
              <div
                aria-hidden
                className="absolute -right-6 top-10 h-[70%] w-[62%] rotate-6 rounded-3xl border border-line bg-gradient-to-br from-paper-3 to-paper-2 shadow-2xl shadow-black/40"
              />
              <div className="relative">
                <DeviceFrame
                  device="phone"
                  src="/work/home/screen.svg"
                  alt="A taste of the product work"
                  sizes="300px"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Selected Work — deep case studies, the centerpiece */}
      <section id="work" aria-labelledby="work-heading" className="scroll-mt-24">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 id="work-heading" className="eyebrow">
            Selected Work
          </h2>
          <span className="font-mono text-[12px] text-muted-2">
            {String(cases.length).padStart(2, "0")} projects
          </span>
        </div>
        <WorkList projects={cases} />
      </section>

      {/* More work — quick-scan gallery for fast readers */}
      {gallery.length > 0 && (
        <section aria-labelledby="more-heading" className="mt-20">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 id="more-heading" className="eyebrow">
              More work
            </h2>
            <span className="font-mono text-[12px] text-muted-2">
              {String(gallery.length).padStart(2, "0")} projects
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {gallery.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} className="h-full">
                <li className="h-full rounded-xl border border-line bg-paper-2 p-5 transition-colors duration-200 hover:border-line-strong">
                  <h3 className="text-[16px] font-semibold tracking-tight text-ink">
                    {p.company}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {p.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-2"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
