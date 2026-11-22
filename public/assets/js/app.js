/* ============================================================
   LEADBRIX — App Entry Point
   Initializes all modules after DOM ready
   ============================================================ */

import { initCursor }      from './cursor.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initHero }        from './hero.js';
import { initAnimations }  from './animations.js';
import { initThreeScene }  from './three-scene.js';

document.addEventListener('DOMContentLoaded', () => {

  // 1. Page loader
  const loader = document.querySelector('.page-loader');

  // 2. Boot sequence
  // Local mirror: boot after DOM ready so third-party widgets cannot hold the loader open.
    setTimeout(() => {
      loader?.classList.add('is-hidden');

      // Init all modules
      initCursor();
      initSmoothScroll();
      initThreeScene();
      initHero();
      initAnimations();

    }, 600);

  // 3. Scroll progress bar
  const progress = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
  }, { passive: true });

  // 4. Navbar scroll state
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });

  // 5. Hamburger (mobile)
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileNav = document.querySelector('.navbar__nav');
  hamburger?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    // Animate hamburger → X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // 6. Dropdown menus
  const dropdownItems = document.querySelectorAll('[data-has-dropdown]');

  dropdownItems.forEach(item => {
    const link     = item.querySelector('.navbar__nav-link');
    const dropdown = item.querySelector('.navbar__dropdown');

    // Desktop: hover
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) openDropdown(item, link);
    });
    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) closeDropdown(item, link);
    });

    // Mobile/keyboard: click toggle
    link?.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const isOpen = item.classList.toggle('is-open');
        link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-has-dropdown]')) {
      dropdownItems.forEach(item => {
        const link = item.querySelector('.navbar__nav-link');
        closeDropdown(item, link);
      });
    }
  });

  // Keyboard: Escape closes dropdown
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownItems.forEach(item => {
        const link = item.querySelector('.navbar__nav-link');
        closeDropdown(item, link);
      });
    }
  });

  function openDropdown(item, link) {
    // Close all others first
    dropdownItems.forEach(other => {
      if (other !== item) closeDropdown(other, other.querySelector('.navbar__nav-link'));
    });
    item.classList.add('is-open');
    link?.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown(item, link) {
    item.classList.remove('is-open');
    link?.setAttribute('aria-expanded', 'false');
  }
});
