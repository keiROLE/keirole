"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BlogFilter({
  categories,
  allPosts,
}: {
  categories: string[];
  allPosts: { slug: string; title: string; date: string; category: string }[];
}) {
  const searchParams = useSearchParams();
  const [activeCat, setActiveCat] = useState("");

  // Read initial cat from URL on mount
  useEffect(() => {
    const cat = searchParams.get("cat") || "";
    setActiveCat(cat);
  }, [searchParams]);

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
      <Link
        href="/blog"
        style={{
          fontSize: "12px",
          padding: "4px 12px",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          color: activeCat === "" ? "var(--accent)" : "var(--text-secondary)",
          textDecoration: "none",
          background: activeCat === "" ? "var(--accent-dim)" : "transparent",
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
              padding: "4px 12px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              color: isActive ? "var(--accent)" : "var(--text-secondary)",
              textDecoration: "none",
              background: isActive ? "var(--accent-dim)" : "transparent",
            }}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}
