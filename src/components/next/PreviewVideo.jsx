import { useEffect, useRef, useState } from "react";
import Icon from "../healthcare/Icon.jsx";
import { useInView } from "./shared.jsx";

// A story video that plays a silent, looping preview while `preview` is true
// (the parent picks one card at a time) and plays from the start with sound
// when tapped. A normal round play button sits in the middle, so the tile
// reads as a video at a glance. Nothing downloads until a preview or a tap
// starts it. A video playing with sound pauses when it scrolls out of view.
// Portrait (3:4) by default; `ratio` (e.g. "16 / 9") and `posterSize` suit
// landscape class recordings, with `wide` centring the play button.
// (The live /start-now page uses start-now/VideoCard.jsx instead.)
export default function PreviewVideo({
  poster,
  posterSize = [480, 640],
  video,
  label,
  duration,
  focus,
  ratio,
  wide = false,
  preview = false,
  onSound,
  children,
}) {
  const videoRef = useRef(null);
  const [inViewRef, inView] = useInView({ threshold: 0.2, once: false });
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);

  // Silent preview on and off.
  useEffect(() => {
    const element = videoRef.current;
    if (!element || sound) return;
    if (preview) {
      element.muted = true;
      element.loop = true;
      element.play().catch(() => {});
    } else {
      element.pause();
    }
  }, [preview, sound]);

  // Don't keep talking off screen.
  useEffect(() => {
    if (sound && !inView) videoRef.current?.pause();
  }, [sound, inView]);

  const playWithSound = () => {
    const element = videoRef.current;
    if (!element) return;
    document.querySelectorAll("video").forEach((other) => {
      if (other !== element) other.pause();
    });
    element.muted = false;
    element.loop = false;
    element.currentTime = 0;
    setSound(true);
    onSound?.(true);
    element.play().catch(() => {});
  };

  const stopSound = () => {
    setSound(false);
    onSound?.(false);
  };

  return (
    <div
      ref={inViewRef}
      className={`nx-pv${wide ? " nx-pv-wide" : ""}${playing ? " is-playing" : ""}${sound ? " has-sound" : ""}`}
      style={focus || ratio ? { "--sn-focus": focus, "--nx-pv-ratio": ratio } : undefined}
    >
      <video
        ref={videoRef}
        src={video}
        preload="none"
        muted
        playsInline
        controls={sound}
        controlsList="nodownload"
        aria-label={label}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={stopSound}
      />
      {!sound && (
        <button type="button" className="nx-pv-start" onClick={playWithSound} aria-label={`Play with sound: ${label}, ${duration}`}>
          <img src={poster} alt="" width={posterSize[0]} height={posterSize[1]} loading="lazy" decoding="async" />
          <span className="nx-pv-play" aria-hidden="true">
            <Icon name="play" size={22} weight="fill" />
          </span>
          <span className="nx-pv-duration" aria-hidden="true">
            {duration}
          </span>
          {playing && (
            <span className="nx-pv-muted" aria-hidden="true">
              <Icon name="speaker-slash" size={13} weight="fill" />
            </span>
          )}
          {children}
        </button>
      )}
    </div>
  );
}
