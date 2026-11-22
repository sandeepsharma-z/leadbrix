import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import BlogFooter from "./BlogFooter";
import { blogs } from "./blog-data";

export const metadata = {
  title: "Digital Marketing Insights & Growth Ideas | LeadBrix",
  description: "Practical digital marketing, SEO, paid media, social, web development and automation insights from LeadBrix."
};

const categories = [
  ["all", "All Articles"], ["search", "SEO"], ["ads", "Google Ads"],
  ["social", "Social Media"], ["web", "Web Development"],
  ["brand", "Branding"], ["automation", "Automation"]
];

function CategoryIcon({ type }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "all") return <svg viewBox="0 0 24 24" {...common}><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>;
  if (type === "search") return <svg viewBox="0 0 24 24" {...common}><circle cx="11" cy="11" r="5"/><path d="m15 15 4 4"/></svg>;
  if (type === "ads") return <svg viewBox="0 0 24 24" {...common}><path d="M4 13v-2l11-5v12L4 13Z"/><path d="M7 14v5h4l-1-4"/><path d="M18 9v6"/></svg>;
  if (type === "social") return <svg viewBox="0 0 24 24" {...common}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.9 7.6-3.8M8.2 13.1l7.6 3.8"/></svg>;
  if (type === "web") return <svg viewBox="0 0 24 24" {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>;
  if (type === "brand") return <svg viewBox="0 0 24 24" {...common}><path d="M20 13 13 20 4 11V4h7l9 9Z"/><circle cx="8.5" cy="8.5" r="1"/></svg>;
  return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>;
}

function Meta({ post }) {
  return <div className="blog-meta">
    <span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2"/><path d="M8 3v5M16 3v5M3.5 10h17"/></svg>{post.date}</span>
    <i />
    <span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>{post.readTime}</span>
  </div>;
}

function Card({ post }) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-card__image">
        <Image src={post.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
      </Link>
      <div className="blog-card__body">
        <div className="blog-card__top"><span className="blog-tag">{post.category}</span></div>
        <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <Meta post={post} />
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [featured, ...articles] = blogs;
  return (
    <main className="blog-page">
      <SiteHeader />
      <section className="blog-hero">
        <div className="blog-hero__copy">
          <p className="blog-eyebrow"><span /> OUR BLOG</p>
          <h1>Insights, Strategies &amp;<br /><em>Growth Ideas</em></h1>
          <p>Explore expert articles, practical tips and the latest trends in digital marketing, web development and sustainable business growth.</p>
        </div>
        <div className="blog-hero__visual"><Image src="/images/home-redesign/blog-hero-transparent-v2.png" alt="LeadBrix digital marketing insights workspace" fill priority sizes="55vw" /></div>
      </section>

      <nav className="blog-categories" aria-label="Blog categories">
        {categories.map(([icon, label], index) => <a href="#articles" className={index === 0 ? "active" : ""} key={label}><CategoryIcon type={icon} />{label}</a>)}
      </nav>

      <div className="blog-content" id="articles">
        <article className="blog-featured">
          <Link href={`/blog/${featured.slug}`} className="blog-featured__image"><Image src={featured.image} alt="" fill sizes="(max-width: 800px) 100vw, 46vw" /></Link>
          <div className="blog-featured__copy">
            <div className="blog-featured__label">FEATURED ARTICLE</div>
            <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
            <Meta post={featured} />
            <p>{featured.excerpt}</p>
            <Link className="blog-button" href={`/blog/${featured.slug}`}>Read Full Article <span>→</span></Link>
          </div>
        </article>

        <div className="blog-grid">{articles.map((post) => <Card post={post} key={post.slug} />)}</div>

      </div>

      <div className="blog-newsletter-wrap">
        <section className="blog-newsletter">
          <div className="blog-newsletter__icon">✉</div>
          <div><h2>Subscribe to <em>Our Newsletter</em></h2><p>Get the latest marketing tips, industry insights and growth strategies delivered to your inbox.</p></div>
          <div className="blog-newsletter__form"><span>✉</span><input aria-label="Email address" type="email" placeholder="Enter your email address" /><a href="mailto:hello@leadbrix.in?subject=Newsletter Subscription">Subscribe →</a></div>
        </section>
      </div>
      <BlogFooter />
    </main>
  );
}
