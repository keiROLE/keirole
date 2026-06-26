import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import MagicCard from "@/components/ui/MagicCard";

const sharesDir = path.join(process.cwd(), "data/shares");

export async function generateStaticParams() {
  const files = fs.readdirSync(sharesDir);
  return files
    .filter(f => f.endsWith(".md"))
    .map(f => ({ slug: f.replace(/\.md$/, "") }));
}

export default async function ShareDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(sharesDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const htmlContent = await renderMarkdown(content);

  return (
    <PageTransition>
      <Link
        href="/share"
        style={{ fontSize: "13px", color: "var(--accent)", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}
      >
        ← 返回推荐列表
      </Link>

      <MagicCard enableTilt={false} enableMagnetism={false}>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent)", marginBottom: "12px" }}>
          {data.title || slug}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{data.date || ""}</span>
          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: "13px",
                color: "var(--accent)",
                textDecoration: "none",
                padding: "3px 12px",
                borderRadius: "12px",
                border: "1px solid var(--accent)",
                whiteSpace: "nowrap",
              }}
            >
              访问链接 →
            </a>
          )}
        </div>

        <div
          className="markdown-body"
          style={{ lineHeight: "1.8" }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </MagicCard>
    </PageTransition>
  );
}
