"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const isDark = () =>
  document.documentElement.getAttribute("data-theme") === "dark";

// The server always renders the default (light) theme.
const serverSnapshot = () => false;

/**
 * Light and dark switch. Light is the default; a saved dark choice is
 * applied before the first paint by the inline script in the root layout.
 */
export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, serverSnapshot);

  function toggle() {
    const root = document.documentElement;
    const next = isDark() ? "light" : "dark";

    root.classList.add("theme-switching");
    if (next === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked (private mode): the choice lasts for this visit.
    }

    // Let the new colours paint, then give transitions back.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove("theme-switching")),
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark theme"
      aria-pressed={dark}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-paper-2 hover:text-ink sm:h-9 sm:w-9"
    >
      {/* Moon while light, sun while dark. CSS picks the icon, so the markup
          is identical on the server and in the browser. */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[18px] w-[18px] dark:hidden"
      >
        <path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.6 6.6 0 0 0 9.7 9.7z" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="hidden h-[18px] w-[18px] dark:block"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
    </button>
  );
}
