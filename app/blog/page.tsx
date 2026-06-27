import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Suspense } from "react";
import PageTransition from "@/components/PageTransition";
import MagicCard from "@/components/ui/MagicCard";
import BlogFilter from "@/components/home/BlogFilter";
import BlogPostList from "@/components/home/BlogPostList";

const postsDir = path.join(process.cwd(), "data/blogs/posts");

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary?: string;
  bodyText: string;
}

function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        category: data.category || data.tag || "其他",
        summary: data.summary || "",
        bodyText: content,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <PageTransition>
      <MagicCard>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent)", marginBottom: "12px" }}>
          近期文章
        </div>
        {categories.length > 1 && (
          <Suspense fallback={null}>
            <BlogFilter categories={categories} allPosts={posts} />
          </Suspense>
        )}
      </MagicCard>

      <Suspense fallback={<div style={{ color: "var(--text-secondary)" }}>加载中...</div>}>
        <BlogPostList posts={posts} />
      </Suspense>

      {posts.length === 0 && (
        <MagicCard>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
            暂无文章。
          </p>
        </MagicCard>
      )}
    </PageTransition>
  );
}
