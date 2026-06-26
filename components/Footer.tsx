"use client";

import { useState } from "react";

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "24px 0 8px",
        fontSize: "12px",
        color: "var(--text-secondary)",
        borderTop: "1px solid var(--border)",
        marginTop: "40px",
      }}
    >
      <div>
        &copy; {year}{" "}
        <span style={{ color: "var(--accent)" }}>keiROLE</span>
      </div>
      <div style={{ marginTop: "4px" }}>
        Built with Next.js + Tailwind CSS + GSAP
      </div>
    </footer>
  );
}
