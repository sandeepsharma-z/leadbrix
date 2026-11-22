"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function Icon({ name }) {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    content: <><path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 13h8M8 17h6"/></>,
    services: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    enquiries: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.4.36.75.6 1 .3.3.68.44 1.1.4h.1v4h-.1a1.7 1.7 0 0 0-1.7.6Z"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></>,
    article: <><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></>,
    pulse: <><path d="M3 12h4l2-5 4 10 2-5h6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    arrow: <path d="m9 18 6-6-6-6"/>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const nav = [
  ["overview", "dashboard", "Overview"],
  ["content", "content", "Content"],
  ["services", "services", "Services"],
  ["enquiries", "enquiries", "Enquiries"],
  ["settings", "settings", "Site Settings"],
];

function Status({ children, muted = false }) {
  return <span className={`admin-status ${muted ? "is-muted" : ""}`}><i/>{children}</span>;
}

export default function AdminDashboard({ posts, services }) {
  const [view, setView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const title = nav.find(([id]) => id === view)?.[2] || "Overview";
  const filteredPosts = useMemo(() => posts.filter((post) => `${post.title} ${post.category}`.toLowerCase().includes(query.toLowerCase())), [posts, query]);

  const selectView = (nextView) => { setView(nextView); setSidebarOpen(false); };

  return <main className="admin-shell">
    <aside className={`admin-sidebar ${sidebarOpen ? "is-open" : ""}`}>
      <Link href="/" className="admin-brand"><img src="/images/leadbrix-footer-logo.png" alt="LeadBrix"/><span>Admin Console</span></Link>
      <nav aria-label="Admin navigation">{nav.map(([id,icon,label]) => <button type="button" className={view === id ? "active" : ""} onClick={() => selectView(id)} key={id}><Icon name={icon}/><span>{label}</span>{id === "content" && <b>{posts.length}</b>}</button>)}</nav>
      <div className="admin-sidebar__bottom"><div><span>LB</span><p><strong>LeadBrix Admin</strong><small>Local content workspace</small></p></div><Link href="/" target="_blank">View website <Icon name="external"/></Link></div>
    </aside>
    {sidebarOpen && <button className="admin-backdrop" type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}/>}

    <section className="admin-main">
      <header className="admin-topbar">
        <button className="admin-menu" type="button" aria-label="Open dashboard navigation" onClick={() => setSidebarOpen(true)}><Icon name="menu"/></button>
        <div><span>Website Management</span><h1>{title}</h1></div>
        <div className="admin-topbar__actions"><Status>Website online</Status><Link href="/" target="_blank">Open site <Icon name="external"/></Link></div>
      </header>

      <div className="admin-content">
        {view === "overview" && <>
          <section className="admin-welcome"><div><span>LEADBRIX CONTROL CENTER</span><h2>Everything important,<br/><em>in one clear view.</em></h2><p>Review website content, open public pages and keep every LeadBrix service and article easy to find.</p></div><div className="admin-welcome__signal"><i/><strong>All public routes are available</strong><span>Content source: repository files</span></div></section>
          <section className="admin-metrics">
            <article><span><Icon name="services"/></span><div><small>Service pages</small><strong>{services.length}</strong><p>Complete internal pages</p></div></article>
            <article><span><Icon name="article"/></span><div><small>Published articles</small><strong>{posts.length}</strong><p>Long-form blog content</p></div></article>
            <article><span><Icon name="pulse"/></span><div><small>Public sections</small><strong>5</strong><p>Home, About, Services, Blog, Contact</p></div></article>
            <article><span><Icon name="check"/></span><div><small>Content health</small><strong>Ready</strong><p>Shared navigation connected</p></div></article>
          </section>
          <div className="admin-grid">
            <section className="admin-panel admin-panel--wide"><div className="admin-panel__head"><div><span>RECENT CONTENT</span><h2>Latest articles</h2></div><button type="button" onClick={() => selectView("content")}>View all</button></div><div className="admin-table">{posts.slice(0,4).map((post) => <Link href={`/blog/${post.slug}`} target="_blank" key={post.slug}><span className="admin-table__icon"><Icon name="article"/></span><div><strong>{post.title}</strong><small>{post.category} · {post.readTime}</small></div><Status>Published</Status><Icon name="arrow"/></Link>)}</div></section>
            <section className="admin-panel"><div className="admin-panel__head"><div><span>QUICK ACTIONS</span><h2>Manage website</h2></div></div><div className="admin-actions"><Link href="/services" target="_blank"><Icon name="services"/><span><strong>Review services</strong><small>Open the public service hub</small></span><Icon name="arrow"/></Link><Link href="/blog" target="_blank"><Icon name="content"/><span><strong>Review articles</strong><small>Open the blog library</small></span><Icon name="arrow"/></Link><Link href="/contact" target="_blank"><Icon name="enquiries"/><span><strong>Test contact flow</strong><small>Open the enquiry form</small></span><Icon name="arrow"/></Link></div></section>
          </div>
        </>}

        {view === "content" && <section className="admin-panel admin-library"><div className="admin-panel__head"><div><span>CONTENT LIBRARY</span><h2>Blog articles</h2></div><label className="admin-search"><Icon name="search"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles"/></label></div><div className="admin-table">{filteredPosts.map((post) => <Link href={`/blog/${post.slug}`} target="_blank" key={post.slug}><span className="admin-table__icon"><Icon name="article"/></span><div><strong>{post.title}</strong><small>{post.category} · {post.date} · {post.readTime}</small></div><Status>Published</Status><Icon name="external"/></Link>)}</div></section>}

        {view === "services" && <section className="admin-panel admin-library"><div className="admin-panel__head"><div><span>SERVICE LIBRARY</span><h2>Internal service pages</h2></div><Status>{services.length} live pages</Status></div><div className="admin-service-list">{services.map((service) => <Link href={`/services/${service.slug}`} target="_blank" key={service.slug}><span><Icon name="services"/></span><div><strong>{service.label}</strong><p>{service.intro}</p></div><Icon name="external"/></Link>)}</div></section>}

        {view === "enquiries" && <section className="admin-empty"><span><Icon name="enquiries"/></span><h2>Enquiries use your email workflow</h2><p>The current contact form opens the visitor’s email client and sends enquiries to <strong>hello@leadbrix.in</strong>. A database-backed inbox is not connected yet, so this dashboard does not invent enquiry records.</p><div><a href="mailto:hello@leadbrix.in">Open enquiry email</a><Link href="/contact" target="_blank">Test contact page</Link></div></section>}

        {view === "settings" && <div className="admin-settings"><section className="admin-panel"><div className="admin-panel__head"><div><span>BUSINESS DETAILS</span><h2>Public contact information</h2></div><Status>Connected</Status></div><dl><div><dt>Business</dt><dd>LeadBrix</dd></div><div><dt>Email</dt><dd>hello@leadbrix.in</dd></div><div><dt>Phone</dt><dd>+91 96677 30052</dd></div><div><dt>Location</dt><dd>Delhi NCR, India</dd></div></dl></section><section className="admin-panel"><div className="admin-panel__head"><div><span>SYSTEM STATUS</span><h2>Current setup</h2></div></div><div className="admin-checklist"><p><Icon name="check"/><span><strong>Shared header and footer</strong><small>Used across public pages</small></span></p><p><Icon name="check"/><span><strong>Responsive navigation</strong><small>Desktop and mobile menu</small></span></p><p><Icon name="check"/><span><strong>Code-managed content</strong><small>No database or CMS connected</small></span></p></div></section></div>}
      </div>
    </section>
  </main>;
}
