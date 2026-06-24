"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Flag, X } from "lucide-react";

/**
 * Shared styles for dialog buttons
 */
const btnPrimary: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "6px",
  padding: "8px 20px", borderRadius: "12px", border: "none",
  background: "var(--accent)", color: "#000",
  fontSize: "13px", fontWeight: "bold", cursor: "pointer",
};
const btnSecondary: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "6px",
  padding: "8px 20px", borderRadius: "12px", border: "none",
  background: "var(--text-secondary)", color: "#fff",
  fontSize: "13px", cursor: "pointer",
};
const btnOutline: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "6px",
  padding: "8px 20px", borderRadius: "12px",
  border: "1px solid var(--border)", background: "transparent",
  color: "var(--text-primary)", fontSize: "13px", cursor: "pointer",
};

/**
 * CenteredDialog — reusable popup centered in the main content area
 * (between the 272px left sidebar and 200px right sidebar).
 */
export function CenteredDialog({ open, onClose, title, children }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.6)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed z-50"
        style={{
          top: "50%",
          // Center in content area: viewport center + half of left sidebar - half of right sidebar adjustment
          left: "calc(50% + 36px)",
          transform: "translate(-50%, -50%)",
          width: "420px",
          maxWidth: "calc(100vw - 472px)",
          margin: 0,
          padding: 0,
        }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "24px",
        }}>
          {/* Header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "20px",
          }}>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "var(--accent)" }}>
              {title}
            </div>
            <button
              onClick={onClose}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                color: "var(--text-secondary)", padding: "4px", borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              <X size={18} />
            </button>
          </div>
          {children}
        </div>
      </motion.div>
    </>
  );
}

// ===== Stopwatch Dialog =====

export default function StopwatchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(() => {
    setElapsed(Date.now() - startTime);
  }, [startTime]);

  useEffect(() => {
    if (open && running) {
      intervalRef.current = setInterval(tick, 50);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open, running, tick]);

  useEffect(() => {
    if (!open) {
      setRunning(false);
      setElapsed(0);
      setLaps([]);
      setStartTime(0);
      setHasStarted(false);
    }
  }, [open]);

  const handleStart = () => {
    if (!hasStarted) {
      setStartTime(Date.now());
      setHasStarted(true);
    } else {
      setStartTime(Date.now() - elapsed);
    }
    setRunning(true);
  };

  const handlePause = () => setRunning(false);

  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
    setStartTime(0);
    setHasStarted(false);
  };

  const handleLap = () => setLaps((prev) => [...prev, elapsed]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(centis).padStart(2, "0")}`;
  };

  const formatLapTime = (ms: number, prevMs: number) => formatTime(ms - prevMs);

  return (
    <CenteredDialog open={open} onClose={onClose} title="秒表">
      {/* Display */}
      <div style={{
        textAlign: "center", fontSize: "42px", fontWeight: "bold",
        fontFamily: "'Courier New', monospace", color: "var(--text-primary)",
        padding: "20px 0", letterSpacing: "2px",
      }}>
        {formatTime(elapsed)}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
        {!running ? (
          <button onClick={handleStart} style={btnPrimary}>
            <Play size={14} /> 开始
          </button>
        ) : (
          <button onClick={handlePause} style={btnSecondary}>
            <Pause size={14} /> 暂停
          </button>
        )}
        <button
          onClick={handleLap}
          disabled={!running}
          style={{ ...btnOutline, opacity: running ? 1 : 0.5, cursor: running ? "pointer" : "default" }}
        >
          <Flag size={14} /> 记录
        </button>
        <button onClick={handleReset} style={btnOutline}>
          <RotateCcw size={14} /> 重置
        </button>
      </div>

      {/* Lap records */}
      {laps.length > 0 && (
        <div style={{
          marginTop: "16px", maxHeight: "160px", overflowY: "auto",
          borderTop: "1px solid var(--border)", paddingTop: "12px",
        }}>
          {laps.slice().reverse().map((lapTime, i) => {
            const lapNum = laps.length - i;
            const prevTime = laps[laps.length - i - 1] ?? 0;
            return (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                padding: "4px 0", fontSize: "12px", color: "var(--text-secondary)",
              }}>
                <span>第 {lapNum} 条</span>
                <span style={{ fontFamily: "'Courier New', monospace" }}>
                  +{formatLapTime(lapTime, prevTime)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </CenteredDialog>
  );
}
