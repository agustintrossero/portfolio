import type { CSSProperties } from "react";
import type { Surface } from "@/lib/projects";

/** CSS variables for a project's surface, falling back to the site theme. */
export function surfaceVars(s?: Surface): CSSProperties {
  return {
    "--s-bg": s?.bg ?? "var(--paper-2)",
    "--s-ink": s?.ink ?? "var(--ink)",
    "--s-muted": s?.muted ?? "var(--muted)",
    "--s-line": s?.line ?? "var(--line)",
  } as CSSProperties;
}

/** Style for the accent half of a two-tone headline: a colour or a gradient. */
export function accentStyle(s?: Surface): CSSProperties {
  if (s?.accentGradient) {
    return {
      backgroundImage: s.accentGradient,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
    };
  }
  return { color: s?.accent ?? "var(--ink)" };
}

/** Splits "Lead part | accent part" into its two halves. */
export function splitHeadline(text: string): [string, string] {
  const [lead, ...rest] = text.split("|");
  return [lead.trim(), rest.join("|").trim()];
}
