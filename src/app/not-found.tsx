import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Page not found",
};

// Netlify serves this page (out/404.html) for any address that does not exist.
export default function NotFound() {
  const cases = caseStudies();

  return (
    <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-8 sm:px-8 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-[380px] hero-glow"
      />
      <div className="relative">
        <p className="eyebrow mb-5">404</p>
        <h1 className="max-w-2xl text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-tight sm:text-[3.4rem]">
          <span className="text-muted-2">This page does not exist.</span>{" "}
          <span className="text-ink">The work does.</span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper transition-opacity hover:opacity-90"
          >
            Back to the work
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-line-strong px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-ink"
          >
            About me
          </Link>
        </div>

        <nav aria-label="Case studies" className="mt-16 border-t border-line pt-6">
          <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="group block">
                  <span className="block text-[15px] font-medium text-ink">
                    {p.company}
                    <span
                      aria-hidden
                      className="ml-1.5 inline-block text-muted-2 transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                  <span className="block text-[13px] text-muted">{p.scene?.eyebrow ?? p.role}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
