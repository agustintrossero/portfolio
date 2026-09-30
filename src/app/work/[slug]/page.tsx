import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CaseNav, { type NavItem } from "@/components/CaseNav";
import Reveal from "@/components/Reveal";
import LoopVideo from "@/components/LoopVideo";
import {
  getProject,
  caseStudies,
  type CaseClip,
  type CaseImage,
  type Project,
} from "@/lib/projects";
import { accentStyle, splitHeadline, surfaceVars } from "@/lib/surface";

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
  const images = project.cover ? [{ url: project.cover.src, alt: project.cover.alt }] : undefined;
  return {
    title,
    description: project.summary,
    openGraph: { title, description: project.summary, images },
    twitter: { card: "summary_large_image", title, description: project.summary, images },
  };
}

/* Small section primitives */

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
    <figure>
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

/** A looping clip framed for reading columns, on the project's surface. */
function Clip({ clip }: { clip: CaseClip }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-line bg-[var(--s-bg)]">
        <LoopVideo src={clip.src} poster={clip.poster} label={clip.alt} ratio="16 / 9" />
      </div>
      {clip.caption && (
        <figcaption className="mt-3 text-[13px] text-muted-2">{clip.caption}</figcaption>
      )}
    </figure>
  );
}

/** Full-width band on the project's own colour, holding one clip. */
function ClipBand({
  id,
  label,
  clip,
  glow,
}: {
  id?: string;
  label: string;
  clip: CaseClip;
  glow?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className="relative isolate overflow-hidden bg-[var(--s-bg)] text-[var(--s-ink)]"
    >
      {glow && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: glow }} />
      )}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-16">
        <Reveal variant="scale">
          <LoopVideo
            src={clip.src}
            small={clip.small}
            poster={clip.poster}
            label={clip.alt}
            ratio="16 / 9"
            className="rounded-xl"
          />
        </Reveal>
        {clip.caption && (
          <p className="mt-4 text-center text-[13px] text-[var(--s-muted)]">{clip.caption}</p>
        )}
      </div>
    </section>
  );
}

/** Splits a headline on its first sentence break into a muted lead and an ink rest. */
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

/** The next case as a band in its own colours, with its home headline. */
function NextCase({ next }: { next: Project }) {
  const s = next.scene?.surface;
  const [lead, accent] = splitHeadline(next.scene?.headline ?? next.headline ?? next.company);
  return (
    <Link
      href={`/work/${next.slug}`}
      style={surfaceVars(s)}
      className="group relative isolate mt-12 block overflow-hidden bg-[var(--s-bg)] text-[var(--s-ink)]"
    >
      {s?.glow && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: s.glow }} />
      )}
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--s-muted)]">
          Next case · {next.company}
        </p>
        <p className="mt-5 max-w-3xl text-balance text-[2.2rem] font-semibold leading-[1.03] tracking-tight sm:text-[3.2rem]">
          <span style={{ color: s?.lead ?? s?.ink }}>{lead}</span>
          {accent && (
            <>
              {" "}
              <span style={accentStyle(s)}>{accent}</span>
            </>
          )}
          <span
            aria-hidden
            className="ml-3 inline-block transition-transform duration-200 group-hover:translate-x-1.5"
          >
            →
          </span>
        </p>
      </div>
    </Link>
  );
}

/* Page */

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
  const surface = project.scene?.surface;

  const hasGlimpse = !!project.images?.length;

  // Build the sticky sub-nav from the sections that actually exist.
  const navItems: NavItem[] = [
    project.overview && { id: "overview", label: "Overview" },
    project.opportunities?.length && {
      id: "opportunities",
      label: "Opportunities",
    },
    project.approach?.length && { id: "approach", label: "Approach" },
    project.impact?.length && { id: "impact", label: "Impact" },
    project.mosaic && { id: "scale", label: "Scale" },
    hasGlimpse && { id: "glimpse", label: "Glimpse" },
  ].filter(Boolean) as NavItem[];

  // Steps with a clip alternate sides, counted among themselves.
  let clipCount = 0;

  return (
    <article style={surfaceVars(surface)}>
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
      </div>

      {/* Hero visual: the main clip on the project's colour, or the cover */}
      {project.heroVideo ? (
        <ClipBand label="Main clip" clip={project.heroVideo} glow={surface?.glow} />
      ) : (
        project.cover && (
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
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
          </div>
        )
      )}

      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* At a glance: confirmed numbers only */}
        {project.stats && project.stats.length > 0 && (
          <section aria-label="At a glance" className="py-10 sm:py-14">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {project.stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 70}
                  className="flex flex-col border-l border-line pl-4"
                >
                  <dt className="order-2 mt-1.5 text-[13px] leading-snug text-muted">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-[2.4rem] font-semibold leading-none tracking-tight text-ink sm:text-[2.8rem]">
                    {stat.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </section>
        )}

        {/* Body: each section renders only if it has content */}
        <div className={project.stats?.length ? "" : "mt-6"}>
          {project.overview && (
            <Section id="overview" label="Overview">
              <Reveal>
                <p className="text-[17px] leading-relaxed text-ink/90">
                  {project.overview}
                </p>
              </Reveal>
            </Section>
          )}

          {project.opportunities && project.opportunities.length > 0 && (
            <Section id="opportunities" label="Opportunities">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.opportunities.map((op, i) => (
                  <Reveal
                    as="li"
                    key={op.title}
                    delay={(i % 2) * 90}
                    className="h-full rounded-xl border border-line bg-paper-2 p-5 transition-colors duration-200 hover:border-line-strong"
                  >
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

          {/* Approach: the heart of the case. Steps with a clip become a
              zigzag row, so each decision sits next to its proof (a clip or a still). */}
          {project.approach && project.approach.length > 0 && (
            <section
              id="approach"
              aria-labelledby="approach-label"
              className="border-t border-line py-12 sm:py-16"
            >
              <h2 id="approach-label" className="eyebrow mb-10">
                Approach
              </h2>
              <ol className="flex flex-col gap-14 sm:gap-20">
                {project.approach.map((step, i) => {
                  const text = (
                    <div className="flex gap-5">
                      <span className="font-mono text-[13px] tabular-nums text-muted-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[19px] font-semibold tracking-tight text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-md leading-relaxed text-muted">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  );
                  if (!step.media && !step.image) {
                    return (
                      <Reveal as="li" key={step.title} className="lg:max-w-[46%]">
                        {text}
                      </Reveal>
                    );
                  }
                  const flip = clipCount++ % 2 === 1;
                  return (
                    <Reveal
                      as="li"
                      key={step.title}
                      className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10"
                    >
                      <div className={`lg:col-span-5 ${flip ? "lg:order-last" : ""}`}>
                        {text}
                      </div>
                      <div className="lg:col-span-7">
                        {step.media ? (
                          <Clip clip={step.media} />
                        ) : (
                          step.image && <Figure image={{ ...step.image, span: "half" }} />
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </ol>
            </section>
          )}

          {project.impact && project.impact.length > 0 && (
            <Section id="impact" label="Impact & Outcomes">
              <ul className="flex flex-col gap-4">
                {project.impact.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item}
                    delay={i * 60}
                    className="flex gap-3 leading-relaxed text-ink/90"
                  >
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
        </div>
      </div>

      {/* Scale: the whole body of work in one clip */}
      {project.mosaic && (
        <div className="mt-4">
          <ClipBand id="scale" label="Scale" clip={project.mosaic} glow={surface?.glow} />
        </div>
      )}

      {hasGlimpse && (
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <Section id="glimpse" label="A glimpse">
            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {project.images.map((img, i) => (
                  <Reveal
                    key={img.src}
                    delay={(i % 2) * 90}
                    className={img.span === "half" ? "" : "sm:col-span-2"}
                  >
                    <Figure image={img} />
                  </Reveal>
                ))}
              </div>
            )}
          </Section>
        </div>
      )}

      {/* Next case, in its own colours */}
      {next && next.slug !== project.slug && <NextCase next={next} />}
    </article>
  );
}
