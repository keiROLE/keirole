"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

export default function CalendarPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthNames = [
    "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
      <h1 style={{ color: "var(--accent)", fontSize: "24px", fontWeight: "bold" }}>
        日历
      </h1>

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={prevMonth}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)",
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            {viewYear}.{String(viewMonth + 1).padStart(2, "0")}
          </span>
          <button
            onClick={nextMonth}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)",
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Weekday headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "var(--text-secondary)",
                padding: "4px 0",
              }}
            >
              周{d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
          {cells.map((day, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                fontSize: "14px",
                padding: "8px 0",
                borderRadius: "8px",
                color: day && isToday(day) ? "#000" : "var(--text-primary)",
                background: day && isToday(day) ? "var(--accent)" : "transparent",
                fontWeight: day && isToday(day) ? "bold" : "normal",
                opacity: day ? 1 : 0.2,
              }}
            >
              {day ?? ""}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Today info */}
      <div
        className="card"
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>星期</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "4px" }}>
            周{WEEKDAYS[today.getDay()]}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>今年第几周</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "4px" }}>
            {getWeekOfYear(today)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>今年已过</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "4px" }}>
            {getDayOfYear(today)}%
          </div>
        </div>
      </div>
    </div>
  );
}

function getWeekOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const total = new Date(date.getFullYear(), 12, 0).getTime() - start.getTime();
  return Math.round((diff / total) * 100);
}
