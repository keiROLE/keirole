"use client";

import { useState } from "react";
import MagicCard from "@/components/ui/MagicCard";

const greetings = [
  { min: 5, max: 11, zh: "早上好", en: "Good Morning" },
  { min: 12, max: 14, zh: "中午好", en: "Good Afternoon" },
  { min: 15, max: 18, zh: "下午好", en: "Good Afternoon" },
  { min: 19, max: 23, zh: "晚上好", en: "Good Evening" },
  { min: 0, max: 4, zh: "夜深了", en: "Good Night" },
];

function getGreetingForHour(hour: number) {
  return greetings.find((g) => hour >= g.min && hour <= g.max) ?? greetings[3];
}

export default function GreetingCard() {
  const hour = new Date().getHours();
  const greeting = getGreetingForHour(hour);

  return (
    <MagicCard>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Avatar */}
        <img
          src="/keipfp.jpg"
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover shrink-0"
          style={{ border: "2px solid var(--accent)" }}
        />

        {/* Text */}
        <div>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent)" }}>
            {greeting.zh}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
            {greeting.en}
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "6px" }}>
            I&apos;m 啓, Nice to meet you!
          </div>
        </div>
      </div>
    </MagicCard>
  );
}
