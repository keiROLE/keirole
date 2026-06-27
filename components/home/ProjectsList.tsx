"use client";

import { useState } from "react";
import { matches, extractPlainText } from "@/lib/search";
import SearchInput from "./SearchInput";
import MagicCard from "@/components/ui/MagicCard";
import ProjectCard from "./ProjectCard";
import Link from "next/link";

interface Project {
  title: string;
  date: string;
  tag: string;
  link: string;
  description?: string;
  bodyText: string;
  _slug: string;
}

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");

  const filtered = projects.filter((proj) => {
    const q = search;
    if (!q) return true;
    return (
      matches(proj.title, q) ||
      matches(proj.tag, q) ||
      matches(proj.description || "", q) ||
      matches(extractPlainText(proj.bodyText), q)
    );
  });

  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        <SearchInput
          placeholder="搜索项目名称、标签、描述..."
          value={search}
          onChange={setSearch}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
        {filtered.map((proj) => (
          <Link key={proj._slug} href={`/projects/${proj._slug}`} style={{ display: "contents", textDecoration: "none", color: "inherit" }}>
            <ProjectCard
              title={proj.title}
              date={proj.date}
              tag={proj.tag}
              slug={proj._slug}
              externalLink={proj.link}
            />
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <MagicCard style={{ padding: "20px", textAlign: "center" }}>
          <p style={{ color: "#aaa", fontSize: "13px", margin: 0 }}>
            没有找到匹配的项目。
          </p>
        </MagicCard>
      )}
    </div>
  );
}
