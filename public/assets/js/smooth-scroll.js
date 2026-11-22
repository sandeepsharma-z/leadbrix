/* ============================================================
   LEADBRIX — Smooth Scroll (Lenis)
   Desktop only — native scroll on mobile/tablet
   ============================================================ */

export function initSmoothScroll() {
  const isDesktop = window.matchMedia('(min-width: 1025px) and (pointer: fine)').matches;
  if (!isDesktop) return;

  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded');
    return;
  }

  const lenis = new Lenis({
    duration: 0.6,                          // ← keep it short, snappy response
    easing: (t) => 1 - Math.pow(1 - t, 3), // ← easeOutCubic, light and fast
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,                   // ← default, no boost needed
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // ── GSAP path ──────────────────────────────────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    
    // CRITICAL: Tell ScrollTrigger to use Lenis scroll values, not window
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    lenis.on('scroll', () => ScrollTrigger.update());

    // Use ONLY gsap ticker — do NOT run a separate RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

  } else {
    // ── No GSAP — simple RAF loop ───────────────────────────
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  window.__lenis = lenis;
}