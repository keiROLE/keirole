"use client";

import { motion } from "framer-motion";

interface Holiday {
  name: string;
  icon: string;
  // Date range in current year (month is 0-indexed)
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

// Chinese public holidays for 2026 (approximate dates based on official schedules)
const holidays: Holiday[] = [
  { name: "元旦", icon: "🎆", startMonth: 0, startDay: 1, endMonth: 0, endDay: 1 },
  { name: "春节", icon: "🧧", startMonth: 1, startDay: 17, endMonth: 2, endDay: 23 },
  { name: "清明节", icon: "🌿", startMonth: 3, startDay: 5, endMonth: 3, endDay: 7 },
  { name: "劳动节", icon: "🛠️", startMonth: 4, startDay: 1, endMonth: 5, endDay: 5 },
  { name: "端午节", icon: "🐉", startMonth: 4, startDay: 25, endMonth: 4, endDay: 27 },
  { name: "中秋节", icon: "🥮", startMonth: 8, startDay: 24, endMonth: 8, endDay: 26 },
  { name: "国庆节", icon: "🇨🇳", startMonth: 9, startDay: 1, endMonth: 10, endDay: 8 },
];

function formatDate(m: number, d: number): string {
  return `${String(m + 1).padStart(2, "0")}.${String(d).padStart(2, "0")}`;
}

function daysUntil(startMonth: number, startDay: number): number {
  const now = new Date();
  const target = new Date(now.getFullYear(), startMonth, startDay);
  if (target < now) target.setFullYear(target.getFullYear() + 1);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function progressPct(startMonth: number, startDay: number): number {
  const now = new Date();
  let target = new Date(now.getFullYear(), startMonth, startDay);
  if (target < now) target.setFullYear(target.getFullYear() + 1);

  // Start counting from the most recent holiday that has passed
  let start = new Date(now.getFullYear(), 0, 1);
  for (let i = holidays.length - 1; i >= 0; i--) {
    const prev = new Date(now.getFullYear(), holidays[i].startMonth, holidays[i].startDay);
    if (prev < now) {
      start = prev;
      break;
    }
  }

  const total = target.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export default function HolidayCard() {
  const upcoming = holidays
    .map((h) => ({
      ...h,
      days: daysUntil(h.startMonth, h.startDay),
      progress: progressPct(h.startMonth, h.startDay),
      dateRange: `${formatDate(h.startMonth, h.startDay)}~${formatDate(h.endMonth, h.endDay)}`,
    }))
    .sort((a, b) => a.days - b.days);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div
        style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "var(--accent)" }}
      >
        假期倒计时
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {upcoming.map((h) => (
          <div key={h.name}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px" }}>
                {h.icon} {h.name} <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{h.dateRange}</span>
              </span>
              <span style={{ fontSize: "13px", color: "var(--accent)", whiteSpace: "nowrap", marginLeft: "8px" }}>
                {h.days === 0 ? "今天！" : `${h.days}天`}
              </span>
            </div>
            {/* Progress bar */}
            <div
              style={{
                height: "4px",
                borderRadius: "2px",
                background: "var(--border)",
                marginTop: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${h.progress}%`,
                  height: "100%",
                  borderRadius: "2px",
                  background: "var(--accent)",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
