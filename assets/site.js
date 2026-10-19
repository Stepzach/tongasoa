(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('header');
  const nav = document.getElementById('primary-nav');
  const toggle = document.querySelector('.menu-toggle');
  const backdrop = document.querySelector('.menu-backdrop');
  const main = document.getElementById('main');
  const footer = document.querySelector('footer');
  const viewport = matchMedia('(max-width: 960px)');
  const translated = [...document.querySelectorAll('[data-en]')];
  const pictures = [...document.querySelectorAll('img[data-alt-en]')];
  const languages = [...document.querySelectorAll('[data-lang]')];
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogLocale = document.querySelector('meta[property="og:locale"]');

  for (const node of translated) node.dataset.fr = node.textContent;
  for (const image of pictures) image.dataset.altFr = image.alt;

  function syncHeaderHeight() {
    root.style.setProperty('--header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
  }
  if ('ResizeObserver' in window) new ResizeObserver(syncHeaderHeight).observe(header);
  window.addEventListener('resize', syncHeaderHeight, { passive: true });
  syncHeaderHeight();

  function updateMenuLabel() {
    const open = viewport.matches && nav.classList.contains('is-open');
    const english = root.lang === 'en';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', english
      ? (open ? 'Close menu' : 'Open menu')
      : (open ? 'Fermer le menu' : 'Ouvrir le menu'));
  }

  function setMenuOpen(shouldOpen, restoreFocus = false) {
    const open = Boolean(shouldOpen) && viewport.matches;
    nav.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-visible', open);
    document.body.classList.toggle('menu-open', open);
    main.inert = open;
    footer.inert = open;
    updateMenuLabel();
    if (open) nav.querySelector('a')?.focus({ preventScroll: true });
    else if (restoreFocus) toggle.focus({ preventScroll: true });
  }

  toggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('is-open')));
  backdrop.addEventListener('click', () => setMenuOpen(false, true));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (!nav.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenuOpen(false, true);
    } else if (event.key === 'Tab') {
      const focusable = [toggle, ...nav.querySelectorAll('a, button:not([disabled])')];
      const current = focusable.indexOf(document.activeElement);
      const next = event.shiftKey
        ? (current <= 0 ? focusable.length - 1 : current - 1)
        : (current === focusable.length - 1 ? 0 : current + 1);
      event.preventDefault();
      focusable[next].focus();
    }
  });
  viewport.addEventListener('change', () => setMenuOpen(false));
  window.addEventListener('hashchange', () => setMenuOpen(false));

  function setLanguage(language) {
    const english = language === 'en';
    root.lang = english ? 'en' : 'fr';
    nav.setAttribute('aria-label', english ? 'Primary navigation' : 'Navigation principale');
    for (const node of translated) node.textContent = english ? node.dataset.en : node.dataset.fr;
    for (const picture of pictures) picture.alt = english ? picture.dataset.altEn : picture.dataset.altFr;
    for (const button of languages) {
      const selected = button.dataset.lang === language;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    }
    const title = english
      ? 'Tongasoa Zazakely — Supporting children in Madagascar'
      : 'Tongasoa Zazakely — Soutenir les enfants à Madagascar';
    const summary = english
      ? 'Tongasoa Zazakely supports children in Madagascar. Explore our work, our projects and how donations are used.'
      : 'Tongasoa Zazakely soutient des enfants à Madagascar. Découvrez nos actions, nos projets et comment les dons sont utilisés.';
    document.title = title;
    description.content = summary;
    ogTitle.content = title;
    ogDescription.content = summary;
    ogLocale.content = english ? 'en_GB' : 'fr_FR';
    updateMenuLabel();
  }

  let savedLanguage = 'fr';
  try { savedLanguage = localStorage.getItem('tongasoa-language') || 'fr'; } catch (_) { /* Storage is optional. */ }
  setLanguage(savedLanguage);
  for (const button of languages) {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.lang);
      try { localStorage.setItem('tongasoa-language', button.dataset.lang); }
      catch (_) { /* Language still changes for this visit. */ }
    });
  }

})();
