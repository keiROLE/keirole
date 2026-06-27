import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PageTransition from "@/components/PageTransition";
import MagicCard from "@/components/ui/MagicCard";
import SharesList from "@/components/home/SharesList";

const sharesDir = path.join(process.cwd(), "data/shares");

interface Share {
  title: string;
  date: string;
  tag: string;
  link: string;
  description?: string;
  bodyText: string;
  _slug: string;
}

/** Extract first paragraph from markdown content as fallback description */
function extractFirstParagraph(content: string): string {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (paragraphs.length === 0) return "";
  return paragraphs[0].replace(/^#+\s*/, "").slice(0, 200);
}

function getAllShares(): Share[] {
  if (!fs.existsSync(sharesDir)) return [];

  const files = fs.readdirSync(sharesDir).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(sharesDir, file), "utf-8");
    const { data, content } = matter(raw);
    const description = data.desc || extractFirstParagraph(content) || "";
    return {
      title: data.title || file.replace(/\.md$/, ""),
      date: data.date || "",
      tag: data.tag || "推荐",
      link: data.link || "",
      description,
      bodyText: content,
      _slug: file.replace(/\.md$/, ""),
    } as Share;
  }).sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function SharePage() {
  const shares = getAllShares();

  return (
    <PageTransition>
      <MagicCard>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent)", marginBottom: "4px" }}>
          推荐分享
        </div>
      </MagicCard>

      <SharesList shares={shares} />
    </PageTransition>
  );
}
