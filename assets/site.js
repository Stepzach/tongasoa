(() => {
  'use strict';
  const root = document.documentElement;
  const nav = document.querySelector('#site-nav');
  const toggle = document.querySelector('.menu-toggle');
  const backdrop = document.querySelector('.menu-backdrop');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const mobile = matchMedia('(max-width: 930px)');
  const textNodes = [...document.querySelectorAll('[data-en]')];
  const images = [...document.querySelectorAll('img[data-alt-en]')];
  const langButtons = [...document.querySelectorAll('[data-lang]')];
  const titles = {
    fr: 'Tongasoa Zazakely — Aider les enfants à Madagascar',
    en: 'Tongasoa Zazakely — Supporting children in Madagascar'
  };
  const descriptions = {
    fr: 'Tongasoa Zazakely soutient les enfants à Madagascar, notamment à Antananarivo. Découvrez nos actions et le projet de vacances de 2027.',
    en: 'Tongasoa Zazakely supports children in Madagascar, especially in Antananarivo. Discover our work and the planned 2027 trip.'
  };

  for (const node of textNodes) node.dataset.fr = node.textContent;
  for (const image of images) image.dataset.altFr = image.alt;

  function updateMenuLabel() {
    const open = nav.classList.contains('is-open') && mobile.matches;
    const english = root.lang === 'en';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', english ? (open ? 'Close menu' : 'Open menu') : (open ? 'Fermer le menu' : 'Ouvrir le menu'));
  }
  function setMenuOpen(value, restoreFocus = false) {
    const open = Boolean(value) && mobile.matches;
    nav.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-visible', open);
    document.body.classList.toggle('menu-open', open);
    main.inert = open;
    footer.inert = open;
    updateMenuLabel();
    if (open) nav.querySelector('a')?.focus({preventScroll:true});
    else if (restoreFocus) toggle.focus({preventScroll:true});
  }
  toggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('is-open')));
  backdrop.addEventListener('click', () => setMenuOpen(false, true));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (!nav.classList.contains('is-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); setMenuOpen(false, true); }
    if (event.key === 'Tab') {
      const items = [toggle, ...nav.querySelectorAll('a, button:not([disabled])')];
      const current = items.indexOf(document.activeElement);
      const next = event.shiftKey ? (current <= 0 ? items.length - 1 : current - 1) : (current === items.length - 1 ? 0 : current + 1);
      event.preventDefault();
      items[next].focus();
    }
  });
  mobile.addEventListener('change', () => setMenuOpen(false));
  window.addEventListener('hashchange', () => setMenuOpen(false));

  function setLanguage(lang) {
    const selected = lang === 'en' ? 'en' : 'fr';
    root.lang = selected;
    nav.setAttribute('aria-label', selected === 'en' ? 'Primary navigation' : 'Navigation principale');
    for (const node of textNodes) node.textContent = node.dataset[selected];
    for (const image of images) image.alt = image.dataset[selected === 'en' ? 'altEn' : 'altFr'];
    for (const button of langButtons) {
      const active = button.dataset.lang === selected;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    document.title = titles[selected];
    document.querySelector('meta[name="description"]').content = descriptions[selected];
    document.querySelector('meta[property="og:title"]').content = titles[selected];
    document.querySelector('meta[property="og:description"]').content = descriptions[selected];
    document.querySelector('meta[property="og:locale"]').content = selected === 'en' ? 'en_GB' : 'fr_FR';
    updateMenuLabel();
  }
  let initialLanguage = 'fr';
  try { initialLanguage = localStorage.getItem('tongasoa-language') || 'fr'; } catch (_) { /* optional */ }
  setLanguage(initialLanguage);
  for (const button of langButtons) button.addEventListener('click', () => {
    const lang = button.dataset.lang;
    setLanguage(lang);
    try { localStorage.setItem('tongasoa-language', lang); } catch (_) { /* optional */ }
  });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
