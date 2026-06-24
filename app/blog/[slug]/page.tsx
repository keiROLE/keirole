import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

const postsDir = path.join(process.cwd(), "data/blogs/posts");

interface Params {
  slug: string;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const htmlContent = await renderMarkdown(content);

  return (
    <div style={{ maxWidth: "720px" }}>
      <Link
        href="/blog"
        style={{ fontSize: "13px", color: "var(--accent)", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}
      >
        ← 返回文章列表
      </Link>

      <article>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
          {data.title || slug}
        </h1>
        <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "24px" }}>
          {data.date} · {data.category}
        </div>

        <div
          className="card"
          style={{ padding: "24px", lineHeight: "1.8" }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
