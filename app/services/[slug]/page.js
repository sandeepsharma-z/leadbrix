import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import BlogFooter from "../../blog/BlogFooter";
import { getServiceDetail, serviceDetails } from "../service-data";

export function generateStaticParams() { return serviceDetails.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const service = getServiceDetail(slug); return service ? { title:`${service.label} | LeadBrix`, description:service.intro } : {}; }

function Mark({ name }) {
  const paths = {
    web:<><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3M7 9l-2 2 2 2M17 9l2 2-2 2"/></>,
    app:<><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M9 5h6M10 18h4"/></>,
    cart:<><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></>,
    ads:<><path d="M4 13v-3l12-5v13L4 13Z"/><path d="M7 14v6h4l-1-5M19 8v7"/></>,
    social:<><circle cx="5" cy="12" r="2.5"/><circle cx="18" cy="5" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m7.2 10.8 8.6-4.6M7.2 13.2l8.6 4.6"/></>,
    brand:<><path d="M20 13 13 20 4 11V4h7l9 9Z"/><circle cx="8.5" cy="8.5" r="1"/></>,
    automation:<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function CapabilityIcon({ index }) {
  const paths = [
    <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 21v-5h3v5M8 7h1M12 7h1M16 7h1M8 11h1M12 11h1M16 11h1"/></>,
    <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M7 13h4M15 12v4M13 14h4"/></>,
    <><circle cx="12" cy="12" r="9"/><path d="M8 8v8M16 8v8M6 10h12M6 14h12"/></>,
    <><path d="M6 8h13l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2M3 8h3"/></>,
    <><path d="M4 5h16v14H4zM8 9h8M8 13h5"/><path d="M7 3v4M17 3v4"/></>,
    <><circle cx="10" cy="10" r="6"/><path d="m14.5 14.5 5 5M7 11l2-2 2 2 3-4"/></>,
    <><path d="M4 20V11h4v9M10 20V6h4v14M16 20V3h4v17M2 20h20"/></>,
    <><path d="M5 14v-2a7 7 0 0 1 14 0v2M5 14H3v5h4v-5H5ZM19 14h2v5h-4v-5h2ZM17 20c-1 1-2 1-4 1"/></>
  ];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index]}</svg>;
}

const capabilityNotes = [
  "Professional, scalable execution tailored to growing businesses.",
  "Focused delivery designed to improve response and conversions.",
  "Flexible, secure and easy-to-manage implementation.",
  "Modern, high-performing systems built for reliable growth.",
  "User-focused experiences aligned with your brand and goals.",
  "Stronger foundations for speed, visibility and consistency.",
  "Clear tracking to measure, analyse and improve performance.",
  "Ongoing support to keep everything updated and effective."
];

const capabilityBenefits = ["Strategic Design", "Clean Execution", "Higher Conversions", "Ongoing Support"];

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();
  const related = serviceDetails.filter((item) => item.slug !== slug).slice(0,3);
  const serviceFaqs = [
    ...service.faqs,
    ["How long does a typical project take?", `Timelines depend on scope and complexity. After discovery, we provide a clear ${service.label.toLowerCase()} roadmap with milestones, responsibilities and realistic delivery dates.`],
    ["What do you need from our team to begin?", "We begin with your goals, audience, current assets and priorities. Our team then organises the inputs, identifies gaps and guides you through every decision needed to move forward."],
    ["How will progress and performance be reported?", "You receive clear updates at agreed milestones, practical performance insights and transparent recommendations so you always know what has been completed and what happens next."]
  ];
  return <main className={`service-detail service-detail--${service.icon}`}><SiteHeader />
    <section className="service-detail-hero">
      <div className="service-detail-hero__copy"><div className="service-detail-breadcrumb"><Link href="/services">Services</Link><span>›</span>{service.label}</div><p className="service-detail-overline"><Mark name={service.icon}/>{service.label}</p><h1>{service.title}<br/><em>{service.highlight}</em></h1><p>{service.intro}</p><div className="service-detail-actions"><Link href="/contact">Start Your Project <b>→</b></Link><a href="#capabilities">Explore Capabilities ↓</a></div></div>
      <div className="service-detail-hero__art"><span/><Image src={service.image} alt={`${service.label} by LeadBrix`} fill priority sizes="52vw"/></div>
    </section>

    <section className="service-detail-stats">{service.stats.map(([value,label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}<div><span>Built around</span><strong>Your business goals</strong></div></section>

    <section className="service-detail-outcomes"><div className="service-detail-heading"><p>Why It Matters</p><h2>Built for <em>Meaningful Outcomes</em></h2><span>Every decision connects customer experience with measurable business value.</span></div><div className="service-detail-outcomes__grid">{service.outcomes.map(([title,copy],index) => <article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="service-detail-capabilities" id="capabilities">
      <div className="service-detail-capabilities__copy"><p className="service-detail-overline">What We Deliver</p><h2>A Complete <em>{service.label}</em> System</h2><p>{service.featureCopy}</p><div className="service-detail-capabilities__benefits">{capabilityBenefits.map((item,index) => <span key={item}><i><CapabilityIcon index={index + 2}/></i><b>{item}</b></span>)}</div><Link href="/contact">Discuss Your Requirements <b>→</b></Link></div>
      <div className="service-detail-capabilities__visual"><i className="capability-orbit capability-orbit--one"/><i className="capability-orbit capability-orbit--two"/><span className="capability-dot capability-dot--one"/><span className="capability-dot capability-dot--two"/><span className="capability-dot capability-dot--three"/><div><Image src={service.capabilityImage} alt={`${service.label} execution by LeadBrix`} fill sizes="(max-width: 820px) 88vw, 31vw"/></div></div>
      <div className="service-detail-capabilities__list">{service.capabilities.map((item,index) => <article key={item}><span><CapabilityIcon index={index}/></span><div><strong>{item}</strong><p>{capabilityNotes[index]}</p></div><b>→</b></article>)}</div>
    </section>

    <section className="service-detail-process"><div className="service-detail-heading"><p>Our Process</p><h2>Clear Steps. <em>Better Results.</em></h2><span>A collaborative workflow with clarity at every stage.</span></div><div className="service-detail-process__grid">{service.process.map(([title,copy],index) => <article key={title}><div><span>0{index+1}</span></div><h3>{title}</h3><p>{copy}</p>{index < 3 && <i/>}</article>)}</div></section>

    <section className="service-detail-feature"><div className="service-detail-feature__art"><div><Mark name={service.icon}/></div><Image src={service.image} alt="" fill sizes="45vw"/></div><div><p className="service-detail-overline">LeadBrix Advantage</p><h2>{service.featureTitle}</h2><p>{service.featureCopy}</p><ul><li>Strategy aligned with commercial priorities</li><li>Clear communication and accountable delivery</li><li>Performance reviewed through useful evidence</li></ul><Link href="/contact">Get a Custom Proposal <b>→</b></Link></div></section>

    <section className="service-detail-faq"><div className="service-detail-heading"><p>Common Questions</p><h2>Answers Before <em>We Begin</em></h2></div><div>{serviceFaqs.map(([question,answer],index) => <details name={`service-faq-${service.slug}`} open={index === 0} key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="service-detail-related"><div className="service-detail-heading"><p>Explore More</p><h2>Connected <em>Growth Services</em></h2></div><div className="service-detail-related__grid">{related.map((item) => <Link href={`/services/${item.slug}`} key={item.slug}><span><Mark name={item.icon}/></span><h3>{item.label}</h3><p>{item.intro}</p><b>Explore Service →</b></Link>)}</div></section>

    <section className="service-detail-cta"><div><span>READY WHEN YOU ARE</span><h2>Let’s turn your next idea into <em>measurable growth.</em></h2></div><Link href="/contact">Get a Free Consultation <b>→</b></Link></section><BlogFooter />
  </main>;
}
