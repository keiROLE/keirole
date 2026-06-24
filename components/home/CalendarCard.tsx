"use client";

import { motion } from "framer-motion";

const WEEKDAYS_ZH = ["日", "一", "二", "三", "四", "五", "六"];

export default function CalendarCard() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const today = now.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div
        style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "var(--accent)" }}
      >
        {year}年{month + 1}月
      </div>

      {/* Weekday header */}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "4px" }}
      >
        {WEEKDAYS_ZH.map((d) => (
          <div key={d} style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            周{d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", gap: "2px" }}
      >
        {cells.map((d, i) => (
          <div
            key={i}
            style={{
              fontSize: "13px",
              padding: "6px 0",
              borderRadius: "8px",
              color: d === today ? "#fff" : "var(--text-primary)",
              background: d === today ? "var(--accent)" : "transparent",
              fontWeight: d === today ? "bold" : "normal",
            }}
          >
            {d ?? ""}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
