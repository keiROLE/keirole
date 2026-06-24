"use client";

import { useRef, useEffect, useCallback, useState, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw, Flag } from "lucide-react";

/**
 * DialogContext — manages a single open dialog at a time.
 * All dialogs render centered in the main content area using fixed positioning
 * that spans the content zone (left: 272px, right: 200px, top/bottom: 32px).
 */
interface DialogInfo {
  title: string;
  content: ReactNode;
}

const DialogContext = createContext<{
  openDialog: (title: string, content: ReactNode) => void;
  closeDialog: () => void;
} | null>(null);

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be inside DialogProvider");
  return ctx;
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogInfo | null>(null);

  const openDialog = useCallback((title: string, content: ReactNode) => {
    setDialog({ title, content });
  }, []);

  const closeDialog = useCallback(() => {
    setDialog(null);
  }, []);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <AnimatePresence>
        {dialog && (
          <>
            {/* Backdrop — full viewport */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
            />

            {/* Dialog — centered in the main content area */}
            <motion.div
              className="fixed z-50"
              style={{
                top: "32px",
                left: "272px",
                right: "200px",
                bottom: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <motion.div
                style={{
                  width: "480px",
                  maxWidth: "100%",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "24px",
                  pointerEvents: "auto",
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Header */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: "20px",
                }}>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: "var(--accent)" }}>
                    {dialog.title}
                  </div>
                  <button
                    onClick={closeDialog}
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

                {/* Body */}
                {dialog.content}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DialogContext.Provider>
  );
}

// ===== Stopwatch body (rendered inside the dialog) =====

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

export function StopwatchBody() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const startTimeRef = useRef(0);
  const hasStartedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(() => {
    setElapsed(Date.now() - startTimeRef.current);
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, tick]);

  const handleStart = () => {
    if (!hasStartedRef.current) {
      startTimeRef.current = Date.now();
      hasStartedRef.current = true;
    } else {
      startTimeRef.current = Date.now() - elapsed;
    }
    setRunning(true);
  };

  const handlePause = () => setRunning(false);

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setElapsed(0);
    setLaps([]);
    startTimeRef.current = 0;
    hasStartedRef.current = false;
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
    <>
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
    </>
  );
}

// ===== Hook to open stopwatch dialog =====

export function useStopwatch() {
  const { openDialog } = useDialog();

  const open = () => {
    openDialog("秒表", <StopwatchBody />);
  };

  return { open };
}
