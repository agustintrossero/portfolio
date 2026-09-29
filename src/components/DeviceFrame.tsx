import Image from "next/image";
import LoopVideo from "@/components/LoopVideo";

type Device = "phone" | "tablet" | "browser";

const RATIO: Record<Device, string> = {
  phone: "9 / 19.5",
  tablet: "4 / 3",
  browser: "16 / 9",
};

/**
 * A product screen inside a phone, tablet or browser mockup. With `video`
 * the screen becomes a muted loop that plays while it is on screen.
 */
export default function DeviceFrame({
  device,
  src,
  alt,
  video,
  poster,
  sizes = "(min-width: 1024px) 520px, 90vw",
  priority = false,
  className = "",
}: {
  device: Device;
  /** Screen image. Also the poster when a video is set and no poster is. */
  src: string;
  alt: string;
  video?: string;
  poster?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`device device-${device} ${className}`}>
      {device === "browser" && (
        <div className="device-bar" aria-hidden>
          <span className="device-dot" />
          <span className="device-dot" />
          <span className="device-dot" />
        </div>
      )}
      <div className="device-screen" style={{ aspectRatio: RATIO[device] }}>
        {video ? (
          <LoopVideo fill src={video} poster={poster ?? src} label={alt} />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
