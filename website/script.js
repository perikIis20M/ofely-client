(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.querySelector('use').setAttribute('href', '/assets/icons.svg#Menu');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.querySelector('use').setAttribute('href', `/assets/icons.svg#${open ? 'X' : 'Menu'}`);
  });
  document.addEventListener('keydown', event => {if (event.key === 'Escape') closeMenu();});
  document.addEventListener('click', event => {if (!event.target.closest('.header')) closeMenu();});
  matchMedia('(min-width: 851px)').addEventListener('change', event => {if (event.matches) closeMenu();});

  const search = document.querySelector('#project-search');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.catalog-grid .project-card')];
  let category = 'All';
  function filterProjects() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      card.hidden = !((category === 'All' || card.dataset.category === category) && card.dataset.search.includes(query));
      if (!card.hidden) visible++;
    });
    document.querySelector('#catalog-count').textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    document.querySelector('.empty-state').hidden = visible !== 0;
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    const params = new URLSearchParams();
    if (category !== 'All') params.set('type', category);
    if (query) params.set('q', search.value.trim());
    history.replaceState(null, '', `${location.pathname}${params.size ? '?' + params : ''}`);
  }
  if (search) {
    const params = new URLSearchParams(location.search);
    const requested = params.get('type');
    if (filters.some(button => button.dataset.filter === requested)) category = requested;
    search.value = params.get('q') || '';
    search.addEventListener('input', filterProjects);
    filters.forEach(button => button.addEventListener('click', () => {category = button.dataset.filter; filterProjects();}));
    document.querySelector('#reset-filters').addEventListener('click', () => {category = 'All'; search.value = ''; filterProjects(); search.focus();});
    filterProjects();
  }
})();
