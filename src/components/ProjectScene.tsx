import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import DeviceFrame from "@/components/DeviceFrame";
import Reveal from "@/components/Reveal";
import BrandSwap from "@/components/gds/BrandSwap";
import type { Project, SceneMedia } from "@/lib/projects";

function Media({ media }: { media: SceneMedia }) {
  switch (media.kind) {
    case "brand-swap":
      return (
        <div className="scroll-rise">
          <BrandSwap scale={1.2} />
        </div>
      );

    case "phone":
      return (
        <div className="relative mx-auto w-[min(62vw,280px)]">
          {media.back && (
            <div
              aria-hidden
              className="scroll-float absolute -right-[34%] top-[7%] w-[86%] rotate-6 opacity-90 [--float-from:80px] [--float-to:-60px] sm:-right-[52%]"
            >
              <DeviceFrame device="phone" src={media.back.src} alt="" sizes="240px" />
            </div>
          )}
          <div className="scroll-rise relative">
            <DeviceFrame
              device="phone"
              src={media.poster}
              video={media.video}
              alt={media.alt}
              sizes="280px"
            />
          </div>
          {media.float && (
            <div
              aria-hidden
              className="scroll-float absolute -right-[26%] bottom-[4%] w-[52%] [--float-from:110px] [--float-to:-80px] sm:-right-[48%] sm:w-[64%]"
            >
              <Image
                src={media.float.src}
                alt=""
                width={media.float.width}
                height={media.float.height}
                sizes="180px"
                className="h-auto w-full drop-shadow-[0_24px_30px_rgba(40,20,90,0.25)]"
              />
            </div>
          )}
        </div>
      );

    case "browser":
      return (
        <div className="relative pb-10 sm:pb-6">
          <div className="scroll-rise">
            <DeviceFrame
              device="browser"
              src={media.poster}
              video={media.video}
              alt={media.alt}
              sizes="(min-width: 1024px) 620px, 92vw"
            />
          </div>
          {media.phone && (
            <div className="scroll-float absolute -bottom-2 -right-2 w-[24%] min-w-[96px] sm:-right-6 [--float-from:70px] [--float-to:-50px]">
              <DeviceFrame
                device="phone"
                src={media.phone.poster}
                video={media.phone.video}
                alt={media.phone.alt}
                sizes="150px"
              />
            </div>
          )}
        </div>
      );
  }
}

/**
 * A full-width scene for one project on the home. It uses the project's own
 * surface colours (they ignore the site theme), and the whole scene opens the
 * case study.
 */
export default function ProjectScene({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const scene = project.scene;
  if (!scene) return null;

  const s = scene.surface;
  const [lead, accent] = scene.headline.split("|").map((part) => part.trim());
  const href = `/work/${project.slug}`;
  const titleId = `${project.slug}-scene`;

  const vars = {
    "--s-bg": s.bg,
    "--s-ink": s.ink,
    "--s-muted": s.muted,
    "--s-line": s.line,
  } as CSSProperties;
  const accentStyle: CSSProperties = s.accentGradient
    ? {
        backgroundImage: s.accentGradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }
    : { color: s.accent };

  return (
    <section
      id={project.slug}
      aria-labelledby={titleId}
      style={vars}
      className="group relative isolate scroll-mt-16 overflow-hidden bg-[var(--s-bg)] text-[var(--s-ink)]"
    >
      {s.glow && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: s.glow }} />
      )}

      {/* The whole scene opens the case. Pointer only: keyboard and screen
          readers use the headline link below. */}
      <Link href={href} tabIndex={-1} aria-hidden className="absolute inset-0" />

      {/* Clicks fall through to the link above, except on real controls. */}
      <div className="pointer-events-none relative mx-auto grid max-w-5xl items-center gap-14 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-5 ${scene.flip ? "lg:order-last" : ""}`}>
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--s-muted)]">
              {String(index + 1).padStart(2, "0")} · {scene.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h3
              id={titleId}
              className="mt-5 text-balance text-[2.4rem] font-semibold leading-[1.02] tracking-tight sm:text-[3.2rem]"
            >
              <Link href={href} className="pointer-events-auto rounded-sm">
                <span className="sr-only">{project.company}: </span>
                <span style={{ color: s.lead ?? s.ink }}>{lead}</span>{" "}
                <span style={accentStyle}>{accent}</span>
              </Link>
            </h3>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[var(--s-muted)]">
              {scene.line}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Disciplines">
              {scene.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-[var(--s-line)] px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider text-[var(--s-muted)]"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={280}>
            <p aria-hidden className="mt-9 inline-flex items-center gap-2 text-[14px] font-medium">
              <span className="border-b border-[var(--s-line)] pb-0.5 transition-colors duration-200 group-hover:border-[var(--s-ink)]">
                View {project.company}
              </span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </p>
          </Reveal>
        </div>

        <div className={`relative lg:col-span-7 ${scene.flip ? "lg:order-first" : ""}`}>
          <Reveal variant="scale" delay={120}>
            <Media media={scene.media} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
