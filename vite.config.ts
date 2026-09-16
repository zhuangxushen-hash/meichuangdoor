import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

// EdgeOne Pages / 腾讯云边缘平台 100% 兼容配置
// SSR 构建用 React renderToString，纯 Node.js，零浏览器依赖
// motion/react 等浏览器专用模块通过 resolve.alias 替换为 stub

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    // ========== SSR 构建配置 ==========
    ssr: {
      // 所有 SSR 环境下可能用到浏览器 API 的包都标记为 noExternal
      // 确保 Vite 会把它们打进 SSR bundle 而不是尝试 require
      noExternal: [
        'motion',
        'motion/react',
        '@motion/react',
        'lucide-react',
      ],
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
