import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, ${site.role}.`,
};

// Everything below comes from the CV (Desktop/Agus/CV/cv.html).
const capabilities = [
  {
    group: "Design systems",
    items: "Token architecture, multi-brand theming, light and dark modes, Figma Variables, component specs, documentation, design QA",
  },
  {
    group: "Product design",
    items: "UX/UI, user research, usability testing, interaction design, prototyping, information architecture, data-dense UI, accessibility (WCAG), branding",
  },
  {
    group: "Design engineering",
    items: "React, Next.js, TypeScript, Tailwind CSS, HTML, CSS, JavaScript, Git",
  },
  {
    group: "AI",
    items: "AI coding agents (Claude Code), AI prototyping, APIs from Anthropic, Gemini, ElevenLabs and Seedance",
  },
  { group: "Tools", items: "Figma, Framer, Jira, Adobe Creative Cloud" },
  { group: "Languages", items: "Spanish (native), English (C2, near-native)" },
];

const experience = [
  {
    company: "MoveUp Media",
    role: "Senior Product UX/UI Designer",
    period: "Feb 2025 to present",
    place: "Remote (Paris, France)",
    note: "A multi-brand sports media group across 20+ markets. The Global Design System, MoveUp Tools, Foundry, Lumio, Lebi and the Casino Template Set.",
  },
  {
    company: "Siciliamia",
    role: "Team Leader UX/UI Designer",
    period: "Dec 2023 to Feb 2025",
    place: "Remote (Sicily, Italy)",
    note: "Online shops for desktop, tablet and mobile. Led a team of three designers from research to handoff and grew the design system that kept every shop consistent.",
  },
  {
    company: "Digital Tie",
    role: "UX/UI Designer & Frontend Developer (React)",
    period: "Jan 2020 to Dec 2023",
    place: "Remote (Buenos Aires, Argentina)",
    note: "A digital marketing agency: web and mobile interfaces and branding for its clients, research and design workshops, and front ends built in React.",
  },
  {
    company: "Freelance",
    role: "Designer & Developer",
    period: "2019 to 2023",
    note: "Brand identities and graphic design for small businesses, then websites and online stores, designed and built end to end.",
  },
];

const education = [
  { period: "2024", title: "Google UX Design Professional Certificate", school: "Google" },
  { period: "2022 to 2024", title: "UX/UI Design and Advanced UX/UI", school: "Coderhouse" },
  {
    period: "2021 to 2023",
    title: "Full Stack Web Development",
    school: "Digital House, with React at Coderhouse and React & Redux on Coursera",
  },
  { period: "2005 to 2010", title: "Advertising studies", school: "UCES, Buenos Aires" },
];

/** A labelled row, like the sections of a case study. */
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12 sm:py-16">
      <div className="grid gap-x-10 gap-y-5 sm:grid-cols-[180px_1fr]">
        <h2 className="eyebrow sm:pt-1">{label}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

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
                  I&apos;m {site.name.split(" ")[0]}, a {site.role} who{" "}
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

            <Reveal delay={300}>
              <p className="mt-6 text-[14px] text-muted">
                Based in {site.location}. Open to remote.
              </p>
            </Reveal>
          </div>

          {/* Portrait: the LinkedIn photo, built by scripts/media.sh */}
          <Reveal variant="right" delay={200} className="order-first sm:order-none">
            <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl border border-line bg-paper-2">
              <Image
                src="/portrait.webp"
                alt={`Portrait of ${site.name}`}
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Section label="Experience">
        <ol className="flex flex-col gap-9">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.company} delay={i * 60}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[17px] font-semibold tracking-tight text-ink">
                  {job.company}
                  <span className="font-normal text-muted"> · {job.role}</span>
                </h3>
                <p className="font-mono text-[12px] text-muted-2">{job.period}</p>
              </div>
              {job.place && <p className="mt-1 text-[14px] text-muted-2">{job.place}</p>}
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{job.note}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section label="Capabilities">
        <dl className="flex flex-col gap-5">
          {capabilities.map((c, i) => (
            <Reveal key={c.group} delay={i * 50} className="grid gap-x-8 gap-y-1 sm:grid-cols-[160px_1fr]">
              <dt className="text-[15px] font-medium text-ink">{c.group}</dt>
              <dd className="leading-relaxed text-muted">{c.items}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section label="Education">
        <ul className="flex flex-col gap-4">
          {education.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 50} className="grid gap-x-8 gap-y-1 sm:grid-cols-[120px_1fr]">
              <span className="font-mono text-[12px] text-muted-2 sm:pt-1">{e.period}</span>
              <span className="leading-relaxed text-muted">
                <span className="font-medium text-ink">{e.title}</span> · {e.school}
              </span>
            </Reveal>
          ))}
        </ul>
      </Section>

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
