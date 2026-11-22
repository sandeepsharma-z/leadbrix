import SiteHeader from "../components/SiteHeader";
import BlogFooter from "../blog/BlogFooter";

export const metadata = {
  title: "About LeadBrix | Digital Growth Agency",
  description: "Meet LeadBrix, a strategy-led digital agency helping ambitious businesses build stronger brands and measurable growth.",
};

const values = [
  ["diamond", "Integrity", "We believe in transparency, honesty and doing what is right for every client."],
  ["layers", "Innovation", "We combine modern tools, creative thinking and fresh ideas to solve real business challenges."],
  ["users", "Client Success", "Your growth is our priority, and we measure our success by the outcomes we create for you."],
  ["star", "Excellence", "We pursue high-quality execution, continuous improvement and meaningful long-term impact."],
];

function Icon({ name }) {
  const paths = {
    rocket: <><path d="M4.5 16.5c-1.5 1.25-2 4.5-2 4.5s3.25-.5 4.5-2c.7-.85.7-2.1-.1-2.9s-2.05-.8-2.9-.1Z"/><path d="m12 15-3-3c1.7-4.25 5.1-8.8 12-10-1.2 6.9-5.75 10.3-10 12Z"/><path d="M9 12H4c.5-2.4 1.5-4 3-5 1.1-.7 2.8-.5 4 0M12 15v5c2.4-.5 4-1.5 5-3 .7-1.1.5-2.8 0-4"/><circle cx="16" cy="7" r="1.5"/></>,
    growth: <><path d="m5 17 5-5 3 3 6-8"/><path d="M15 7h4v4"/></>,
    target: <><circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4.5"/><circle cx="11" cy="13" r="1.4"/><path d="m13 11 8-8M16 3h5v5"/></>,
    hand: <><path d="m4 12 4-4 4 3 4-3 4 4-8 8-8-8Z"/><path d="m8 8 4 4 4-4"/></>,
    handshake: <><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 0 1-3-3l2.81-2.81a5.8 5.8 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/></>,
    eye: <><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    flag: <><path d="M5 21V4M5 5c5-3 8 3 14 0v9c-6 3-9-3-14 0"/></>,
    diamond: <><path d="m12 3 8 6-8 12L4 9l8-6Z"/><path d="m4 9 16 0M8 4.5 10 9l2-6 2 6 2-4.5M10 9l2 12 2-12"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    users: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-4 2.5-6 6-6s6 2 6 6M14 15c4-.8 7 1 7 5"/></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function AboutReference() {
  return <main className="about-v2">
    <SiteHeader />

    <section className="about-v2-hero">
      <div className="about-v2-hero-copy">
        <p className="about-v2-overline">About Us</p>
        <h1>About <em>LeadBrix</em></h1>
        <p>A results-driven digital marketing agency helping businesses grow, generate better leads and build a stronger online presence.</p>
        <div className="about-v2-pillars">
          <span><Icon name="rocket"/><b>Growth<br/>Focused</b></span>
          <span><Icon name="target"/><b>Performance<br/>Driven</b></span>
          <span><Icon name="handshake"/><b>Long-Term<br/>Partnership</b></span>
        </div>
        <a className="about-v2-button" href="/services">Our Services <b>→</b></a>
      </div>
      <div className="about-v2-hero-image" role="img" aria-label="Premium LeadBrix agency office">
        <span className="about-v2-wall-logo" aria-hidden="true"><img src="/images/leadbrix-logo.png" alt="" /></span>
      </div>
    </section>

    <section className="about-v2-story">
      <div className="about-v2-story-image"><span/><img src="/images/home-redesign/about-building-v2.png" alt="Modern LeadBrix agency building"/></div>
      <div className="about-v2-story-copy">
        <p className="about-v2-overline">Our Story</p>
        <h2>The Story Behind <em>LeadBrix</em></h2>
        <p>LeadBrix was founded with a simple goal—to help businesses grow in the digital world through the right mix of strategy, creativity and technology. What started as a focused team of digital specialists has evolved into a full-service growth partner for ambitious brands.</p>
        <div className="about-v2-mission">
          <article><Icon name="eye"/><div><h3>Our Mission</h3><p>To deliver measurable business growth through thoughtful, innovative and results-oriented digital solutions.</p></div></article>
          <article><Icon name="flag"/><div><h3>Our Vision</h3><p>To become a trusted growth partner for businesses through digital excellence and long-term value.</p></div></article>
        </div>
      </div>
    </section>

    <section className="about-v2-stats">
      <div><Icon name="users"/><strong>100+</strong><span>Projects Delivered</span></div>
      <div><Icon name="growth"/><strong>50+</strong><span>Happy Clients</span></div>
      <div><Icon name="star"/><strong>5+</strong><span>Years of Experience</span></div>
      <div><Icon name="target"/><strong>10+</strong><span>Industries Served</span></div>
    </section>

    <section className="about-v2-values">
      <div className="about-v2-heading"><p>Our Values</p><h2>What <em>Drives Us</em></h2><span>The core principles that guide our work, our team and every client relationship.</span></div>
      <div className="about-v2-values-grid">{values.map(([icon,title,copy]) => <article key={title}><Icon name={icon}/><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="about-v2-team" id="team">
      <div className="about-v2-team-copy"><p className="about-v2-overline">Our Team</p><h2>A Team of Digital<br/><em>Growth Specialists</em></h2><p>Our team brings together experienced strategists, performance marketers, creative designers, content specialists and web developers who work as one connected growth unit. We combine market insight, bold ideas and data-led execution to solve real business challenges, strengthen every customer touchpoint and turn ambitious goals into measurable, long-term results.</p><a href="#team">Meet Our Team <b>→</b></a></div>
      <div className="about-v2-team-image"><img src="/images/home-redesign/about-agency-team-v1.png" alt="LeadBrix digital growth team collaborating"/></div>
    </section>

    <section className="about-v2-cta"><div><h2>Let’s <em>Grow Together.</em></h2><p>Ready to take your business to the next level? Let’s build a strategy that works for you.</p></div><a className="about-v2-button" href="/contact">Get a Free Consultation <b>→</b></a></section>

    <BlogFooter />
  </main>;
}
