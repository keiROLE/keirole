"use client";

import { useState } from "react";
import { matches, extractPlainText } from "@/lib/search";
import SearchInput from "./SearchInput";
import MagicCard from "@/components/ui/MagicCard";
import ShareCard from "./ShareCard";
import Link from "next/link";

interface Share {
  title: string;
  date: string;
  tag: string;
  link: string;
  description?: string;
  bodyText: string;
  _slug: string;
}

export default function SharesList({ shares }: { shares: Share[] }) {
  const [search, setSearch] = useState("");

  const filtered = shares.filter((s) => {
    const q = search;
    if (!q) return true;
    return (
      matches(s.title, q) ||
      matches(s.tag, q) ||
      matches(s.description || "", q) ||
      matches(extractPlainText(s.bodyText), q)
    );
  });

  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        <SearchInput
          placeholder="搜索推荐标题、标签、描述..."
          value={search}
          onChange={setSearch}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
        {filtered.map((s) => (
          <Link key={s._slug} href={`/share/${s._slug}`} style={{ display: "contents", textDecoration: "none", color: "inherit" }}>
            <ShareCard
              title={s.title}
              date={s.date}
              tag={s.tag}
              slug={s._slug}
              description={s.description}
              externalLink={s.link}
            />
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <MagicCard style={{ padding: "20px", textAlign: "center" }}>
          <p style={{ color: "#aaa", fontSize: "13px", margin: 0 }}>
            没有找到匹配的推荐。
          </p>
        </MagicCard>
      )}
    </div>
  );
}
