export { metadata } from "./AboutReference";
export { default } from "./AboutReference";

/*
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "About LeadBrix | Strategy, Creative & Performance",
  description: "Meet LeadBrix, a digital growth agency combining strategy, creative execution and performance marketing to build meaningful business growth.",
};

const values = [
  { icon: "strategy", title: "Strategy First", copy: "Every engagement begins with clarity—your goals, audience, market and the opportunity ahead." },
  { icon: "creative", title: "Creative That Connects", copy: "Ideas are shaped to earn attention, communicate value and make your brand memorable." },
  { icon: "performance", title: "Performance Mindset", copy: "We measure what matters, learn from real data and keep improving the work that drives growth." },
  { icon: "partnership", title: "True Partnership", copy: "Open communication, honest guidance and a team that stays invested in your long-term success." },
];

const approach = [
  ["01", "Understand", "We learn your business, audience and ambitions before recommending a channel or campaign."],
  ["02", "Build", "Strategy, content, design and technology come together as one connected growth system."],
  ["03", "Improve", "We track performance, uncover opportunities and continuously sharpen execution."],
];

function AboutIcon({ name }) {
  const icons = {
    strategy: <><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/><path d="m14 10 6-6M17 4h3v3"/></>,
    creative: <><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"/><path d="m4 7 8 4 8-4M12 11v10"/></>,
    performance: <><path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/><path d="M2 19h22"/></>,
    partnership: <><path d="M8 12 5.5 9.5a3 3 0 0 1 4.2-4.2L12 7.6l2.3-2.3a3 3 0 0 1 4.2 4.2L12 16l-4-4Z"/><path d="m9 13 3 3 3-3"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader />

      <section className="about-page-hero">
        <div className="about-page-hero-copy">
          <p className="about-page-kicker">About LeadBrix</p>
          <h1>Built to Turn Ambition<br />Into <em>Meaningful Growth.</em></h1>
          <p>We are a strategy-led digital agency helping ambitious businesses build stronger brands, attract the right audience and grow with confidence.</p>
          <div className="about-page-actions">
            <a className="about-page-primary" href="/contact">Let’s Work Together <span>→</span></a>
            <a className="about-page-secondary" href="/services">Explore Our Services <span>→</span></a>
          </div>
        </div>
        <div className="about-page-hero-art">
          <span className="about-hero-shape" aria-hidden="true" />
          <img src="/images/home-redesign/about-agency-team-v1.png" alt="LeadBrix digital agency team collaborating on a growth strategy" />
        </div>
      </section>

      <section className="about-stats" aria-label="LeadBrix highlights">
        <div><strong>500+</strong><span>Projects Delivered</span></div>
        <div><strong>200+</strong><span>Happy Clients</span></div>
        <div><strong>5+</strong><span>Years of Expertise</span></div>
        <div><strong>360°</strong><span>Digital Growth Support</span></div>
      </section>

      <section className="about-story">
        <div className="about-story-visual">
          <div className="about-story-card about-story-card-main">
            <span>What we bring together</span>
            <strong>Strategy<br /><em>Creative</em><br />Performance</strong>
          </div>
          <div className="about-story-card about-story-card-small"><b>One team</b><span>One connected growth vision</span></div>
        </div>
        <div className="about-story-copy">
          <p className="about-page-badge">Our Story</p>
          <h2>More Than Marketing.<br />A Partner in <em>Your Growth.</em></h2>
          <p>LeadBrix was built around a simple belief: businesses grow faster when strategy, creativity and performance work together—not in separate silos.</p>
          <p>We combine commercial thinking with thoughtful design and measurable execution. That means every campaign, website and piece of content has a clear role in moving your business forward.</p>
          <a href="/services">See What We Do <span>→</span></a>
        </div>
      </section>

      <section className="about-purpose">
        <div className="about-section-heading">
          <p className="about-page-badge">What Drives Us</p>
          <h2>Clear Purpose.<br /><em>Stronger Outcomes.</em></h2>
          <p>We stay focused on work that creates lasting value for the businesses that trust us.</p>
        </div>
        <div className="about-purpose-cards">
          <article><span>01</span><h3>Our Mission</h3><p>To make high-quality digital strategy, creative execution and performance marketing accessible to ambitious businesses ready to grow.</p></article>
          <article><span>02</span><h3>Our Vision</h3><p>To become the trusted growth partner businesses rely on for clarity, creativity and consistent digital progress.</p></article>
        </div>
      </section>

      <section className="about-values">
        <div className="about-section-heading about-section-heading-center">
          <p className="about-page-badge">Our Values</p>
          <h2>The Principles Behind<br /><em>Every Partnership.</em></h2>
        </div>
        <div className="about-values-grid">
          {values.map((value) => <article key={value.title}><span className="about-value-icon"><AboutIcon name={value.icon}/></span><h3>{value.title}</h3><p>{value.copy}</p></article>)}
        </div>
      </section>

      <section className="about-approach">
        <div className="about-approach-copy">
          <p className="about-page-kicker">Our Approach</p>
          <h2>Simple Process.<br /><em>Focused Execution.</em></h2>
          <p>No unnecessary complexity. We work collaboratively, communicate clearly and keep every decision connected to your business goals.</p>
        </div>
        <div className="about-approach-list">
          {approach.map(([number,title,copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
      </section>

      <section className="about-results">
        <div><p className="about-page-kicker">Why LeadBrix</p><h2>Ideas With Purpose.<br /><em>Results With Impact.</em></h2><p>We bring the thinking, talent and accountability needed to transform digital activity into real business momentum.</p></div>
        <div className="about-results-grid"><span><b>+320%</b>Lead Growth</span><span><b>+65%</b>Better Conversion</span><span><b>+410%</b>Campaign ROI</span><span><b>Long-term</b>Growth Partnership</span></div>
      </section>

      <section className="about-final-cta">
        <div><p className="about-page-badge">Let’s Grow Together</p><h2>Ready to Build Something<br /><em>That Moves Your Business?</em></h2></div>
        <p>Tell us what growth looks like for you. We’ll help turn that ambition into a focused digital strategy.</p>
        <a className="about-page-primary" href="mailto:info@theleadbrix.in">Book a Free Consultation <span>→</span></a>
      </section>

      <footer className="about-page-footer">
        <div><img src="/images/leadbrix-footer-logo.png" alt="LeadBrix"/><p>Strategy, creative and performance working together to build meaningful business growth.</p></div>
        <div><h3>Services</h3><a href="/services">Digital Marketing</a><a href="/services">Website Development</a><a href="/services">Branding & Creative</a></div>
        <div><h3>Quick Links</h3><a href="/">Home</a><a href="/about">About</a><a href="/#work">Our Work</a></div>
        <div><h3>Get in Touch</h3><a href="mailto:info@theleadbrix.in">info@theleadbrix.in</a><p>Platina Tower, Mehrauli-Gurgaon Rd, A Block, DLF Phase 1, Gurugram, Haryana 122002</p></div>
        <p className="about-footer-bottom">© 2026 LeadBrix. All rights reserved.</p>
      </footer>
    </main>
  );
}
*/
