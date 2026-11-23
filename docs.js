(() => {
  const launcher = [
    { route: 'getting-started', title: 'Getting started', zh: '新手入门' },
    { route: 'before-redemption', title: 'Before redemption', zh: '兑换前须知' },
    { route: 'enable-tpm', title: 'TPM 2.0 setup', zh: 'TPM 2.0 设置' },
    { route: 'troubleshooting', title: 'Launcher troubleshooting', zh: '启动器故障排查' },
  ];
  const wow = [
    { route: 'wow', file: 'wow.md', title: 'WoW overview', zh: '魔兽世界概览', zhFile: 'zh/README.md' },
    { route: 'wow-scripts', title: 'Scripts & management' },
    { route: 'wow-launch', title: 'Launching WoW' },
    { route: 'wow-troubleshooting', title: 'WoW troubleshooting' },
  ];
  const overwatch = [
    { route: 'overwatch', title: 'Overwatch overview' },
    { route: 'overwatch-setup', title: 'First steps & calibration' },
    { route: 'overwatch-hero-schemes', title: 'Hero schemes' },
    { route: 'overwatch-combos', title: 'Skills, combos and alerts' },
    { route: 'overwatch-display', title: 'Visuals and display' },
    { route: 'overwatch-settings', title: 'Settings and profiles' },
  ];
  const zhGuides = [wow[0], ...launcher];
  const launcherRoutes = new Set(launcher.map(g => g.route));
  const legacyWowTroubleshootingIds = new Set([
    'error-430-no-script-location-set',
    'injection-failed-try-again',
    'rotation-not-loading',
    'unsupported-wow-version',
  ]);
  const home = { route: '', file: 'README.md', title: 'Documentation overview' };

  const root = document.documentElement;
  const guideNav = document.querySelector('#guide-nav');
  const outline = document.querySelector('#page-outline');
  const language = document.querySelector('#language');
  const navToggle = document.querySelector('.nav-toggle');
  const searchOpen = document.querySelector('#search-open');
  const search = document.querySelector('#doc-search');
  const query = document.querySelector('#search-query');
  const results = document.querySelector('#search-results');
  const status = document.querySelector('#search-status');
  const progressBar = document.querySelector('#reading-progress');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cache = new Map();
  let activeRoute;
  let revealObserver;
  let outlineHeadings = [];
  let outlineLinks = new Map();
  let scrollFrame = 0;

  /* ========================================================================
     LENIS SMOOTH SCROLL (matching wardengg.com physics & easing)
     ======================================================================== */
  const motionEase = 'cubic-bezier(.22, 1, .36, 1)';
  const glideEase = p => (p < .5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);
  let lenis = null;

  if (window.Lenis) {
    lenis = new window.Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.12,
      respectReducedMotion: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
      prevent: el => Boolean(el.closest?.('dialog, .guide-sidebar, .page-outline, pre, [data-no-smooth-scroll]')),
    });
    root.setAttribute('data-wgg-smooth-scroll', '');
    lenis.on('scroll', scheduleScrollUi);
  }

  function anchorOffsetY(target) {
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 96;
    const raw = target.getBoundingClientRect().top + window.scrollY - margin;
    const maxScroll = Math.max(0, document.scrollingElement.scrollHeight - root.clientHeight);
    return Math.round(Math.max(0, Math.min(maxScroll, raw)));
  }

  function scrollToTarget(target, { immediate = false } = {}) {
    if (!target) return;
    if (lenis) {
      lenis.resize();
      const y = anchorOffsetY(target);
      if (immediate || reducedMotion.matches) {
        lenis.scrollTo(y, { immediate: true });
      } else {
        const dist = Math.abs(y - window.scrollY);
        const duration = Math.min(.84, .32 + Math.sqrt(dist) * .006);
        lenis.scrollTo(y, { duration, easing: glideEase });
      }
    } else {
      target.scrollIntoView({ block: 'start', behavior: immediate || reducedMotion.matches ? 'instant' : 'smooth' });
    }
  }

  function scheduleScrollUi() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      updateScrollProgress();
      updateScrollSpy();
    });
  }

  function updateScrollProgress() {
    if (!progressBar) return;
    const max = document.scrollingElement.scrollHeight - root.clientHeight;
    if (max <= 120) {
      progressBar.dataset.visible = 'false';
      progressBar.style.transform = 'scaleX(0)';
      return;
    }
    const ratio = Math.max(0, Math.min(1, window.scrollY / max));
    progressBar.dataset.visible = ratio > 0.01 ? 'true' : 'false';
    progressBar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
  }

  function updateScrollSpy() {
    if (!outlineHeadings.length || outline.hidden) return;
    const threshold = window.scrollY + 148;
    let activeId = outlineHeadings[0].id;
    for (const h of outlineHeadings) {
      const top = h.getBoundingClientRect().top + window.scrollY;
      if (top <= threshold) activeId = h.id;
      else break;
    }
    for (const [id, linkEl] of outlineLinks) {
      if (id === activeId) linkEl.setAttribute('aria-current', 'location');
      else linkEl.removeAttribute('aria-current');
    }
  }

  window.addEventListener('scroll', scheduleScrollUi, { passive: true });
  window.addEventListener('resize', () => {
    lenis?.resize();
    scheduleScrollUi();
  }, { passive: true });

  /* Smooth in-page glide when clicking same-route outline or heading links */
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    if (!href.startsWith('#/')) return;
    const [targetRoute, queryPart] = href.split('?');
    const currentBase = (location.hash || '#/').split('?')[0];
    if (!queryPart || targetRoute !== currentBase) return;
    const id = new URLSearchParams(queryPart).get('id');
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    event.preventDefault();
    if (location.hash !== href) history.replaceState(null, '', href);
    scrollToTarget(target, { immediate: false });
  });

  /* ========================================================================
     WAAPI ENTRANCE & SCROLL REVEAL ANIMATIONS (matching site-motion.js)
     ======================================================================== */
  function animateArticle(article, { isRouteSwap, hasAnchor }) {
    revealObserver?.disconnect();
    revealObserver = undefined;
    if (reducedMotion.matches || !Element.prototype.animate) return;

    if (isRouteSwap && !hasAnchor) {
      article.animate(
        { opacity: [0.45, 1], translate: ['0 8px', '0 0'] },
        { duration: 240, easing: motionEase, fill: 'backwards' }
      );
    }

    const targets = new Map();
    const heroKids = article.querySelectorAll('.docs-hero > *');
    heroKids.forEach((el, i) => targets.set(el, { duration: 520, distance: 12, opacity: 0.48, delay: Math.min(i, 3) * 55 }));

    article.querySelectorAll('.product-card').forEach((el, i) => {
      targets.set(el, { duration: 520, distance: 14, opacity: 0.52, delay: i * 75 });
    });

    article.querySelectorAll('blockquote, pre, table, img, .adjacent-guides').forEach(el => {
      if (!targets.has(el)) {
        targets.set(el, { duration: 480, distance: 11, opacity: 0.58, delay: 0 });
      }
    });

    if (!targets.size || !window.IntersectionObserver) return;
    const played = new WeakSet();

    revealObserver = new IntersectionObserver(entries => {
      let batch = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        revealObserver?.unobserve(el);
        if (played.has(el)) continue;
        played.add(el);
        const cfg = targets.get(el);
        if (!cfg) continue;
        const delay = cfg.delay || Math.min(batch++, 2) * 45;
        el.animate(
          { opacity: [cfg.opacity, 1], translate: [`0 ${cfg.distance}px`, '0 0'] },
          { duration: cfg.duration, delay, easing: motionEase, fill: 'backwards' }
        );
      }
    }, { rootMargin: '0px 0px -32px 0px' });

    targets.forEach((_, el) => revealObserver.observe(el));
  }

  /* ========================================================================
     ROUTING, NAVIGATION, OUTLINE & SEARCH
     ======================================================================== */
  function currentRoute() {
    const route = location.hash.replace(/^#\//, '').split('?')[0].replace(/\/$/, '');
    const chinese = route === 'zh' || route.startsWith('zh/');
    const path = chinese ? route.replace(/^zh\/?/, '') : route;
    let product = 'home';
    if (path.split('-')[0] === 'overwatch') product = 'overwatch';
    else if (launcherRoutes.has(path)) product = 'launcher';
    else if (path === 'wow' || path.startsWith('wow-') || chinese) product = 'wow';
    return { product, chinese, path };
  }

  function urlFor(guide, chinese = false) {
    if (!chinese) return '#/' + guide.route;
    return '#/zh/' + (guide.route === 'wow' ? '' : guide.route);
  }

  function link(label, href) {
    const element = document.createElement('a');
    element.textContent = label;
    element.href = href;
    return element;
  }

  function navigationGroup(label, guides, state, chinese = false) {
    const group = document.createElement('section');
    const heading = document.createElement('h2');
    heading.textContent = label;
    group.append(heading);
    guides.forEach(guide => {
      const useZh = Boolean(chinese && guide.zh);
      const item = link(useZh ? guide.zh : guide.title, urlFor(guide, useZh));
      if (state.path === guide.route || (chinese && !state.path && guide.route === 'wow')) {
        item.setAttribute('aria-current', 'page');
      }
      group.append(item);
    });
    return group;
  }

  function updateNavigation(state) {
    const { product, chinese, path } = state;
    document.documentElement.lang = chinese ? 'zh-CN' : 'en';
    document.body.dataset.product = product;
    document.querySelectorAll('.product-nav [data-product]').forEach(tab => {
      if (tab.dataset.product === product) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
      if (tab.dataset.product === 'launcher') tab.href = chinese ? '#/zh/getting-started' : '#/getting-started';
      if (tab.dataset.product === 'wow') tab.href = chinese ? '#/zh/' : '#/wow';
    });
    language.lang = chinese ? 'en' : 'zh-CN';
    language.textContent = chinese ? 'English' : '简体中文';
    const hasZh = zhGuides.some(guide => guide.route === path) || product === 'home' || chinese;
    language.hidden = !hasZh;
    const equivalent = zhGuides.find(guide => guide.route === path) || zhGuides[0];
    language.href = urlFor(equivalent, !chinese);
    document.querySelector('.skip-link').textContent = chinese ? '跳至正文' : 'Skip to content';
    navToggle.textContent = chinese ? '浏览指南' : 'Browse guides';
    searchOpen.querySelector('span').textContent = chinese ? '搜索文档' : 'Search docs';

    guideNav.replaceChildren();
    guideNav.append(navigationGroup(chinese ? '启动器与电脑设置' : 'Launcher & PC Setup', launcher, state, chinese));
    guideNav.append(navigationGroup(chinese ? '魔兽世界' : 'World of Warcraft', wow, state, chinese));
    guideNav.append(navigationGroup('Overwatch 2', overwatch, state, false));
  }

  function updateArticle(article, state) {
    article.querySelector('.breadcrumbs')?.remove();
    article.querySelector('.adjacent-guides')?.remove();
    const heading = article.querySelector('h1');
    const title = heading?.textContent || 'Documentation';
    document.title = title === 'WardenGG Documentation' ? title : title + ' · WardenGG Docs';
    article.setAttribute('aria-label', title);
    article.querySelectorAll('.product-directory a[href$=".md"], .docs-hero a[href$=".md"]').forEach(item => {
      item.href = '#/' + item.getAttribute('href').slice(0, -3);
    });

    const pages = state.product === 'overwatch' ? overwatch : (state.product === 'launcher' ? launcher : wow);
    const current = pages.findIndex(page => page.route === state.path);
    const productName =
      state.product === 'overwatch' ? 'Overwatch 2' :
      state.product === 'launcher' ? (state.chinese ? '启动器与电脑设置' : 'Launcher & PC Setup') :
      (state.chinese ? '魔兽世界' : 'World of Warcraft');

    if (state.path && heading && !article.querySelector('.docs-hero')) {
      const breadcrumb = document.createElement('nav');
      breadcrumb.className = 'breadcrumbs';
      breadcrumb.setAttribute('aria-label', state.chinese ? '面包屑导航' : 'Breadcrumb');
      const sectionHome = pages[0];
      breadcrumb.append(
        link(state.chinese ? '文档' : 'Docs', '#/'),
        link(productName, urlFor(sectionHome, Boolean(state.chinese && sectionHome.zh)))
      );
      heading.before(breadcrumb);
    }

    const headings = [...article.querySelectorAll('h2[id], h3[id]')];
    outlineHeadings = headings;
    outlineLinks = new Map();
    outline.replaceChildren();
    outline.hidden = headings.length === 0 || state.product === 'home';
    if (!outline.hidden) {
      const nav = document.createElement('nav');
      const label = document.createElement('h2');
      label.textContent = state.chinese ? '本页内容' : 'On this page';
      nav.append(label);
      const base = (location.hash || '#/').split('?')[0];
      headings.forEach(section => {
        const item = link(section.textContent, base + '?id=' + encodeURIComponent(section.id));
        item.className = section.tagName === 'H3' ? 'outline-subsection' : '';
        outlineLinks.set(section.id, item);
        nav.append(item);
      });
      outline.append(nav);
    }

    if (state.product !== 'home' && current >= 0) {
      const next = document.createElement('nav');
      next.className = 'adjacent-guides';
      next.setAttribute('aria-label', state.chinese ? '相邻指南' : 'Adjacent guides');
      for (const offset of [-1, 1]) {
        const guide = pages[current + offset];
        if (!guide) continue;
        const useZh = Boolean(state.chinese && guide.zh);
        const item = link(useZh ? guide.zh : guide.title, urlFor(guide, useZh));
        const label = document.createElement('span');
        label.textContent = state.chinese ? (offset < 0 ? '上一篇' : '下一篇') : (offset < 0 ? 'Previous' : 'Next');
        item.prepend(label);
        item.dataset.direction = offset < 0 ? 'previous' : 'next';
        next.append(item);
      }
      if (next.childElementCount) article.append(next);
    }

    // Re-sync Lenis bounds when screenshots finish loading
    article.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', () => {
          lenis?.resize();
          scheduleScrollUi();
        }, { once: true });
      }
    });
  }

  function closeMobileNavigation() {
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', String(navToggle.getAttribute('aria-expanded') !== 'true'));
  });
  guideNav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMobileNavigation();
  });
  document.querySelector('.skip-link').addEventListener('click', () => {
    const heading = document.querySelector('.markdown-section h1');
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus();
  });

  function searchPages(chinese) {
    return [
      { ...home, label: 'Overview' },
      ...launcher.map(guide => ({ ...guide, label: 'Launcher & PC Setup' })),
      ...wow.map(guide => ({ ...guide, label: 'World of Warcraft' })),
      ...overwatch.map(guide => ({ ...guide, label: 'Overwatch 2' })),
      ...(chinese ? zhGuides.map(guide => ({
        ...guide, chinese: true, title: guide.zh, label: '中文文档',
        file: guide.zhFile || 'zh/' + guide.route + '.md',
      })) : []),
    ];
  }

  async function pageText(page) {
    const path = page.file || page.route + '.md';
    if (!cache.has(path)) cache.set(path, fetch(path).then(response => response.ok ? response.text() : '').catch(() => ''));
    return cache.get(path);
  }

  let searchRevision = 0;
  async function updateSearch() {
    const revision = ++searchRevision;
    const terms = query.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const chinese = currentRoute().chinese;
    results.replaceChildren();
    if (!terms.length) {
      status.textContent = '';
      return;
    }
    status.textContent = chinese ? '搜索中…' : 'Searching...';
    const hits = await Promise.all(searchPages(chinese).map(async page => {
      const body = (await pageText(page)).toLowerCase();
      const title = page.title.toLowerCase();
      return terms.every(term => title.includes(term) || body.includes(term))
        ? { page, relevance: terms.filter(term => title.includes(term)).length } : null;
    }));
    if (revision !== searchRevision) return;
    const matches = hits.filter(Boolean).sort((a, b) => b.relevance - a.relevance);
    for (const { page } of matches) {
      const item = document.createElement('li');
      const anchor = link(page.title, urlFor(page, page.chinese));
      const label = document.createElement('span');
      label.textContent = page.label;
      anchor.append(label);
      item.append(anchor);
      results.append(item);
    }
    status.textContent = matches.length ? '' : (chinese ? '没有找到结果。' : 'No matching guides.');
  }

  function openSearch() {
    const chinese = currentRoute().chinese;
    const label = chinese ? '搜索文档' : 'Search documentation';
    document.querySelector('#search-heading').textContent = label;
    const searchLabel = document.querySelector('label[for="search-query"]');
    searchLabel.textContent = label;
    query.placeholder = chinese ? '输入关键词' : 'Search by keyword';
    search.showModal();
    query.focus();
    updateSearch();
  }

  searchOpen.addEventListener('click', openSearch);
  query.addEventListener('input', updateSearch);
  results.addEventListener('click', event => {
    if (event.target.closest('a')) search.close();
  });
  search.addEventListener('click', event => {
    if (event.target === search) search.close();
  });
  window.addEventListener('keydown', event => {
    if (event.key !== '/' || search.open || event.ctrlKey || event.metaKey || event.altKey ||
        event.target.matches?.('input, textarea, select, [contenteditable="true"]')) return;
    event.preventDefault();
    openSearch();
  });

  window.$docsify = {
    auto2top: true,
    topMargin: 108,
    maxLevel: 3,
    plugins: [hook => {
      hook.doneEach(() => {
        const state = currentRoute();
        const queryString = location.hash.split('?')[1];
        const anchorId = queryString ? new URLSearchParams(queryString).get('id') : null;
        if (!state.chinese && state.path === 'troubleshooting' && anchorId && legacyWowTroubleshootingIds.has(anchorId)) {
          location.replace('#/wow-troubleshooting?id=' + encodeURIComponent(anchorId));
          return;
        }
        const article = document.querySelector('.markdown-section');
        const route = state.chinese + ':' + state.path;
        const isFirstLoad = activeRoute === undefined;
        const isRouteSwap = route !== activeRoute;
        if (isRouteSwap) closeMobileNavigation();
        activeRoute = route;
        updateNavigation(state);
        if (article) {
          updateArticle(article, state);
          animateArticle(article, { isRouteSwap, hasAnchor: Boolean(anchorId) });
        }
        requestAnimationFrame(() => {
          lenis?.resize();
          if (anchorId) {
            const target = document.getElementById(anchorId);
            if (target) scrollToTarget(target, { immediate: isFirstLoad });
          } else if (isRouteSwap && lenis) {
            lenis.scrollTo(0, { immediate: true });
          }
          scheduleScrollUi();
        });
      });
    }],
  };
  updateNavigation(currentRoute());
})();
