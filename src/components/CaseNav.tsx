"use client";

import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

/**
 * Sticky in-page section nav for a case study. Highlights the section
 * currently in view (scroll-spy) and scrolls to anchors on click.
 * Sits just below the sticky site header (see --header-h offset).
 */
export default function CaseNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost section currently crossing the trigger band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Case sections"
      className="sticky top-[var(--header-h)] z-40 border-b border-line bg-paper/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-6 py-2.5 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none]">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            aria-current={active === it.id ? "true" : undefined}
            className={`shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors duration-200 ${
              active === it.id
                ? "bg-paper-2 text-ink"
                : "text-muted-2 hover:text-ink"
            }`}
          >
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
