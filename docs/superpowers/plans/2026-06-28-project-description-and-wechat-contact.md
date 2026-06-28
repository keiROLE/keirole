# Project Description & WeChat Contact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add description to project cards, supplement OrionTalk frontmatter description, add WeChat contact to sidebar with horizontal 4-item layout, and render desc on project detail page.

**Architecture:** Minimal changes to existing components. ProjectCard gets a `description` prop (mirrors ShareCard). Sidebar contacts array gains one entry. OrionTalk markdown frontmatter gains a `description` field. Project detail page renders `data.desc` between the date/buttons row and the markdown body.

**Tech Stack:** Next.js 16 (static export), React, TypeScript, lucide-react, gray-matter

## Global Constraints

- All new UI text in Chinese
- Existing patterns must be followed: inline styles, MagicCard wrapper, no new dependencies
- lucide-react icon imports must use valid icon names (project 沉淀 notes `Github` was removed in 1.x, use `GitFork`)
- External links in cards use `<button>` + `window.open` (never `<a>` inside `<Link>`)
- Copy feedback: clipboard.writeText + 2s setTimeout to clear checkmark

---

### Task 1: Add description field to OrionTalk frontmatter

**Files:**
- Modify: `data/projects/oriontalk.md`

**Interfaces:**
- Consumes: existing frontmatter structure
- Produces: `description` field readable by `data.description` via gray-matter

- [ ] **Step 1: Add description to oriontalk.md frontmatter**

Add `description` field to frontmatter:

```yaml
---
title: "OrionTalk"
date: "2026-06-20"
tag: "项目"
link: "https://oriontalk.pages.dev"
status: "active"
tech: "HTML, CSS, JavaScript"
description: "单文件 HTML AI 聊天应用，支持群聊、自由讨论、Bot Agent 自动回复。无构建工具，无后端，发给任何人有浏览器就能用。"
---
```

The body stays as-is: "单文件 HTML AI 聊天应用，支持群聊、自由讨论、Bot Agent 自动回复。"

- [ ] **Step 2: Commit**

```bash
git add data/projects/oriontalk.md
git commit -m "feat: add description to OrionTalk frontmatter"
```

---

### Task 2: Add description display to ProjectCard

**Files:**
- Modify: `components/home/ProjectCard.tsx`
- Modify: `components/home/ProjectsList.tsx`

**Interfaces:**
- Consumes: `description` prop from ProjectsList
- Produces: ProjectCard displays description text (11px, max 3 lines with line-clamp)

- [ ] **Step 1: Add description prop and rendering to ProjectCard.tsx**

Add `description?: string` to the interface and render it below the title, styled identically to ShareCard's description:

```tsx
// In interface ProjectCardProps, add:
description?: string;

// After the title div, before the date div, add:
{description && (
  <div
    style={{
      fontSize: "11px",
      color: "var(--text-secondary)",
      lineHeight: "1.5",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 3,
      overflow: "hidden",
    }}
  >
    {description}
  </div>
)}
```

- [ ] **Step 2: Pass description from ProjectsList.tsx**

`ProjectsList.tsx` already maps `data.description` into the `Project` type (line 34: `description: data.description || data.desc || ""`). Verify the list passes it through. Check `ProjectsList.tsx` to ensure `description` is forwarded to `ProjectCard`:

```tsx
// In the map callback, ensure description is passed:
<ProjectCard
  title={project.title}
  date={project.date}
  tag={project.tag}
  slug={project._slug}
  externalLink={project.link}
  description={project.description}  // add this line if missing
/>
```

- [ ] **Step 3: Commit**

```bash
git add components/home/ProjectCard.tsx components/home/ProjectsList.tsx
git commit -m "feat: add description display to project cards"
```

---

### Task 3: Render description on project detail page

**Files:**
- Modify: `app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: `data.desc` from gray-matter
- Produces: desc rendered between date row and markdown body, styled as ShareCard detail page does

- [ ] **Step 1: Add desc rendering to project detail page**

After the date div and before the markdown body div, add:

```tsx
{/* Brief intro from frontmatter */}
{data.desc && (
  <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px" }}>
    {data.desc}
  </div>
)}
```

This mirrors the Share detail page's desc rendering (line 68-72 of share/[slug]/page.tsx).

- [ ] **Step 2: Commit**

```bash
git add app/projects/[slug]/page.tsx
git commit -m "feat: render frontmatter desc on project detail page"
```

---

### Task 4: Add WeChat contact to sidebar

**Files:**
- Modify: `components/Sidebar.tsx`

**Interfaces:**
- Consumes: existing contacts array pattern
- Produces: 4 contacts in a single horizontal row (GitHub, 抖音, Email, 微信), WeChat copies "takaomi_" to clipboard

- [ ] **Step 1: Add WeChat to contacts array and import icon**

Add `Wechat` to the lucide-react import and add a WeChat entry to the contacts array:

```tsx
// Update import line:
import { BookOpen, Grid3X3, Home, Share2, Info, GitFork, Music2, Mail, Wechat } from "lucide-react";

// Add to contacts array:
{ label: "微信", href: "takaomi_", icon: Wechat, action: "copy" as const },
```

- [ ] **Step 2: Update handleClick to support WeChat copy**

The existing `handleClick` function handles `action === "copy"` by copying a hardcoded email. Update it to support WeChat's value:

```tsx
const handleClick = (item: (typeof contacts)[0]) => {
  if (item.action === "copy") {
    const text = item.label === "微信" ? "takaomi_" : "q_rolehhh@outlook.com";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  } else {
    window.open(item.href, "_blank");
  }
};
```

- [ ] **Step 3: Update copied feedback display**

The current feedback shows "Email ✓". Update it to show the label with checkmark for any copy action:

```tsx
<span style={{ whiteSpace: "nowrap" }}>
  {item.label === "Email" && copied ? "Email ✓" : item.label}
</span>
```

Actually, simpler: just show the label normally, and append " ✓" when `copied` is true:

```tsx
<span style={{ whiteSpace: "nowrap" }}>
  {item.label}{copied && item.label === "Email" ? " ✓" : ""}
</span>
```

Wait — the simplest approach: show `✓` after whichever label was just copied. But since there's only one `copied` state, just show it after the label that triggered the copy. For now, keep it simple: show "Email ✓" when email is copied (existing behavior), and show "微信 ✓" when WeChat is copied.

```tsx
// In the button render:
<span style={{ whiteSpace: "nowrap" }}>
  {item.label}{copied ? " ✓" : ""}
</span>
```

- [ ] **Step 4: Commit**

```bash
git add components/Sidebar.tsx
git commit -m "feat: add WeChat contact to sidebar with horizontal 4-item layout"
```

---

## Verification

After all tasks complete:
1. `npm run build` — static export should succeed
2. Check project cards on `/projects` — OrionTalk card shows description text
3. Click OrionTalk card → detail page shows description below date
4. Sidebar shows 4 contacts in one row: GitHub, 抖音, Email, 微信
5. Click Email → copies "q_rolehhh@outlook.com" → shows "Email ✓"
6. Click 微信 → copies "takaomi_" → shows "微信 ✓"
