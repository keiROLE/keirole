# 项目卡片描述 + 联系我微信 + 详情页 desc

- Date: 2026-06-28
- Status: Approved

## 改动范围

### 1. 项目卡片加精简介绍
- **ProjectCard.tsx**: 增加 `description` prop，展示在 title 下方，11px 字号最多 3 行截断
- **ProjectsList.tsx**: 读取 `data.description` 传给卡片（已有逻辑，只需确认传递）
- **projects/[slug]/page.tsx**: 详情页在 date+按钮 下方增加 `data.desc` 渲染

### 2. OrionTalk 补充 description
- **data/projects/oriontalk.md**: frontmatter 增加 `description` 字段

### 3. 联系我加微信 + 横排 4 个
- **Sidebar.tsx**: contacts 数组增加微信（takaomi_），4 个联系人横排均分
