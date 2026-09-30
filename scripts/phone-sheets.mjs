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

const lumioState = (name) => path.join(IDEA, "lumio-video/mosaic/screens", `${name}.png`);
const lumioScreen = (name) => path.join(IDEA, "lumio-video/screens", `${name}.png`);

const SHEETS = [
  {
    out: "lumio/signup.webp",
    items: [
      [lumioState("registration-3"), "Sportsbooks"],
      [lumioState("registration-8"), "Team"],
      [lumioState("registration-11"), "Experience"],
      [lumioState("registration-13"), "Risk"],
    ],
  },
  {
    out: "lumio/states.webp",
    items: [
      [lumioState("home-8"), "No picks today"],
      [lumioState("home-10"), "Offline"],
      [lumioState("expanded-4"), "No analysis"],
      [lumioState("payment-4"), "Declined"],
    ],
  },
  {
    // Left half light, right half dark.
    out: "lumio/themes.webp",
    split: true,
    items: [
      [lumioScreen("home"), "Home · light"],
      [lumioScreen("expanded"), "Lumio Index · light"],
      [lumioScreen("home-dark"), "Home · dark"],
      [lumioScreen("expanded-dark"), "Lumio Index · dark"],
    ],
  },
];

function page({ items, split }) {
  const figures = items
    .map(
      ([src, label], i) => `<figure class="${split && i < items.length / 2 ? "light" : ""}">
  <img src="${pathToFileURL(src).href}" alt="">
  <figcaption>${label}</figcaption>
</figure>`,
    )
    .join("\n");
  return `<!doctype html>
<meta charset="utf-8">
<style>
  html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; }
  body {
    display: flex; align-items: center; justify-content: center;
    background: #060606; font-family: "SF Mono", Menlo, monospace;
  }
  .glow {
    position: fixed; inset: 0;
    background: radial-gradient(46% 62% at ${split ? "75%" : "50%"} 46%, rgba(255, 204, 0, 0.14), transparent 72%);
  }
  .paper { position: fixed; inset: 0 50% 0 0; background: #ededea; }
  .row { position: relative; display: flex; gap: 44px; }
  figure { margin: 0; width: 318px; }
  img {
    display: block; width: 100%; aspect-ratio: 375 / 812; object-fit: cover;
    border-radius: 38px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  .light img { box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08); }
  figcaption {
    margin-top: 18px; text-align: center; font-size: 16px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #9a9a96;
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

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "phone-sheets-"));
try {
  for (const sheet of SHEETS) {
    for (const [src] of sheet.items) {
      if (!fs.existsSync(src)) throw new Error(`missing source: ${src}`);
    }
    const name = path.basename(sheet.out, ".webp");
    const html = path.join(tmp, `${name}.html`);
    const png = path.join(tmp, `${name}.png`);
    fs.writeFileSync(html, page(sheet));
    await capture(html, png, path.join(tmp, "profile"));
    const out = path.join(ROOT, "public/work", sheet.out);
    execFileSync("cwebp", ["-quiet", "-q", "82", png, "-o", out]);
    console.log(`  public/work/${sheet.out}  ${Math.round(fs.statSync(out).size / 1024)}K`);
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
