"use client";

import { motion } from "framer-motion";

interface Holiday {
  name: string;
  month: number; // 1-indexed
  day: number;
  icon: string;
}

// Predefined holidays (expand as needed)
const holidays: Holiday[] = [
  { name: "元旦", month: 1, day: 1, icon: "🎆" },
  { name: "春节", month: 1, day: 28, icon: "🧧" }, // 2027 example
  { name: "清明", month: 4, day: 5, icon: "🌿" },
  { name: "劳动节", month: 5, day: 1, icon: "🛠️" },
  { name: "端午节", month: 6, day: 14, icon: "🐉" },
  { name: "国庆节", month: 10, day: 1, icon: "🇨🇳" },
];

function daysUntil(month: number, day: number): number {
  const now = new Date();
  const target = new Date(now.getFullYear(), month - 1, day);
  if (target < now) target.setFullYear(target.getFullYear() + 1);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function progressPct(month: number, day: number): number {
  const now = new Date();
  let target = new Date(now.getFullYear(), month - 1, day);
  if (target < now) target.setFullYear(target.getFullYear() + 1);

  // Start from last holiday or Jan 1
  let start = new Date(now.getFullYear(), 0, 1);
  for (let i = holidays.length - 1; i >= 0; i--) {
    const prev = new Date(now.getFullYear(), holidays[i].month - 1, holidays[i].day);
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
  // Show next 3 upcoming holidays
  const upcoming = holidays
    .map((h) => ({
      ...h,
      days: daysUntil(h.month, h.day),
      progress: progressPct(h.month, h.day),
    }))
    .sort((a, b) => a.days - b.days)
    .slice(0, 3);

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
              <span style={{ fontSize: "14px" }}>
                {h.icon} {h.name}
              </span>
              <span style={{ fontSize: "13px", color: "var(--accent)" }}>
                {h.days === 0 ? "今天！" : `还有 ${h.days} 天`}
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
