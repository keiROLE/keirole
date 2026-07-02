"use client";

import { useState, useEffect, useCallback } from "react";
import MagicCard from "@/components/ui/MagicCard";

const FALLBACK_QUOTES = [
  "因为相信所以看见！先做一件事再论完美与否。",
  "宁愿做错，也不要什么都不做。",
  "别想，狂做。",
  "船停在船坞里最安全，但不是造船的目的。",
];

export default function MingYanCard() {
  const [quote, setQuote] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [allQuotes, setAllQuotes] = useState<string[]>(FALLBACK_QUOTES);

  useEffect(() => {
    fetch("/mingyan.md")
      .then((res) => res.text())
      .then((text) => {
        const lines = text
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0);
        if (lines.length > 0) {
          setAllQuotes(lines);
          setQuote(lines[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const handleClick = useCallback(() => {
    const idx = Math.floor(Math.random() * allQuotes.length);
    setQuote(allQuotes[idx]);
  }, [allQuotes]);

  if (!loaded) {
    return (
      <MagicCard>
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
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            lineHeight: "1.7",
          }}
        >
          加载中...
        </div>
      </MagicCard>
    );
  }

  return (
    <MagicCard>
      <div
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={handleClick}
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
