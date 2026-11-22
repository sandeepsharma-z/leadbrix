import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import BlogFooter from "../BlogFooter";
import { blogs, getBlog } from "../blog-data";

export function generateStaticParams() {
  return blogs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) return {};
  return { title: `${post.title} | LeadBrix`, description: post.excerpt };
}

export default async function BlogArticle({ params }) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) notFound();
  const related = blogs.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <main className="article-page">
      <SiteHeader />
      <header className="article-hero">
        <div className="article-hero__inner">
          <div className="article-breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span>{post.category}</div>
          <span className="blog-tag">{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="article-byline"><div className="article-avatar">LB</div><div><strong>LeadBrix Editorial Team</strong><span>{post.date}　•　{post.readTime}</span></div></div>
        </div>
      </header>

      <div className="article-feature-image"><Image src={post.image} alt={post.title} fill priority sizes="(max-width: 900px) 100vw, 1180px" /></div>

      <div className="article-layout">
        <article className="article-body">
          <p className="article-lead">Strong growth rarely comes from one isolated campaign. It comes from making better decisions consistently—understanding the audience, building the right experience and measuring what genuinely contributes to the business.</p>
          {post.sections.map((section, index) => (
            <section id={section.id} key={section.id}>
              <span className="article-section-number">0{index + 1}</span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((point) => <li key={point}>{point}</li>)}</ul>}
              {section.quote && <blockquote>{section.quote}</blockquote>}
            </section>
          ))}
          <div className="article-author"><div className="article-author__mark">LB</div><div><span>Written by</span><h3>LeadBrix Editorial Team</h3><p>Strategy, creative and performance specialists sharing practical ideas to help ambitious brands grow with greater clarity and confidence.</p></div></div>
        </article>

        <aside className="article-sidebar">
          <div className="article-sidebar__card article-toc"><span className="article-sidebar__eyebrow">IN THIS ARTICLE</span><h3>Table of Contents</h3>{post.sections.map((section, index) => <a href={`#${section.id}`} key={section.id}><span>0{index + 1}</span>{section.title}</a>)}</div>
          <div className="article-sidebar__card article-help"><span>READY TO GROW?</span><h3>Turn insight into measurable results.</h3><p>Let’s build a focused digital growth plan for your business.</p><Link href="/#contact">Book a Free Consultation →</Link></div>
          <div className="article-sidebar__card article-share"><strong>Share this article</strong><div><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://leadbrix.in/blog/${post.slug}`)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">in</a><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://leadbrix.in/blog/${post.slug}`)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">f</a><a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`https://leadbrix.in/blog/${post.slug}`)}`} aria-label="Share by email">✉</a></div></div>
        </aside>
      </div>

      <section className="related-posts"><p className="blog-eyebrow"><span /> KEEP READING</p><h2>More <em>Growth Insights</em></h2><div className="related-posts__grid">{related.map((item) => <article key={item.slug}><div className="related-posts__image"><Image src={item.image} alt="" fill sizes="50vw" /></div><span className="blog-tag">{item.category}</span><h3><Link href={`/blog/${item.slug}`}>{item.title}</Link></h3><Link href={`/blog/${item.slug}`} className="related-link">Read Article →</Link></article>)}</div></section>
      <section className="article-newsletter"><div><span>LEADBRIX INSIGHTS</span><h2>Useful ideas for smarter growth.</h2><p>Join our newsletter for practical marketing thinking without the noise.</p></div><a href="mailto:hello@leadbrix.in?subject=Newsletter Subscription">Subscribe to Newsletter →</a></section>
      <BlogFooter />
    </main>
  );
}
