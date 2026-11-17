(() => {
  const header = document.querySelector('header.site');
  const links = Array.from(header.querySelectorAll('nav a[href^="#"]'));
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  let pending = false;
  function update() {
    pending = false;
    const offset = Math.max(header.getBoundingClientRect().bottom + 48, parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
    let active = -1;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= offset + 1) active = index;
    });
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) active = links.length - 1;
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  window.addEventListener('pageshow', schedule);
  update();
})();
