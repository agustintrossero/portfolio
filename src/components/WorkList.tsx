import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/projects";

function WorkRow({ project, index }: { project: Project; index: number }) {
  return (
    <li>
      <Reveal delay={index * 70}>
      <Link
        href={`/work/${project.slug}`}
        className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-3 border-t border-line py-7 transition-colors duration-200 hover:bg-paper-2 sm:gap-x-8 sm:py-9"
      >
        <span className="pl-1 font-mono text-[13px] tabular-nums text-muted-2 sm:pl-2">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
              {project.company}
            </h3>
            <span className="text-[15px] text-muted">{project.role}</span>
          </div>

          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
            {project.summary}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-2"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <span
          aria-hidden
          className="mt-1 pr-1 text-xl text-muted-2 transition-all duration-200 group-hover:translate-x-1 group-hover:text-ink sm:pr-2"
        >
          ↗
        </span>
      </Link>
      </Reveal>
    </li>
  );
}

export default function WorkList({ projects }: { projects: Project[] }) {
  return (
    <ul className="border-b border-line">
      {projects.map((project, i) => (
        <WorkRow key={project.slug} project={project} index={i} />
      ))}
    </ul>
  );
}
