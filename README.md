# keiROLE

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-Cloudflare_Pages-78c0f7?style=flat-square)

keiROLE 的个人站点，基于 **Next.js 16** 构建，暗色主题 + 青色强调色。

## ✨ 功能

| 页面 | 说明 |
|------|------|
| **首页** | 卡片式仪表盘：问候语、时钟、倒计时、日历、最新文章、名言 |
| **博客** | Markdown 驱动的文章列表与详情页，支持 GFM 表格、代码高亮、Wiki-links |
| **项目** | 作品集展示，Markdown 管理项目详情 |
| **推荐分享** | 收藏的工具网站推荐，卡片直接展示简介 |
| **关于** | 站点介绍与技术栈说明 |
| **计时器** | 内置番茄钟/秒表工具（弹窗） |

## 🎨 设计特色

- **暗色主题** — `#0a0a0a` 底色 + `#00BCD4` 青色强调
- **毛玻璃卡片** — 统一的 `MagicCard` 组件，半透明边框发光效果
- **极光背景** — 基于 OGL (WebGL) 的动态极光动画
- **三栏布局** — 左侧固定导航侧栏 + 中间主内容 + 右侧常驻音乐播放器
- **动画系统** — GSAP + framer-motion 实现页面过渡与交互动效
- **随性字体** — Comic Sans MS，追求轻松但不失专业感

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 + 自定义 CSS Variables |
| 动画 | GSAP, framer-motion, ogl (WebGL) |
| Markdown | gray-matter, remark, remark-gfm, remark-html, shiki |
| 图标 | lucide-react |
| 数学公式 | KaTeX |
| 图表 | Mermaid |
| 部署 | Cloudflare Pages |

## 📁 项目结构

```
keirole/
├── app/                      # Next.js App Router 路由
│   ├── layout.tsx            # 根布局（侧栏、音乐播放器、极光背景）
│   ├── page.tsx              # 首页仪表盘
│   ├── blog/[slug]/          # 博客文章详情
│   ├── projects/[slug]/      # 项目详情
│   ├── about/                # 关于页面
│   └── tools/stopwatch/      # 计时器工具
├── components/               # React 组件
│   ├── Sidebar.tsx           # 左侧导航栏
│   ├── Footer.tsx            # 页脚
│   ├── PageTransition.tsx    # 页面过渡动画
│   ├── AuroraBackground.tsx  # WebGL 极光背景
│   ├── ui/MagicCard.tsx      # 通用毛玻璃卡片
│   └── home/                 # 首页卡片组件
│       ├── GreetingCard.tsx
│       ├── ClockCard.tsx
│       ├── CalendarCard.tsx
│       ├── HolidayCard.tsx
│       ├── LatestBlogCard.tsx
│       ├── MingYanCard.tsx
│       ├── MiniMusicCard.tsx
│       └── StopwatchDialog.tsx
├── lib/                      # 工具函数
│   ├── markdown.ts           # Markdown 渲染管线
│   └── search.ts             # 搜索逻辑
├── data/                     # Markdown 内容源
│   ├── blogs/                # 博客文章
│   ├── projects/             # 项目数据
│   └── shares/               # 推荐分享
└── public/                   # 静态资源
```

## 🚀 安装与运行

### 环境要求

- Node.js 18+
- npm / pnpm / bun

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

打开 http://localhost:3000 查看。

### 构建与部署

```bash
npm run build    # 生产构建
npm run start    # 启动生产服务器
```

### 添加新内容

所有内容通过 Markdown 文件管理，Git 即 CMS：

- **新博客** → 在 `data/blogs/` 下新建 `.md` 文件
- **新项目** → 在 `data/projects/` 下新建 `.md` 文件
- **新分享** → 在 `data/shares/` 下新建 `.md` 文件

Markdown frontmatter 中定义 `title`、`date`、`tags` 等字段，页面会自动生成。

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

<!-- ==================== English ==================== -->

# keiROLE

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-Cloudflare_Pages-78c0f7?style=flat-square)

keiROLE's personal website, built with **Next.js 16**, dark theme + cyan accent.

## ✨ Features

| Page | Description |
|------|-------------|
| **Home** | Card-based dashboard: greeting, clock, countdown, calendar, latest blog posts, daily quotes |
| **Blog** | Markdown-powered article list and detail pages, supporting GFM tables, syntax highlighting, wiki-links |
| **Projects** | Portfolio showcase, project details managed via Markdown |
| **Shares** | Curated tool websites, cards display descriptions without navigation |
| **About** | Site introduction and technology stack overview |
| **Timer** | Built-in Pomodoro timer / stopwatch (dialog) |

## 🎨 Design Highlights

- **Dark Theme** — `#0a0a0a` base + `#00BCD4` cyan accent
- **Frosted Glass Cards** — Unified `MagicCard` component with translucent borders and glow effects
- **Aurora Background** — Dynamic WebGL aurora animation powered by OGL
- **Three-Column Layout** — Fixed left sidebar + main content area + right-side music player widget
- **Animation System** — Page transitions and interactions powered by GSAP + framer-motion
- **Casual Typography** — Comic Sans MS, aiming for relaxed yet professional feel

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS Variables |
| Animation | GSAP, framer-motion, ogl (WebGL) |
| Markdown | gray-matter, remark, remark-gfm, remark-html, shiki |
| Icons | lucide-react |
| Math | KaTeX |
| Charts | Mermaid |
| Deployment | Cloudflare Pages |

## 📁 Project Structure

```
keirole/
├── app/                      # Next.js App Router routes
│   ├── layout.tsx            # Root layout (sidebar, music player, aurora bg)
│   ├── page.tsx              # Home dashboard
│   ├── blog/[slug]/          # Blog post detail
│   ├── projects/[slug]/      # Project detail
│   ├── about/                # About page
│   └── tools/stopwatch/      # Timer tool
├── components/               # React components
│   ├── Sidebar.tsx           # Left navigation sidebar
│   ├── Footer.tsx            # Page footer
│   ├── PageTransition.tsx    # Page transition animations
│   ├── AuroraBackground.tsx  # WebGL aurora background
│   ├── ui/MagicCard.tsx      # Frosted glass card component
│   └── home/                 # Home page card components
│       ├── GreetingCard.tsx
│       ├── ClockCard.tsx
│       ├── CalendarCard.tsx
│       ├── HolidayCard.tsx
│       ├── LatestBlogCard.tsx
│       ├── MingYanCard.tsx
│       ├── MiniMusicCard.tsx
│       └── StopwatchDialog.tsx
├── lib/                      # Utility functions
│   ├── markdown.ts           # Markdown rendering pipeline
│   └── search.ts             # Search logic
├── data/                     # Markdown content source
│   ├── blogs/                # Blog articles
│   ├── projects/             # Project data
│   └── shares/               # Shared recommendations
└── public/                   # Static assets
```

## 🚀 Installation & Running

### Requirements

- Node.js 18+
- npm / pnpm / bun

### Install Dependencies

```bash
npm install
```

### Local Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Build & Deploy

```bash
npm run build    # Production build
npm run start    # Start production server
```

### Adding Content

All content is managed via Markdown files — Git is the CMS.

- **New blog** → Create a `.md` file under `data/blogs/`
- **New project** → Create a `.md` file under `data/projects/`
- **New share** → Create a `.md` file under `data/shares/`

Define `title`, `date`, `tags` etc. in Markdown frontmatter, and pages are generated automatically.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
