/* ============================================================
   LEADBRIX — Hero Section Animations
   GSAP-powered reveal sequence
   ============================================================ */

export function initHero() {
  if (typeof gsap === 'undefined') {
    // Fallback: just show elements
    document.querySelectorAll('.hero__eyebrow, .hero__headline, .hero__subtext, .hero__actions, .float-card, .traffic-card, .hero__scroll')
      .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Navbar reveal
  tl.to('.navbar', {
    y: 0,
    opacity: 1,
    duration: 0.7,
    ease: 'power2.out',
  }, 0);

  // Eyebrow tag
  tl.to('.hero__eyebrow', {
    opacity: 1,
    y: 0,
    duration: 0.7,
  }, 0.15);

  // Headline — character split if Splitting.js loaded
  if (typeof Splitting !== 'undefined') {
    Splitting({ target: '.hero__headline', by: 'words' });
    const chars = document.querySelectorAll('.hero__headline .word');
    tl.to('.hero__headline', { opacity: 1, y: 0, duration: 0.01 }, 0.3);
    tl.fromTo(chars,
      { opacity: 0, y: 48, rotateZ: 3 },
      { opacity: 1, y: 0, rotateZ: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' },
    0.3);
  } else {
    tl.to('.hero__headline', { opacity: 1, y: 0, duration: 0.85 }, 0.3);
  }

  // Subtext
  tl.to('.hero__subtext', {
    opacity: 1,
    y: 0,
    duration: 0.7,
  }, 0.65);

  // CTA buttons
  tl.to('.hero__actions', {
    opacity: 1,
    y: 0,
    duration: 0.65,
  }, 0.82);

  // Left float cards (staggered)
  tl.to('.hero__float-left .float-card', {
    opacity: 1,
    x: 0,
    duration: 0.8,
    stagger: 0.18,
    ease: 'power3.out',
  }, 0.9);

  // Right traffic card
  tl.to('.traffic-card', {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: 'power3.out',
  }, 1.05);

  // Trigger bar animations
  tl.call(() => {
    document.querySelectorAll('.bar').forEach(bar => bar.classList.add('animate'));
  }, null, 1.3);

  // Scroll cue
  tl.to('.hero__scroll', {
    opacity: 1,
    duration: 0.6,
  }, 1.4);

  // Float animation classes after reveal
  tl.call(() => {
    document.querySelectorAll('.float-card').forEach(c => c.classList.add('is-visible'));
    document.querySelector('.traffic-card')?.classList.add('is-visible');
  }, null, 1.6);
}
