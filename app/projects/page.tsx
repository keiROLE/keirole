import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PageTransition from "@/components/PageTransition";

const projectsDir = path.join(process.cwd(), "data/projects");

interface Project {
  title: string;
  date: string;
  tag: string;
  desc: string;
  link: string;
  status: string;
  tech: string;
  _slug: string;
}

function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      ...data,
      _slug: file.replace(/\.md$/, ""),
      status: data.status || "active",
      tech: data.tech || "",
    } as Project;
  }).sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageTransition>
      <h1 style={{ color: "var(--accent)", fontSize: "24px", fontWeight: "bold" }}>
        我的项目
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {projects.map((project) => (
          <a
            key={project._slug}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>{project.title}</span>
              <span
                style={{
                  fontSize: "12px",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  background: "var(--accent-dim)",
                  color: "var(--accent)",
                }}
              >
                {project.status === "active" ? "进行中" : "已完成"}
              </span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
              {project.desc || ""}
            </p>
            {project.tech && (
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {project.tech.split(",").map((t) => (
                  <span
                    key={t.trim()}
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </PageTransition>
  );
}
