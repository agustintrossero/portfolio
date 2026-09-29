"use client";

import "./gds-modes.css";
import "./match-card.css";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gdsFontVariables } from "@/lib/gds-fonts";
import {
  GDS_BRANDS,
  GDS_MODES,
  GDS_PRIMARY,
  GDS_TOKEN_COUNT,
} from "@/lib/gds-tokens";

// Same order as the GDS video: the dark brand closes the cycle.
const ORDER = [0, 1, 2, 3, 4, 6, 5];
const STEP_MS = 1900;

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Sample match from the GDS video. Team colours and the operator badge are
// data, so they stay the same in every brand.
const ICON_FIRE = "M12 2s-1 5-4 8-3 7 0 10 8 3 10-1 1-7-2-10c-1 2-2 3-3 3 0-3-1-7-1-10z";

function Odd({ value }: { value: string }) {
  return (
    <span className="gds-mc__odd">
      <b>{value}</b>
      <span className="gds-op">
        <i>PM</i>
      </span>
    </span>
  );
}

function Team({ name, code, color }: { name: string; code: string; color: string }) {
  return (
    <span className="gds-mc__team">
      <i className="gds-logo" style={{ "--c": color } as React.CSSProperties}>
        {code}
      </i>
      {name}
    </span>
  );
}

function MatchCard() {
  return (
    <article className="gds-mc">
      <div className="gds-mc__meta">
        <span className="gds-mc__chip">NBA</span>
        <span className="gds-mc__date">19 May · 3:30 PM</span>
      </div>
      <div className="gds-mc__rows">
        <div className="gds-mc__row">
          <Team name="76ers" code="PHI" color="#006BB6" />
          <Odd value="1.69" />
        </div>
        <div className="gds-mc__row">
          <span className="gds-mc__team">
            <span className="gds-mc__x">X</span>
          </span>
          <Odd value="12.00" />
        </div>
        <div className="gds-mc__row">
          <Team name="Sacramento Kings" code="SAC" color="#5A2D81" />
          <Odd value="2.30" />
        </div>
      </div>
      <div className="gds-mc__hot">
        <div>
          <div className="gds-mc__hot-h">
            <svg viewBox="0 0 24 24">
              <path d={ICON_FIRE} />
            </svg>
            Hot Pick
          </div>
          <p>Nuggets to score 200+ points in regulation</p>
        </div>
        <span className="gds-mc__hotodd">
          <span className="gds-op">
            <i>PM</i>
          </span>
          <b>1.85</b>
        </span>
      </div>
      <div className="gds-mc__post">
        <div className="gds-mc__img">
          <svg viewBox="0 0 54 54" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.2">
            <circle cx="27" cy="27" r="9" />
            <path d="M27 0v54M0 40h14a13 13 0 0 1 26 0h14" />
            <circle cx="40" cy="15" r="5" fill="rgba(255,255,255,.55)" stroke="none" />
          </svg>
        </div>
        <div>
          <div className="gds-mc__eye">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Analysis
          </div>
          <p className="gds-mc__title">
            Harris drops 37 as the 76ers edge the Kings in a historic night
          </p>
        </div>
      </div>
      <div className="gds-mc__cta">View Event Preview</div>
      <div className="gds-mc__upd">Odds updated on 22/11/2025 at 13:16</div>
    </article>
  );
}

/**
 * The real GDS Match Card, re-skinned by the brand tokens exported from
 * Figma. It cycles through the seven brands while on screen; the brand
 * buttons let visitors pick one (which stops the rotation), and there is an
 * explicit pause for the rotation itself.
 */
export default function BrandSwap({ scale = 1 }: { scale?: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [{ step, prev }, setView] = useState<{ step: number; prev: number | null }>({
    step: 0,
    prev: null,
  });
  const [rotating, setRotating] = useState(true);
  const [onScreen, setOnScreen] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, prefersReducedMotion, () => false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!rotating || !onScreen || reduced) return;
    const id = window.setInterval(
      () => setView((v) => ({ prev: v.step, step: (v.step + 1) % ORDER.length })),
      STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [rotating, onScreen, reduced]);

  function pick(index: number) {
    setRotating(false);
    setView((v) => (v.step === index ? v : { prev: v.step, step: index }));
  }

  const mode = ORDER[step];
  const next = ORDER[(step + 1) % ORDER.length];
  const autoplaying = rotating && !reduced;

  return (
    <div ref={rootRef} className={`${gdsFontVariables} flex flex-col items-center`}>
      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--s-muted,var(--muted))]">
        {GDS_TOKEN_COUNT} tokens · {GDS_MODES.length} brands · 1 source
      </p>

      <div
        role="img"
        aria-label={`The Match Card component rendered with the ${GDS_BRANDS[mode]} brand tokens`}
        className="gds-stage"
        style={{ "--gds-zoom": scale } as React.CSSProperties}
      >
        {prev !== null && (
          <div aria-hidden className={`gds-layer gds-m${ORDER[prev]}`}>
            <MatchCard />
          </div>
        )}
        <div
          aria-hidden
          key={step}
          className={`gds-layer gds-m${mode} ${prev !== null ? "gds-swap-in" : ""}`}
        >
          <MatchCard />
        </div>
        {/* Loads the next brand's font ahead of time, so the wipe never shows a fallback. */}
        <div aria-hidden className={`gds-layer gds-warm gds-m${next}`}>
          <MatchCard />
        </div>
      </div>

      <div
        role="group"
        aria-label="Brand"
        className="pointer-events-auto mt-7 flex max-w-md flex-wrap items-center justify-center gap-1.5"
      >
        {ORDER.map((m, i) => (
          <button
            key={m}
            type="button"
            aria-pressed={i === step}
            title={GDS_BRANDS[m]}
            onClick={() => pick(i)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider transition-colors duration-200 ${
              i === step
                ? "border-[var(--s-ink,var(--ink))] text-[var(--s-ink,var(--ink))]"
                : "border-[var(--s-line,var(--line))] text-[var(--s-muted,var(--muted))] hover:text-[var(--s-ink,var(--ink))]"
            }`}
          >
            <span
              aria-hidden
              className="h-2 w-2 rounded-full ring-1 ring-white/40"
              style={{ background: GDS_PRIMARY[m] }}
            />
            {GDS_MODES[m]}
          </button>
        ))}
        {!reduced && (
          <button
            type="button"
            onClick={() => setRotating((r) => !r)}
            aria-label={autoplaying ? "Pause brand rotation" : "Resume brand rotation"}
            className="ml-1 grid h-7 w-7 place-items-center rounded-full border border-[var(--s-line,var(--line))] text-[var(--s-muted,var(--muted))] transition-colors duration-200 hover:text-[var(--s-ink,var(--ink))]"
          >
            <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
              {autoplaying ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5v14l11-7z" />}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
