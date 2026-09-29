#!/usr/bin/env bash
# Builds the web versions of the portfolio media.
#
# Sources: the video projects in ~/Desktop/idea and the light pack exported
# from them. Output: public/work/<slug>/. Safe to re-run after a new render.
# Needs ffmpeg and cwebp (Homebrew). Run it with bash, not zsh.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IDEA="$HOME/Desktop/idea"
LIGHT="$HOME/Desktop/Videos portfolio Agustin Trossero (liviano).zip"
OUT="$ROOT/public/work"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

x264=(-an -c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart)

# Screen-only clip for the phone frame (9:19.5), 720x1560 at 30 fps.
# Optional third argument: CRF (higher means lighter). Live captures with a
# lot of small text and scrolling need a higher value to stay under ~2 MB.
phone() {
  ffmpeg -v error -y -i "$1" -vf "fps=30,scale=720:1560:flags=lanczos" "${x264[@]}" -crf "${3:-27}" "$2"
}

# 16:9 loop at 720p, 30 fps.
loop() {
  ffmpeg -v error -y -i "$1" -vf "fps=30,scale=1280:720:flags=lanczos" "${x264[@]}" -crf 28 "$2"
}

# 16:9 case study hero at 1080p, 30 fps. Optional third argument: CRF.
hero() {
  ffmpeg -v error -y -i "$1" -vf "fps=30,scale=1920:1080:flags=lanczos" "${x264[@]}" -crf "${3:-28}" "$2"
}

# Poster: one frame at a given second, as WebP.
poster() {
  ffmpeg -v error -y -ss "$2" -i "$1" -frames:v 1 -vf "scale=$4:-2:flags=lanczos" "$TMP/frame.png"
  cwebp -quiet -q 80 "$TMP/frame.png" -o "$3"
}

# Still image to WebP, keeping transparency when there is any.
webp() {
  cwebp -quiet -q 82 -alpha_q 100 "$1" -o "$2"
}

say() { printf "  %-44s %s\n" "${1#"$ROOT"/}" "$(du -h "$1" | cut -f1)"; }

mkdir -p "$OUT/gds" "$OUT/lumio" "$OUT/lebi" "$OUT/moveup-tools"

echo "Phone clips"
phone "$IDEA/lumio-video/out/case-study/02-tour-screen-only.mp4" "$OUT/lumio/tour-phone.mp4"
poster "$OUT/lumio/tour-phone.mp4" 0.5 "$OUT/lumio/tour-phone.webp" 720
phone "$IDEA/lebi-video/out/case-study/01-onboarding-screen-only.mp4" "$OUT/lebi/onboarding-phone.mp4"
poster "$OUT/lebi/onboarding-phone.mp4" 6 "$OUT/lebi/onboarding-phone.webp" 720
phone "$IDEA/lebi-video/out/case-study/02-wallet-screen-only.mp4" "$OUT/lebi/wallet-phone.mp4"
poster "$OUT/lebi/wallet-phone.mp4" 2 "$OUT/lebi/wallet-phone.webp" 720
phone "$IDEA/moveup-tools-video/out/moveup-tour-screen.mp4" "$OUT/moveup-tools/tour-phone.mp4" 32
poster "$OUT/moveup-tools/tour-phone.mp4" 1 "$OUT/moveup-tools/tour-phone.webp" 720
for f in lumio/tour-phone lebi/onboarding-phone lebi/wallet-phone moveup-tools/tour-phone; do
  say "$OUT/$f.mp4"; say "$OUT/$f.webp"
done

echo "Loops (from the light pack)"
unzip -oqj "$LIGHT" "*/01 GDS/02-light-dark.mp4" -d "$TMP"
cp "$TMP/02-light-dark.mp4" "$OUT/gds/light-dark.mp4"
poster "$OUT/gds/light-dark.mp4" 1 "$OUT/gds/light-dark.webp" 1280
say "$OUT/gds/light-dark.mp4"; say "$OUT/gds/light-dark.webp"

echo "Home scenes"
webp "$IDEA/lebi-video/mascot/mascot-cheer.png" "$OUT/lebi/mascot-cheer.webp"
webp "$IDEA/lebi-video/mascot/mascot-hold.png" "$OUT/lebi/mascot-hold.webp"
cwebp -quiet -q 82 -resize 720 0 "$IDEA/lumio-video/screens/expanded.png" -o "$OUT/lumio/screen-index.webp"
cp "$IDEA/moveup-tools-video/out/case-study/01-portal-filter.mp4" "$OUT/moveup-tools/portal-filter.mp4"
poster "$OUT/moveup-tools/portal-filter.mp4" 0.2 "$OUT/moveup-tools/portal-filter.webp" 1280
cp "$IDEA/moveup-tools-video/out/case-study/07-phone-portal.mp4" "$OUT/moveup-tools/phone-portal.mp4"
poster "$OUT/moveup-tools/phone-portal.mp4" 0.2 "$OUT/moveup-tools/phone-portal.webp" 540
for f in lebi/mascot-cheer.webp lebi/mascot-hold.webp lumio/screen-index.webp moveup-tools/portal-filter.mp4 moveup-tools/portal-filter.webp moveup-tools/phone-portal.mp4 moveup-tools/phone-portal.webp; do
  say "$OUT/$f"
done

echo "GDS case study"
# CRF 32: the scrolling token table stays legible (34 garbles the numbers).
hero "$IDEA/gds-video/out/gds-theme-swap-16x9.mp4" "$OUT/gds/theme-swap.mp4" 32
cwebp -quiet -q 80 -resize 1600 0 "$IDEA/gds-video/out/theme-swap-poster.jpg" -o "$OUT/gds/theme-swap.webp"
hero "$IDEA/gds-video/out/case-study/01-block-library.mp4" "$OUT/gds/block-library.mp4" 31
poster "$OUT/gds/block-library.mp4" 7 "$OUT/gds/block-library.webp" 1600
loop "$IDEA/gds-video/out/case-study/03-responsive.mp4" "$OUT/gds/responsive.mp4"
poster "$OUT/gds/responsive.mp4" 1 "$OUT/gds/responsive.webp" 1280
# Share image for social previews (JPG travels better than WebP there).
sips -s format jpeg -s formatOptions 82 -Z 1200 "$IDEA/gds-video/out/theme-swap-poster.jpg" --out "$OUT/gds/cover.jpg" >/dev/null
for f in theme-swap.mp4 theme-swap.webp block-library.mp4 block-library.webp responsive.mp4 responsive.webp cover.jpg; do
  say "$OUT/gds/$f"
done

echo "Lebi screens to WebP"
for f in mockup-1 user-journey before-guest-logged after-guest-logged landing-page-1 dashboard-guest; do
  if [ -f "$OUT/lebi/$f.png" ]; then
    webp "$OUT/lebi/$f.png" "$OUT/lebi/$f.webp" && rm "$OUT/lebi/$f.png"
  fi
  say "$OUT/lebi/$f.webp"
done
