import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, ${site.role}.`,
};

const skills = [
  "UX Research",
  "UI Design",
  "Design Systems",
  "Prototyping",
  "Figma",
  "Framer",
  "React",
  "Frontend Dev",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8">
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[380px] hero-glow"
        />
        <Reveal>
          <p className="eyebrow mb-5">About</p>
        </Reveal>
        <div className="relative grid gap-10 sm:grid-cols-[1fr_280px] sm:gap-14">
          <div>
            <Reveal delay={80}>
              <h1 className="max-w-2xl text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.75rem]">
                <span className="text-muted-2">
                  I&apos;m {site.name.split(" ")[0]}, a{" "}
                  {site.role.toLowerCase()} who{" "}
                </span>
                <span className="text-ink">
                  turns vision into reality with design and code.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 flex max-w-xl flex-col gap-5 text-[17px] leading-relaxed text-muted">
                <p>
                  I lead the design of digital products end to end, from
                  research and strategy through polished, accessible UI, and I
                  can take it all the way into code. That blend lets me move
                  fast, keep designs honest about what&apos;s buildable, and
                  ship work I stand behind.
                </p>
                <p>
                  Outside of product design I&apos;m a tattoo artist, a
                  musician, and a football coach for women&apos;s and men&apos;s
                  teams. Those worlds keep my creativity, adaptability, and
                  leadership sharp, and they show up in how I approach design
                  problems.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper transition-opacity hover:opacity-90"
                >
                  Download CV ↗
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

          {/* Portrait: drop your photo at /public/portrait.jpg */}
          <Reveal variant="right" delay={200} className="order-first sm:order-none">
            <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl border border-line bg-paper-2">
              <Image
                src="/portrait.svg"
                alt={`Portrait of ${site.name}`}
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-line py-12 sm:py-16">
        <div className="grid gap-x-10 gap-y-5 sm:grid-cols-[180px_1fr]">
          <h2 className="eyebrow sm:pt-1">Capabilities</h2>
          <ul className="flex flex-wrap gap-2.5">
            {skills.map((skill, i) => (
              <Reveal as="li" key={skill} delay={i * 45} className="rounded-full border border-line px-3.5 py-1.5 text-[14px] text-ink transition-colors duration-200 hover:border-line-strong">
                  {skill}
                </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Elsewhere */}
      <section className="border-t border-line py-12 sm:py-16">
        <div className="grid gap-x-10 gap-y-5 sm:grid-cols-[180px_1fr]">
          <h2 className="eyebrow sm:pt-1">Elsewhere</h2>
          <ul className="flex flex-col gap-3 text-[16px]">
            {site.socials.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 55}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {s.label}
                    <span aria-hidden className="text-muted-2">
                      ↗
                    </span>
                  </a>
                </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
