(() => {
  const wow = [
    { route: 'wow', file: 'wow.md', title: 'WoW overview', zh: '概览', zhFile: 'zh/README.md' },
    { route: 'before-redemption', title: 'Before redemption', zh: '兑换前须知' },
    { route: 'getting-started', title: 'Getting started', zh: '新手入门' },
    { route: 'enable-tpm', title: 'TPM 2.0 setup', zh: 'TPM 2.0 设置' },
    { route: 'troubleshooting', title: 'Troubleshooting', zh: '故障排查' },
  ];
  const overwatch = [
    { route: 'overwatch', title: 'Overwatch overview' },
    { route: 'overwatch-setup', title: 'Getting started' },
    { route: 'overwatch-hero-schemes', title: 'Hero schemes' },
    { route: 'overwatch-combos', title: 'Skills, combos and alerts' },
    { route: 'overwatch-display', title: 'Visuals and display' },
    { route: 'overwatch-settings', title: 'Settings and profiles' },
  ];
  const home = { route: '', file: 'README.md', title: 'Documentation overview' };
  const guideNav = document.querySelector('#guide-nav');
  const outline = document.querySelector('#page-outline');
  const language = document.querySelector('#language');
  const navToggle = document.querySelector('.nav-toggle');
  const searchOpen = document.querySelector('#search-open');
  const search = document.querySelector('#doc-search');
  const query = document.querySelector('#search-query');
  const results = document.querySelector('#search-results');
  const status = document.querySelector('#search-status');
  const cache = new Map();
  let activeRoute;

  function currentRoute() {
    const route = location.hash.replace(/^#\//, '').split('?')[0].replace(/\/$/, '');
    const chinese = route === 'zh' || route.startsWith('zh/');
    const path = chinese ? route.replace(/^zh\/?/, '') : route;
    const product = path.split('-')[0] === 'overwatch' ? 'overwatch' : chinese || path ? 'wow' : 'home';
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
      const item = link(chinese ? guide.zh : guide.title, urlFor(guide, chinese));
      if (state.path === guide.route || chinese && !state.path && guide.route === 'wow') {
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
      if (tab.dataset.product === 'wow') tab.href = chinese ? '#/zh/' : '#/wow';
    });
    language.lang = chinese ? 'en' : 'zh-CN';
    language.textContent = chinese ? 'English' : '简体中文';
    language.hidden = product === 'overwatch';
    const equivalent = wow.find(guide => guide.route === path) || wow[0];
    language.href = urlFor(equivalent, !chinese);
    document.querySelector('.skip-link').textContent = chinese ? '跳至正文' : 'Skip to content';
    navToggle.textContent = chinese ? '浏览指南' : 'Browse guides';
    searchOpen.querySelector('span').textContent = chinese ? '搜索文档' : 'Search docs';
    guideNav.replaceChildren();
    if (product !== 'overwatch') {
      guideNav.append(navigationGroup(chinese ? '魔兽世界' : 'World of Warcraft', wow, state, chinese));
    }
    if (product !== 'wow') guideNav.append(navigationGroup('Overwatch 2', overwatch, state));
  }

  function updateArticle(article, state) {
    article.querySelector('.breadcrumbs')?.remove();
    article.querySelector('.adjacent-guides')?.remove();
    const heading = article.querySelector('h1');
    const title = heading?.textContent || 'Documentation';
    document.title = title === 'WardenGG Documentation' ? title : title + ' · WardenGG Docs';
    article.setAttribute('aria-label', title);
    article.querySelectorAll('.product-directory a[href$=".md"]').forEach(item => {
      item.href = '#/' + item.getAttribute('href').slice(0, -3);
    });
    const pages = state.product === 'overwatch' ? overwatch : wow;
    const current = pages.findIndex(page => page.route === state.path);
    const productName = state.product === 'overwatch' ? 'Overwatch 2' : state.chinese ? '魔兽世界' : 'World of Warcraft';
    if (state.path && heading) {
      const breadcrumb = document.createElement('nav');
      breadcrumb.className = 'breadcrumbs';
      breadcrumb.setAttribute('aria-label', state.chinese ? '面包屑导航' : 'Breadcrumb');
      breadcrumb.append(link(state.chinese ? '文档' : 'Docs', '#/'), link(productName, urlFor(pages[0], state.chinese)));
      heading.before(breadcrumb);
    }

    const headings = [...article.querySelectorAll('h2[id], h3[id]')];
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
        const item = link(state.chinese ? guide.zh : guide.title, urlFor(guide, state.chinese));
        const label = document.createElement('span');
        label.textContent = state.chinese ? (offset < 0 ? '上一篇' : '下一篇') : (offset < 0 ? 'Previous' : 'Next');
        item.prepend(label);
        item.dataset.direction = offset < 0 ? 'previous' : 'next';
        next.append(item);
      }
      if (next.childElementCount) article.append(next);
    }
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
      { ...home, label: 'Documentation' },
      ...wow.map(guide => ({ ...guide, label: 'World of Warcraft' })),
      ...overwatch.map(guide => ({ ...guide, label: 'Overwatch 2' })),
      ...(chinese ? wow.map(guide => ({
        ...guide, chinese: true, title: guide.zh, label: '魔兽世界',
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
    status.textContent = chinese ? '搜索中…' : 'Searching…';
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
  window.addEventListener('keydown', event => {
    if (event.key !== '/' || search.open || event.ctrlKey || event.metaKey || event.altKey ||
        event.target.matches?.('input, textarea, select, [contenteditable="true"]')) return;
    event.preventDefault();
    openSearch();
  });

  window.$docsify = {
    auto2top: true,
    topMargin: 132,
    maxLevel: 3,
    plugins: [hook => {
      hook.doneEach(() => {
        const state = currentRoute();
        const article = document.querySelector('.markdown-section');
        const route = state.chinese + ':' + state.path;
        if (route !== activeRoute) closeMobileNavigation();
        activeRoute = route;
        updateNavigation(state);
        if (article) updateArticle(article, state);
      });
    }],
  };
  updateNavigation(currentRoute());
})();
