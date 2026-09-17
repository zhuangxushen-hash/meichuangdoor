import fs from "node:fs";
import path from "node:path";

const blogDir = "public/pages/blog";
const articles = JSON.parse(fs.readFileSync(path.join(blogDir, "articles-data.json"), "utf8"));

function formatQandA(html) {
  // Normalize <p><strong>Q：...</strong></p> to <h2>Q：...</h2>
  let clean = html.replace(/<p>\s*<strong>Q[：:](.*?)<\/strong>\s*<\/p>/gi, '<h2>Q：$1</h2>');
  
  if (!clean.includes('<h2>Q：')) {
    return clean;
  }
  
  const parts = clean.split(/<h2>Q[：:]/i);
  let result = parts[0]; // Content before first Q&A (intro paragraphs)
  
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const qEnd = part.indexOf('</h2>');
    if (qEnd === -1) {
      result += '<h2>Q：' + part;
      continue;
    }
    const questionText = part.slice(0, qEnd).trim();
    let restOfPart = part.slice(qEnd + 5);
    
    // Check if there is author/service text at the end of this part
    let trailing = '';
    const authorIdx = restOfPart.search(/<p>\s*(?:作者[：:]|服务范围[：:])/i);
    if (authorIdx !== -1) {
      trailing = restOfPart.slice(authorIdx);
      restOfPart = restOfPart.slice(0, authorIdx);
    }
    
    // Remove trailing <hr />
    restOfPart = restOfPart.replace(/(?:<hr\s*\/?>\s*)+$/i, '');

    result += `
<div class="qa-item">
  <div class="qa-question">
    <span class="qa-q-badge">问</span>
    <span>${questionText}</span>
  </div>
  <div class="qa-answer">
    ${restOfPart.trim()}
  </div>
</div>
${trailing}`;
  }
  
  // Format the author / source block if present
  result = result.replace(/<p>\s*作者[：:](.*?)｜来源[：:](.*?)｜日期[：:](.*?)<\/p>/gi, (m, author, src, date) => {
    return `
<div style="margin-top:28px;padding:14px 18px;background:#FAF8F5;border:1px solid #ECE7E0;border-radius:8px;font-size:12px;color:#78716C;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
  <span>✍️ 撰写：${author.trim()}</span>
  <span>🌐 来源：${src.trim()}</span>
  <span>📅 发布：${date.trim()}</span>
</div>`;
  });

  return result;
}

console.log(`Beautifying all ${articles.length} articles with semantic Q&A cards...`);

articles.forEach((art, index) => {
  const filePath = path.join(blogDir, art.file);
  const rawContent = fs.readFileSync(filePath, "utf8");

  // Extract head elements
  const headMatch = rawContent.match(/<head>([\s\S]*?)<\/head>/);
  let headInner = headMatch ? headMatch[1] : '';

  // Clean old styles
  headInner = headInner.replace(/<style>[\s\S]*?<\/style>/gi, "");
  if (!headInner.includes("blog.css")) {
    headInner += '\n  <link rel="stylesheet" href="/pages/blog/blog.css" />\n';
  }

  // Extract body content from original file
  // Grab between <div class="article-body"> or <article>
  let bodyContent = '';
  const bodyMatch = rawContent.match(/<div class="article-body">([\s\S]*?)<\/div>\s*<!-- 工厂服务保障栏 -->/);
  if (bodyMatch) {
    bodyContent = bodyMatch[1];
  } else {
    const artMatch = rawContent.match(/<article[^>]*>([\s\S]*?)<\/article>/);
    bodyContent = artMatch ? artMatch[1] : '';
  }

  // Strip previously injected artifacts if re-running
  bodyContent = bodyContent.replace(/<header class="article-header-meta">[\s\S]*?<\/header>/gi, "");
  bodyContent = bodyContent.replace(/<div class="takeaway-box">[\s\S]*?<\/div>\s*<\/div>/gi, "");
  bodyContent = bodyContent.replace(/<div class="factory-trust-bar">[\s\S]*?<\/div>/gi, "");
  bodyContent = bodyContent.replace(/<div class="post-navigation">[\s\S]*?<\/div>/gi, "");
  bodyContent = bodyContent.replace(/<div class="cta-banner"[\s\S]*?<\/div>\s*<\/div>/gi, "");
  bodyContent = bodyContent.replace(/<p>\s*#\s+[^<]+<\/p>/gi, "");
  bodyContent = bodyContent.replace(/<div class="meta">[\s\S]*?<\/div>/gi, "");
  bodyContent = bodyContent.replace(/<h1>[\s\S]*?<\/h1>/gi, "");
  bodyContent = bodyContent.replace(/<div class="summary">[\s\S]*?<\/div>/gi, "");

  // Extract pure Q&A text if it has existing qa-items
  if (bodyContent.includes('<div class="qa-item">')) {
    bodyContent = bodyContent.replace(/<div class="qa-item">\s*<div class="qa-question">\s*<span class="qa-q-badge">问<\/span>\s*<span>(.*?)<\/span>\s*<\/div>\s*<div class="qa-answer">([\s\S]*?)<\/div>\s*<\/div>/gi, '<h2>Q：$1</h2>\n$2');
    bodyContent = bodyContent.replace(/<\/div>\s*<\/div>/g, '');
  }

  // Now apply formatQandA cleanly
  const formattedBody = formatQandA(bodyContent.trim());

  // Calculate prev and next
  const prevArt = index > 0 ? articles[index - 1] : articles[articles.length - 1];
  const nextArt = index < articles.length - 1 ? articles[index + 1] : articles[0];

  // Related articles
  const relatedArticles = articles
    .filter(a => a.file !== art.file && (a.categoryGroup === art.categoryGroup || a.section === art.section))
    .slice(0, 3);
  
  if (relatedArticles.length < 2) {
    articles.slice(0, 3).forEach(a => {
      if (a.file !== art.file && !relatedArticles.includes(a)) {
        relatedArticles.push(a);
      }
    });
  }

  const relatedHtml = relatedArticles.slice(0, 2).map(r => `
    <a href="${r.url}" class="post-nav-card">
      <span class="post-nav-direction">📖 推荐阅读 · ${r.section}</span>
      <span class="post-nav-title">${r.title}</span>
    </a>
  `).join('\n');

  const readTime = Math.max(3, Math.min(8, Math.round(art.summary.length / 30) + 2));

  const newHtml = `<!doctype html>
<html lang="zh-CN">
<head>${headInner}</head>
<body>
  <!-- 顶部阅读进度条 -->
  <div id="reading-progress-bar"></div>

  <!-- 顶部导航 -->
  <header class="site-header">
    <div class="header-container">
      <a href="https://meichuangmenye.com/" class="brand-brand-wrap">
        <img src="/assets/logo_light.png" alt="美创门业" class="brand-logo-img" onerror="this.style.display='none'" />
        <div class="brand-text-fallback">
          <span class="brand-name">美创门业</span>
          <span class="brand-sub">MEICHUANG DOOR</span>
        </div>
      </a>
      <nav class="site-nav">
        <a href="https://meichuangmenye.com/">官网首页</a>
        <a href="https://meichuangmenye.com/#products">产品中心</a>
        <a href="https://meichuangmenye.com/about.html">厂区实拍</a>
        <a href="https://meichuangmenye.com/pages/blog/" class="active">门业百科</a>
        <a href="tel:13554866836" class="nav-phone-btn">
          <span>📞</span> 13554866836
        </a>
      </nav>
    </div>
  </header>

  <main class="article-detail-wrap">
    <!-- 面包屑导航 -->
    <div class="article-breadcrumb">
      <a href="https://meichuangmenye.com/">首页</a>
      <span>›</span>
      <a href="https://meichuangmenye.com/pages/blog/">门业百科</a>
      <span>›</span>
      <span style="color:var(--text-title);font-weight:500;">${art.title.length > 25 ? art.title.slice(0, 25) + '...' : art.title}</span>
    </div>

    <!-- 文章主体卡片 -->
    <article class="article-main-card">
      <header class="article-header-meta">
        <span class="article-top-tag">🏷️ ${art.section}</span>
        <h1 class="article-main-title">${art.title}</h1>
        <div class="article-info-row">
          <span>🏭 美创门业技术部</span>
          <span>📅 ${art.date}</span>
          <span>⏱️ 约 ${readTime} 分钟阅读</span>
          <span>🛡️ 惠州实体工厂实测</span>
        </div>
      </header>

      ${art.summary ? `
      <!-- 核心观点 / 结论先行卡片 -->
      <div class="takeaway-box">
        <div class="takeaway-header">
          <span>📌</span> 核心观点 · 结论先行
        </div>
        <div class="takeaway-content">
          ${art.summary}
        </div>
      </div>
      ` : ''}

      <!-- 正文内容 -->
      <div class="article-body">
        ${formattedBody}
      </div>

      <!-- 工厂服务保障栏 -->
      <div class="factory-trust-bar">
        <div class="trust-item">
          <div class="trust-icon">📐</div>
          <div class="trust-text">
            <h4>免费上门量尺</h4>
            <p>惠州全域免费勘测门洞</p>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">🌿</div>
          <div class="trust-text">
            <h4>E0级环保标准</h4>
            <p>六面封漆防潮防变形</p>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">🛠️</div>
          <div class="trust-text">
            <h4>自有安装师傅</h4>
            <p>工序规范责任到人</p>
          </div>
        </div>
        <div class="trust-item">
          <div class="trust-icon">🛡️</div>
          <div class="trust-text">
            <h4>5年五金质保</h4>
            <p>本地24小时响应售后</p>
          </div>
        </div>
      </div>

      <!-- 上一篇 / 下一篇 导航 -->
      <div class="post-navigation">
        <a href="${prevArt.url}" class="post-nav-card">
          <span class="post-nav-direction">← 上一篇</span>
          <span class="post-nav-title">${prevArt.title}</span>
        </a>
        <a href="${nextArt.url}" class="post-nav-card" style="text-align:right;">
          <span class="post-nav-direction">下一篇 →</span>
          <span class="post-nav-title">${nextArt.title}</span>
        </a>
      </div>

      <!-- 猜你想看 / 相关推荐 -->
      <div style="margin-top:32px;">
        <h4 style="font-size:15px;font-weight:700;color:var(--text-title);margin-bottom:12px;">📚 猜您想了解的相关门业知识：</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          ${relatedHtml}
        </div>
      </div>

      <!-- 底部预约与咨询 CTA -->
      <div class="cta-banner" id="contact">
        <h3>预约惠州源头工厂勘测量尺或咨询报价？</h3>
        <p>
          惠州市美创门业有限公司位于惠州仲恺高新区潼侨镇新城山庄A8号铂金实业，提供入户门、实木烤漆门、铝木门、极简玻璃门一站式全屋定制。工厂直供无中间商加价！
        </p>
        <div class="cta-banner-buttons">
          <a href="tel:13554866836" class="cta-primary-btn">
            <span>📞</span> 立即致电工厂：13554866836
          </a>
          <a href="https://meichuangmenye.com/pages/blog/" class="cta-secondary-btn">
            <span>📖</span> 返回门业百科首页
          </a>
        </div>
      </div>
    </article>
  </main>

  <!-- 页脚 -->
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-info-row">
        <strong>惠州市美创门业有限公司</strong> · 惠州市仲恺高新区潼侨镇新城山庄A8号铂金实业 · 统一社会信用代码：91441300MA56BFAB00
      </div>
      <div class="footer-info-row">
        <a href="https://meichuangmenye.com/">官网首页</a> · 
        <a href="https://meichuangmenye.com/about.html">关于我们</a> · 
        <a href="https://meichuangmenye.com/pages/blog/">门业百科</a> · 
        <a href="tel:13554866836">咨询热线：13554866836</a>
      </div>
      <div class="footer-copyright">
        <p>Copyright © 2021-${new Date().getFullYear()} 惠州市美创门业有限公司 版权所有</p>
        <p style="margin-top:6px;">
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer" class="footer-icp-link">
            粤ICP备2026061405号
          </a>
        </p>
      </div>
    </div>
  </footer>

  <!-- 移动端底部悬浮条 -->
  <div class="mobile-sticky-bar">
    <div class="mobile-bar-inner">
      <a href="tel:13554866836" class="mobile-phone-btn">📞 一键拨通工厂顾问</a>
      <a href="https://meichuangmenye.com/pages/blog/" class="mobile-home-btn">📖 返回百科目录</a>
    </div>
  </div>

  <!-- 返回顶部按钮 -->
  <button class="back-to-top-btn" id="backToTop" title="返回顶部">↑</button>

  <script>
    // 阅读进度条
    window.addEventListener('scroll', function() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      var bar = document.getElementById("reading-progress-bar");
      if (bar) bar.style.width = scrolled + "%";

      var topBtn = document.getElementById("backToTop");
      if (topBtn) {
        if (winScroll > 300) {
          topBtn.classList.add("visible");
        } else {
          topBtn.classList.remove("visible");
        }
      }
    });

    document.getElementById("backToTop").addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  </script>
</body>
</html>
`;

  fs.writeFileSync(filePath, newHtml);
});

console.log(`All ${articles.length} articles beautifully rebuilt!`);
