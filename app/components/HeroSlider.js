"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    badge: "Digital Marketing Agency",
    badgeIcon: "megaphone",
    lineOne: "Grow Your Business",
    lineTwo: "with",
    highlight: "Digital Marketing",
    copy: "Strategy, creativity, and data-driven marketing to get you more traffic, leads, and real business growth.",
    benefits: [["traffic", "More", "Traffic"], ["users", "Quality", "Leads"], ["rocket", "Higher", "Conversions"], ["layers", "Better", "ROI"]],
    image: "/images/home-redesign/hero-bg-digital-crimson-v1.png",
  },
  {
    badge: "Website Development",
    badgeIcon: "code",
    lineOne: "Build Your Business",
    lineTwo: "with",
    highlight: "Great Websites",
    copy: "Modern, responsive, and conversion-focused websites built to strengthen your brand and grow your business online.",
    benefits: [["mobile", "Mobile", "Responsive"], ["gauge", "Fast", "Loading"], ["search", "SEO", "Friendly"], ["rocket", "Conversion", "Ready"]],
    image: "/images/home-redesign/hero-bg-website-crimson-v1.png",
  },
  {
    badge: "Professional Video Editing",
    badgeIcon: "film",
    lineOne: "Tell Better Stories",
    lineTwo: "with",
    highlight: "Video Editing",
    copy: "Scroll-stopping edits, cinematic storytelling, and polished motion that keep your audience watching and taking action.",
    benefits: [["play", "Reels &", "Shorts"], ["camera", "Brand", "Videos"], ["sparkles", "Motion", "Graphics"], ["fourk", "4K", "Delivery"]],
    image: "/images/home-redesign/hero-bg-video-crimson-v1.png",
  },
  {
    badge: "Creative Graphic Designing",
    badgeIcon: "palette",
    lineOne: "Make Your Brand",
    lineTwo: "with",
    highlight: "Graphic Design",
    copy: "Distinctive visuals, memorable brand systems, and high-impact creatives designed to make your business stand out.",
    benefits: [["pen", "Brand", "Identity"], ["image", "Social", "Creatives"], ["layout", "Ad", "Designs"], ["layers", "Print", "Design"]],
    image: "/images/home-redesign/hero-bg-graphic-crimson-v1.png",
  },
];

function SliderIcon({ name, size = 24 }) {
  const paths = {
    megaphone: <><path d="M4 13.5v-3l11-5v13l-11-5Z" /><path d="M15 9.5c2 .4 3 1.5 3 2.5s-1 2.1-3 2.5M6.5 14.5l1.2 4h3l-1.7-5" /></>,
    traffic: <><path d="M5 20V10M12 20V4M19 20v-7" /><path d="M3 20h18" /></>,
    users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-4 2.5-6 6-6s6 2 6 6M14 15c3.8-.8 7 1 7 5" /></>,
    rocket: <><path d="M14 5c2.8-2.8 5.7-2.8 5.7-2.8S19.8 5 17 7.8l-5.5 5.5-4.8-4.8L14 5Z" /><path d="m7 9-3 .8-2 2 4.7 1.5M13 15l-1 4-2 2-1.5-5.7" /><circle cx="15.5" cy="6.5" r="1.5" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></>,
    mobile: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M10 5h4M11 18h2" /></>,
    gauge: <><path d="M4 17a8 8 0 1 1 16 0" /><path d="m12 17 4-5M5 17h14" /></>,
    search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></>,
    film: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4" /></>,
    play: <path d="m9 7 8 5-8 5V7Z" fill="currentColor" stroke="none" />,
    camera: <><path d="M4 7h4l2-2h4l2 2h4v12H4Z" /><circle cx="12" cy="13" r="4" /></>,
    sparkles: <><path d="m12 3 1.4 4.1L17 9l-3.6 1.9L12 15l-1.4-4.1L7 9l3.6-1.9L12 3Z" /><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" /></>,
    fourk: <><path d="M3 7v7h6M9 5v14M13 5v14M13 12l7-7M14 11l7 8" /></>,
    palette: <><path d="M12 3a9 9 0 0 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a2 2 0 0 1 0-4h5a4 4 0 0 0 4-4c0-3-4-5-9-5Z" /><circle cx="7.5" cy="9" r=".7" fill="currentColor" /><circle cx="10" cy="6.5" r=".7" fill="currentColor" /><circle cx="14" cy="6.5" r=".7" fill="currentColor" /></>,
    pen: <><path d="m12 19 7-7-7-7-7 7 7 7Z" /><path d="m12 19-3 3h6l-3-3ZM12 5v7" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m3 17 5-5 4 4 3-3 6 6" /></>,
    layout: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 10v10" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
  };

  return <svg className="hero-svg-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    slides.slice(1).forEach(({ image }) => {
      const preload = new window.Image();
      preload.src = image;
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % slides.length), 4500);
    return () => window.clearTimeout(timer);
  }, [active]);

  const showPrevious = () => setActive((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActive((current) => (current + 1) % slides.length);

  return (
    <section className="hero-section hero-carousel" aria-roledescription="carousel" aria-label="LeadBrix services">
      {slides.map((slide, index) => (
        <div className={`hero-slide hero-slide-${index} ${index === active ? "is-active" : ""}`} style={{ "--hero-bg": `url(${slide.image})` }} key={slide.badge} aria-hidden={index !== active}>
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <p className="kicker"><span><SliderIcon name={slide.badgeIcon} size={21} /></span>{slide.badge}</p>
              <span className="hero-slide-index">0{index + 1}</span>
            </div>
            <h1 id={index === 0 ? "hero-title" : undefined}>{slide.lineOne}<span className="headline-rays" aria-hidden="true"><i /><i /><i /></span><br />{slide.lineTwo} <mark>{slide.highlight}</mark></h1>
            <p className="hero-lead">{slide.copy}</p>
            <div className="hero-benefits" aria-label="Key benefits">
              {slide.benefits.map(([icon, lineOne, lineTwo]) => <div key={`${lineOne}-${lineTwo}`}><b><SliderIcon name={icon} size={29} /></b><strong>{lineOne}<br />{lineTwo}</strong></div>)}
            </div>
            <div className="hero-actions">
              <a className="pill-button" href="/contact">Get a Free Consultation <span><SliderIcon name="arrow" size={20} /></span></a>
              <p className="hero-action-note"><i>✓</i><span><strong>No obligation</strong>30-minute strategy call</span></p>
            </div>
          </div>
        </div>
      ))}
      <div className="hero-slider-controls">
        <button type="button" className="hero-slider-arrow is-previous" onClick={showPrevious} aria-label="Previous slide"><SliderIcon name="chevron" size={20} /></button>
        <div className="hero-slider-dots" role="group" aria-label="Choose a service slide">
          {slides.map((slide, index) => <button type="button" className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Show ${slide.badge}`} aria-current={index === active ? "true" : undefined} key={slide.badge} />)}
        </div>
        <span className="hero-slider-count">0{active + 1} / 0{slides.length}</span>
        <button type="button" className="hero-slider-arrow" onClick={showNext} aria-label="Next slide"><SliderIcon name="chevron" size={20} /></button>
      </div>
    </section>
  );
}
