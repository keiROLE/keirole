---
title: "Agnes 生图生视频工作流"
date: "2026-06-22"
tag: "AI 工具"
link: ""
---

## 概述

基于 Agnes AI 模型（`agnes-image-2.0-flash` / `agnes-video-v2.0`）的图像和视频生成工作流，集成在 Claude Code 中作为 Skill 使用。

## 前置依赖

1. **API Key**：设置环境变量 `AGNES_API_KEY`（不存储在 skill 文件中）
2. **Python 3**：运行 bundled script
3. **Skill 路径**：`~/.claude/skills/agnes-image-generator/`
   - `scripts/agnes_image.py` — 生图/修图脚本
   - `scripts/agnes_video.py` — 生视频脚本

## 工作流

### 第一步：生成静态图

```bash
python ~/.claude/skills/agnes-image-generator/scripts/agnes_image.py \
  --prompt "A clean product photo of a glass cube on a white studio background, soft shadows, high detail" \
  --output outputs/agnes-image.png
```

**Prompt 公式**：`[主体] + [场景] + [风格] + [光影] + [构图] + [画质要求]`

### 第二步：判断图片大小，决定视频方案

| 图片大小 | 方案 | 说明 |
|----------|------|------|
| < 800KB | 直接传本地路径 | 脚本自动转 base64 data URI |
| > 800KB | 先上传到公网图床 | 如 imgur.com/upload，再用 URL 传 |

**注意**：Agnes Video API 对 base64 图片有约 1MB 大小限制。

### 第三步：Image-to-Video 生成动画

```bash
python ~/.claude/skills/agnes-image-generator/scripts/agnes_video.py \
  --prompt "Animate the character with subtle breathing motion and cinematic camera movement" \
  --image "https://example.com/input.png" \
  --output outputs/video.mp4
```

## 关键经验

- **image-to-video 远优于纯文本生成**：纯文本 prompt 生成视频质量差且不可控，务必先生图再生视频
- **base64 大小限制**：超过 800KB 的图片需先传到公网 URL
- **异步生成**：视频生成是异步的，需先创建 task 再轮询 `video_id` 状态
- **帧数限制**：`num_frames` 必须 ≤ 441 且符合 `8n + 1`（如 81, 121, 161, 241, 441）

## API 端点

| 用途 | 端点 |
|------|------|
| 文生图 | `POST https://apihub.agnes-ai.com/v1/images/generations` |
| 图生视频 | `POST https://apihub.agnes-ai.com/v1/videos` |
| 视频状态 | `GET https://apihub.agnes-ai.com/agnesapi?video_id=...` |

## 常用参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--prompt` | 必填，文本描述 | - |
| `--output` | 输出路径 | - |
| `--model` | 模型名称 | `agnes-image-2.0-flash` |
| `--size` | 图片尺寸 | `1024x768` |
| `--image` | 输入图片 URL（可重复） | - |
| `--response-format` | `url` 或 `b64_json` | `url` |
| `--raw-output` | 保存原始 JSON 响应 | - |
