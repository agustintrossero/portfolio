"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { CaseClip } from "@/lib/projects";

export type ShowcaseItem = {
  slug: string;
  company: string;
  eyebrow: string;
  /** Card surface, the colour behind the clip. */
  bg: string;
  /** "r, g, b" of the hero glow while this card is in front. */
  tint: string;
  teaser: CaseClip;
};

// Time each card spends in front before the deck moves on.
const INTERVAL = 6000;

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Visitors on data saver get the posters only. */
function saveData() {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return connection?.saveData === true;
}

function PlayIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
    </svg>
  );
}

/**
 * The home hero: the intro on one side and the case studies as a deck of
 * live cards on the other. The front card plays its clip and opens the case;
 * the deck moves on by itself, in step with the project index below it.
 * Hovering or focusing a project brings it to the front and holds the deck;
 * the pause button stops it for good (WCAG 2.2.2). With reduced motion the
 * deck stays still and shows posters.
 */
export default function HeroShowcase({
  items,
  children,
}: {
  items: ShowcaseItem[];
  children: ReactNode;
}) {
  const n = items.length;
  const sectionRef = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // Bumped on every change so the progress bar restarts from zero.
  const [cycle, setCycle] = useState(0);
  // The card that just left the front, while it drops to the back.
  const [leaving, setLeaving] = useState(-1);
  const [userPaused, setUserPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const reduced = useSyncExternalStore(subscribeMotion, prefersReducedMotion, () => false);

  const running = !reduced && !userPaused && !holding && onScreen && tabVisible;
  const videoOn = !reduced && !userPaused && onScreen && tabVisible;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(section);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // A card that comes to the front starts its clip from the top.
  useEffect(() => {
    const video = videos.current[active];
    if (video) video.currentTime = 0;
  }, [active]);

  // Only the front card plays; the rest wait on their posters.
  useEffect(() => {
    videos.current.forEach((video, i) => {
      if (!video) return;
      if (i === active && videoOn && !saveData()) {
        video.preload = "auto";
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, videoOn]);

  function show(next: number) {
    if (next === active) return;
    // The old front card drops to the back only when it lands last in line.
    setLeaving((active - next + n) % n === n - 1 ? active : -1);
    setActive(next);
    setCycle((c) => c + 1);
  }

  const hold = {
    onMouseEnter: () => setHolding(true),
    onMouseLeave: () => setHolding(false),
    onFocus: () => setHolding(true),
    onBlur: () => setHolding(false),
  };

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {items.map((item, i) => (
        <div
          key={item.slug}
          aria-hidden
          className="hero-tint -z-10"
          style={{ "--tint": item.tint, opacity: i === active ? 1 : 0 } as CSSProperties}
        />
      ))}

      <div className="mx-auto max-w-6xl px-6 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">{children}</div>

          <div className="lg:col-span-6">
            <div className="deck mx-auto w-full max-w-[560px] lg:max-w-none" {...hold}>
              {items.map((item, i) => {
                const rank = (i - active + n) % n;
                return (
                  <div
                    key={item.slug}
                    data-rank={rank}
                    aria-hidden={rank !== 0}
                    className={`deck-card ${i === leaving ? "is-leaving" : ""}`}
                    style={{ zIndex: n - rank, background: item.bg }}
                    onAnimationEnd={(e) => {
                      if (e.target === e.currentTarget) setLeaving(-1);
                    }}
                  >
                    <video
                      ref={(el) => {
                        videos.current[i] = el;
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                      src={item.teaser.src}
                      poster={item.teaser.poster}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-hidden
                      tabIndex={-1}
                    />
                    {rank === 0 && (
                      <Link
                        href={`/work/${item.slug}`}
                        aria-label={`${item.company} case study`}
                        className="group absolute inset-0 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4"
                      >
                        <span className="deck-chip absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur">
                          {item.company}
                          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
                            →
                          </span>
                        </span>
                      </Link>
                    )}
                  </div>
                );
              })}

              {!reduced && (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? "Play the showcase" : "Pause the showcase"}
                  className="absolute bottom-[4%] right-0 z-20 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-80 backdrop-blur transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
                >
                  {userPaused ? <PlayIcon /> : <PauseIcon />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* The project index doubles as the deck control */}
        <nav
          aria-label="Projects"
          className="mt-12 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 lg:mt-14 lg:grid-cols-7"
        >
          {items.map((item, i) => (
            <a
              key={item.slug}
              href={`#${item.slug}`}
              aria-current={i === active ? "true" : undefined}
              className="group block"
              onMouseEnter={() => {
                show(i);
                setHolding(true);
              }}
              onMouseLeave={() => setHolding(false)}
              onFocus={() => {
                show(i);
                setHolding(true);
              }}
              onBlur={() => setHolding(false)}
            >
              <span className="deck-bar" aria-hidden>
                {i === active &&
                  // Reduced motion shortens every animation to almost zero,
                  // so the bar must not drive the deck there.
                  (reduced ? (
                    <span className="deck-bar-fill is-static" />
                  ) : (
                    <span
                      key={cycle}
                      className="deck-bar-fill"
                      style={{
                        animationDuration: `${INTERVAL}ms`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                      onAnimationEnd={() => show((active + 1) % n)}
                    />
                  ))}
              </span>
              <span className="mt-3 block font-mono text-[11px] tabular-nums text-muted-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`mt-1 block text-[15px] font-medium transition-colors duration-300 ${
                  i === active ? "text-ink" : "text-muted"
                } group-hover:text-ink`}
              >
                {item.company}
              </span>
              <span className="block text-[13px] text-muted">{item.eyebrow}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
