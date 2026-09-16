// SSR 构建产物合并脚本
// 流程：vite build → vite build --ssr → 本脚本把 SSR 输出塞进 dist/index.html
// 关键：剥离 framer-motion/motion 的 initial 动画内联样式 → 防 cloaking 检测

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const SSR_BUNDLE = path.join(root, 'dist-ssr', 'entry-server.js');
const DIST_INDEX = path.join(root, 'dist', 'index.html');

console.log('📦 SSR 预渲染合并脚本 v2 (motion 样式剥离修复版)');

if (!fs.existsSync(SSR_BUNDLE)) { console.error('❌ SSR bundle 不存在'); process.exit(1); }
if (!fs.existsSync(DIST_INDEX)) { console.error('❌ dist/index.html 不存在'); process.exit(1); }

const ssrModule = await import(SSR_BUNDLE);
if (!ssrModule.render) { console.error('❌ SSR bundle 无 render'); process.exit(1); }

let ssrHtml = ssrModule.render();
if (!ssrHtml) { console.error('❌ SSR render 返回空'); process.exit(1); }
console.log(`✅ SSR render — ${ssrHtml.length} chars ≈ ${Math.round(ssrHtml.length / 6)} words`);

// ========== motion 初始样式剥离 ==========
// motion.div initial={{ opacity:0, y:30 }} → style="opacity:0;transform:translateY(30px)"
// AI 爬虫看到 opacity:0 判定 cloaking → Hidden text SUSPICIOUS
// 客户端水合后 motion 会重新应用动画，剥离零副作用
const before = ssrHtml.length;

// 策略：先匹配完整 style="opacity:0;transform:translateY(Npx)" 整段干掉
// 用更宽泛的正则：匹配 style 值中任何包含 opacity:0 或 transform:translateY 的属性
ssrHtml = ssrHtml.replace(
  /\s*opacity\s*:\s*0(?:\.0+)?\s*;?/gi,
  ''
);
ssrHtml = ssrHtml.replace(
  /\s*transform\s*:\s*translate[XY]\([^)]+\)\s*;?/gi,
  ''
);
ssrHtml = ssrHtml.replace(
  /\s*transform\s*:\s*scale\([^)]+\)\s*;?/gi,
  ''
);

// 清理残留：style=";xxx" → style="xxx"，style="xxx;" → style="xxx"，style="" → 删整个属性
ssrHtml = ssrHtml.replace(/style="\s*;\s*/gi, 'style="');
ssrHtml = ssrHtml.replace(/;\s*"/gi, '"');
ssrHtml = ssrHtml.replace(/style="\s*"/gi, '');

const removed = before - ssrHtml.length;

// 验证：还有没有 opacity:0 残留（除了 .0 opacity 以外）
const remainingOpacity = (ssrHtml.match(/style="[^"]*opacity\s*:\s*0(?:[^.\d]|$)[^"]*"/gi) || []).length;
const remainingTransform = (ssrHtml.match(/style="[^"]*translate[XY][^"]*"/gi) || []).length;

console.log(`🧹 motion 样式剥离: ${removed} bytes removed`);
console.log(`   opacity:0 残留: ${remainingOpacity} | translateY 残留: ${remainingTransform}`);
if (remainingOpacity > 0 || remainingTransform > 0) {
    console.log('   ⚠️ 仍有残留 — 可能需要调整正则');
    // 打印残留供调试
    const leftOvers = [
        ...(ssrHtml.match(/style="[^"]*opacity\s*:\s*0[^.\d][^"]*"/gi) || []),
        ...(ssrHtml.match(/style="[^"]*translate[XY][^"]*"/gi) || [])
    ];
    leftOvers.forEach(s => console.log('     ' + s));
}

// 合并 index.html
let indexHtml = fs.readFileSync(DIST_INDEX, 'utf8');
const beforeIndex = indexHtml.length;

if (/<div id="root"[^>]*>\s*<\/div>/.test(indexHtml)) {
    indexHtml = indexHtml.replace(
        /<div id="root"([^>]*)>\s*<\/div>/,
        `<div id="root"$1>${ssrHtml}</div>`
    );
} else {
    indexHtml = indexHtml.replace(
        /<div id="root"([^>]*)>[\s\S]*?<\/div>/,
        `<div id="root"$1>${ssrHtml}</div>`
    );
}

fs.writeFileSync(DIST_INDEX, indexHtml, 'utf8');

// 最终验证
const rootMatch = indexHtml.match(/<div id="root"[^>]*>([\s\S]*?)<\/div>/);
const rootContent = rootMatch ? rootMatch[1] : '';
const h1Count = (indexHtml.match(/<h1/gi) || []).length;
const h2Count = (indexHtml.match(/<h2/gi) || []).length;
const remainingInFinal = (rootContent.match(/style="[^"]*opacity\s*:\s*0[^.\d][^"]*"/gi) || []).length;

console.log('');
console.log('📊 合并结果:');
console.log(`   HTML: ${beforeIndex.toLocaleString()} → ${indexHtml.length.toLocaleString()} (+${(indexHtml.length - beforeIndex).toLocaleString()})`);
console.log(`   root 有内容: ${rootContent.length > 100 ? '✅' : '❌'}`);
console.log(`   H1/H2: ${h1Count}/${h2Count}`);
console.log(`   最终 opacity:0 残留: ${remainingInFinal} ${remainingInFinal === 0 ? '✅' : '❌'}`);
console.log('');
if (remainingInFinal === 0 && rootContent.length > 100) {
    console.log('🎉 SSR 预渲染完成！motion 样式已剥离，无 cloaking 风险。');
} else {
    console.log('⚠️ 请检查上方残留，可能需要手动修复。');
}
