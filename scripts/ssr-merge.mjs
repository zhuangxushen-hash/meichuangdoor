// SSR 构建产物合并脚本
// 流程：
// 1. vite build → 客户端产物输出到 dist/（含空壳 index.html）
// 2. vite build --ssr scripts/entry-server.jsx → SSR bundle 输出到 dist-ssr/
// 3. 本脚本加载 SSR bundle，调用 render() 得到预渲染 HTML
// 4. 剥离 framer-motion / motion 组件的初始动画内联样式（opacity:0、translateY 等）
//    → 避免 AI 爬虫判定为 cloaking（Hidden text SUSPICIOUS）
//    → 客户端水合后 motion 仍然会按 initial prop 执行动画
// 5. 把 <div id="root"></div> 替换为 <div id="root">${ssrHtml}</div>
// 6. 写回 dist/index.html — 现在 index.html 包含完整 React 预渲染内容

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SSR_BUNDLE = path.join(root, 'dist-ssr', 'entry-server.js');
const DIST_INDEX = path.join(root, 'dist', 'index.html');

console.log('📦 SSR 预渲染合并脚本启动 (含 motion 样式剥离)');
console.log('   SSR bundle:', SSR_BUNDLE);
console.log('   目标文件:  ', DIST_INDEX);

// 检查产物是否存在
if (!fs.existsSync(SSR_BUNDLE)) {
  console.error('❌ SSR bundle 不存在！请先运行 vite build --ssr');
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
let ssrHtml = ssrModule.render();
if (!ssrHtml || ssrHtml.length === 0) {
  console.error('❌ SSR render() 返回空字符串');
  process.exit(1);
}
console.log(`✅ SSR render 成功 — ${ssrHtml.length} 字符 ≈ ${Math.round(ssrHtml.length / 6)} words`);

// ========== 关键修复：剥离 framer-motion / motion 初始动画内联样式 ==========
// SSR 时 motion.div initial={{ opacity: 0, y: 30 }} 会输出内联 style="opacity:0;transform:translateY(30px)"
// AI 爬虫看到 opacity:0 判定为 cloaking → Hidden text SUSPICIOUS
// 客户端水合后 motion 会按 initial prop 重新应用，所以剥离不影响动画
const beforeMotionClean = ssrHtml.length;

// 剥离 opacity:0 或 opacity:0.0 （只对透明度为 0 的内容元素生效）
ssrHtml = ssrHtml.replace(/(\s+)opacity\s*:\s*0(?:\.0+)?(?:\s*;|$)/gi, '');

// 剥离 transform:translateY(±Npx) 初始位移（motion initial 的 y / y1 / y2）
ssrHtml = ssrHtml.replace(/(\s+)transform\s*:\s*translate[XY]\([^)]+\)(?:\s*;|$)/gi, '');

// 剥离 transform:scale(0...1) 初始缩放
ssrHtml = ssrHtml.replace(/(\s+)transform\s*:\s*scale\([^)]+\)(?:\s*;|$)/gi, '');

// 清理 style="" 和 style=";" 空样式属性
ssrHtml = ssrHtml.replace(/\s*style="\s*;?\s*"/gi, '');

// 清理 style=";xxx" 开头多余分号
ssrHtml = ssrHtml.replace(/style="\s*;\s*/gi, 'style="');

// 清理 style="xxx;xxx;" 末尾多余分号
ssrHtml = ssrHtml.replace(/;\s*"/gi, '"');

const removedBytes = beforeMotionClean - ssrHtml.length;
const removedOpacity = (beforeMotionClean > ssrHtml.length) ? 
  ((ssrHtml.match(/style="[^"]*opacity\s*:\s*0[^"]*"/gi) || []).length) : 0;
console.log(`🧹 motion 样式剥离: ${removedBytes} bytes removed`);
console.log(`   (opacity:0 / translateY / scale 在 SSR 输出中被清理，客户端水合后动画照常)`);

// 读取并合并 index.html
let indexHtml = fs.readFileSync(DIST_INDEX, 'utf8');
const before = indexHtml.length;

if (!/<div id="root"[^>]*>\s*<\/div>/.test(indexHtml)) {
  // SSR 已经写入了一些东西（可能是预渲染插件残留），也要替换
  indexHtml = indexHtml.replace(/<div id="root"([^>]*)>[\s\S]*?<\/div>/, `<div id="root"$1>${ssrHtml}</div>`);
} else {
  indexHtml = indexHtml.replace(
    /<div id="root"([^>]*)>\s*<\/div>/,
    `<div id="root"$1>${ssrHtml}</div>`
  );
}

// 写回
fs.writeFileSync(DIST_INDEX, indexHtml, 'utf8');
const after = indexHtml.length;

// 验证
const rootMatch = indexHtml.match(/<div id="root"[^>]*>([\s\S]*?)<\/div>/);
const rootContent = rootMatch ? rootMatch[1] : '';
const hasContent = rootContent.trim().length > 0;
const h1Count = (indexHtml.match(/<h1/gi) || []).length;
const h2Count = (indexHtml.match(/<h2/gi) || []).length;
const h3Count = (indexHtml.match(/<h3/gi) || []).length;
const pCount = (indexHtml.match(/<p/gi) || []).length;

// 检查 motion opacity:0 是否还存在
const remainingOpacity0 = (rootContent.match(/opacity\s*:\s*0[^\d]/gi) || []).length;

// 粗算纯文本量
const stripped = indexHtml
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

console.log('');
console.log('📊 合并结果:');
console.log(`   原始 HTML: ${before.toLocaleString()} bytes`);
console.log(`   合并后:    ${after.toLocaleString()} bytes (+${(after - before).toLocaleString()})`);
console.log(`   root 有内容: ${hasContent ? '✅' : '❌'}`);
console.log(`   纯文本:    ≈ ${Math.round(stripped.length / 6)} words`);
console.log(`   H1/H2/H3:  ${h1Count}/${h2Count}/${h3Count}`);
console.log(`   <p> 标签:  ${pCount}`);
console.log(`   opacity:0: ${remainingOpacity0} 个${remainingOpacity0 === 0 ? ' ✅' : ' ⚠️ 可能还有残留'}`);
console.log('');
console.log('🎉 SSR 预渲染完成！AI 爬虫现在能看到完整内容了。');
console.log('   motion initial 样式已剥离，不会被判定为 cloaking。');
