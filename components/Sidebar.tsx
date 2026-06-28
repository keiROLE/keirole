"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Grid3X3, Home, Share2, Info, GitFork, Music2, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import MagicCard from "@/components/ui/MagicCard";

const navItems = [
  { label: "首页", href: "/", icon: Home },
  { label: "近期文章", href: "/blog", icon: BookOpen },
  { label: "我的项目", href: "/projects", icon: Grid3X3 },
  { label: "推荐分享", href: "/share", icon: Share2 },
  { label: "关于网站", href: "/about", icon: Info },
];

const contacts = [
  { label: "GitHub", href: "https://github.com/keiROLE", icon: GitFork, action: "open" as const },
  { label: "抖音", href: "https://www.douyin.com/user/MS4wLjABAAAAoGfU2l74-9H6O1XAVSHDxO1eQMTd0ntRxag6wZfAwobwmXZ4tHn10d75aYDkE5OG", icon: Music2, action: "open" as const },
  { label: "Email", href: "mailto:q_rolehhh@outlook.com", icon: Mail, action: "copy" as const, copyText: "q_rolehhh@outlook.com" },
  { label: "微信", href: "#", icon: MessageCircle, action: "copy" as const, copyText: "takaomi_" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const handleClick = (item: (typeof contacts)[0]) => {
    if (item.action === "copy") {
      const text = item.copyText || item.href;
      navigator.clipboard.writeText(text).then(() => {
        setCopiedLabel(item.label);
        setTimeout(() => setCopiedLabel(null), 2000);
      });
    } else {
      window.open(item.href, "_blank");
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen flex flex-col py-8 pl-2 z-50">
      <div
        className="flex flex-col gap-4"
        style={{ width: "260px" }}
      >
        {/* Brand */}
        <div
          className="text-xl font-bold px-2"
          style={{ color: "var(--accent)", marginBottom: "4px" }}
        >
          keiROLE <span style={{ fontSize: "11px", opacity: 0.6, fontWeight: "normal" }}>v1.4</span>
        </div>

        {/* Navigation Card */}
        <MagicCard goldBorder={false}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--text-primary)",
                    background: isActive ? "var(--accent-dim)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </MagicCard>

        {/* Contact Card */}
        <MagicCard goldBorder={false}>
          <div style={{ fontSize: "10px", color: "var(--text-secondary)", fontWeight: "bold", marginBottom: "4px" }}>
            联系我
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            {contacts.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleClick(item)}
                  title={item.label}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2px",
                    padding: "6px 2px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    fontSize: "9px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "var(--accent-dim)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon size={14} style={{ color: "var(--accent)" }} />
                  <span style={{ whiteSpace: "nowrap" }}>
                    {item.label}{copiedLabel === item.label ? " ✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </MagicCard>
      </div>
    </aside>
  );
}
