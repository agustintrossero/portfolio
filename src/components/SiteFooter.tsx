import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <p className="eyebrow mb-3">Get in touch</p>
            <a
              href={`mailto:${site.email}`}
              className="text-2xl font-medium tracking-tight text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors duration-200 hover:decoration-ink sm:text-3xl"
            >
              {site.email}
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors duration-200 hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-col gap-2 text-[13px] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {site.name}. All rights reserved.
          </span>
          <span>Designed & built in {site.location}.</span>
        </div>
      </div>
    </footer>
  );
}
