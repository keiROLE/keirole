"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const shichen = [
  "子时", "丑时", "寅时", "卯时", "辰时", "巳时",
  "午时", "未时", "申时", "酉时", "戌时", "亥时",
];

const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

export default function ClockCard() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const hours = now.getHours();
  const shichenIndex = Math.floor(((hours + 1) % 24) / 2);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Time */}
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          fontVariantNumeric: "tabular-nums",
          color: "var(--accent)",
          letterSpacing: "2px",
        }}
      >
        {pad(hours)}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
      </div>

      {/* Date row */}
      <div style={{ color: "var(--text-secondary)", marginTop: "8px", fontSize: "14px" }}>
        {now.getFullYear()}年{pad(now.getMonth() + 1)}月{pad(now.getDate())}日{" "}
        {weekdays[now.getDay()]} · {shichen[shichenIndex]}
      </div>
    </motion.div>
  );
}
