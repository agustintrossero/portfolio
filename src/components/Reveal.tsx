"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "tilt";

/**
 * Fades and slides its children in when they scroll into view.
 * The hidden state lives in CSS under @media (scripting: enabled), so without
 * JS, or with reduced motion, everything is simply visible.
 * Use `as="li"` inside lists, so the markup stays valid.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className = "",
  once = true,
}: {
  children: ReactNode;
  as?: "div" | "li";
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  once?: boolean;
}) {
  const node = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = node.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal when in view, or when already scrolled past (e.g. a
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
    <Tag
      ref={(el: HTMLElement | null) => {
        node.current = el;
      }}
      style={style}
      className={`reveal ${variantClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
