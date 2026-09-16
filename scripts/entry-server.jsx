// React 官方 SSR 入口 — 用于构建时预渲染
// 纯 Node.js + React renderToString，零浏览器依赖
// EdgeOne Pages / 腾讯云边缘平台 100% 兼容

// ========== SSR 环境 polyfill ==========
// 防止 motion/react 或 lucide-react 在 import 时访问浏览器 API 崩掉
if (typeof global.window === 'undefined') {
  global.window = {
    innerWidth: 1920,
    innerHeight: 1080,
    scrollY: 0,
    scrollX: 0,
    devicePixelRatio: 1,
    matchMedia: () => ({ matches: false }),
    requestAnimationFrame: (cb) => setTimeout(cb, 16),
    cancelAnimationFrame: (id) => clearTimeout(id),
    addEventListener: () => {},
    removeEventListener: () => {},
    getComputedStyle: () => ({ getPropertyValue: () => '' }),
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  };
}
if (typeof global.document === 'undefined') {
  global.document = {
    createElement: () => ({
      style: {},
      setAttribute: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      appendChild: () => {},
      removeChild: () => {},
      classList: { add: () => {}, remove: () => {} },
      getContext: () => null,
    }),
    createTextNode: (t) => ({ nodeValue: t }),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    body: {},
    head: {},
    documentElement: { style: {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    referrer: '',
    readyState: 'complete',
    URL: 'https://meichuangmenye.com/',
  };
}
if (typeof global.navigator === 'undefined') {
  global.navigator = { userAgent: 'Node.js SSR', platform: 'SSR' };
}

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';

// renderToString 会把整个 React 组件树渲染成纯 HTML 字符串
// motion.div → 普通 <div>（不带动画属性，SSR 只负责静态结构）
// useState 初始值正常渲染
// useEffect 不执行（SSR 只跑 render，副作用留给客户端水合）

export function render() {
  try {
    const html = renderToString(React.createElement(App));
    return html;
  } catch (err) {
    console.error('[SSR] renderToString 失败:', err);
    // 返回空字符串让 ssr-merge.mjs 捕获，打印完整错误
    return '';
  }
}
