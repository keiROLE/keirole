"use client";

import { useEffect } from "react";

interface TOCItem {
  text: string;
  level: number;
  slug: string;
}

export default function ClientBlogMeta({ summary, toc }: { summary: string; toc: TOCItem[] }) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("blogMetaUpdated", {
      detail: { summary, toc },
    }));
  }, [summary, toc]);
  return null;
}
