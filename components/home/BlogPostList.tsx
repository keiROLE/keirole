"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
}

export default function BlogPostList({ posts }: { posts: BlogPost[] }) {
  const searchParams = useSearchParams();
  const activeCat = searchParams.get("cat") || "";
  const filtered = activeCat ? posts.filter((p) => p.category === activeCat) : posts;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {filtered.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="card"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div>
            <div style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "4px" }}>
              {post.title}
            </div>
            <div style={{ display: "flex", gap: "8px", fontSize: "12px", color: "var(--text-secondary)" }}>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.category}</span>
            </div>
          </div>
          <span style={{ color: "var(--accent)", fontSize: "12px" }}>阅读 →</span>
        </Link>
      ))}
    </div>
  );
}
