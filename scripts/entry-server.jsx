// React 官方 SSR 入口 — 用于构建时预渲染
// 纯 Node.js + React renderToString，零浏览器依赖
// EdgeOne Pages / 腾讯云边缘平台 100% 兼容

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
    return '';
  }
}
