import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import ClientBlogMeta from "@/components/ClientBlogMeta";
import MagicCard from "@/components/ui/MagicCard";

const postsDir = path.join(process.cwd(), "data/blogs/posts");

export async function generateStaticParams() {
  const files = fs.readdirSync(postsDir);
  return files
    .filter(f => f.endsWith(".md"))
    .map(f => ({ slug: f.replace(/\.md$/, "") }));
}

interface TOCItem {
  text: string;
  level: number;
  slug: string;
}

function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const items: TOCItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/\[.*?\]\(.*?\)/g, "").trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w一-鿿]+/g, "-")
      .replace(/(^-|-$)/g, "");
    items.push({ text, level, slug });
  }
  return items;
}

function extractSummary(content: string, frontmatterSummary?: string): string {
  if (frontmatterSummary) return frontmatterSummary;
  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim());
  for (const p of paragraphs) {
    const cleaned = p.replace(/^#+\s*/, "").trim();
    if (cleaned.length > 10) {
      return cleaned.length > 150 ? cleaned.slice(0, 150) + "…" : cleaned;
    }
  }
  return "";
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
  const summary = extractSummary(content, data.summary);
  const toc = extractTOC(content);

  return (
    <div style={{ maxWidth: "720px" }}>
      <PageTransition>
        <Link
          href="/blog"
          style={{ fontSize: "13px", color: "var(--accent)", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}
        >
          ← 返回文章列表
        </Link>

        <MagicCard>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
            {data.date} · {data.category}
          </div>
          <div
            className="markdown-body"
            style={{ lineHeight: "1.8" }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </MagicCard>
      </PageTransition>

      <ClientBlogMeta summary={summary} toc={toc} />
    </div>
  );
}

export { extractSummary, extractTOC };
