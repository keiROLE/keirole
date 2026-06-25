import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PageTransition from "@/components/PageTransition";
import MagicCard from "@/components/ui/MagicCard";
import ProjectCard from "@/components/home/ProjectCard";

const projectsDir = path.join(process.cwd(), "data/projects");

interface Project {
  title: string;
  date: string;
  tag: string;
  link: string;
  description?: string;
  _slug: string;
}

function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        title: data.title || file.replace(/\.md$/, ""),
        date: data.date || "",
        tag: data.tag || "项目",
        link: data.link || "",
        description: data.description || "",
        _slug: file.replace(/\.md$/, ""),
      } as Project;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageTransition>
      {/* Header card */}
      <MagicCard>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent)", marginBottom: "4px" }}>
          我的项目
        </div>
      </MagicCard>

      {/* Project cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
        {projects.map((project) => (
          <ProjectCard
            key={project._slug}
            title={project.title}
            date={project.date}
            tag={project.tag}
            slug={project._slug}
            externalLink={project.link}
          />
        ))}
      </div>
    </PageTransition>
  );
}
