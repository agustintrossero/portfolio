# Agustín Trossero · Portfolio

Live at **[agustin-trossero-portfolio.netlify.app](https://agustin-trossero-portfolio.netlify.app)**.

The portfolio of a Senior Product UX/UI Designer: case studies told through the product itself, with real clips, real screens and confirmed numbers only. Designed by Agustín Trossero and built with Claude Code as a coding agent.

## Stack

Next.js 16 (App Router, static export), React 19, TypeScript and Tailwind CSS v4. No UI libraries: motion is CSS (scroll reveals, scroll-driven animations) with reduced motion respected everywhere.

## How it is organised

| Path | What lives there |
|---|---|
| `src/lib/projects.ts` | Every case study as typed data. The template renders only the sections a case has. |
| `src/app/work/[slug]/page.tsx` | The case template: main clip, stats, approach steps next to their proof, scale band, glimpse. |
| `src/components/HeroShowcase.tsx` | The home hero: a live deck of the case studies, in step with the project index. |
| `src/components/ProjectScene.tsx` | One full-width scene per case on the home, on the project's own colours. |
| `src/components/gds/` | A live match card re-skinned by 161 Figma tokens across seven brands. |
| `scripts/media.sh` | Builds the web media (ffmpeg and cwebp) from the source videos: loops, chapter cuts, posters. |
| `scripts/phone-sheets.mjs` | Renders rows of real screens as one image with headless Chrome. |
| `scripts/gds-tokens.mjs` | Turns the Figma token export into CSS modes. |

The source videos live outside this repo, so the media scripts only run on the author's machine. The built media in `public/work/` is committed.

## Run it

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `out/`. Netlify builds `main` on every push (see `netlify.toml`).
