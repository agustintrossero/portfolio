// Renders the phone sheets used in the case studies: a row of real screens
// on the project's colour, with a label under each one.
//
// Each sheet is a small HTML page captured with headless Chrome at 1600x900,
// then converted to WebP with cwebp. Sources are the screen exports in
// ~/Desktop/idea. Output: public/work/<slug>/.
// Usage: node scripts/phone-sheets.mjs

import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const IDEA = path.join(os.homedir(), "Desktop/idea");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const W = 1600;
const H = 900;
const PHONE = 318;

// Lumio: Figma exports that already include the status bar (375x812).
const lumioState = (name, label) => ({
  src: path.join(IDEA, "lumio-video/mosaic/screens", `${name}.png`),
  label,
});
const lumioScreen = (name, label) => ({
  src: path.join(IDEA, "lumio-video/screens", `${name}.png`),
  label,
});

// MoveUp Tools: live captures of the web app (375x765 viewport at 3x). The
// page is captured whole and its fixed header as a transparent layer, so
// both are stacked and a status bar is drawn on top in the page's colour.
const moveupMeta = () =>
  JSON.parse(fs.readFileSync(path.join(IDEA, "moveup-tools-video/screens/m/meta.json"), "utf8"));
const moveupScreen = (name, label) => {
  const dir = path.join(IDEA, "moveup-tools-video/screens/m");
  return {
    src: path.join(dir, `${name}.png`),
    fix: path.join(dir, `${name}-fix.png`),
    status: moveupMeta()[name].status,
    viewport: [375, 765],
    label,
  };
};

const LUMIO = {
  bg: "#060606",
  glow: "radial-gradient(46% 62% at 50% 46%, rgba(255, 204, 0, 0.14), transparent 72%)",
  label: "#9a9a96",
};
const MOVEUP = {
  bg: "#0a0712",
  glow:
    "radial-gradient(40% 60% at 32% 42%, rgba(214, 36, 110, 0.2), transparent 72%), radial-gradient(40% 60% at 70% 56%, rgba(75, 123, 234, 0.18), transparent 72%)",
  label: "#9c93b0",
};

const SHEETS = [
  {
    out: "lumio/signup.webp",
    ...LUMIO,
    items: [
      lumioState("registration-3", "Sportsbooks"),
      lumioState("registration-8", "Team"),
      lumioState("registration-11", "Experience"),
      lumioState("registration-13", "Risk"),
    ],
  },
  {
    out: "lumio/states.webp",
    ...LUMIO,
    items: [
      lumioState("home-8", "No picks today"),
      lumioState("home-10", "Offline"),
      lumioState("expanded-4", "No analysis"),
      lumioState("payment-4", "Declined"),
    ],
  },
  {
    // Left half light, right half dark.
    out: "lumio/themes.webp",
    ...LUMIO,
    glow: "radial-gradient(46% 62% at 75% 46%, rgba(255, 204, 0, 0.14), transparent 72%)",
    split: true,
    items: [
      lumioScreen("home", "Home · light"),
      lumioScreen("expanded", "Lumio Index · light"),
      lumioScreen("home-dark", "Home · dark"),
      lumioScreen("expanded-dark", "Lumio Index · dark"),
    ],
  },
  {
    out: "moveup-tools/mobile.webp",
    ...MOVEUP,
    items: [
      moveupScreen("portal", "Portal"),
      moveupScreen("vs-clips", "Video Studio"),
      moveupScreen("ba-home", "Brand Assets"),
      moveupScreen("news", "News"),
    ],
  },
];

const ICONS = `<span class="icons"><svg width="17" height="11" viewBox="0 0 17 11"><rect y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" width="3" height="11" rx="1"/></svg><svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 2.2c2.2 0 4.2.8 5.7 2.2l1.1-1.1A9.6 9.6 0 0 0 7.5.6 9.6 9.6 0 0 0 .7 3.3l1.1 1.1a8 8 0 0 1 5.7-2.2Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.1-1.1a6.4 6.4 0 0 0-9 0l1.1 1.1c.9-.8 2.1-1.3 3.4-1.3Zm0 3.2c.5 0 .9.2 1.2.5L7.5 10.3 6.3 9.1c.3-.3.7-.5 1.2-.5Z"/></svg><svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="18" height="8" rx="2"/><path d="M23 4v4a2 2 0 0 0 0-4Z" opacity=".4"/></svg></span>`;

// Dark text on light status bars, light text on dark ones.
function statusInk(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#111" : "#fff";
}

function phone({ src, fix, status, viewport = [375, 812] }) {
  const url = (file) => pathToFileURL(file).href;
  const bar = status
    ? `<div class="status" style="background:${status};color:${statusInk(status)}"><span>9:41</span>${ICONS}</div>`
    : "";
  return `<div class="phone">${bar}<div class="screen" style="aspect-ratio:${viewport[0]} / ${viewport[1]}"><img src="${url(src)}" alt="">${fix ? `<img class="fix" src="${url(fix)}" alt="">` : ""}</div></div>`;
}

function page({ items, split, bg, glow, label }) {
  const figures = items
    .map(
      (item, i) =>
        `<figure class="${split && i < items.length / 2 ? "light" : ""}">${phone(item)}<figcaption>${item.label}</figcaption></figure>`,
    )
    .join("\n");
  return `<!doctype html>
<meta charset="utf-8">
<style>
  html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; }
  body {
    display: flex; align-items: center; justify-content: center;
    background: ${bg}; font-family: "SF Mono", Menlo, monospace;
  }
  .glow { position: fixed; inset: 0; background: ${glow}; }
  .paper { position: fixed; inset: 0 50% 0 0; background: #ededea; }
  .row { position: relative; display: flex; gap: 44px; }
  figure { margin: 0; width: ${PHONE}px; }
  .phone {
    overflow: hidden; border-radius: 38px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  .light .phone { box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08); }
  .status {
    display: flex; align-items: center; justify-content: space-between;
    height: ${Math.round((PHONE * 44) / 375)}px; padding: 2px 22px 0 34px;
    font: 600 13px -apple-system, "SF Pro Text", "Helvetica Neue", sans-serif;
  }
  .icons { display: flex; align-items: center; gap: 5px; }
  .icons svg { fill: currentColor; }
  .screen { position: relative; }
  .screen img {
    display: block; width: 100%; height: 100%;
    object-fit: cover; object-position: top;
  }
  .screen .fix { position: absolute; inset: 0; }
  figcaption {
    margin-top: 18px; text-align: center; font-size: 16px;
    letter-spacing: 0.16em; text-transform: uppercase; color: ${label};
  }
  .light figcaption { color: #5d5d59; }
</style>
<div class="glow"></div>
${split ? '<div class="paper"></div>' : ""}
<div class="row">
${figures}
</div>
`;
}

// Headless Chrome on macOS writes the screenshot but does not always exit,
// so wait until the file stops growing, then close it.
async function capture(html, png, profile) {
  const chrome = spawn(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--user-data-dir=${profile}`,
      `--window-size=${W},${H}`,
      `--screenshot=${png}`,
      pathToFileURL(html).href,
    ],
    { stdio: "ignore" },
  );
  try {
    const deadline = Date.now() + 30_000;
    let last = -1;
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      if (!fs.existsSync(png)) continue;
      const size = fs.statSync(png).size;
      if (size > 0 && size === last) return;
      last = size;
    }
    throw new Error(`no screenshot after 30 s: ${png}`);
  } finally {
    chrome.kill();
  }
}

// Optional filter: node scripts/phone-sheets.mjs moveup-tools
const only = process.argv[2];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "phone-sheets-"));
try {
  for (const sheet of SHEETS) {
    if (only && !sheet.out.startsWith(only)) continue;
    for (const item of sheet.items) {
      for (const file of [item.src, item.fix].filter(Boolean)) {
        if (!fs.existsSync(file)) throw new Error(`missing source: ${file}`);
      }
    }
    const name = sheet.out.replace(/\W+/g, "-");
    const html = path.join(tmp, `${name}.html`);
    const png = path.join(tmp, `${name}.png`);
    fs.writeFileSync(html, page(sheet));
    await capture(html, png, path.join(tmp, "profile"));
    const out = path.join(ROOT, "public/work", sheet.out);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    execFileSync("cwebp", ["-quiet", "-q", "82", png, "-o", out]);
    console.log(`  public/work/${sheet.out}  ${Math.round(fs.statSync(out).size / 1024)}K`);
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
