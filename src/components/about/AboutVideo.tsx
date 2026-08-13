"use client";

import { useRef, useState } from "react";

type AboutVideoProps = {
  src: string;
  poster?: string;
};

export function AboutVideo({ src, poster }: AboutVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setPlaying(true);
    } catch {
      setPlaying(true);
      video.controls = true;
    }
  };

  return (
    <div className={`video-frame${playing ? " video-frame--playing" : ""}`}>
      <video
        ref={videoRef}
        className="video-frame__video"
        src={src}
        poster={poster}
        preload="metadata"
        controls={playing}
        playsInline
        onPause={() => {
          if (videoRef.current?.currentTime === 0) setPlaying(false);
        }}
      />
      {!playing ? (
        <button
          type="button"
          className="video-frame__play"
          aria-label="Play our story video"
          onClick={play}
        >
          ▶
        </button>
      ) : null}
    </div>
  );
}
