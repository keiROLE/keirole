---
title: "OrionTalk"
date: "2026-06-20"
tag: "项目"
link: "https://oriontalk.pages.dev"
status: "active"
tech: "HTML, CSS, JavaScript"
desc: "单文件 HTML AI 聊天应用，无构建工具，无后端，发给任何人有浏览器就能用。"
---

OrionTalk 是一个**单文件 HTML** 私人 AI 聊天网页，使用 DeepSeek API（`deepseek-v4-pro` / `deepseek-v4-flash`）。所有代码（HTML + CSS + JS）在一个 `.html` 文件中，无构建工具，无外部依赖。发给任何人，有浏览器就能用。

## 功能

### 对话系统
- **单聊**：绑定一个 AI 角色，支持自动回复（Bot Agent 定时调 API 思考并发言，橙色气泡显示）
- **群聊**：可选多个 AI 角色参与，支持自由讨论（AI 轮流发言）和自动回复，两个功能可独立或同时开启
- 对话列表支持删除和改名，卡片高度严格一致

### Agent 管理
- 两种 Agent 类型：`AI Agent`（参与对话）和 `Bot Agent`（自动回复）
- Bot Agent 有且只有一个，自动创建，橙色左边框和浅色背景区分
- Agent 列表 Bot Agent 置顶显示

### 消息与交互
- 用户消息蓝色气泡靠右，AI 消息灰色气泡靠左，Bot Agent 橙色气泡靠右
- SSE 流式输出，打字动画，支持中途停止
- 每条消息显示角色名称和时间

### 数据管理
- 无持久化，每次打开网页全新状态
- 支持完整备份导出/导入（JSON 文件），保留 ID 关联
