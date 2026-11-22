"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BrandLogo() {
  return (
    <img className="header-brand-logo" src="/images/leadbrix-logo.png" alt="Leadbrix — Built for growth. Driven by results." />
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const frame = useRef(null);

  useEffect(() => {
    const updateHeader = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(
          window.scrollY || 0,
          window.pageYOffset || 0,
          document.documentElement?.scrollTop || 0,
          document.body?.scrollTop || 0
        );
        const homeHero = pathname === "/" ? document.querySelector("#home .hero-carousel") : null;
        const homeHeroMoved = homeHero ? homeHero.getBoundingClientRect().top < -20 : false;
        const movement = currentScrollY - lastScrollY.current;
        setScrolled(currentScrollY > 24 || homeHeroMoved);
        if (currentScrollY <= 20) setHidden(false);
        else if (Math.abs(movement) > 7) setHidden(movement > 0 && currentScrollY > 110);
        lastScrollY.current = currentScrollY;
        frame.current = null;
      });
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    document.addEventListener("scroll", updateHeader, { passive: true, capture: true });
    window.addEventListener("touchmove", updateHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeader);
      document.removeEventListener("scroll", updateHeader, { capture: true });
      window.removeEventListener("touchmove", updateHeader);
      if (frame.current) window.cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => { if (menuOpen) setHidden(false); }, [menuOpen]);

  return (
    <header className={`site-header ${pathname === "/" ? "is-home" : ""} ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""}`}>
      <Link href="/" aria-label="LeadBrix home"><BrandLogo /></Link>
      <nav id="primary-navigation" className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
        <Link className={pathname === "/" ? "active" : undefined} href="/">Home</Link>
        <Link className={pathname?.startsWith("/services") ? "active" : undefined} href="/services">Services</Link>
        <Link href="/#work">Work</Link>
        <Link className={pathname === "/about" ? "active" : undefined} href="/about">About</Link>
        <Link className={pathname?.startsWith("/blog") ? "active" : undefined} href="/blog">Blog</Link>
        <Link className={pathname === "/contact" ? "active" : undefined} href="/contact">Contact</Link>
      </nav>
      <div className="site-header__actions">
        <Link className="pill-button header-button" href="/contact">Get a Free Consultation <span><ArrowIcon /></span></Link>
        <button className="site-header__menu" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((value) => !value)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
