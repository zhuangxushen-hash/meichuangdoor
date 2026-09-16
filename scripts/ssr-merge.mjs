// SSR 构建产物合并脚本
// 流程：
// 1. vite build → 客户端产物输出到 dist/（含空壳 index.html）
// 2. vite build --ssr scripts/entry-server.jsx → SSR bundle 输出到 dist-ssr/
// 3. 本脚本加载 SSR bundle，调用 render() 得到预渲染 HTML
// 4. 把 <div id="root"></div> 替换为 <div id="root">${ssrHtml}</div>
// 5. 写回 dist/index.html — 现在 index.html 包含完整 React 预渲染内容
//
// 优点：纯 Node.js，零浏览器，EdgeOne Pages / 腾讯云边缘平台 100% 能跑

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SSR_BUNDLE = path.join(root, 'dist-ssr', 'entry-server.js');
const DIST_INDEX = path.join(root, 'dist', 'index.html');

console.log('📦 SSR 预渲染合并脚本启动');
console.log('   SSR bundle:', SSR_BUNDLE);
console.log('   目标文件:  ', DIST_INDEX);

// 检查产物是否存在
if (!fs.existsSync(SSR_BUNDLE)) {
  console.error('❌ SSR bundle 不存在！请先运行 vite build --ssr');
  console.error('   预期路径:', SSR_BUNDLE);
  process.exit(1);
}
if (!fs.existsSync(DIST_INDEX)) {
  console.error('❌ dist/index.html 不存在！请先运行 vite build');
  process.exit(1);
}

// 加载 SSR bundle
const ssrModule = await import(SSR_BUNDLE);
if (!ssrModule.render) {
  console.error('❌ SSR bundle 没有导出 render 函数');
  process.exit(1);
}

// 执行渲染
const ssrHtml = ssrModule.render();
if (!ssrHtml || ssrHtml.length === 0) {
  console.error('❌ SSR render() 返回空字符串');
  process.exit(1);
}
console.log(`✅ SSR render 成功 — ${ssrHtml.length} 字符 ≈ ${Math.round(ssrHtml.length / 6)} words`);

// 读取并合并
let indexHtml = fs.readFileSync(DIST_INDEX, 'utf8');
const before = indexHtml.length;

// 匹配 <div id="root"></div> 或 <div id="root" 带属性></div>
const rootRegex = /<div id="root"[^>]*>\s*<\/div>/;
if (!rootRegex.test(indexHtml)) {
  console.error('❌ 找不到 <div id="root"></div>，目标结构不匹配');
  process.exit(1);
}

indexHtml = indexHtml.replace(
  /<div id="root"([^>]*)>\s*<\/div>/,
  `<div id="root"$1>${ssrHtml}</div>`
);

// 写回
fs.writeFileSync(DIST_INDEX, indexHtml, 'utf8');
const after = indexHtml.length;

// 验证
const rootMatch = indexHtml.match(/<div id="root"[^>]*>([\s\S]*?)<\/div>/);
const hasContent = rootMatch && rootMatch[1].trim().length > 0;
const h1Count = (indexHtml.match(/<h1/gi) || []).length;
const h2Count = (indexHtml.match(/<h2/gi) || []).length;
const hasText = indexHtml.includes('匠心造好门') || indexHtml.includes('美创门业');

console.log('');
console.log('📊 合并结果:');
console.log(`   原始 HTML: ${before} bytes`);
console.log(`   合并后:    ${after} bytes (+${after - before})`);
console.log(`   root 有内容: ${hasContent ? '✅' : '❌'}`);
console.log(`   H1 标签:    ${h1Count}`);
console.log(`   H2 标签:    ${h2Count}`);
console.log(`   正文文本:   ${hasText ? '✅' : '❌'}`);
console.log('');
console.log('🎉 SSR 预渲染完成！AI 爬虫现在能看到完整内容了。');
