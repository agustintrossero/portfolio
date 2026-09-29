import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CaseNav, { type NavItem } from "@/components/CaseNav";
import Reveal from "@/components/Reveal";
import DeviceFrame from "@/components/DeviceFrame";
import { getProject, caseStudies, type CaseImage } from "@/lib/projects";

type Params = { slug: string };

// Pre-render one static page per published case study at build time.
export function generateStaticParams(): Params[] {
  return caseStudies().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.company} · ${project.role}`;
  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      images: project.cover ? [{ url: project.cover.src }] : undefined,
    },
  };
}

/* ── Small section primitives ───────────────────────────── */

function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className="border-t border-line py-12 sm:py-16"
    >
      <div className="grid gap-x-10 gap-y-5 sm:grid-cols-[180px_1fr]">
        <h2 id={`${id}-label`} className="eyebrow sm:pt-1">
          {label}
        </h2>
        <div className="max-w-2xl">{children}</div>
      </div>
    </section>
  );
}

function Figure({ image }: { image: CaseImage }) {
  return (
    <figure className={image.span === "half" ? "" : "sm:col-span-2"}>
      <div className="overflow-hidden rounded-xl border border-line bg-paper-2">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-auto w-full"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-[13px] text-muted-2">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Splits a headline on its first sentence break into a muted lead + ink rest. */
function TwoTone({ text }: { text: string }) {
  const match = text.match(/^(.*?[.?!])\s+(.*)$/);
  if (!match) return <span className="text-ink">{text}</span>;
  return (
    <>
      <span className="text-muted-2">{match[1]}</span>{" "}
      <span className="text-ink">{match[2]}</span>
    </>
  );
}

/* ── Page ───────────────────────────────────────────────── */

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.published || project.kind === "gallery") notFound();

  const published = caseStudies();
  const idx = published.findIndex((p) => p.slug === slug);
  const next = published[(idx + 1) % published.length];

  const hasGlimpse =
    !!project.video || (project.images && project.images.length > 0);

  // Build the sticky sub-nav from the sections that actually exist.
  const navItems: NavItem[] = [
    project.overview && { id: "overview", label: "Overview" },
    project.challenge && { id: "challenge", label: "Challenge" },
    project.opportunities?.length && {
      id: "opportunities",
      label: "Opportunities",
    },
    project.approach?.length && { id: "approach", label: "Approach" },
    project.impact?.length && { id: "impact", label: "Impact" },
    hasGlimpse && { id: "glimpse", label: "Glimpse" },
  ].filter(Boolean) as NavItem[];

  const showcaseWrap =
    project.showcase?.device === "phone" ? "max-w-[300px]" : "max-w-3xl";

  return (
    <article>
      <CaseNav items={navItems} />

      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Back link */}
        <div className="pt-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[14px] text-muted transition-colors hover:text-ink"
          >
            <span
              aria-hidden
              className="transition-transform group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Selected Work
          </Link>
        </div>

        {/* Header: big two-tone thesis headline over a subtle glow */}
        <header className="relative pt-8 pb-12 sm:pt-10 sm:pb-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 h-[340px] hero-glow"
          />
          <div className="relative">
            <Reveal>
              <p className="eyebrow mb-4">
                {[project.company, project.role, project.period]
                  .filter(Boolean)
                  .join("  ·  ")}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="max-w-4xl text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-tight sm:text-[3.5rem]">
                <TwoTone text={project.headline ?? project.company} />
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
                {project.summary}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            {project.links && project.links.length > 0 && (
              <Reveal delay={320}>
                <div className="mt-6 flex flex-wrap gap-4 text-[14px]">
                  {project.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {l.label}
                      <span aria-hidden>↗</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </header>

        {/* Hero visual: full-bleed mockup, device showcase or a flat cover */}
        {project.heroImage ? (
          <Reveal variant="scale">
            <figure className="relative mx-auto max-w-3xl">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-12 bottom-0 -z-10 hero-glow"
              />
              <Image
                src={project.heroImage.src}
                alt={project.heroImage.alt}
                width={project.heroImage.width}
                height={project.heroImage.height}
                className="h-auto w-full"
                priority
                sizes="(min-width: 1024px) 768px, 100vw"
              />
            </figure>
          </Reveal>
        ) : project.showcase ? (
          <Reveal variant="scale">
            <figure className={`mx-auto ${showcaseWrap}`}>
              <DeviceFrame
                device={project.showcase.device}
                src={project.showcase.src}
                alt={project.showcase.alt}
                video={project.showcase.video}
                poster={project.showcase.poster}
                sizes={
                  project.showcase.device === "phone"
                    ? "300px"
                    : "(min-width: 768px) 768px, 90vw"
                }
              />
              {project.showcase.caption && (
                <figcaption className="mt-4 text-center text-[13px] text-muted-2">
                  {project.showcase.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>
        ) : (
          project.cover && (
            <Reveal variant="scale">
              <div className="mb-4 overflow-hidden rounded-2xl border border-line bg-paper-2">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  className="h-auto w-full"
                  priority
                  sizes="(min-width: 1024px) 1024px, 100vw"
                />
              </div>
            </Reveal>
          )
        )}

        {/* Body: each section renders only if it has content */}
        <div className="mt-6">
          {project.overview && (
            <Section id="overview" label="Overview">
              <Reveal>
                <p className="text-[17px] leading-relaxed text-ink/90">
                  {project.overview}
                </p>
              </Reveal>
            </Section>
          )}

          {project.challenge && (
            <Section id="challenge" label="The Challenge">
              <Reveal>
                <p className="text-[17px] leading-relaxed text-ink/90">
                  {project.challenge}
                </p>
              </Reveal>
            </Section>
          )}

          {project.opportunities && project.opportunities.length > 0 && (
            <Section id="opportunities" label="Opportunities">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.opportunities.map((op, i) => (
                  <Reveal as="li" key={op.title} delay={(i % 2) * 90} className="h-full rounded-xl border border-line bg-paper-2 p-5 transition-colors duration-200 hover:border-line-strong">
                      <h3 className="text-[15px] font-semibold tracking-tight text-ink">
                        {op.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">
                        {op.hmw}
                      </p>
                    </Reveal>
                ))}
              </ul>
            </Section>
          )}

          {project.approach && project.approach.length > 0 && (
            <Section id="approach" label="Approach">
              <ol className="flex flex-col gap-8">
                {project.approach.map((step, i) => (
                  <Reveal as="li" key={step.title} delay={i * 60} className="flex gap-5">
                      <span className="font-mono text-[13px] tabular-nums text-muted-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[17px] font-semibold tracking-tight text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 leading-relaxed text-muted">
                          {step.body}
                        </p>
                      </div>
                    </Reveal>
                ))}
              </ol>
            </Section>
          )}

          {project.impact && project.impact.length > 0 && (
            <Section id="impact" label="Impact & Outcomes">
              <ul className="flex flex-col gap-4">
                {project.impact.map((item, i) => (
                  <Reveal as="li" key={item} delay={i * 60} className="flex gap-3 leading-relaxed text-ink/90">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink"
                      />
                      <span className="text-[17px]">{item}</span>
                    </Reveal>
                ))}
              </ul>
            </Section>
          )}

          {hasGlimpse && (
            <Section id="glimpse" label="A glimpse">
              {project.video && (
                <Reveal variant="scale">
                  <figure className="mb-5">
                    <div className="overflow-hidden rounded-xl border border-line bg-paper-2">
                      <video
                        className="h-auto w-full"
                        src={project.video.src}
                        poster={project.video.poster}
                        controls
                        playsInline
                        preload="metadata"
                      />
                    </div>
                    {project.video.caption && (
                      <figcaption className="mt-3 text-[13px] text-muted-2">
                        {project.video.caption}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              )}
              {project.images && project.images.length > 0 && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {project.images.map((img, i) => (
                    <Reveal key={img.src} delay={(i % 2) * 90}>
                      <Figure image={img} />
                    </Reveal>
                  ))}
                </div>
              )}
            </Section>
          )}
        </div>

        {/* Next project */}
        {next && next.slug !== project.slug && (
          <Reveal>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-8 flex items-center justify-between border-t border-line py-10 transition-colors hover:bg-paper-2"
            >
              <div>
                <p className="eyebrow mb-2">Next project</p>
                <span className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {next.headline ?? next.company}
                </span>
              </div>
              <span
                aria-hidden
                className="text-2xl text-muted-2 transition-all group-hover:translate-x-1 group-hover:text-ink"
              >
                →
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  );
}
