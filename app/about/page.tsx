import PageTransition from "@/components/PageTransition";
import MagicCard from "@/components/ui/MagicCard";

export default function AboutPage() {
  return (
    <PageTransition>
      <h1 style={{ color: "var(--accent)", fontSize: "22px", fontWeight: "bold", marginBottom: "12px" }}>
        关于网站
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <MagicCard>
          <div style={{ fontSize: "15px", fontWeight: "bold", color: "var(--accent)", marginBottom: "10px" }}>
            这个站点
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.8", margin: 0 }}>
            这是 keiROLE 的个人站点，用 Next.js 16 构建。
            首页以卡片式布局展示日常信息和社交链接，
            其他页面分别展示项目作品、关于信息和推荐分享。
            数据全部使用 Markdown 文件管理，Git 即 CMS。
          </p>
        </MagicCard>

        <MagicCard>
          <div style={{ fontSize: "15px", fontWeight: "bold", color: "var(--accent)", marginBottom: "10px" }}>
            技术栈
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              "Next.js 16",
              "TypeScript",
              "Tailwind CSS v4",
              "framer-motion",
              "lucide-react",
              "gray-matter",
              "remark",
              "Cloudflare Pages",
            ].map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "12px",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </MagicCard>

        <MagicCard>
          <div style={{ fontSize: "15px", fontWeight: "bold", color: "var(--accent)", marginBottom: "10px" }}>
            设计思路
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.8", margin: 0 }}>
            采用暗色主题 + 青色强调色的配色方案，
            所有页面统一使用圆角毛玻璃卡片组件，
            侧边栏固定导航保持简洁的一站式体验。
            首页信息密度适中，兼顾实用性和美观性。
            字体选用 Comic Sans MS，追求一种随性但不失专业的感觉。
          </p>
        </MagicCard>
      </div>
    </PageTransition>
  );
}
