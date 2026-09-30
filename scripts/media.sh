#!/usr/bin/env bash
# Builds the web versions of the portfolio media.
#
# Sources: the video projects in ~/Desktop/idea and the light pack exported
# from them. Output: public/work/<slug>/.
# Only rebuilds a file when its source is newer than the output. Run with
# FORCE=1 to rebuild everything (for example after changing a CRF).
# The Lebi screens (mockup, journey, before/after, landings) came from
# rodrigopeixoto.me as PNG and are committed as WebP, so they are not here.
# Needs ffmpeg and cwebp (Homebrew). Run it with bash, not zsh.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IDEA="$HOME/Desktop/idea"
LIGHT="$HOME/Desktop/Videos portfolio Agustin Trossero (liviano).zip"
OUT="$ROOT/public/work"
FORCE="${FORCE:-0}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

x264=(-an -c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart)

# True when the output is missing, older than its source, or FORCE=1.
stale() { [ "$FORCE" = 1 ] || [ ! -e "$2" ] || [ "$1" -nt "$2" ]; }

# Screen-only clip for the phone frame (9:19.5), 720x1560 at 30 fps.
# Optional third argument: CRF (higher means lighter). Live captures with a
# lot of small text and scrolling need a higher value to stay under ~2 MB.
phone() {
  stale "$1" "$2" || return 0
  ffmpeg -v error -y -i "$1" -vf "fps=30,scale=720:1560:flags=lanczos" "${x264[@]}" -crf "${3:-27}" "$2"
}

# 16:9 loop at 720p, 30 fps.
loop() {
  stale "$1" "$2" || return 0
  ffmpeg -v error -y -i "$1" -vf "fps=30,scale=1280:720:flags=lanczos" "${x264[@]}" -crf 28 "$2"
}

# 16:9 case study clip at 1080p, 30 fps. Optional third argument: CRF.
hero() {
  stale "$1" "$2" || return 0
  ffmpeg -v error -y -i "$1" -vf "fps=30,scale=1920:1080:flags=lanczos" "${x264[@]}" -crf "${3:-28}" "$2"
}

# Poster from a video: one frame at a given second, as WebP of a given width.
poster() {
  stale "$1" "$3" || return 0
  ffmpeg -v error -y -ss "$2" -i "$1" -frames:v 1 -vf "scale=$4:-2:flags=lanczos" "$TMP/frame.png"
  cwebp -quiet -q 80 "$TMP/frame.png" -o "$3"
}

# Still image (JPG or PNG) to WebP at a given width.
still() {
  stale "$1" "$2" || return 0
  cwebp -quiet -q 80 -resize "$3" 0 "$1" -o "$2"
}

# Transparent PNG to WebP, keeping the alpha channel intact.
webp() {
  stale "$1" "$2" || return 0
  cwebp -quiet -q 82 -alpha_q 100 "$1" -o "$2"
}

copy() {
  stale "$1" "$2" || return 0
  cp "$1" "$2"
}

# Share image for social previews (JPG travels better than WebP there).
share() {
  stale "$1" "$2" || return 0
  sips -s format jpeg -s formatOptions 82 -Z 1200 "$1" --out "$2" >/dev/null
}

say() { printf "  %-44s %s\n" "${1#"$ROOT"/}" "$(du -h "$1" | cut -f1)"; }
report() {
  local dir="$1"
  shift
  for f in "$@"; do say "$OUT/$dir/$f"; done
}

mkdir -p "$OUT/gds" "$OUT/lumio" "$OUT/lebi" "$OUT/moveup-tools"

echo "Home: phone clips"
phone "$IDEA/lumio-video/out/case-study/02-tour-screen-only.mp4" "$OUT/lumio/tour-phone.mp4"
poster "$OUT/lumio/tour-phone.mp4" 0.5 "$OUT/lumio/tour-phone.webp" 720
phone "$IDEA/lebi-video/out/case-study/01-onboarding-screen-only.mp4" "$OUT/lebi/onboarding-phone.mp4"
poster "$OUT/lebi/onboarding-phone.mp4" 6 "$OUT/lebi/onboarding-phone.webp" 720
phone "$IDEA/lebi-video/out/case-study/02-wallet-screen-only.mp4" "$OUT/lebi/wallet-phone.mp4"
poster "$OUT/lebi/wallet-phone.mp4" 2 "$OUT/lebi/wallet-phone.webp" 720
phone "$IDEA/moveup-tools-video/out/moveup-tour-screen.mp4" "$OUT/moveup-tools/tour-phone.mp4" 32
poster "$OUT/moveup-tools/tour-phone.mp4" 1 "$OUT/moveup-tools/tour-phone.webp" 720
report lumio tour-phone.mp4 tour-phone.webp
report lebi onboarding-phone.mp4 onboarding-phone.webp wallet-phone.mp4 wallet-phone.webp
report moveup-tools tour-phone.mp4 tour-phone.webp

echo "Home: scene layers"
webp "$IDEA/lebi-video/mascot/mascot-cheer.png" "$OUT/lebi/mascot-cheer.webp"
webp "$IDEA/lebi-video/mascot/mascot-hold.png" "$OUT/lebi/mascot-hold.webp"
still "$IDEA/lumio-video/screens/expanded.png" "$OUT/lumio/screen-index.webp" 720
copy "$IDEA/moveup-tools-video/out/case-study/01-portal-filter.mp4" "$OUT/moveup-tools/portal-filter.mp4"
poster "$OUT/moveup-tools/portal-filter.mp4" 0.2 "$OUT/moveup-tools/portal-filter.webp" 1280
copy "$IDEA/moveup-tools-video/out/case-study/07-phone-portal.mp4" "$OUT/moveup-tools/phone-portal.mp4"
poster "$OUT/moveup-tools/phone-portal.mp4" 0.2 "$OUT/moveup-tools/phone-portal.webp" 540
report lebi mascot-cheer.webp mascot-hold.webp
report lumio screen-index.webp
report moveup-tools portal-filter.mp4 portal-filter.webp phone-portal.mp4 phone-portal.webp

echo "GDS case study"
if stale "$LIGHT" "$OUT/gds/light-dark.mp4"; then
  unzip -oqj "$LIGHT" "*/01 GDS/02-light-dark.mp4" -d "$TMP"
  cp "$TMP/02-light-dark.mp4" "$OUT/gds/light-dark.mp4"
fi
poster "$OUT/gds/light-dark.mp4" 1 "$OUT/gds/light-dark.webp" 1280
# CRF 32: the scrolling token table stays legible (34 garbles the numbers).
hero "$IDEA/gds-video/out/gds-theme-swap-16x9.mp4" "$OUT/gds/theme-swap.mp4" 32
still "$IDEA/gds-video/out/theme-swap-poster.jpg" "$OUT/gds/theme-swap.webp" 1600
hero "$IDEA/gds-video/out/case-study/01-block-library.mp4" "$OUT/gds/block-library.mp4" 31
poster "$OUT/gds/block-library.mp4" 7 "$OUT/gds/block-library.webp" 1600
loop "$IDEA/gds-video/out/case-study/03-responsive.mp4" "$OUT/gds/responsive.mp4"
poster "$OUT/gds/responsive.mp4" 1 "$OUT/gds/responsive.webp" 1280
share "$IDEA/gds-video/out/theme-swap-poster.jpg" "$OUT/gds/cover.jpg"
report gds light-dark.mp4 light-dark.webp theme-swap.mp4 theme-swap.webp block-library.mp4 block-library.webp responsive.mp4 responsive.webp cover.jpg

echo "Lebi case study"
hero "$IDEA/lebi-video/out/lebi-onboarding-16x9.mp4" "$OUT/lebi/onboarding.mp4"
still "$IDEA/lebi-video/out/case-study/01-onboarding-poster.jpg" "$OUT/lebi/onboarding.webp" 1600
loop "$IDEA/lebi-video/out/case-study/02-wallet-16x9.mp4" "$OUT/lebi/wallet.mp4"
still "$IDEA/lebi-video/out/case-study/02-wallet-poster.jpg" "$OUT/lebi/wallet.webp" 1280
loop "$IDEA/lebi-video/out/case-study/04-sponsors-16x9.mp4" "$OUT/lebi/sponsors.mp4"
still "$IDEA/lebi-video/out/case-study/04-sponsors-poster.jpg" "$OUT/lebi/sponsors.webp" 1280
hero "$IDEA/lebi-video/out/lebi-screens-16x9.mp4" "$OUT/lebi/screens.mp4" 30
still "$IDEA/lebi-video/out/case-study/03-screens-poster.jpg" "$OUT/lebi/screens.webp" 1600
report lebi onboarding.mp4 onboarding.webp wallet.mp4 wallet.webp sponsors.mp4 sponsors.webp screens.mp4 screens.webp
