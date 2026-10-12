(() => {
  const menuButton = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('#site-navigation');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      menuButton.querySelector('span').textContent = open ? 'Close' : 'Menu';
      menuButton.querySelector('b').textContent = open ? '×' : '+';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false');
      menuButton.querySelector('span').textContent = 'Menu'; menuButton.querySelector('b').textContent = '+';
    }));
  }

  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scheduled = false;
  const updateScrub = () => {
    scheduled = false;
    if (!hero || !art || motionQuery.matches) return;
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
    art.style.setProperty('--scrub', progress.toFixed(3));
    art.style.transform = window.innerWidth <= 620 ? `translateY(${Math.round(progress * -10)}px)` : `translateY(calc(-50% + ${Math.round(progress * -24)}px))`;
  };
  const onScroll = () => { if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateScrub); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateScrub, { passive: true });
  motionQuery.addEventListener?.('change', updateScrub);
  updateScrub();

  const revealTargets = document.querySelectorAll('.section-heading, .project-card, .about-grid, .method-grid article, .skill-group, .contact-card');
  if ('IntersectionObserver' in window && !motionQuery.matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    revealTargets.forEach((el) => { el.classList.add('js-reveal'); observer.observe(el); });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
