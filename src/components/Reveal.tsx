"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "tilt";

/**
 * Fades + slides its children in when they scroll into view.
 * Hidden state only applies once <html> has `.reveal-ready` (set
 * synchronously in the layout), so no-JS / reduced-motion shows everything.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal when in view — or when already scrolled past (e.g. a
          // reload restores a mid-page scroll position), so nothing stays hidden.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            el.classList.add("is-visible");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const variantClass = variant === "up" ? "" : `reveal-${variant}`;
  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <div ref={ref} style={style} className={`reveal ${variantClass} ${className}`}>
      {children}
    </div>
  );
}
