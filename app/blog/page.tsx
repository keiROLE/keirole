import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Suspense } from "react";
import PageTransition from "@/components/PageTransition";
import BlogFilter from "@/components/home/BlogFilter";
import BlogPostList from "@/components/home/BlogPostList";

const postsDir = path.join(process.cwd(), "data/blogs/posts");

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
}

function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const md = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data } = matter(md);
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        category: data.category || data.tag || "其他",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <PageTransition>
      <h1 style={{ color: "var(--accent)", fontSize: "24px", fontWeight: "bold" }}>
        近期文章
      </h1>

      {/* Category filter — needs Suspense for useSearchParams */}
      {categories.length > 1 && (
        <Suspense fallback={<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }} />}>
          <BlogFilter categories={categories} allPosts={posts} />
        </Suspense>
      )}

      {/* Post list — needs Suspense for useSearchParams */}
      <Suspense fallback={<div style={{ color: "var(--text-secondary)" }}>加载中...</div>}>
        <BlogPostList posts={posts} />
      </Suspense>

      {posts.length === 0 && (
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          暂无文章。
        </p>
      )}
    </PageTransition>
  );
}
