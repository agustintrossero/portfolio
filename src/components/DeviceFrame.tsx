"use client";

import Image from "next/image";
import { useState } from "react";

type Device = "phone" | "tablet" | "browser";

const RATIO: Record<Device, string> = {
  phone: "9 / 19.5",
  tablet: "4 / 3",
  browser: "16 / 10",
};

/**
 * Shows a product screen inside a phone / tablet / browser mockup.
 * If `video` is set, a play button reveals an inline <video>.
 * If `videoSlot` is set (no real video yet), a decorative play button +
 * "Prototype" chip previews the treatment until the clip is provided.
 */
export default function DeviceFrame({
  device,
  src,
  alt,
  video,
  videoSlot = false,
  poster,
  sizes = "(min-width: 1024px) 520px, 90vw",
  className = "",
}: {
  device: Device;
  src: string;
  alt: string;
  video?: string;
  videoSlot?: boolean;
  poster?: string;
  sizes?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const showPlay = Boolean(video) || videoSlot;

  const screen = (
    <div className="device-screen" style={{ aspectRatio: RATIO[device] }}>
      {playing && video ? (
        <video
          src={video}
          poster={poster ?? src}
          controls
          autoPlay
          playsInline
        />
      ) : (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      )}

      {showPlay && !playing && (
        <div className="absolute inset-0 grid place-items-center bg-black/10">
          {video ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play prototype video"
              className="play-btn"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          ) : (
            <div aria-hidden className="play-btn opacity-90">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
          {videoSlot && !video && (
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted backdrop-blur">
              Prototype video
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={`device device-${device} ${className}`}>
      {device === "browser" && (
        <div className="device-bar" aria-hidden>
          <span className="device-dot" />
          <span className="device-dot" />
          <span className="device-dot" />
        </div>
      )}
      {screen}
    </div>
  );
}
