"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Music2, Mail } from "lucide-react";

const contacts = [
  {
    label: "GitHub",
    href: "https://github.com/keirole",
    icon: Github,
    action: "open",
  },
  {
    label: "抖音",
    href: "https://www.douyin.com/user/keirole",
    icon: Music2,
    action: "open",
  },
  {
    label: "Email",
    href: "mailto:hello@keirole.com",
    icon: Mail,
    action: "copy",
  },
];

export default function ContactCard() {
  const [copied, setCopied] = useState(false);

  const handleClick = (item: (typeof contacts)[0]) => {
    if (item.action === "copy") {
      navigator.clipboard.writeText("hello@keirole.com").then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      window.open(item.href, "_blank");
    }
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div style={{ fontSize: "16px", fontWeight: "bold", color: "var(--accent)", marginBottom: "12px" }}>
        联系我
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
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
                gap: "6px",
                padding: "12px 8px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-primary)",
                cursor: "pointer",
                fontSize: "12px",
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
              <Icon size={20} style={{ color: "var(--accent)" }} />
              <span>
                {item.label}
                {item.label === "Email" && copied ? " ✓" : ""}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
