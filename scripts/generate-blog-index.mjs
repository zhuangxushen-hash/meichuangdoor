import fs from "node:fs";
import path from "node:path";

const articles = JSON.parse(fs.readFileSync("public/pages/blog/articles-data.json", "utf8"));

// 3 Featured highlight articles
const featuredTitles = [
  "惠州回南天门受潮发胀关不上？选材与防潮处理一次讲清",
  "铝木门和实木门哪个好？惠州回南天选门指南",
  "买门去品牌门店还是直接找工厂？工厂直供真能便宜三成吗？"
];

const featuredArticles = featuredTitles.map(t => {
  return articles.find(a => a.title.includes(t) || t.includes(a.title)) || articles[0];
});

// Top 5 rank
const top5Titles = [
  "惠州回南天门受潮发胀关不上？选材与防潮处理一次讲清",
  "买门去品牌门店还是直接找工厂？工厂直供真能便宜三成吗？",
  "惠州旧房翻新只换门：少破坏墙面、当天装完的常见问题解答",
  "门墙柜一体化效果图和实景差距大？5 个核心原因",
  "惠州定制木门大概多少钱一平方？实木门和免漆门差价一次说清"
];
const top5Articles = top5Titles.map(t => articles.find(a => a.title.includes(t)) || articles[0]);

function getCategoryName(group) {
  switch (group) {
    case 'climate': return '气候与性能';
    case 'category': return '品类与选型';
    case 'guide': return '选购与避坑';
    case 'price': return '价格与渠道';
    case 'b2b': return 'B端与工程';
    case 'brand': return '本地与口碑';
    default: return '门业百科';
  }
}

// Generate articles HTML
const articlesHtml = articles.map(art => {
  const readTime = Math.max(3, Math.min(8, Math.round(art.summary.length / 30) + 2));
  return `
    <article class="article-item-card" data-category="${art.categoryGroup}" data-title="${art.title.toLowerCase()}" data-summary="${art.summary.toLowerCase()}" data-section="${art.section}">
      <div class="article-card-header">
        <span class="category-badge ${art.badgeClass}">${art.section}</span>
        <span class="article-card-date">📅 ${art.date}</span>
      </div>
      <h3 class="article-card-title">
        <a href="${art.url}" style="text-decoration:none;color:inherit;">${art.title}</a>
      </h3>
      <p class="article-card-summary">${art.summary || '详细分析惠州本地门类选材、生产工艺、防潮处理与工程交付细节，工厂一手实操经验总结。'}</p>
      <div class="article-card-footer">
        <div class="article-author-tag">
          <span>🏭 美创门业技术部</span>
          <span>·</span>
          <span>⏱️ 约 ${readTime} 分钟阅读</span>
        </div>
        <a href="${art.url}" class="read-more-text">阅读全文 →</a>
      </div>
    </article>
  `.trim();
}).join('\n');

// Featured HTML
const featuredHtml = featuredArticles.map((art, idx) => {
  const tags = ["🔥 回南天必看", "⭐ 选门不踩坑", "💰 省30%差价"];
  return `
    <a href="${art.url}" class="featured-card">
      <div>
        <span class="featured-card-tag">${tags[idx]}</span>
        <h4 class="featured-card-title">${art.title}</h4>
        <p class="featured-card-desc">${art.summary}</p>
      </div>
      <div class="featured-card-footer">
        <span>🏷️ ${art.section}</span>
        <span class="featured-read-link">查看干货 →</span>
      </div>
    </a>
  `.trim();
}).join('\n');

// Top 5 HTML
const top5Html = top5Articles.map((art, i) => `
  <li style="display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px dashed #E2E8F0;font-size:13px;line-height:1.5;">
    <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:4px;background:${i < 3 ? 'var(--brand-accent)' : '#F1F5F9'};color:${i < 3 ? '#FFFFFF' : '#64748B'};font-weight:bold;font-size:11px;flex-shrink:0;">${i + 1}</span>
    <a href="${art.url}" style="color:var(--text-body);text-decoration:none;font-weight:500;" onmouseover="this.style.color='var(--brand-accent)'" onmouseout="this.style.color='var(--text-body)'">${art.title}</a>
  </li>
`).join('\n');

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>美创门业官方博客 — 惠州门业知识百科 | 选门避坑与工厂直供指南</title>
  <meta name="description" content="美创门业官方知识百科：29篇深度门业原创文章，涵盖惠州回南天防潮选门、实木门/铝木门/极窄极简门对比、全屋门墙柜定制避坑、旧房无损换门、B端楼盘与酒店批量工程供应等本地干货。" />
  <meta name="keywords" content="美创门业博客,惠州门业知识,回南天选门,惠州木门厂家,铝木门实木门对比,旧房换门,工程门采购,门墙柜一体化" />
  <link rel="canonical" href="https://meichuangmenye.com/pages/blog/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="美创门业官方博客 — 惠州门业知识百科" />
  <meta property="og:description" content="29篇惠州本土门业知识原创干货，针对南方潮湿气候、家装避坑、工程直供全解答。" />
  <meta property="og:url" content="https://meichuangmenye.com/pages/blog/" />
  <meta property="og:site_name" content="美创门业" />
  <meta name="dateModified" content="2026-09-17" />
  <link rel="stylesheet" href="/pages/blog/blog.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "美创门业官方博客",
    "description": "惠州本土门类生产工厂知识百科，包含29篇涵盖防潮工艺、产品选购、工程定制的原创指南。",
    "url": "https://meichuangmenye.com/pages/blog/",
    "publisher": {
      "@type": "Organization",
      "name": "惠州市美创门业有限公司",
      "url": "https://meichuangmenye.com",
      "telephone": "13554866836",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "潼侨镇新城山庄A8号铂金实业",
        "addressLocality": "惠州市仲恺高新区",
        "addressRegion": "广东省",
        "addressCountry": "CN"
      }
    }
  }
  </script>
</head>
<body>
  <!-- 顶部阅读进度条 -->
  <div id="reading-progress-bar"></div>

  <!-- 顶部导航 -->
  <header class="site-header">
    <div class="header-container">
      <a href="https://meichuangmenye.com/" class="brand-brand-wrap">
        <img src="/assets/logo_dark.png" alt="美创门业" class="brand-logo-img" onerror="this.style.display='none'" />
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

  <!-- Hero 介绍区 -->
  <section class="blog-hero">
    <div class="hero-inner">
      <div class="hero-badge">
        <span>🏭</span> 惠州仲恺本土实体门厂 · 29 篇一线原创实战指南
      </div>
      <h1 class="hero-title">美创门业知识百科 · 选门与避坑全指南</h1>
      <p class="hero-subtitle">
        针对南方回南天高湿气候、旧房无损换门、全屋门墙柜一体化定制、写字楼酒店批量工程采购，源头工厂师傅为您系统拆解选材标准、避坑细节与真实成本。
      </p>

      <!-- 实时搜索框 -->
      <div class="hero-search-box">
        <span class="hero-search-icon">🔍</span>
        <input 
          type="text" 
          id="searchInput" 
          class="hero-search-input" 
          placeholder="搜索关键词，如：回南天、铝木门、实木烤漆、旧房翻新、价格、工程..." 
          autocomplete="off"
        />
      </div>

      <!-- 统计指标条 -->
      <div class="hero-stats-row">
        <div class="hero-stat-item">
          <span>📚 原创文章</span>
          <strong>29 篇</strong>
        </div>
        <span>•</span>
        <div class="hero-stat-item">
          <span>🪵 覆盖品类</span>
          <strong>4 大系列</strong>
        </div>
        <span>•</span>
        <div class="hero-stat-item">
          <span>🌧️ 气候优化</span>
          <strong>回南天防潮专属</strong>
        </div>
        <span>•</span>
        <div class="hero-stat-item">
          <span>🏷️ 工厂直供</span>
          <strong>省中间差价 30%</strong>
        </div>
      </div>
    </div>
  </section>

  <!-- 吸顶分类筛选导航 -->
  <div class="category-nav-bar">
    <div class="category-nav-container">
      <button class="filter-btn active" data-filter="all">全部文章 (29)</button>
      <button class="filter-btn" data-filter="climate">🌧️ 气候与性能 (2)</button>
      <button class="filter-btn" data-filter="category">🚪 品类与选型 (6)</button>
      <button class="filter-btn" data-filter="guide">💡 选购与避坑 (5)</button>
      <button class="filter-btn" data-filter="price">💰 价格与渠道 (2)</button>
      <button class="filter-btn" data-filter="b2b">🏗️ B端与工程 (7)</button>
      <button class="filter-btn" data-filter="brand">⭐ 本地与口碑 (7)</button>
    </div>
  </div>

  <!-- 主体内容布局 -->
  <main class="main-layout">
    <!-- 精选头条模块 -->
    <section class="featured-section" id="featuredSection">
      <div class="section-header">
        <h2 class="section-title">精选深度推荐</h2>
        <span style="font-size:13px;color:var(--text-secondary);">惠州业主与工程采购必读</span>
      </div>
      <div class="featured-cards-grid">
        ${featuredHtml}
      </div>
    </section>

    <!-- 列表与侧边栏两列布局 -->
    <div class="content-grid">
      <!-- 文章列表流 -->
      <div class="articles-column">
        <div class="section-header">
          <h2 class="section-title">
            <span id="currentFilterTitle">全部文章</span>
            <span id="articlesCountBadge" style="font-size:13px;font-weight:normal;color:var(--text-secondary);margin-left:8px;">(共 29 篇)</span>
          </h2>
          <span style="font-size:12px;color:var(--text-light);" id="searchResultFeedback"></span>
        </div>

        <div class="articles-stream" id="articlesContainer">
          ${articlesHtml}
        </div>

        <!-- 空搜索提示 -->
        <div id="noResults" style="display:none;background:#FFFFFF;border:1px dashed var(--border-card);border-radius:var(--radius-md);padding:48px 24px;text-align:center;">
          <div style="font-size:36px;margin-bottom:12px;">🔍</div>
          <h3 style="font-size:18px;color:var(--text-title);margin-bottom:8px;">未找到匹配文章</h3>
          <p style="font-size:14px;color:var(--text-secondary);margin-bottom:16px;">您可以换个简短关键词搜索，或直接致电工厂技术顾问免费咨询。</p>
          <a href="tel:13554866836" class="nav-phone-btn" style="display:inline-flex;">📞 电话直接咨询：13554866836</a>
        </div>
      </div>

      <!-- 右侧边栏 -->
      <aside class="blog-sidebar">
        <!-- 工厂直供咨询卡片 -->
        <div class="factory-card-widget">
          <span class="factory-badge-top">实体源头工厂</span>
          <h3 class="factory-title">惠州美创门业</h3>
          <p class="factory-desc">
            惠州仲恺高新区实体门类生产制造基地，主营入户防盗门、实木烤漆门、铝木复合门、极简玻璃门。
          </p>
          <ul class="factory-points">
            <li>惠州全域免费上门勘测量尺</li>
            <li>工厂直供无中间商差价，立省约30%</li>
            <li>E0级环保基材，六面防潮封漆工艺</li>
            <li>自有安装维保师傅，5年五金质保</li>
          </ul>
          <a href="tel:13554866836" class="factory-hotline-btn">
            <span>📞</span> 电话直通：13554866836
          </a>
          <div class="factory-qr-box">
            <img src="/assets/wechat_qr.png" alt="官方微信" class="factory-qr-img" onerror="this.style.background='#fff'" />
            <div class="factory-qr-text">
              <strong>扫码添加工厂客服微信</strong>
              <span>发图询价 · 免费获取全屋搭配方案</span>
            </div>
          </div>
        </div>

        <!-- Top 5 必读排行榜 -->
        <div class="sidebar-widget">
          <h3 class="widget-title">
            <span>🔥</span> 本地热搜 Top 5 必读
          </h3>
          <ul style="list-style:none;margin:0;padding:0;">
            ${top5Html}
          </ul>
        </div>

        <!-- 热门标签云 -->
        <div class="sidebar-widget">
          <h3 class="widget-title">
            <span>🏷️</span> 热门搜索标签
          </h3>
          <div class="tag-cloud">
            <a href="javascript:void(0)" class="tag-cloud-item" onclick="filterByTag('回南天')">🌧️ 回南天防潮</a>
            <a href="javascript:void(0)" class="tag-cloud-item" onclick="filterByTag('铝木门')">🚪 铝木复合门</a>
            <a href="javascript:void(0)" class="tag-cloud-item" onclick="filterByTag('极窄')">🔲 极窄极简门</a>
            <a href="javascript:void(0)" class="tag-cloud-item" onclick="filterByTag('实木烤漆')">🌳 实木烤漆门</a>
            <a href="javascript:void(0)" class="tag-cloud-item" onclick="filterByTag('旧房')">🔨 旧房无损换门</a>
            <a href="javascript:void(0)" class="tag-cloud-item" onclick="filterByTag('工程')">🏢 楼盘工程门</a>
            <a href="javascript:void(0)" class="tag-cloud-item" onclick="filterByTag('门墙柜')">📐 门墙柜一体化</a>
            <a href="javascript:void(0)" class="tag-cloud-item" onclick="filterByTag('非标')">📏 非标尺寸定制</a>
          </div>
        </div>

        <!-- 厂区地址卡片 -->
        <div class="sidebar-widget" style="font-size:13px;color:var(--text-secondary);line-height:1.7;">
          <h3 class="widget-title">
            <span>📍</span> 实体工厂地址
          </h3>
          <p style="margin-bottom:8px;"><strong>厂区地址：</strong>惠州市仲恺高新区潼侨镇新城山庄A8号铂金实业</p>
          <p style="margin-bottom:8px;"><strong>服务辐射：</strong>惠城、仲恺、惠阳、大亚湾、博罗、惠东及深莞、香港</p>
          <p><strong>接待时间：</strong>周一至周日 08:30 - 18:30（欢迎实地验厂看样）</p>
        </div>
      </aside>
    </div>

    <!-- 底部全宽预约横幅 -->
    <div class="cta-banner">
      <h3>正在装修选门？或者有楼盘/工装工程批量需求？</h3>
      <p>
        惠州市美创门业有限公司拥有数控加工生产线，支持非标定制、全屋门墙柜同色配套、防火门资质报审。实体工厂直营直通，品质有保障。
      </p>
      <div class="cta-banner-buttons">
        <a href="tel:13554866836" class="cta-primary-btn">
          <span>📞</span> 立即致电工厂：13554866836
        </a>
        <a href="https://meichuangmenye.com/about.html" class="cta-secondary-btn">
          <span>🏭</span> 查看企业资质与车间实拍
        </a>
      </div>
    </div>
  </main>

  <!-- 底部页脚 -->
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-info-row">
        <strong>惠州市美创门业有限公司</strong> · 惠州市仲恺高新区潼侨镇新城山庄A8号铂金实业 · 统一社会信用代码：91441300MA56BFAB00
      </div>
      <div class="footer-info-row">
        <a href="https://meichuangmenye.com/">官网首页</a> · 
        <a href="https://meichuangmenye.com/about.html">关于我们</a> · 
        <a href="https://meichuangmenye.com/pages/blog/">门业百科</a> · 
        <a href="tel:13554866836">咨询电话：13554866836</a>
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

  <!-- 移动端吸底操作条 -->
  <div class="mobile-sticky-bar">
    <div class="mobile-bar-inner">
      <a href="tel:13554866836" class="mobile-phone-btn">📞 电话咨询工厂</a>
      <a href="https://meichuangmenye.com/" class="mobile-home-btn">🏠 访问官网首页</a>
    </div>
  </div>

  <!-- 返回顶部按钮 -->
  <button class="back-to-top-btn" id="backToTop" title="返回顶部">↑</button>

  <!-- 客户端交互脚本 -->
  <script>
    // 进度条
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

    // 交互式搜索与分类过滤
    var currentFilter = 'all';
    var searchInput = document.getElementById('searchInput');
    var filterBtns = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.article-item-card');
    var noResults = document.getElementById('noResults');
    var countBadge = document.getElementById('articlesCountBadge');
    var feedback = document.getElementById('searchResultFeedback');
    var titleElem = document.getElementById('currentFilterTitle');
    var featuredSection = document.getElementById('featuredSection');

    function applyFilterAndSearch() {
      var keyword = searchInput.value.trim().toLowerCase();
      var visibleCount = 0;

      cards.forEach(function(card) {
        var cat = card.getAttribute('data-category');
        var title = card.getAttribute('data-title');
        var summary = card.getAttribute('data-summary');
        var section = card.getAttribute('data-section');

        var matchesCat = (currentFilter === 'all') || (cat === currentFilter);
        var matchesSearch = !keyword || (title.indexOf(keyword) !== -1) || (summary.indexOf(keyword) !== -1) || (section.indexOf(keyword) !== -1);

        if (matchesCat && matchesSearch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }

      countBadge.innerText = '(显示 ' + visibleCount + ' / 29 篇)';

      if (keyword) {
        feedback.innerText = '关键词 "' + keyword + '" 的检索结果';
        if (featuredSection) featuredSection.style.display = 'none';
      } else {
        feedback.innerText = '';
        if (featuredSection && currentFilter === 'all') featuredSection.style.display = 'block';
        else if (featuredSection) featuredSection.style.display = 'none';
      }
    }

    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        titleElem.innerText = btn.innerText.split(' ')[1] || '文章列表';
        applyFilterAndSearch();
      });
    });

    searchInput.addEventListener('input', function() {
      applyFilterAndSearch();
    });

    window.filterByTag = function(tag) {
      searchInput.value = tag;
      applyFilterAndSearch();
      window.scrollTo({ top: document.getElementById('articlesContainer').offsetTop - 120, behavior: 'smooth' });
    };
  </script>
</body>
</html>
`;

fs.writeFileSync("public/pages/blog/index.html", html);
console.log("Successfully generated public/pages/blog/index.html");
