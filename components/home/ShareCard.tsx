"use client";

import Link from "next/link";
import MagicCard from "@/components/ui/MagicCard";

interface ShareCardProps {
  title: string;
  date: string;
  tag: string;
  slug: string;
  description?: string;
  externalLink?: string;
}

export default function ShareCard({ title, date, tag, slug, description, externalLink }: ShareCardProps) {
  return (
    <Link href={`/share/${slug}`} style={{ display: "flex", flexDirection: "column", gap: "8px", minHeight: "120px", textDecoration: "none", color: "inherit" }}>
      <MagicCard>
        {/* Tag */}
        <span
          style={{
            fontSize: "10px",
            padding: "2px 8px",
            borderRadius: "10px",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            alignSelf: "flex-start",
            opacity: 0.8,
          }}
        >
          {tag}
        </span>

        {/* Title */}
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            lineHeight: "1.4",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              fontSize: "11px",
              color: "var(--text-secondary)",
              lineHeight: "1.5",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
            {description}
          </div>
        )}

        {/* Date */}
        <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
          {date}
        </div>

        {/* Bottom */}
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
            了解更多 →
          </div>
          {externalLink && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(externalLink, "_blank", "noopener,noreferrer");
              }}
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "8px",
                border: "1px solid var(--accent)",
                background: "transparent",
                color: "var(--accent)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              访问链接 ↗
            </button>
          )}
        </div>
      </MagicCard>
    </Link>
  );
}
