import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import MagicCard from "@/components/ui/MagicCard";

const projectsDir = path.join(process.cwd(), "data/projects");

export async function generateStaticParams() {
  const files = fs.readdirSync(projectsDir);
  return files
    .filter(f => f.endsWith(".md"))
    .map(f => ({ slug: f.replace(/\.md$/, "") }));
}

interface Params {
  slug: string;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(projectsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const htmlContent = await renderMarkdown(content);

  return (
    <PageTransition>
      <Link
        href="/projects"
        style={{ fontSize: "13px", color: "var(--accent)", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}
      >
        ← 返回项目列表
      </Link>

      <MagicCard>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent)", marginBottom: "12px" }}>
          {data.title || slug}
        </div>
        <div style={{ marginBottom: "16px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{data.date || ""}</span>
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
