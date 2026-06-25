"use client";

import { useEffect, useState } from "react";
import MagicCard from "@/components/ui/MagicCard";

export default function CalendarCard() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const calendar = (() => {
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return { year, month: month + 1, today, cells };
  })();

  return (
    <MagicCard>
      <div
        style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "var(--accent)" }}
      >
        {calendar.year}年{String(calendar.month).padStart(2, "0")}月
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "4px" }}
      >
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
            周{d}
          </div>
        ))}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", gap: "2px" }}
      >
        {calendar.cells.map((d, i) => (
          <div
            key={i}
            style={{
              fontSize: "12px",
              padding: "5px 0",
              borderRadius: "6px",
              color: d === calendar.today ? "#fff" : "var(--text-primary)",
              background: d === calendar.today ? "var(--accent)" : "transparent",
              fontWeight: d === calendar.today ? "bold" : "normal",
            }}
          >
            {d ?? ""}
          </div>
        ))}
      </div>
    </MagicCard>
  );
}
