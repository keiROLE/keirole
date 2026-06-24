"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Grid3X3, Home, Smile, Star, Timer } from "lucide-react";

const navItems = [
  { label: "首页", href: "/", icon: Home },
  { label: "近期文章", href: "/blog", icon: BookOpen },
  { label: "我的项目", href: "/projects", icon: Grid3X3 },
  { label: "推荐分享", href: "/share", icon: Star },
  { label: "关于网站", href: "/about", icon: Smile },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen flex flex-col py-8 pl-2 z-50">
      <div
        className="w-[260px] rounded-2xl px-4 py-6 flex flex-col gap-1"
        style={{
          background: "var(--bg-sidebar)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Site name */}
        <div
          className="text-xl font-bold mb-4 px-2"
          style={{ color: "var(--accent)" }}
        >
          keiROLE
        </div>

        {/* Nav items */}
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
    </aside>
  );
}
