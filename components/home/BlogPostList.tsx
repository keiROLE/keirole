"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MagicCard from "@/components/ui/MagicCard";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary?: string;
}

export default function BlogPostList({ posts }: { posts: BlogPost[] }) {
  const searchParams = useSearchParams();
  const activeCat = searchParams.get("cat") || "";
  const filtered = activeCat ? posts.filter((p) => p.category === activeCat) : posts;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
      {filtered.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          style={{
            display: "contents",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <MagicCard style={{ padding: "14px" }}>
            {/* Category badge */}
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
              {post.category}
            </span>

            {/* Title */}
            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                lineHeight: "1.4",
                marginTop: "4px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {post.title}
            </div>

            {/* Date */}
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
              {post.date}
            </div>

            {/* Read more */}
            <div style={{ fontSize: "11px", color: "var(--accent)", marginTop: "auto", paddingTop: "8px" }}>
              阅读 →
            </div>
          </MagicCard>
        </Link>
      ))}
    </div>
  );
}
