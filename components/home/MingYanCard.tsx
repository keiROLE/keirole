"use client";

import { useState } from "react";
import MagicCard from "@/components/ui/MagicCard";

const FALLBACK_QUOTES = [
  "因为相信所以看见！先做一件事再论完美与否。",
  "宁愿做错，也不要什么都不做。",
  "别想，狂做。",
  "船停在船坞里最安全，但不是造船的目的。",
];

let cachedQuoteLines: string[] | null = null;

function pickRandomQuote(): string {
  if (cachedQuoteLines && cachedQuoteLines.length > 0) {
    return cachedQuoteLines[Math.floor(Math.random() * cachedQuoteLines.length)];
  }
  return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
}

export default function MingYanCard() {
  const [quote, setQuote] = useState(() => pickRandomQuote());

  // Load quotes once on mount (client-side only)
  if (!cachedQuoteLines) {
    fetch("/mingyan.md")
      .then((res) => res.text())
      .then((text) => {
        cachedQuoteLines = text
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0);
      })
      .catch(() => {
        cachedQuoteLines = [];
      });
  }

  return (
    <MagicCard>
      <div
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={() => setQuote(pickRandomQuote())}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "var(--accent)",
            marginBottom: "8px",
            letterSpacing: "2px",
          }}
        >
          名言
          <span
            style={{
              marginLeft: "12px",
              fontSize: "10px",
              fontWeight: "normal",
              color: "var(--text-secondary)",
              opacity: 0.6,
              letterSpacing: "0",
            }}
          >
            点击换一句
          </span>
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "var(--text-primary)",
            lineHeight: "1.7",
          }}
        >
          {quote}
        </div>
      </div>
    </MagicCard>
  );
}
