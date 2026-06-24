"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  category?: string;
}

let cached: BlogMeta[] | null = null;

export default function LatestBlogCard() {
  const [blogs, setBlogs] = useState<BlogMeta[]>([]);

  useEffect(() => {
    if (cached !== null) {
      setBlogs(cached.slice(0, 3));
      return;
    }

    fetch("/data/blogs/index.json?t=" + Date.now())
      .then((res) => res.json())
      .then((list: BlogMeta[]) => {
        cached = list;
        setBlogs(list.slice(0, 3));
      })
      .catch(() => {
        setBlogs([]);
      });
  }, []);

  if (blogs.length === 0) {
    return (
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div style={{ fontSize: "16px", fontWeight: "bold", color: "var(--accent)", marginBottom: "12px" }}>
          最新文章
        </div>
        <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          暂无文章，敬请期待...
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div style={{ fontSize: "16px", fontWeight: "bold", color: "var(--accent)", marginBottom: "12px" }}>
        最新文章
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 8px",
              borderRadius: "8px",
              color: "var(--text-primary)",
              textDecoration: "none",
              fontSize: "14px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-dim)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>
              {blog.title}
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", flexShrink: 0 }}>
              {blog.date}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
