import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PageTransition from "@/components/PageTransition";
import MagicCard from "@/components/ui/MagicCard";
import ShareCard from "@/components/home/ShareCard";

const sharesDir = path.join(process.cwd(), "data/shares");

interface Share {
  title: string;
  date: string;
  tag: string;
  link: string;
  description?: string;
  _slug: string;
}

function getAllShares(): Share[] {
  if (!fs.existsSync(sharesDir)) return [];

  const files = fs.readdirSync(sharesDir).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(sharesDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      title: data.title || file.replace(/\.md$/, ""),
      date: data.date || "",
      tag: data.tag || "推荐",
      link: data.link || "",
      description: data.description || "",
      _slug: file.replace(/\.md$/, ""),
    } as Share;
  }).sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function SharePage() {
  const shares = getAllShares();

  return (
    <PageTransition>
      {/* Header card */}
      <MagicCard>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent)", marginBottom: "4px" }}>
          推荐分享
        </div>
      </MagicCard>

      {/* Share cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
        {shares.map((share) => (
          <ShareCard
            key={share._slug}
            title={share.title}
            date={share.date}
            tag={share.tag}
            slug={share._slug}
            externalLink={share.link}
          />
        ))}
      </div>
    </PageTransition>
  );
}
