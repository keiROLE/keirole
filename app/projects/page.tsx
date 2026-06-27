import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PageTransition from "@/components/PageTransition";
import MagicCard from "@/components/ui/MagicCard";
import ProjectsList from "@/components/home/ProjectsList";

const projectsDir = path.join(process.cwd(), "data/projects");

interface Project {
  title: string;
  date: string;
  tag: string;
  link: string;
  description?: string;
  bodyText: string;
  _slug: string;
}

function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        title: data.title || file.replace(/\.md$/, ""),
        date: data.date || "",
        tag: data.tag || "项目",
        link: data.link || "",
        description: data.description || data.desc || "",
        bodyText: content,
        _slug: file.replace(/\.md$/, ""),
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageTransition>
      <MagicCard>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--accent)", marginBottom: "4px" }}>
          我的项目
        </div>
      </MagicCard>

      <ProjectsList projects={projects} />
    </PageTransition>
  );
}
