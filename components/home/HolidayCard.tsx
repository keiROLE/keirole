"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useDialog } from "@/components/home/StopwatchDialog";
import MagicCard from "@/components/ui/MagicCard";

interface Holiday {
  name: string;
  icon: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

const holidays: Holiday[] = [
  { name: "元旦", icon: "🎆", startMonth: 0, startDay: 1, endMonth: 0, endDay: 1 },
  { name: "春节", icon: "🧧", startMonth: 1, startDay: 17, endMonth: 2, endDay: 23 },
  { name: "清明节", icon: "🌿", startMonth: 3, startDay: 5, endMonth: 3, endDay: 7 },
  { name: "劳动节", icon: "🛠️", startMonth: 4, startDay: 1, endMonth: 5, endDay: 5 },
  { name: "端午节", icon: "🐉", startMonth: 4, startDay: 25, endMonth: 4, endDay: 27 },
  { name: "中秋节", icon: "🥮", startMonth: 8, startDay: 24, endMonth: 8, endDay: 26 },
  { name: "国庆节", icon: "🏮", startMonth: 9, startDay: 1, endMonth: 10, endDay: 8 },
];

function formatDate(m: number, d: number): string {
  return `${String(m + 1).padStart(2, "0")}.${String(d).padStart(2, "0")}`;
}

function computeHolidays(now: Date): (Holiday & { days: number; progress: number })[] {
  return holidays
    .map((h) => {
      const target = new Date(now.getFullYear(), h.startMonth, h.startDay);
      const adjustedTarget = target < now ? new Date(target.getFullYear() + 1, h.startMonth, h.startDay) : target;
      const days = Math.ceil((adjustedTarget.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      let start = new Date(now.getFullYear(), 0, 1);
      for (let i = holidays.length - 1; i >= 0; i--) {
        const prev = new Date(now.getFullYear(), holidays[i].startMonth, holidays[i].startDay);
        if (prev < now) {
          start = prev;
          break;
        }
      }
      const total = adjustedTarget.getTime() - start.getTime();
      const elapsed = now.getTime() - start.getTime();
      const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));

      return { ...h, days, progress };
    })
    .sort((a, b) => a.days - b.days);
}

export default function HolidayCard() {
  const { openDialog } = useDialog();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const allHolidays = useMemo(() => computeHolidays(now), [now]);
  const next3 = useMemo(() => allHolidays.slice(0, 3), [allHolidays]);

  const handleExpand = useCallback(() => {
    openDialog("全部假期", (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {allHolidays.map((h) => (
          <HolidayRow key={h.name} {...h} />
        ))}
      </div>
    ));
  }, [allHolidays, openDialog]);

  return (
    <MagicCard>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ fontSize: "15px", fontWeight: "bold", color: "var(--accent)" }}>
          假期倒计时
        </div>
        <button
          onClick={handleExpand}
          style={{
            background: "transparent", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "3px 8px",
            color: "var(--text-secondary)", fontSize: "10px", cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          查看全部
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {next3.map((h) => (
          <HolidayRow key={h.name} {...h} />
        ))}
      </div>
    </MagicCard>
  );
}

function HolidayRow(h: Holiday & { days: number; progress: number }): JSX.Element {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "12px" }}>
          {h.icon} {h.name}{" "}
          <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>
            {formatDate(h.startMonth, h.startDay)}~{formatDate(h.endMonth, h.endDay)}
          </span>
        </span>
        <span style={{ fontSize: "12px", color: "var(--accent)", whiteSpace: "nowrap", marginLeft: "8px" }}>
          {h.days === 0 ? "今天！" : `${h.days}天`}
        </span>
      </div>
      <div style={{
        width: "100%", height: "3px", borderRadius: "2px",
        background: "var(--border)", marginTop: "4px", overflow: "hidden",
      }}>
        <div style={{
          width: `${h.progress.toFixed(2)}%`, height: "100%", borderRadius: "2px",
          background: "var(--accent)", transition: "width 0.5s ease",
        }} />
      </div>
    </div>
  );
}
