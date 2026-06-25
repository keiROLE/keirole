"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import MagicCard from "@/components/ui/MagicCard";

interface TOCItem {
  text: string;
  level: number;
  slug: string;
}

interface BlogMeta {
  summary: string;
  toc: TOCItem[];
}

export default function BlogSidebarSlot() {
  const pathname = usePathname();
  const [meta, setMeta] = useState<BlogMeta | null>(null);

  const handleMetaUpdate = useCallback((e: Event) => {
    const customEvent = e as CustomEvent;
    setMeta(customEvent.detail || null);
  }, []);

  useEffect(() => {
    window.addEventListener("blogMetaUpdated", handleMetaUpdate);
    return () => {
      window.removeEventListener("blogMetaUpdated", handleMetaUpdate);
    };
  }, [handleMetaUpdate]);

  useEffect(() => {
    const isBlogDetail = pathname?.startsWith("/blog/") && pathname !== "/blog";
    if (!isBlogDetail) {
      setMeta(null);
    }
  }, [pathname]);

  if (!meta) return null;

  const { summary, toc } = meta;
  if (!summary && toc.length === 0) return null;

  return (
    <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Summary Card */}
      {summary && (
        <MagicCard>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "bold" }}>
            📋 摘要
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-primary)", lineHeight: "1.5" }}>
            {summary}
          </div>
        </MagicCard>
      )}

      {/* TOC Card — scrollable */}
      {toc.length > 0 && (
        <MagicCard>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "bold" }}>
            📑 目录
          </div>
          <nav
            style={{
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {toc.map((item) => (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.slug);
                  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
                }}
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "var(--accent)",
                  textDecoration: "none",
                  paddingLeft: `${(item.level - 1) * 10}px`,
                  lineHeight: "1.8",
                  opacity: item.level >= 4 ? 0.7 : 1,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </MagicCard>
      )}
    </div>
  );
}
