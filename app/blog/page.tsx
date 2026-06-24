import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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
        category: data.category || "其他",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h1 style={{ color: "var(--accent)", fontSize: "24px", fontWeight: "bold" }}>
        近期文章
      </h1>

      {/* Category filter */}
      {categories.length > 1 && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link
            href="/blog"
            style={{
              fontSize: "12px",
              padding: "4px 12px",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              background: "transparent",
            }}
          >
            全部
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?cat=${encodeURIComponent(cat)}`}
              style={{
                fontSize: "12px",
                padding: "4px 12px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                background: "transparent",
              }}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}

      {/* Post list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {posts.map((post) => (
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

      {posts.length === 0 && (
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          暂无文章。
        </p>
      )}
    </div>
  );
}
