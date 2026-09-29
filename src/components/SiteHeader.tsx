"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/projects";

export default function SiteHeader() {
  const pathname = usePathname();
  const cases = caseStudies();

  const workActive = pathname === "/" || pathname.startsWith("/work");
  const aboutActive = pathname.startsWith("/about");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-ink">
            {site.name}
          </span>
          <span className="hidden text-[13px] text-muted sm:inline">
            {site.role}
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 text-[14px] sm:gap-1">
          {/* Work: links to the list, with a hover and focus dropdown of cases */}
          <div className="group relative">
            <Link
              href="/"
              className={`flex items-center gap-1 rounded-full px-2 py-1.5 transition-colors duration-200 hover:text-ink sm:px-3 ${
                workActive ? "text-ink" : "text-muted"
              }`}
            >
              Work
              <span
                aria-hidden
                className="text-[10px] text-muted-2 transition-transform duration-200 group-hover:rotate-180"
              >
                ▾
              </span>
            </Link>

            <div className="invisible absolute right-0 top-full w-64 translate-y-1 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <ul className="overflow-hidden rounded-xl border border-line bg-paper-2/95 p-1.5 shadow-xl shadow-black/10 backdrop-blur-md dark:shadow-black/40">
                {cases.map((p, i) => (
                  <li key={p.slug}>
                    <Link
                      href={`/work/${p.slug}`}
                      className="flex items-baseline gap-2.5 rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-paper"
                    >
                      <span className="font-mono text-[11px] tabular-nums text-muted-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate text-[13px] text-ink">
                        {p.company}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/about"
            className={`rounded-full px-2 py-1.5 transition-colors duration-200 hover:text-ink sm:px-3 ${
              aboutActive ? "text-ink" : "text-muted"
            }`}
          >
            About
          </Link>

          <ThemeToggle />

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-0.5 rounded-full border border-line-strong px-3 py-1.5 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper sm:ml-1 sm:px-3.5"
          >
            CV
          </a>
        </nav>
      </div>
    </header>
  );
}
