import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PageTransition from "@/components/PageTransition";

const sharesDir = path.join(process.cwd(), "data/shares");

interface Share {
  title: string;
  date: string;
  tag: string;
  link: string;
  desc: string;
  _slug: string;
}

const typeColors: Record<string, string> = {
  "工具": "rgba(76, 175, 80, 0.15)",
  "方法论": "rgba(255, 152, 0, 0.15)",
  "AI 工具": "rgba(156, 39, 176, 0.15)",
};
const typeBorders: Record<string, string> = {
  "工具": "rgba(76, 175, 80, 0.4)",
  "方法论": "rgba(255, 152, 0, 0.4)",
  "AI 工具": "rgba(156, 39, 176, 0.4)",
};

function getAllShares(): Share[] {
  if (!fs.existsSync(sharesDir)) return [];

  const files = fs.readdirSync(sharesDir).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(sharesDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      ...data,
      _slug: file.replace(/\.md$/, ""),
      desc: data.desc || "",
      link: data.link || "",
    } as Share;
  }).sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function SharePage() {
  const shares = getAllShares();

  return (
    <PageTransition>
      <h1 style={{ color: "var(--accent)", fontSize: "24px", fontWeight: "bold" }}>
        推荐分享
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {shares.map((share) => (
          <div key={share._slug} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>{share.title}</span>
              <span
                style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  background: typeColors[share.tag] || "var(--accent-dim)",
                  color: "var(--accent)",
                  border: `1px solid ${typeBorders[share.tag] || "var(--border)"}`,
                }}
              >
                {share.tag}
              </span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
              {share.desc}
            </p>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
