import Image from "next/image";
import Link from "next/link";

function FooterIcon({ name }) {
  const paths = {
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a3 3 0 0 1 6 0v4M12 10v7"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></>,
    facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V2.4c-.7-.1-1.8-.4-3.2-.4C11.8 2 10 3.8 10 6.7V9H7v4h3v8h4Z" fill="currentColor" stroke="none"/>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    phone: <path d="M7 3H4a2 2 0 0 0-2 2c0 9.4 7.6 17 17 17a2 2 0 0 0 2-2v-3l-5-2-2 3c-3.8-1.6-6.4-4.2-8-8l3-2-2-5Z"/>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const socialLinks = [
  ["linkedin", "https://www.linkedin.com/company/theleadbrix", "LinkedIn"],
  ["instagram", "https://www.instagram.com/leadbrix/", "Instagram"],
  ["facebook", "https://www.facebook.com/Leadbrix", "Facebook"],
];

export default function BlogFooter() {
  return (
    <footer className="blog-footer">
      <div className="blog-footer__grid">
        <div className="blog-footer__brand">
          <Link href="/" className="blog-footer__logo" aria-label="LeadBrix home"><Image src="/images/leadbrix-footer-logo.png" alt="LeadBrix" width={190} height={52}/></Link>
          <p>A results-driven digital agency helping ambitious businesses build visibility, generate leads and achieve meaningful growth online.</p>
          <div className="blog-footer__socials">{socialLinks.map(([icon,href,label]) => <a href={href} target="_blank" rel="noreferrer" aria-label={`LeadBrix on ${label}`} key={label}><FooterIcon name={icon}/></a>)}</div>
        </div>
        <div><h3>Our Services</h3><Link href="/services/search-engine-optimization">SEO & Organic Growth</Link><Link href="/services/google-ads-ppc">Google Ads (PPC)</Link><Link href="/services/social-media-marketing">Social Media Marketing</Link><Link href="/services/branding-identity">Branding & Identity</Link><Link href="/services/website-development">Website Development</Link></div>
        <div><h3>Quick Links</h3><Link href="/about">About Us</Link><Link href="/#work">Our Work</Link><Link href="/blog">Blog</Link><Link href="/contact">Contact Us</Link></div>
        <div><h3>Resources</h3><Link href="/blog">Marketing Guides</Link><Link href="/blog">Growth Insights</Link><Link href="/services">Service Library</Link><Link href="/contact">Request a Proposal</Link></div>
        <div className="blog-footer__contact"><h3>Get in Touch</h3><p><FooterIcon name="pin"/> Platina Tower, Mehrauli-Gurgaon Rd, A Block, DLF Phase 1, Gurugram, Haryana 122002</p><a href="mailto:hello@leadbrix.in"><FooterIcon name="mail"/> hello@leadbrix.in</a><a href="tel:+919667730052"><FooterIcon name="phone"/> +91 96677 30052</a></div>
      </div>
      <div className="blog-footer__bottom"><span>© 2026 LeadBrix. All rights reserved.</span><span>SEO <i/> Performance Marketing <i/> Web Development <i/> Growth</span></div>
    </footer>
  );
}
