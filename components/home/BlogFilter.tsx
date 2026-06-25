"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MagicCard from "@/components/ui/MagicCard";

export default function BlogFilter({
  categories,
  allPosts,
}: {
  categories: string[];
  allPosts: { slug: string; title: string; date: string; category: string }[];
}) {
  const [activeCat, setActiveCat] = useState("");

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Link
        href="/blog"
        style={{
          fontSize: "12px",
          padding: "4px 14px",
          borderRadius: "14px",
          border: "1px solid var(--border)",
          color: activeCat === "" ? "var(--accent)" : "var(--text-secondary)",
          textDecoration: "none",
          background: activeCat === "" ? "var(--accent-dim)" : "transparent",
          transition: "all 0.2s",
        }}
      >
        全部
      </Link>
      {categories.map((cat) => {
        const isActive = activeCat === cat;
        return (
          <Link
            key={cat}
            href={`/blog?cat=${encodeURIComponent(cat)}`}
            style={{
              fontSize: "12px",
              padding: "4px 14px",
              borderRadius: "14px",
              border: "1px solid var(--border)",
              color: isActive ? "var(--accent)" : "var(--text-secondary)",
              textDecoration: "none",
              background: isActive ? "var(--accent-dim)" : "transparent",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}
