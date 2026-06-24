---
title: "个人站重建日志"
date: "2026-06-24"
category: "技术"
---

# 个人站重建日志

## 起因

上一版代码丢失，决定从脚手架重新开始。

## 重建计划

### Phase 0 — 脚手架
- create-next-app
- Tailwind CSS 配置
- 全局 CSS 变量

### Phase 1 — 首页
7 个卡片组件全部实现：
1. GreetingCard - 时间问候
2. ClockCard - 实时时钟（含十二时辰）
3. CalendarCard - 月历
4. HolidayCard - 假期倒计时
5. LatestBlogCard - 最新文章预览
6. ContactCard - 社交按钮
7. MiniMusicCard - 旋转唱片

### Phase 2 — 核心页面
- Projects 项目展示
- About 关于网站
- Share 推荐分享

### Phase 3 — 博客系统
- 文章列表
- Markdown 渲染
- 分类过滤

### Phase 4 — 工具页
- 秒表
- 日历

### Phase 5 — 收尾
- 数据填充
- 部署

## 踩坑记录

- lucide-react 1.x 图标名大改，`Github` 不存在了
- Next.js 16 的 `@/` 路径别名需要手动配置
- static `onMouseEnter` 事件处理器导致 prerender 报错

## 总结

重建过程比想象中顺利，大部分经验可以直接复用。
