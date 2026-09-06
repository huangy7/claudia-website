import React, { useState, useRef, useEffect } from 'react'
import {
  BookOpen,
  Bot,
  BarChart3,
  Sliders,
  Zap,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Image as ImageIcon,
  Video as VideoIcon
} from 'lucide-react'

// 5 大核心演示场景
const HELPER_SCENARIOS = [
  {
    id: 'read',
    tab: '优雅阅读',
    icon: BookOpen,
    badge: 'READ & SEARCH',
    title: '全场景富文本会话阅读',
    subtitle: '像读精美文档一样，清晰复盘每一次 AI 决策与思考链路',
    screenshot: '/screenshot-read.png',
    video: '/video-read.mp4',
    duration: 46,
  },
  {
    id: 'assistant',
    tab: '智能助手',
    icon: Bot,
    badge: 'AI ASSISTANT',
    title: '对话式智能助手与周报生成',
    subtitle: '跨项目提炼上下文，秒级生成工作进展与深度洞察',
    screenshot: '/screenshot-assistant.png',
    video: '/video-assistant.mp4',
    duration: 30,
  },
  {
    id: 'analyze',
    tab: '用量分析',
    icon: BarChart3,
    badge: 'ANALYZE & AUDIT',
    title: 'Token 成本透视与预警大盘',
    subtitle: '告别黑盒账单，Prompt Caching 命中率与预算全面掌控',
    screenshot: '/screenshot-analyze.png',
    video: '/video-analyze.mp4',
    duration: 77,
  },
  {
    id: 'api-proxy',
    tab: 'API 代理',
    icon: Zap,
    badge: 'API & PROXY',
    title: '全链路 API 轨迹反解与请求调试',
    subtitle: '深度抓包还原模型交互细节，反解 Messages、Tools 调用与 Token 透视',
    screenshot: '/screenshot-api-proxy.png',
    video: '/video-api-proxy.mp4',
    duration: 32,
  },
  {
    id: 'resume',
    tab: '配置管理',
    icon: Sliders,
    badge: 'CONFIG & API',
    title: '多模型 API 与环境配置管理',
    subtitle: '多 CLI 凭证集中托管与模型灵活切换，随时随地无缝续对话',
    screenshot: '/screenshot-config.png',
    video: '/video-resume.mp4',
    duration: 85,
  }
]

// 支持的 CLI 生态：带官方矢量图形与微交互动效
const SUPPORTED_ECOSYSTEM = [
  {
    id: 'claude',
    name: 'Claude Code',
    accent: '#D97757',
    hoverClass: 'hover:border-[#D97757]/50 hover:bg-[#D97757]/[0.06] hover:shadow-[0_2px_12px_rgba(217,119,87,0.15)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
        <path
          d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
          fill="#D97757"
        />
      </svg>
    )
  },
  {
    id: 'codex',
    name: 'Codex',
    accent: '#7A9DFF',
    hoverClass: 'hover:border-[#7A9DFF]/50 hover:bg-[#7A9DFF]/[0.06] hover:shadow-[0_2px_12px_rgba(122,157,255,0.15)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#181824" />
        <path
          d="M9.064 3.344a4.578 4.578 0 012.285-.312c1 .115 1.891.54 2.673 1.275.01.01.024.017.037.021a.09.09 0 00.043 0 4.55 4.55 0 013.046.275l.047.022.116.057a4.581 4.581 0 012.188 2.399c.209.51.313 1.041.315 1.595a4.24 4.24 0 01-.134 1.223.123.123 0 00.03.115c.594.607.988 1.33 1.183 2.17.289 1.425-.007 2.71-.887 3.854l-.136.166a4.548 4.548 0 01-2.201 1.388.123.123 0 00-.081.076c-.191.551-.383 1.023-.74 1.494-.9 1.187-2.222 1.846-3.711 1.838-1.187-.006-2.239-.44-3.157-1.302a.107.107 0 00-.105-.024c-.388.125-.78.143-1.204.138a4.441 4.441 0 01-1.945-.466 4.544 4.544 0 01-1.61-1.335c-.152-.202-.303-.392-.414-.617a5.81 5.81 0 01-.37-.961 4.582 4.582 0 01-.014-2.298.124.124 0 00.006-.056.085.085 0 00-.027-.048 4.467 4.467 0 01-1.034-1.651 3.896 3.896 0 01-.251-1.192 5.189 5.189 0 01.141-1.6c.337-1.112.982-1.985 1.933-2.618.212-.141.413-.251.601-.33.215-.089.43-.164.646-.227a.098.098 0 00.065-.066 4.51 4.51 0 01.829-1.615 4.535 4.535 0 011.837-1.388zm3.482 10.565a.637.637 0 000 1.272h3.636a.637.637 0 100-1.272h-3.636zM8.462 9.23a.637.637 0 00-1.106.631l1.272 2.224-1.266 2.136a.636.636 0 101.095.649l1.454-2.455a.636.636 0 00.005-.64L8.462 9.23z"
          fill="url(#codex-grad)"
        />
        <defs>
          <linearGradient id="codex-grad" x1="12" x2="12" y1="3" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B1A7FF" />
            <stop offset="0.5" stopColor="#7A9DFF" />
            <stop offset="1" stopColor="#3941FF" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'gemini',
    name: 'Gemini',
    accent: '#3186FF',
    hoverClass: 'hover:border-[#3186FF]/50 hover:bg-[#3186FF]/[0.06] hover:shadow-[0_2px_12px_rgba(49,134,255,0.15)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="gemini-g1" x1="7" x2="11" y1="15.5" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#08B962" />
            <stop offset="1" stopColor="#08B962" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gemini-g2" x1="8" x2="11.5" y1="5.5" y2="11" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F94543" />
            <stop offset="1" stopColor="#F94543" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gemini-g3" x1="3.5" x2="17.5" y1="13.5" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FABC12" />
            <stop offset="0.46" stopColor="#FABC12" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
          fill="#3186FF"
        />
        <path
          d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
          fill="url(#gemini-g1)"
        />
        <path
          d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
          fill="url(#gemini-g2)"
        />
        <path
          d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
          fill="url(#gemini-g3)"
        />
      </svg>
    )
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    accent: '#00B95C',
    hoverClass: 'hover:border-[#00B95C]/50 hover:bg-[#00B95C]/[0.06] hover:shadow-[0_2px_12px_rgba(0,185,92,0.15)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="ag-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3186FF" />
            <stop offset="0.5" stopColor="#00B95C" />
            <stop offset="1" stopColor="#FC413D" />
          </linearGradient>
        </defs>
        <path
          d="M21.751 22.607c1.34 1.005 3.35.335 1.508-1.508C17.73 15.74 18.904 1 12.037 1 5.17 1 6.342 15.74.815 21.1c-2.01 2.009.167 2.511 1.507 1.506 5.192-3.517 4.857-9.714 9.715-9.714 4.857 0 4.522 6.197 9.714 9.715z"
          fill="url(#ag-grad)"
        />
      </svg>
    )
  },
  {
    id: 'workbuddy',
    name: 'WorkBuddy',
    accent: '#25CB89',
    hoverClass: 'hover:border-[#25CB89]/50 hover:bg-[#25CB89]/[0.06] hover:shadow-[0_2px_12px_rgba(37,203,137,0.15)]',
    icon: (
      <svg viewBox="0 0 1024 1024" className="w-4 h-4 shrink-0 rounded-[3px] overflow-hidden" aria-hidden="true">
        <path
          d="M121.38,825.88c-25.93-49.51-19.71-106.93-19.71-160.96c-.01-88.75-.13-177.5-.13-266.25c.01-52.93-7.82-120.61,7.38-170.56c13.24-43.5,45.06-81.84,84.58-104.14c18.05-10.19,37.82-16.8,58.29-19.94c38.46-5.89,81.24-2.35,120.24-2.37c74.22-.02,148.43-.08,222.64-.11c35.4-.02,70.81-.08,106.22-.04c73.51,.08,125.33,1.94,177.55,61.8c47.4,54.34,43.84,111.74,43.86,179.12c.01,38.18,.03,76.36,.02,114.54c-.01,69.74-.01,139.48,.06,209.22c.03,37.11,4.09,79.33-3.7,115.57c-5.82,27.07-18.49,52.57-35.98,73.98c-23.68,28.99-56.03,51.14-92.39,60.57c-42.24,10.95-91.99,5.99-135.52,5.99c-82.23,0-164.46,.07-246.69,.06c-51.25,0-130.82,7.55-178.1-7.11c-46.69-14.48-85.34-46.43-108.62-89.37Z"
          fill="#25CB89"
        />
        <path
          d="M205,906C84.12,846.09,101.72,736.53,101.65,623.6c-.05-83.44-.04-166.89-.11-250.33c-.04-38.38-4.88-83.35,1.4-120.7c4.57-27.13,15.42-53.27,31.55-75.54c23.92-33,58.65-58.47,98.19-69.01c50.38-13.44,136.05-6.36,190.44-6.38c78.87-.04,157.73-.01,236.59-.11c35.86-.05,78.13-4.77,112.93,1.62c29.49,5.42,56.97,17.41,80.52,36.03C932.1,201.63,922.32,276.33,922,366c-4.39,1.77-9.25,4.32-14,2c-5.59-2.73-11.54-9.07-17.01-12.67c-13.34-8.76-27.08-16.37-41.15-23.85c-3.87-2.06-7.65-3.28-10.53-6.8c-9.59-11.68-16.42-30.44-24.45-43.77c-18.22-30.25-77.58-114.46-105.42-130.79c-6.8-3.99-19.32-5.36-26.3-1.76c-33.48,17.22-70.27,114.31-84.01,150.04c-3.32,8.63-7.38,27.24-12.48,33.73c-4.39,5.59-19.64,7.91-26.58,9.97c-56.99,16.94-113.16,48.56-160.78,83.78c-8.94,6.62-56.08,49.23-60.92,50c-11.18,1.77-32.34-4.87-44.15-6.61c-28.06-4.13-154.98-21.47-170.71,3.46c-18.28,28.98,38.11,139.98,53.75,168.89c8.7,16.06,22.29,34.09,28.29,51.02c4.47,12.63,1.03,38.69,1.43,52.43c.44,14.97,5.29,26.88-5.53,39.11c-35.3,39.9,5.48,117.95,3.55,121.82Z"
          fill="#0AC8A0"
        />
        <path
          d="M922,549c-9.81-12.26-16.57-27.8-24.61-41.33c-28.46-47.9-59.47-83.2-115.59-97.44c-22.09-5.6-46.22-7.22-68.66-2.68c-40.12,8.11-76.43,32.19-111.44,52.35c-38.32,22.06-76.56,44.29-114.86,66.39c-45.58,26.29-102.22,51.14-138.89,88.57c-21.08,21.52-34.36,50.09-41.23,79.17c-16.78,70.92,25.85,134.27,60.3,192.44C369.73,891.04,394,921.52,394,922c-36.24,.15-163.51,7.71-187.39-15.81c-20.35-20.03-24.89-79.56-15.52-105.13c3.48-9.49,14.65-19.11,16.21-27.62c1.91-10.45-.47-69.53-3.3-79.88c-4.96-18.11-19.34-36.94-28.39-53.64c-16.1-29.74-71.03-135.68-53.83-166.17c16.62-29.45,151.16-8.73,181.61-4.19c6.3,.94,31.48,7.51,35.61,5.44c6.48-3.24,16.52-14.32,22.35-19.41c43.58-38,92.95-70.74,145.97-94.13c11.26-4.96,74.93-25.28,78.34-29.53c5.43-6.77,9.94-27.21,13.46-36.13c11.9-30.12,58.45-149.3,93.47-150.15c34.23-.83,104.12,104.78,121.65,133.36c8.24,13.45,15.67,33.1,25.73,44.54c.94,1.07,66.58,42.9,69.67,44.15c2.6,1.05,9.38-1.2,12.36-1.7c0,61,0,122,0,183Z"
          fill="#EAFAF6"
        />
      </svg>
    )
  },
  {
    id: 'dsh',
    name: 'DSH',
    accent: '#4D6BFE',
    hoverClass: 'hover:border-[#4D6BFE]/50 hover:bg-[#4D6BFE]/[0.06] hover:shadow-[0_2px_12px_rgba(77,107,254,0.15)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
        <path
          d="M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z"
          fill="#4D6BFE"
        />
      </svg>
    )
  }
]

// 动效轮播动作词 (WorkBuddy 经典风格：我帮你 + 动作词)
const SLOGAN_ACTIONS = [
  { id: 'read', verb: '看会话' },
  { id: 'assistant', verb: '提周报' },
  { id: 'analyze', verb: '看成本' },
  { id: 'api-proxy', verb: '查请求' },
  { id: 'resume', verb: '续对话' }
]

export default function App() {
  const [activeTab, setActiveTab] = useState('read')
  const [actionIdx, setActionIdx] = useState(0)
  const [viewMode, setViewMode] = useState<'video' | 'screenshot'>('video')
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const currentScenarioIndex = HELPER_SCENARIOS.findIndex(s => s.id === activeTab)
  const currentScenario = HELPER_SCENARIOS[currentScenarioIndex] || HELPER_SCENARIOS[0]
  const currentAction = SLOGAN_ACTIONS[actionIdx] || SLOGAN_ACTIONS[0]
  const totalDuration = videoDuration || currentScenario.duration || 0

  // 场景切换时联动更新动效词
  useEffect(() => {
    const idx = SLOGAN_ACTIONS.findIndex(s => s.id === activeTab)
    if (idx !== -1) {
      setActionIdx(idx)
    }
  }, [activeTab])

  // 定时自动平滑轮播动效词（3.5s 轮播一次）
  useEffect(() => {
    const timer = setInterval(() => {
      setActionIdx(prev => (prev + 1) % SLOGAN_ACTIONS.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  // 处于视频模式时切换场景或模式自动播放视频，并重置播放进度与时长
  useEffect(() => {
    setCurrentTime(0)
    setVideoDuration(0)
    if (viewMode === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }, [viewMode, activeTab])

  // 视频加载元数据或时长变更时同步总时长
  const handleDurationUpdate = () => {
    if (videoRef.current && Number.isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      setVideoDuration(videoRef.current.duration)
    }
  }

  // 视频时间更新
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      if (
        Number.isFinite(videoRef.current.duration) &&
        videoRef.current.duration > 0 &&
        Math.abs(videoRef.current.duration - videoDuration) > 0.5
      ) {
        setVideoDuration(videoRef.current.duration)
      }
    }
  }

  // 播放 / 暂停
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  // 进度跳转
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime
      setCurrentTime(targetTime)
    }
  }

  // 全屏
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(err => console.error(err))
      } else {
        document.exitFullscreen()
      }
    }
  }

  const formatTime = (secs: number) => {
    if (!Number.isFinite(secs) || secs < 0) return '0:00'
    const totalSecs = Math.floor(secs)
    const m = Math.floor(totalSecs / 60)
    const s = totalSecs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="relative min-h-screen bg-white text-[#191a23] font-sans selection:bg-[#28b894]/20 selection:text-[#1a7f64] flex flex-col justify-between overflow-x-hidden">
      
      {/* 背景淡雅对角科技线 (WorkBuddy 经典极简科技折线) */}
      <div className="absolute top-0 left-0 right-0 h-[480px] pointer-events-none overflow-hidden -z-10 select-none">
        <svg className="w-full h-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1440 480" fill="none">
          <line x1="-100" y1="90" x2="1600" y2="420" stroke="#28b894" strokeWidth="1" strokeOpacity="0.22" />
          <line x1="-100" y1="20" x2="1600" y2="340" stroke="#e5e7eb" strokeWidth="1" strokeOpacity="0.55" />
        </svg>
      </div>

      {/* 主体区：聚焦核心（WorkBuddy 极简展台风格） */}
      <main className="flex-1 pt-12 sm:pt-16 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* 顶部优雅微标 */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/80 text-[#1a7f64] border border-[#28b894]/25 text-xs sm:text-sm font-semibold mb-5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#28b894] animate-pulse" />
            <span>AI 编程会话桌面工作台 · 你的会话好帮手</span>
          </div>

          {/* Claudia 专属品牌主标：高定 App Icon + 品牌名 + 动效 Slogan */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-4">
            
            {/* Claudia 官方专属全新透明抠图图标 */}
            <img
              src="/claudia-logo.png"
              alt="Claudia App Icon"
              className="w-11 h-11 sm:w-13 sm:h-13 object-contain hover:scale-110 transition-transform duration-200 select-none drop-shadow-xs"
            />

            {/* 品牌名与大标一体化 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight flex items-center font-sans">
              <span className="text-gray-950">Claudia</span>
              <span className="text-gray-300 font-light mx-2 sm:mx-3">·</span>
              <span>我帮你</span>
              <span className="relative inline-flex items-center ml-2 text-[#28b894] min-w-[3.3em] text-left">
                <span key={currentAction.verb} className="animate-slide-up-fade inline-block font-black">
                  {currentAction.verb}
                </span>
              </span>
            </h1>

          </div>

          {/* 核心定位与价值描述 */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mt-2 mb-8 font-normal">
            面向各大主流 AI CLI 的全场景桌面工作台。全场景富文本阅读、智能助手提炼周报、Token 成本透视与一站式配置管理，100% 本地优先。
          </p>

          {/* 突出支持哪些 CLI：带矢量图、品牌色与微交互光感特效 */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 mr-1 py-1">
              <span className="w-2 h-2 rounded-full bg-[#28b894] animate-pulse" />
              <span>支持 CLI:</span>
            </div>
            {SUPPORTED_ECOSYSTEM.map(cli => (
              <div
                key={cli.id}
                className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white text-gray-800 border border-gray-200/90 shadow-2xs transition-all duration-200 cursor-default hover:-translate-y-0.5 ${cli.hoverClass}`}
              >
                <div className="transition-transform duration-200 group-hover:scale-110">
                  {cli.icon}
                </div>
                <span className="font-semibold text-gray-800 group-hover:text-gray-950">
                  {cli.name}
                </span>
              </div>
            ))}
          </div>

          {/* 场景切换药丸胶囊栏与模式切换 (WorkBuddy 极简浅色风格) */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex p-1.5 rounded-full bg-gray-100/90 border border-gray-200/70 shadow-xs max-w-full overflow-x-auto">
              {HELPER_SCENARIOS.map(item => {
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-5 sm:px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#28b894] text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-950 hover:bg-white/60'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span>{item.tab}</span>
                  </button>
                )
              })}
            </div>

            {/* 模式切换：默认动态演示，卡顿可一键切换实机截图 */}
            <div className="inline-flex p-1.5 rounded-full bg-gray-100/90 border border-gray-200/70 shadow-xs text-xs">
              <button
                onClick={() => {
                  setViewMode('video')
                  setIsPlaying(true)
                }}
                className={`px-4 py-2 rounded-full flex items-center gap-1.5 transition-all font-medium ${
                  viewMode === 'video'
                    ? 'bg-[#28b894] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-white/60'
                }`}
              >
                <VideoIcon className="w-3.5 h-3.5" />
                <span>动态演示</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('screenshot')
                  setIsPlaying(false)
                }}
                className={`px-4 py-2 rounded-full flex items-center gap-1.5 transition-all font-medium ${
                  viewMode === 'screenshot'
                    ? 'bg-[#28b894] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-white/60'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>实机截图</span>
              </button>
            </div>
          </div>

          {/* 居中原生应用展台：统一 max-w-6xl 与垂直间距，无黑框与多余遮挡 */}
          <div className="max-w-6xl mx-auto">
            {viewMode === 'screenshot' ? (
              /* 模式二：实机截图（卡顿切换或细致查阅时，原生窗口直接融入白色画布） */
              <div className="relative flex items-center justify-center">
                <img
                  key={currentScenario.screenshot}
                  src={currentScenario.screenshot}
                  alt={currentScenario.title}
                  className={`w-full h-auto object-contain select-none transition-all duration-300 animate-fadeIn ${
                    currentScenario.id === 'assistant' ? 'max-w-2xl' : 'max-w-6xl'
                  }`}
                />
              </div>
            ) : (
              /* 模式一：动态视频演示（默认，16:9 纯净巨幕贴边播放） */
              <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-200/80 bg-black">
                <video
                  ref={videoRef}
                  key={currentScenario.video}
                  src={currentScenario.video}
                  poster={currentScenario.screenshot}
                  className="w-full h-full object-cover cursor-pointer"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleDurationUpdate}
                  onDurationChange={handleDurationUpdate}
                />

                {/* 暂停时居中大播放按钮 */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center cursor-pointer transition-opacity"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/95 text-gray-900 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                      <Play className="w-9 h-9 ml-1 fill-gray-900" />
                    </div>
                  </div>
                )}

                {/* 底部悬浮毛玻璃控制栏 */}
                <div className="absolute bottom-4 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-gray-200/80 flex items-center gap-4 transition-opacity">
                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-800 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-gray-800" /> : <Play className="w-4 h-4 fill-gray-800 ml-0.5" />}
                  </button>

                  <div className="flex-1 flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={totalDuration || 100}
                      step={0.1}
                      value={Math.min(currentTime, totalDuration || 100)}
                      onChange={handleSeek}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#28b894]"
                    />
                  </div>

                  <span className="text-xs font-mono font-medium text-gray-700 shrink-0">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                  </span>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors"
                    title={isMuted ? '取消静音' : '静音'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors"
                    title="全屏观看"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 场景切换指示器 */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {HELPER_SCENARIOS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeTab === s.id ? 'w-10 bg-[#28b894]' : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`切换到第 ${idx + 1} 个场景: ${s.tab}`}
                />
              ))}
            </div>

          </div>

        </div>
      </main>

      {/* 3. 极简页脚 */}
      <footer className="bg-gray-50/80 border-t border-gray-150 py-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">Claudia</span>
            <span>· 面向多个 AI CLI 的本地桌面工作台</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span>100% 本地优先 · 隐私安全</span>
            <span>·</span>
            <span>© 2026 Claudia Team</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
