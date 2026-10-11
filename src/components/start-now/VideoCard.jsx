import { useRef, useState } from "react";
import Icon from "../healthcare/Icon.jsx";

// A poster with a play button that becomes the video on tap. The <video> is
// in the page from the start with preload="none", so nothing downloads until
// someone taps, and play() runs inside the tap itself (iOS needs that to
// play with sound). Starting one video pauses any other video on the page.
// Overlays (`children`) sit on the poster and hide while the video plays.
export default function VideoCard({
  className = "",
  poster,
  posterWidth,
  posterHeight,
  video,
  label,
  duration,
  focus,
  fit = "cover",
  children,
}) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    const element = videoRef.current;
    if (!element) return;
    setStarted(true);
    element.play().catch(() => {
      // If the browser still blocks playback, its own controls take over.
    });
  };

  const pauseOthers = () => {
    document.querySelectorAll("video").forEach((other) => {
      if (other !== videoRef.current) other.pause();
    });
  };

  return (
    <div
      className={`sn-media sn-media-${fit} ${started ? "is-started" : ""} ${className}`.trim()}
      style={focus ? { "--sn-focus": focus } : undefined}
    >
      <video
        ref={videoRef}
        src={video}
        preload="none"
        playsInline
        controls={started}
        controlsList="nodownload"
        aria-label={label}
        onPlay={pauseOthers}
        onEnded={() => setStarted(false)}
      />
      <button
        type="button"
        className="sn-media-start"
        onClick={start}
        aria-label={`Play video: ${label}${duration ? `, ${duration}` : ""}`}
      >
        <img
          src={poster}
          alt=""
          width={posterWidth}
          height={posterHeight}
          loading="lazy"
          decoding="async"
        />
        <span className="sn-play" aria-hidden="true">
          <span className="sn-play-icon">
            <Icon name="play" size={11} weight="fill" />
          </span>
          {duration || "Play"}
        </span>
      </button>
      {children}
    </div>
  );
}
