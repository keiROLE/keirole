"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { matches, extractPlainText } from "@/lib/search";
import SearchInput from "./SearchInput";
import MagicCard from "@/components/ui/MagicCard";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary?: string;
  bodyText: string;
}

export default function BlogPostList({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const activeCat = searchParams.get("cat") || "";

  const filtered = posts.filter((post) => {
    // Category filter
    if (activeCat && post.category !== activeCat) return false;
    // Search filter
    const q = search;
    if (!q) return true;
    return (
      matches(post.title, q) ||
      matches(post.category, q) ||
      matches(post.summary || "", q) ||
      matches(extractPlainText(post.bodyText), q)
    );
  });

  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        <SearchInput
          placeholder="搜索文章标题、分类、内容..."
          value={search}
          onChange={setSearch}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginTop: "12px" }}>
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

              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
                {post.date}
              </div>

              {post.summary && (
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                    marginTop: "6px",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                  }}
                >
                  {post.summary}
                </div>
              )}

              <div style={{ fontSize: "11px", color: "var(--accent)", marginTop: "auto", paddingTop: "8px" }}>
                阅读 →
              </div>
            </MagicCard>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <MagicCard style={{ padding: "20px", textAlign: "center" }}>
          <p style={{ color: "#aaa", fontSize: "13px", margin: 0 }}>
            没有找到匹配的文章。
          </p>
        </MagicCard>
      )}
    </div>
  );
}
