<p align="center">
  <img src="public/claudia-logo.png" alt="Claudia Logo" width="100" />
</p>

<h1 align="center">Claudia Website</h1>

<p align="center">
  <strong>Next-Gen Desktop Workspace for AI CLI & Coding Agents</strong><br>
  为 Claude Code、Codex、Gemini CLI 等终端 AI 开发者打造的原生工作台官方展台
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-6.1-646cff?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwindcss" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript" alt="TypeScript">
</p>

<p align="center">
  <a href="https://github.com/huangy7/Claudia">
    <img src="https://img.shields.io/badge/Main_App-Claudia_Desktop-0071e3?style=for-the-badge&labelColor=001a3d" alt="Main Repo">
  </a>
  &nbsp;
  <a href="https://claudia.huangy.top">
    <img src="https://img.shields.io/badge/Official_Website-claudia.huangy.top-a855f7?style=for-the-badge&labelColor=1d003d" alt="Official Website">
  </a>
</p>

---

## 项目简介

**Claudia Website** 是 [Claudia](https://github.com/huangy7/Claudia) 桌面端伴侣应用的官方展示主页。

网站采用极致轻量、现代化、暗黑极客质感的设计语言，配合 16:9 无黑边沉浸式实机演示巨幕与平滑动态 Slogan，全景呈现 Claudia 赋能 AI CLI 编程体验的核心能力。

---

## 核心亮点 (Key Features)

| 场景模块 | 核心能力与体验亮点 |
| :--- | :--- |
| **优雅阅读** | **全场景富文本会话阅读**：将终端 CLI 晦涩生硬的 JSONL 转为排版优雅的富文本，支持代码语法高亮、思维链折叠与一键跨端分享。 |
| **智能助手** | **深度上下文理解与总结**：提炼超长编码历史，支持一键生成专业周报、日报与任务复盘，随时无缝续写与互动。 |
| **用量分析** | **多模型消耗与成本洞察**：实时统计各项目与模型的 Token 消耗趋势，直观图表展示费用构成，精准诊断高耗能工程。 |
| **API 代理** | **全链路 API 轨迹反解与请求调试**：深度抓包还原每一次模型交互细节，精准反解 Messages、Tools 调用与 Token Usage 消耗透视。 |
| **配置管理** | **多模型 API 与环境统一调度**：轻松切换 Claude Code、Codex、Gemini、Antigravity 等 CLI 密钥、Base URL 与环境变量。 |
| **极简交互展台** | **沉浸式实机巨幕**：16:9 纯净无黑边视界、弹性胶囊选项卡、向上平滑轮播的「我帮你」Slogan 体系，带来极致观感。 |

---

## 技术栈 (Tech Stack)

- **核心框架**: React 18 + Vite 6 + TypeScript 5
- **原子样式**: Tailwind CSS (Dark Mode 深度定制，翡翠绿 / 宝蓝科技渐变)
- **动效体系**: Framer Motion (胶囊切换滑块、文字向上轮播淡入淡出、平滑过渡)
- **精选图标**: Lucide React
- **高质量资产**: 专属品牌终端光标 Logo、16:9 纯净 Web 演示视频

---

## 本地开发 (Quick Start)

```bash
# 1. 克隆仓库
git clone https://github.com/huangy7/claudia-website.git
cd claudia-website

# 2. 安装依赖
npm install

# 3. 启动本地开发服务 (支持 HMR)
npm run dev

# 4. 生产打包构建
npm run build

# 5. 本地预览构建产物
npm run preview
```

---

## 项目结构 (Project Structure)

```text
website/
├── public/                  # 静态资产（实机截图、演示视频、透明 Logo）
│   ├── claudia-logo.png     # Claudia 官方品牌图标
│   ├── screenshot-*.png     # 5 大核心场景原生高清实机截图
│   ├── video-read.mp4       # 优雅阅读实机演示视频
│   ├── video-assistant.mp4  # 智能助手实机演示视频
│   ├── video-analyze.mp4    # 用量分析实机演示视频
│   ├── video-api-proxy.mp4  # API 代理与调试实机演示视频
│   └── video-resume.mp4     # 配置管理实机演示视频
├── src/
│   ├── App.tsx              # 官网展台核心主页（Slogan 轮播、16:9 巨幕展台、特性卡片）
│   ├── main.tsx             # 应用挂载入口
│   └── index.css            # Tailwind 基础与全局样式定义
├── package.json
├── vite.config.ts
└── README.md
```

---

## 开源协议 (License)

本项目基于 [MIT](LICENSE) 协议开源。

<p align="center">
  Designed & Developed for <a href="https://github.com/huangy7/Claudia">Claudia</a> Ecosystem
</p>
