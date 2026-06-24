"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Flag, X } from "lucide-react";

interface StopwatchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function StopwatchDialog({ open, onClose }: StopwatchDialogProps) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const startTimeRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(() => {
    setElapsed(Date.now() - startTimeRef.current);
  }, []);

  const handleStart = () => {
    if (!running) {
      startTimeRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(tick, 50);
      setRunning(true);
    }
  };

  const handlePause = () => {
    if (running && intervalRef.current) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prev) => [...prev, elapsed]);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      handleReset();
    }
  }, [open]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(centis).padStart(2, "0")}`;
  };

  const formatLapTime = (ms: number, prevMs: number) => {
    return formatTime(ms - prevMs);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed z-50"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "420px",
              maxWidth: "calc(100vw - 32px)",
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "var(--accent)",
                  }}
                >
                  秒表
                </div>
                <button
                  onClick={onClose}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                    padding: "4px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Display */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "42px",
                  fontWeight: "bold",
                  fontFamily: "'Courier New', monospace",
                  color: "var(--text-primary)",
                  padding: "20px 0",
                  letterSpacing: "2px",
                }}
              >
                {formatTime(elapsed)}
              </div>

              {/* Controls */}
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                {!running ? (
                  <button
                    onClick={handleStart}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 20px",
                      borderRadius: "12px",
                      border: "none",
                      background: "var(--accent)",
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    <Play size={14} /> 开始
                  </button>
                ) : (
                  <button
                    onClick={handlePause}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 20px",
                      borderRadius: "12px",
                      border: "none",
                      background: "var(--text-secondary)",
                      color: "#fff",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    <Pause size={14} /> 暂停
                  </button>
                )}
                <button
                  onClick={handleLap}
                  disabled={!running}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 20px",
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                    background: running ? "transparent" : "var(--bg-sidebar)",
                    color: running ? "var(--text-primary)" : "var(--text-secondary)",
                    fontSize: "13px",
                    cursor: running ? "pointer" : "default",
                  }}
                >
                  <Flag size={14} /> 计圈
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 20px",
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-primary)",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  <RotateCcw size={14} /> 重置
                </button>
              </div>

              {/* Laps */}
              {laps.length > 0 && (
                <div
                  style={{
                    marginTop: "16px",
                    maxHeight: "160px",
                    overflowY: "auto",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "12px",
                  }}
                >
                  {laps
                    .slice()
                    .reverse()
                    .map((lapTime, i) => {
                      const lapNum = laps.length - i;
                      const prevTime = i < laps.length ? laps[laps.length - i - 1] : 0;
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "4px 0",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <span>第 {lapNum} 圈</span>
                          <span style={{ fontFamily: "'Courier New', monospace" }}>
                            +{formatLapTime(lapTime, prevTime)}
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
