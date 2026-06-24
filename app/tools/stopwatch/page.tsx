"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

export default function StopwatchPage() {
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
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
      <h1 style={{ color: "var(--accent)", fontSize: "24px", fontWeight: "bold" }}>
        秒表
      </h1>

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Display */}
        <div
          style={{
            textAlign: "center",
            fontSize: "48px",
            fontWeight: "bold",
            fontFamily: "'Courier New', monospace",
            color: "var(--text-primary)",
            padding: "24px 0",
            letterSpacing: "2px",
          }}
        >
          {formatTime(elapsed)}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          {!running ? (
            <button
              onClick={handleStart}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 24px",
                borderRadius: "12px",
                border: "none",
                background: "var(--accent)",
                color: "#000",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <Play size={16} /> 开始
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 24px",
                  borderRadius: "12px",
                  border: "none",
                  background: "var(--text-secondary)",
                  color: "#fff",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <Pause size={16} /> 暂停
              </button>
              <button
                onClick={handleLap}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 24px",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text-primary)",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <Flag size={16} /> 计圈
              </button>
            </>
          )}
          <button
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 24px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text-primary)",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={16} /> 重置
          </button>
        </div>
      </motion.div>

      {/* Laps */}
      {laps.length > 0 && (
        <motion.div
          className="card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "8px", color: "var(--accent)" }}>
            计圈记录
          </div>
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
                    padding: "6px 0",
                    borderBottom: "1px solid var(--border)",
                    fontSize: "13px",
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
        </motion.div>
      )}
    </div>
  );
}
