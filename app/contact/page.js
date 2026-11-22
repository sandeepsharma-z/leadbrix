import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import BlogFooter from "../blog/BlogFooter";

export const metadata = {
  title: "Contact LeadBrix | Let's Grow Your Business",
  description: "Talk to LeadBrix about digital strategy, performance marketing, branding, web development and business growth."
};

function Icon({ name }) {
  const paths = {
    rocket: <><path d="M5 16c-1.5 1.2-2 4-2 4s2.8-.5 4-2c.7-.8.6-2-.2-2.8S5.8 15.3 5 16Z"/><path d="m12 15-3-3c1.8-4.2 5-8 12-10-1.3 6.8-5.4 10.2-10 12Z"/><circle cx="16" cy="7" r="1.4"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v5M16 3v5M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
    target: <><circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><circle cx="11" cy="13" r="1"/><path d="m14 10 7-7M17 3h4v4"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    phone: <path d="M7 3H4a2 2 0 0 0-2 2c0 9.4 7.6 17 17 17a2 2 0 0 0 2-2v-3l-5-2-2 3c-3.8-1.6-6.4-4.2-8-8l3-2-2-5Z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-5 3-8 8-8s8 3 8 8"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></>,
    chart: <><path d="M4 20V12h4v8M10 20V8h4v12M16 20V3h4v17M2 20h20"/></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/></>
    ,linkedin: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a3 3 0 0 1 6 0v4M12 10v7"/></>
    ,instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></>
    ,facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V2.4c-.7-.1-1.8-.4-3.2-.4C11.8 2 10 3.8 10 6.7V9H7v4h3v8h4Z" fill="currentColor" stroke="none"/>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const details = [
  ["pin", "Our Office", "Platina Tower, Mehrauli-Gurgaon Rd, A Block, DLF Phase 1, Gurugram, Haryana 122002"],
  ["mail", "Email Us", "hello@leadbrix.in"],
  ["phone", "Call Us", "+91 96677 30052"],
  ["clock", "Working Hours", "Open 24×7"]
];

export default function ContactPage() {
  return <main className="contact-v2">
    <SiteHeader />

    <section className="contact-v2-hero">
      <div className="contact-v2-hero__copy">
        <p className="contact-v2-overline">Contact Us</p>
        <h1>Let’s Talk About<br/><em>Your Growth</em></h1>
        <p>Have a project in mind or need expert guidance? Get in touch with us—we’re here to help you grow your business.</p>
        <div className="contact-v2-pillars">
          <span><Icon name="rocket"/><b>Quick<br/>Response</b></span>
          <span><Icon name="calendar"/><b>Free<br/>Consultation</b></span>
          <span><Icon name="target"/><b>Growth<br/>Focused</b></span>
        </div>
      </div>
      <div className="contact-v2-hero__image" role="img" aria-label="LeadBrix office reception"/>
    </section>

    <section className="contact-v2-connect">
      <div className="contact-v2-details">
        <h2>Get in <em>Touch</em></h2>
        <p>Reach out to discuss your requirements, get a custom proposal or simply ask a question.</p>
        <div className="contact-v2-details__list">{details.map(([icon,title,value]) => <article key={title}><span><Icon name={icon}/></span><div><h3>{title}</h3><p>{value}</p></div></article>)}</div>
        <div className="contact-v2-follow"><h3>Follow Us</h3><div><a href="https://www.linkedin.com/company/theleadbrix" target="_blank" rel="noreferrer" aria-label="LeadBrix on LinkedIn"><Icon name="linkedin"/></a><a href="https://www.instagram.com/leadbrix/" target="_blank" rel="noreferrer" aria-label="LeadBrix on Instagram"><Icon name="instagram"/></a><a href="https://www.facebook.com/Leadbrix" target="_blank" rel="noreferrer" aria-label="LeadBrix on Facebook"><Icon name="facebook"/></a></div></div>
      </div>

      <div className="contact-v2-formcard">
        <p className="contact-v2-overline">Send Us a Message</p>
        <h2>Let’s Start a <em>Conversation</em></h2>
        <form action="mailto:hello@leadbrix.in" method="post" encType="text/plain">
          <label><Icon name="user"/><input name="name" required placeholder="Your Name *"/></label>
          <label><Icon name="mail"/><input name="email" type="email" required placeholder="Your Email *"/></label>
          <label><Icon name="phone"/><input name="phone" type="tel" placeholder="Your Phone"/></label>
          <label><Icon name="grid"/><select name="service" required defaultValue=""><option value="" disabled>Select a Service *</option><option>SEO & Organic Growth</option><option>Google Ads / PPC</option><option>Social Media Marketing</option><option>Branding & Identity</option><option>Website Development</option><option>Business Automation</option></select></label>
          <label className="contact-v2-message"><Icon name="message"/><textarea name="message" required placeholder="Tell us about your project... *"/></label>
          <button type="submit">Send Message <span>→</span></button>
        </form>
      </div>
    </section>

    <section className="contact-v2-location">
      <div className="contact-v2-location__image"><span/><Image src="/images/home-redesign/about-building-v2.png" alt="LeadBrix office building" fill sizes="50vw"/></div>
      <div className="contact-v2-location__map">
        <iframe
          title="LeadBrix office location at Platina Tower"
          src="https://www.google.com/maps?q=Platina%20Tower%2C%20Mehrauli-Gurgaon%20Rd%2C%20A%20Block%2C%20DLF%20Phase%201%2C%20Gurugram%2C%20Haryana%20122002&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="contact-v2-location__copy">
        <p className="contact-v2-overline">Our Location</p>
        <h2>Visit Our <em>Office</em></h2>
      </div>
    </section>

    <section className="contact-v2-cta"><span><Icon name="chart"/></span><div><h2>Ready to Grow <em>Your Business?</em></h2><p>Book a free consultation and get a custom growth roadmap for your brand.</p></div><a href="mailto:hello@leadbrix.in?subject=Free Consultation">Get a Free Consultation <b>→</b></a></section>
    <BlogFooter />
  </main>;
}
