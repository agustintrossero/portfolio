"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** mp4 path inside /public. */
  src: string;
  /** Still frame shown before playback and whenever motion is not wanted. */
  poster: string;
  /** Accessible description of what the clip shows. */
  label: string;
  /** Intrinsic ratio, e.g. "16 / 9". Ignored when `fill` is set. */
  ratio?: string;
  /** Fill the positioned parent instead of sizing itself (device frames). */
  fill?: boolean;
  className?: string;
};

/** Visitors who asked for less motion or less data get a play button instead of autoplay. */
function canAutoplay() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return !reduce && connection?.saveData !== true;
}

function PlayIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
    </svg>
  );
}

/**
 * A muted, looping clip that only downloads and plays while it is on
 * screen. It always offers a pause control, because moving content that
 * lasts more than five seconds has to be stoppable (WCAG 2.2.2).
 */
export default function LoopVideo({
  src,
  poster,
  label,
  ratio = "16 / 9",
  fill = false,
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByVisitor = useRef(false);
  const [playing, setPlaying] = useState(false);
  // True when the clip is waiting for a tap: reduced motion, data saver,
  // or a browser that blocked autoplay (iOS Low Power Mode, for example).
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;
    let onScreen = false;

    const tryPlay = () => {
      if (pausedByVisitor.current) return;
      if (!canAutoplay()) {
        setWaiting(true);
        return;
      }
      video.muted = true;
      video
        .play()
        .then(() => setWaiting(false))
        .catch(() => setWaiting(true));
    };

    // Start buffering a little before the clip scrolls into view.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = "auto";
          near.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    // Play while visible, pause as soon as it leaves.
    const visible = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) tryPlay();
        else video.pause();
      },
      { threshold: 0.25 },
    );

    // Background tabs should not keep decoding video.
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (onScreen) tryPlay();
    };

    near.observe(wrap);
    visible.observe(wrap);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      near.disconnect();
      visible.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [src]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByVisitor.current = false;
      video.muted = true;
      video
        .play()
        .then(() => setWaiting(false))
        .catch(() => setWaiting(true));
    } else {
      pausedByVisitor.current = true;
      video.pause();
    }
  }

  return (
    <div
      ref={wrapRef}
      className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden ${className}`}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {waiting && !playing ? (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play video"
          className="play-btn pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <PlayIcon className="h-6 w-6" />
        </button>
      ) : (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="pointer-events-auto absolute bottom-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-80 backdrop-blur transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
        >
          {playing ? (
            <PauseIcon className="h-3.5 w-3.5" />
          ) : (
            <PlayIcon className="h-3.5 w-3.5" />
          )}
        </button>
      )}
    </div>
  );
}
