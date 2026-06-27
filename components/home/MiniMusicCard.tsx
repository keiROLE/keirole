"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import MagicCard from "@/components/ui/MagicCard";

const SONG_TITLE = "おかえりなさい";
const SONG_ARTIST = "柴田淳";
const AUDIO_SRC = "/sound/sound.mp3";

// Lazy-load audio to avoid blocking initial render
function useLazyAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Create audio element lazily on mount
    const audio = new Audio(src);
    audio.preload = "auto";
    audioRef.current = audio;
    audio.addEventListener("canplaythrough", () => setReady(true), { once: true });
    // Timeout fallback: assume ready after 3s regardless
    setTimeout(() => setReady(true), 3000);
  }, [src]);

  return audioRef;
}

export default function MiniMusicCard() {
  const audioRef = useLazyAudio(AUDIO_SRC);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch {
        // Autoplay blocked
      }
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <MagicCard>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              background: "conic-gradient(var(--accent-dim), var(--accent), var(--accent-dim))",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "var(--bg-card)",
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "11px", fontWeight: "bold", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {SONG_TITLE}
            </div>
            <div style={{ fontSize: "10px", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {SONG_ARTIST}
            </div>
          </div>

          <button
            onClick={togglePlay}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              flexShrink: 0,
            }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>

        {/* Progress bar */}
        <div
          ref={progressRef}
          style={{
            width: "100%",
            height: "3px",
            borderRadius: "2px",
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={(e) => {
            const audio = audioRef.current;
            const bar = progressRef.current;
            if (!audio || !bar || !audio.duration) return;
            const rect = bar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            audio.currentTime = (x / rect.width) * audio.duration;
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: "2px",
              background: "var(--accent)",
              width: `${progress * 100}%`,
              transition: "width 0.1s linear",
            }}
          />
        </div>

      </div>
    </MagicCard>
  );
}
