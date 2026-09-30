#!/usr/bin/env bash
# Builds the web versions of the portfolio media.
#
# Sources: the video projects in ~/Desktop/idea and the light pack exported
# from them. Output: public/work/<slug>/.
# Only rebuilds a file when its source is newer than the output. Run with
# FORCE=1 to rebuild everything (for example after changing a CRF).
# The Lebi screens (mockup, journey, before/after, landings) came from
# rodrigopeixoto.me as PNG and are committed as WebP, so they are not here.
# The phone sheets (a row of real screens as one image) come from
# scripts/phone-sheets.mjs.
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

# Part of a longer clip as a loop: source, start, end, output, size, CRF.
# The last half second fades into the first, so the cut loops without a jump.
slice() {
  stale "$1" "$4" || return 0
  local len fade=0.5
  len=$(awk "BEGIN { print $3 - $2 }")
  ffmpeg -v error -y -ss "$2" -t "$len" -i "$1" -filter_complex \
    "[0:v]fps=30,scale=$5:flags=lanczos,split[a][b];[a]trim=start=$fade,setpts=PTS-STARTPTS[body];[b]trim=end=$fade,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=$fade:offset=$(awk "BEGIN { print $len - 2 * $fade }")" \
    "${x264[@]}" -crf "$6" "$4"
}

# One chapter of a 16:9 clip as a 720p loop (optional fifth argument: CRF).
chapter() { slice "$1" "$2" "$3" "$4" 1280:720 "${5:-23}"; }

# Part of a screen-only clip as a phone loop (optional fifth argument: CRF).
phonecut() { slice "$1" "$2" "$3" "$4" 720:1560 "${5:-27}"; }

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
# The screen-only render still carries the intro title over the first 4 s
# (lebi.html, intro: 4.2), so the loop starts after it.
phonecut "$IDEA/lebi-video/out/case-study/01-onboarding-screen-only.mp4" 4.2 34 "$OUT/lebi/onboarding-phone.mp4"
poster "$OUT/lebi/onboarding-phone.mp4" 1.5 "$OUT/lebi/onboarding-phone.webp" 720
phone "$IDEA/lebi-video/out/case-study/02-wallet-screen-only.mp4" "$OUT/lebi/wallet-phone.mp4"
poster "$OUT/lebi/wallet-phone.mp4" 2 "$OUT/lebi/wallet-phone.webp" 720
report lumio tour-phone.mp4 tour-phone.webp
report lebi onboarding-phone.mp4 onboarding-phone.webp wallet-phone.mp4 wallet-phone.webp

echo "Home: hero deck"
# Short loops for the cards in the home hero, cut from each case main clip.
# Each poster is the frame that best stands for the project, since visitors
# who prefer less motion only see the poster.
teaser() { slice "$1" "$2" "$3" "$4" 960:540 28; }
# A teaser that plays once and holds its last frame: source, start, end,
# output, seconds to hold.
held() {
  stale "$1" "$4" || return 0
  ffmpeg -v error -y -ss "$2" -t "$(awk "BEGIN { print $3 - $2 }")" -i "$1" \
    -vf "fps=30,scale=960:540:flags=lanczos,tpad=stop_mode=clone:stop_duration=$5" "${x264[@]}" -crf 28 "$4"
}
teaser "$IDEA/gds-video/out/gds-theme-swap-16x9.mp4" 14 22 "$OUT/gds/teaser.mp4"
poster "$OUT/gds/teaser.mp4" 1 "$OUT/gds/teaser.webp" 960
# Lebi keeps to its intro: after 3.5 s the title fades out behind the phone,
# which reads as an overlap at card size. The last frame holds instead.
held "$IDEA/lebi-video/out/lebi-onboarding-16x9.mp4" 0.2 3.5 "$OUT/lebi/teaser.mp4" 3
poster "$OUT/lebi/teaser.mp4" 2 "$OUT/lebi/teaser.webp" 960
teaser "$IDEA/lumio-video/out/lumio-intro-16x9.mp4" 1.5 8 "$OUT/lumio/teaser.mp4"
poster "$OUT/lumio/teaser.mp4" 3 "$OUT/lumio/teaser.webp" 960
teaser "$IDEA/moveup-tools-video/out/moveup-mosaic-16x9.mp4" 1 9 "$OUT/moveup-tools/teaser.mp4"
poster "$OUT/moveup-tools/teaser.mp4" 5 "$OUT/moveup-tools/teaser.webp" 960
report gds teaser.mp4 teaser.webp
report lebi teaser.mp4 teaser.webp
report lumio teaser.mp4 teaser.webp
report moveup-tools teaser.mp4 teaser.webp

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

echo "Lumio case study"
hero "$IDEA/lumio-video/out/lumio-intro-16x9.mp4" "$OUT/lumio/intro.mp4" 25
still "$IDEA/lumio-video/out/case-study/01-intro-poster.jpg" "$OUT/lumio/intro.webp" 1600
# The tour has five chapters (see CAPS in lumio-video/iphone.html). Each cut
# skips the caption change at its start (0.55 s). The first two stop before
# the next chapter; the payment cut runs through the last three and ends on
# the wallet, before the tour fades back home.
TOUR="$IDEA/lumio-video/out/lumio-tour-16x9.mp4"
chapter "$TOUR" 0.9 8.15 "$OUT/lumio/index.mp4"
poster "$TOUR" 4.2 "$OUT/lumio/index.webp" 1280
chapter "$TOUR" 8.8 15.25 "$OUT/lumio/pro.mp4"
poster "$TOUR" 11.5 "$OUT/lumio/pro.webp" 1280
chapter "$TOUR" 15.9 34.3 "$OUT/lumio/payment.mp4"
poster "$TOUR" 19.4 "$OUT/lumio/payment.webp" 1280
hero "$IDEA/lumio-video/out/lumio-screens-16x9.mp4" "$OUT/lumio/screens.mp4" 30
still "$IDEA/lumio-video/out/case-study/03-screens-poster.jpg" "$OUT/lumio/screens.webp" 1600
share "$IDEA/lumio-video/out/case-study/01-intro-poster.jpg" "$OUT/lumio/cover.jpg"
report lumio intro.mp4 intro.webp index.mp4 index.webp pro.mp4 pro.webp payment.mp4 payment.webp screens.mp4 screens.webp cover.jpg

echo "MoveUp Tools case study"
MU="$IDEA/moveup-tools-video/out"
hero "$MU/moveup-mosaic-16x9.mp4" "$OUT/moveup-tools/mosaic.mp4" 30
still "$MU/case-study/posters/moveup-mosaic-16x9.png" "$OUT/moveup-tools/mosaic.webp" 1600
# Video Studio in two cuts: from the studio home to the scenes, then the
# clips with their final cost, the canvas and the closing title.
chapter "$MU/moveup-video-studio-16x9.mp4" 3.8 14.8 "$OUT/moveup-tools/studio-brief.mp4"
poster "$MU/moveup-video-studio-16x9.mp4" 9 "$OUT/moveup-tools/studio-brief.webp" 1280
chapter "$MU/moveup-video-studio-16x9.mp4" 15 31 "$OUT/moveup-tools/studio-clips.mp4"
poster "$MU/moveup-video-studio-16x9.mp4" 17.5 "$OUT/moveup-tools/studio-clips.webp" 1280
# Brand Assets starts once its opening title has faded: the title counts
# brands, a number that is not published.
chapter "$MU/moveup-brand-assets-16x9.mp4" 3.5 21 "$OUT/moveup-tools/brand-assets.mp4"
poster "$MU/moveup-brand-assets-16x9.mp4" 8 "$OUT/moveup-tools/brand-assets.webp" 1280
copy "$MU/case-study/04-pods-timeline.mp4" "$OUT/moveup-tools/pods.mp4"
poster "$OUT/moveup-tools/pods.mp4" 3 "$OUT/moveup-tools/pods.webp" 1280
copy "$MU/case-study/06-survey-results.mp4" "$OUT/moveup-tools/survey.mp4"
poster "$OUT/moveup-tools/survey.mp4" 2.5 "$OUT/moveup-tools/survey.webp" 1280
share "$MU/case-study/posters/moveup-mosaic-16x9.png" "$OUT/moveup-tools/cover.jpg"
report moveup-tools mosaic.mp4 mosaic.webp studio-brief.mp4 studio-brief.webp studio-clips.mp4 studio-clips.webp brand-assets.mp4 brand-assets.webp pods.mp4 pods.webp survey.mp4 survey.webp cover.jpg

echo "Site: CV and portrait"
# The CV is rendered from Desktop/Agus/CV/cv.html by its own render.sh. The
# version with photo and portfolio link is the one meant to be shared.
CV="$HOME/Desktop/Agus/CV"
copy "$CV/Agustin_Trossero_CV.pdf" "$ROOT/public/Agustin_Trossero_CV.pdf"
still "$CV/linkedin-foto.jpg" "$ROOT/public/portrait.webp" 640
say "$ROOT/public/Agustin_Trossero_CV.pdf"
say "$ROOT/public/portrait.webp"
