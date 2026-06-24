"use client";

import { motion } from "framer-motion";

const greetings = [
  { min: 5, max: 11, zh: "早上好", en: "Good Morning" },
  { min: 12, max: 14, zh: "中午好", en: "Good Afternoon" },
  { min: 15, max: 18, zh: "下午好", en: "Good Afternoon" },
  { min: 19, max: 23, zh: "晚上好", en: "Good Evening" },
  { min: 0, max: 4, zh: "夜深了", en: "Good Night" },
];

export default function GreetingCard() {
  const hour = new Date().getHours();
  const greeting =
    greetings.find((g) => hour >= g.min && hour <= g.max) ?? greetings[3];

  return (
    <motion.div
      className="card flex items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Avatar */}
      <img
        src="/avatar.svg"
        alt="avatar"
        className="w-20 h-20 rounded-full object-cover shrink-0"
        style={{ border: "2px solid var(--accent)" }}
      />

      {/* Text */}
      <div>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "var(--accent)" }}>
          {greeting.zh}
        </div>
        <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
          {greeting.en}
        </div>
        <div style={{ fontSize: "14px", color: "var(--text-primary)", marginTop: "8px" }}>
          I&#39;m 啓, Nice to meet you!
        </div>
      </div>
    </motion.div>
  );
}
