import HeroSlider from "./components/HeroSlider";
import SiteHeader from "./components/SiteHeader";
import FloatingActions from "./components/FloatingActions";
import BlogFooter from "./blog/BlogFooter";

const services = [
  { icon: "search", title: "Search Engine Optimization", copy: "Rank higher, attract organic traffic and build lasting visibility." },
  { icon: "ads", title: "Google Ads", copy: "Reach high-intent customers and turn ad spend into measurable growth." },
  { icon: "social", title: "Social Media Marketing", copy: "Build an engaged audience with strategic content and campaigns." },
  { icon: "brand", title: "Branding & Identity", copy: "Create a distinct, consistent brand people recognize and remember." },
  { icon: "code", title: "Website Development", copy: "Launch fast, responsive websites designed to convert visitors." },
  { icon: "video", title: "Video Editing", copy: "Turn raw footage into polished, scroll-stopping brand stories." },
  { icon: "design", title: "Graphic Designing", copy: "Strengthen every touchpoint with sharp, on-brand visual design." },
  { icon: "automation", title: "Business Automation", copy: "Streamline repetitive work and scale operations more efficiently." },
];

const serviceLinks = [
  "/services/search-engine-optimization",
  "/services/google-ads-ppc",
  "/services/social-media-marketing",
  "/services/branding-identity",
  "/services/website-development",
  "/services/social-media-marketing",
  "/services/branding-identity",
  "/services/business-automation",
];

const advantages = [
  { icon: "target", title: "Result-Driven Strategy", copy: "Focused on real business outcomes, not vanity metrics." },
  { icon: "team", title: "Expert & Dedicated Team", copy: "Strategy, creativity and execution working together." },
  { icon: "solutions", title: "End-to-End Solutions", copy: "Marketing, creative, web and automation under one roof." },
  { icon: "analytics", title: "Transparent & Reliable", copy: "Clear communication, regular updates and complete accountability." },
];

const projects = [
  { image: "/images/home-redesign/work-ecommerce-crimson-v1.png", category: "Performance Commerce", title: "E-Commerce Brand", copy: "Boosted online sales with performance marketing and conversion optimization.", metricA: "+320%", labelA: "Sales Growth", metricB: "+65%", labelB: "Conversion Rate" },
  { image: "/images/home-redesign/work-realestate-crimson-v1.png", category: "Lead Generation", title: "Real Estate Developer", copy: "Generated high-quality leads and increased project enquiries.", metricA: "+410%", labelA: "Lead Growth", metricB: "-48%", labelB: "Cost per Lead", featured: true },
  { image: "/images/home-redesign/work-healthcare-crimson-v1.png", category: "Digital Growth", title: "Healthcare Clinic", copy: "Built a strong online presence and increased patient bookings.", metricA: "+280%", labelA: "Website Traffic", metricB: "+190%", labelB: "Bookings" },
];

const testimonials = [
  { initials: "RS", name: "Rohit Sharma", role: "Founder, TrendCart", quote: "LeadBrix completely transformed our online presence. We saw a significant increase in traffic and quality leads within just a few months." },
  { initials: "PM", name: "Priya Mehta", role: "Marketing Head, SkyHomes", quote: "A highly professional and result-driven team. Their SEO and Google Ads strategy helped us achieve consistent growth and better ROI.", featured: true },
  { initials: "AV", name: "Aman Verma", role: "CEO, HealthPlus", quote: "Great experience working with LeadBrix. The team understood our goals, delivered on time, and helped us grow our brand effectively." },
];

const clientBrands = [
  { name: "amazon", className: "brand-amazon" },
  { name: "Spotify", className: "brand-spotify" },
  { name: "zomato", className: "brand-zomato" },
  { name: "PharmEasy", className: "brand-pharmeasy" },
  { name: "blinkit", className: "brand-blinkit" },
  { name: "boAt", className: "brand-boat" },
  { name: "upGrad", className: "brand-upgrad" },
];

function Logo({ inverse = false }) {
  if (!inverse) {
    return (
      <span className="brand-lockup" aria-label="LeadBrix">
        <span className="brand-main">
          <span className="brand-bars" aria-hidden="true"><i /><i /><i /></span>
          <span className="brand-name">Lead<b>Brix</b></span>
        </span>
        <small>#1 Advertising Solution in India</small>
      </span>
    );
  }

  return (
    <span className={`logo ${inverse ? "logo-inverse" : ""}`}>
      <span className="logo-bars" aria-hidden="true"><i /><i /><i /></span>
      <span>Lead<b>Brix</b></span>
    </span>
  );
}

function SectionIntro({ badge, icon, children, copy, dark = false }) {
  return (
    <div className={`section-intro ${dark ? "section-intro-dark" : ""}`}>
      <div className="section-badge">{icon && <span>{icon}</span>}{badge}</div>
      <h2>{children}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function ServiceIcon({ name }) {
  const paths = {
    search: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5M8 10.5h5M10.5 8v5" /></>,
    ads: <><path d="m4 15 10-10 6 6-10 10H4v-6Z" /><path d="m12 7 6 6M4 21h7" /></>,
    social: <><path d="M4 18V8l10-4v16L4 18Z" /><path d="M14 9c4 .8 6 2.2 6 3s-2 2.2-6 3M7 18l1 3h4l-2-3" /></>,
    brand: <><path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a2 2 0 0 1 0-4h5a4 4 0 0 0 4-4c0-3-4-5-9-5Z" /><circle cx="8" cy="9" r="1" fill="currentColor" /><circle cx="11" cy="6.5" r="1" fill="currentColor" /><circle cx="15" cy="7" r="1" fill="currentColor" /></>,
    code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" /></>,
    video: <><rect x="3" y="5" width="14" height="14" rx="2" /><path d="m17 10 4-2v8l-4-2M8 9l5 3-5 3V9Z" /></>,
    design: <><path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Z" /><path d="m13.5 7 3.5 3.5M4 20h6" /></>,
    automation: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function AdvantageIcon({ name }) {
  const paths = {
    target: <><circle cx="11" cy="12" r="7" /><circle cx="11" cy="12" r="3" /><path d="m13 10 7-7M16 3h4v4M3 21l4-4" /></>,
    team: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-4 2.5-6 6-6s6 2 6 6M14 15c3.8-.8 7 1 7 5" /></>,
    solutions: <><path d="M14 5c2.8-2.8 5.7-2.8 5.7-2.8S19.8 5 17 7.8l-5.5 5.5-4.8-4.8L14 5Z" /><path d="m7 9-3 .8-2 2 4.7 1.5M13 15l-1 4-2 2-1.5-5.7" /><circle cx="15.5" cy="6.5" r="1.5" /></>,
    analytics: <><path d="M5 20V12M12 20V7M19 20V3" /><path d="M3 20h18" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function SocialIcon({ name }) {
  const icons = {
    linkedin: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z",
    instagram: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.69-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.63 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.3.27 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
    youtube: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z",
    facebook: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z",
  };
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={icons[name]} /></svg>;
}

function BrandSet({ duplicate = false }) {
  return (
    <div className="brand-set" aria-hidden={duplicate || undefined}>
      {clientBrands.map((brand) => (
        <div className="brand-card" key={brand.name}>
          <span className={`brand-wordmark ${brand.className}`}>{brand.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main id="home">
      <SiteHeader />

      <HeroSlider />

      <section className="trusted-section" id="trusted" aria-labelledby="trusted-title">
        <div className="trusted-orbit trusted-orbit-top" aria-hidden="true" />
        <div className="trusted-orbit trusted-orbit-bottom" aria-hidden="true" />
        <div className="trusted-heading">
          <div className="trusted-badge">Trusted By</div>
          <div className="trusted-title-row">
            <h2 id="trusted-title"><span>Brands</span> <em>That Grow<span className="trusted-swoosh" aria-hidden="true" /></em> <span>With Us</span></h2>
          </div>
          <p>We’ve partnered with businesses across industries to build stronger<br className="trusted-copy-break" /> brands, drive traffic, and generate real results.</p>
        </div>
        <div className="brand-marquee" aria-label="Client brands">
          <div className="brand-track">
            <BrandSet />
            <BrandSet duplicate />
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-copy">
          <p className="overline"><span /> About LeadBrix</p>
          <h2>Strategy built for<br /><em>measurable growth.</em></h2>
          <p>We combine sharp strategy, standout creative and performance data to help ambitious businesses attract the right audience and scale with confidence.</p>
          <div className="about-pillars">{["Strategy First","Creative Execution","Data-Driven Results","Long-Term Growth"].map((label) => <div key={label}><span>{label}</span></div>)}</div>
          <a className="pill-button" href="/about">Discover LeadBrix <span>→</span></a>
        </div>
        <div className="about-art" role="img" aria-label="LeadBrix modern digital growth agency office">
          <div className="about-growth-card"><span>Growth partnership</span><strong>Strategy. Creative.<br />Performance.</strong></div>
        </div>
      </section>

      <section className="services-section" id="services">
        <SectionIntro badge="Our Services" copy="End-to-end digital marketing, creative and technology services designed to build, grow and scale your business.">Complete <em>Digital Growth</em> Solutions</SectionIntro>
        <div className="services-grid">{services.map((service, index) => <article className="service-card" key={service.title}><span className="service-number">0{index + 1}</span><span className="card-icon"><ServiceIcon name={service.icon} /></span><div><h3>{service.title}</h3><p>{service.copy}</p></div><a href={serviceLinks[index]} aria-label={`Explore ${service.title}`}>→</a></article>)}</div>
      </section>

      <section className="why-section" id="why-us">
        <SectionIntro badge="Why Choose LeadBrix" copy="More than a marketing agency — we’re your growth partner, focused on results, transparency and long-term success.">A Partner for <em>Real Business Growth</em></SectionIntro>
        <div className="advantages-grid">
          {advantages.map((item, index) => <article className={`advantage-card advantage-${index + 1}`} key={item.title}><span className="card-icon"><AdvantageIcon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}
          <div className="growth-trophy" aria-label="LeadBrix growth performance visual"><span className="growth-halo" aria-hidden="true" /><img src="/images/home-redesign/why-growth-crimson-v1.png" alt="" /><div className="growth-brand"><Logo inverse /></div></div>
        </div>
      </section>

      <section className="work-section" id="work">
        <SectionIntro dark badge="Our Work / Case Studies" copy="A look at how we’ve helped businesses grow, scale, and build a stronger digital presence.">Real Projects. <em>Real Results.</em></SectionIntro>
        <div className="projects-grid">{projects.map((project, index) => <article className={`project-card ${project.featured ? "featured" : ""}`} key={project.title}><div className="project-preview" style={{ "--project-image": `url(${project.image})` }}><span>0{index + 1}</span><small>{project.category}</small></div><div className="project-heading"><div><h3>{project.title}</h3><p>{project.copy}</p></div></div><div className="project-metrics"><div><b>{project.metricA}</b><span>{project.labelA}</span></div><div><b>{project.metricB}</b><span>{project.labelB}</span></div></div><a href="/contact">Discuss a Similar Project <span>→</span></a></article>)}</div>
      </section>

      <section className="testimonials-section" id="testimonials">
        <span id="blog" className="anchor-target" aria-hidden="true" />
        <SectionIntro badge="Client Testimonials" copy="Real feedback from businesses that have grown with us.">What Our Clients Say About <em>LeadBrix</em></SectionIntro>
        <div className="testimonials-grid">{testimonials.map((item, index) => <blockquote className={`testimonial-card ${item.featured ? "featured" : ""}`} key={item.name}><div className="testimonial-meta"><span>Verified partnership</span><b>0{index + 1}</b></div><p>“{item.quote}”</p><footer><span className="avatar">{item.initials}</span><div><cite>{item.name}</cite><small>{item.role}</small></div></footer></blockquote>)}</div>
      </section>

      <section className="final-cta" id="contact"><div className="cta-label">Ready to grow?</div><h2>Let’s Build Your Next<br /><em>Growth Story.</em></h2><p>Get a tailored digital strategy to increase traffic, generate quality leads and scale your brand online.</p><a className="pill-button" href="/contact">Book a Free Consultation <span>→</span></a></section>

      <BlogFooter />
      <FloatingActions />
    </main>
  );
}
