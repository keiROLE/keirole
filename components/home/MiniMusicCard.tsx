"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function MiniMusicCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const controls = useAnimation();

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch {
        // Autoplay blocked — user interaction needed
      }
    }
    setPlaying(!playing);
  };

  const reset = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
  };

  // Sync playing state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  // Rotation animation while playing
  useEffect(() => {
    if (playing) {
      controls.start({ rotate: 360, transition: { repeat: Infinity, duration: 3, ease: "linear" } });
    } else {
      controls.stop();
      controls.set({ rotate: 0 });
    }
  }, [playing, controls]);

  return (
    <motion.div
      className="card flex items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Rotating disc */}
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: "conic-gradient(var(--accent-dim), var(--accent), var(--accent-dim), var(--accent))",
        }}
        animate={controls}
      >
        <div
          className="w-8 h-8 rounded-full"
          style={{ background: "var(--bg-card)" }}
        />
      </motion.div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text-primary)" }}>
          おかえりなさい
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          柴田淳
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={togglePlay}
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--accent)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent-dim)";
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={reset}
          title="重置"
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-secondary)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--accent)";
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Hidden audio */}
      <audio ref={audioRef} src="/sound/%E6%9F%B4%E7%94%B0%E7%B4%93-%E3%81%8A%E3%81%8B%E3%81%88%E3%82%8A%E3%81%AA%E3%81%95%E3%81%84.mp3" />
    </motion.div>
  );
}
