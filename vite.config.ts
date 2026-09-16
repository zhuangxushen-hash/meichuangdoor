import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
// 注意：EdgeOne Pages 上 vite-plugin-prerender 无法运行
// 因为它依赖 Puppeteer（需要下载 Chromium），而 EdgeOne 的 serverless
// 构建环境没有浏览器，内存有限，网络也受限。
// 我们改用 React 官方 SSR API（纯 Node.js），零浏览器依赖，100% 兼容。

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    // ========== SSR 构建配置 ==========
    // 用 vite build --ssr 生成 SSR bundle
    // 然后 scripts/ssr-merge.mjs 把 SSR 输出塞进 dist/index.html
    ssr: {
      // motion (framer-motion v12+) 在 SSR 下需要正常解析
      noExternal: ['motion'],
    },

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
