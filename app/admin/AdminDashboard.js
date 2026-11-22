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
    logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9"/></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
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

export default function AdminDashboard({ posts, services, enquiries, user }) {
  const [view, setView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [enquiryItems, setEnquiryItems] = useState(enquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [passwordState, setPasswordState] = useState({ pending: false, type: "", message: "" });
  const title = nav.find(([id]) => id === view)?.[2] || "Overview";
  const filteredPosts = useMemo(() => posts.filter((post) => `${post.title} ${post.category}`.toLowerCase().includes(query.toLowerCase())), [posts, query]);
  const newEnquiries = enquiryItems.filter((item) => item.status === "new").length;

  const selectView = (nextView) => { setView(nextView); setSidebarOpen(false); };

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function changeEnquiryStatus(id, status) {
    const previous = enquiryItems;
    setEnquiryItems((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    const response = await fetch(`/api/admin/enquiries/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (!response.ok) setEnquiryItems(previous);
  }

  async function removeEnquiry(item) {
    if (!window.confirm(`Delete enquiry from ${item.name}? This cannot be undone.`)) return;
    setDeletingId(item.id);
    const response = await fetch(`/api/admin/enquiries/${item.id}`, { method: "DELETE" });
    if (response.ok) {
      setEnquiryItems((items) => items.filter((entry) => entry.id !== item.id));
      if (selectedEnquiry?.id === item.id) setSelectedEnquiry(null);
    } else {
      window.alert("Enquiry could not be deleted. Please try again.");
    }
    setDeletingId(null);
  }

  async function changePassword(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const currentPassword = String(formData.get("currentPassword") || "");
    const newPassword = String(formData.get("newPassword") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");
    if (newPassword !== confirmPassword) {
      setPasswordState({ pending: false, type: "error", message: "New password and confirmation do not match." });
      return;
    }
    setPasswordState({ pending: true, type: "", message: "" });
    const response = await fetch("/api/admin/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword, newPassword }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      setPasswordState({ pending: false, type: "error", message: result.message || "Password could not be changed." });
      return;
    }
    form.reset();
    setPasswordState({ pending: false, type: "success", message: result.message });
    window.setTimeout(() => { window.location.href = "/admin/login"; }, 1400);
  }

  return <main className="admin-shell">
    <aside className={`admin-sidebar ${sidebarOpen ? "is-open" : ""}`}>
      <Link href="/" className="admin-brand"><img src="/images/leadbrix-footer-logo.png" alt="LeadBrix"/><span>Admin Console</span></Link>
      <nav aria-label="Admin navigation">{nav.map(([id,icon,label]) => <button type="button" className={view === id ? "active" : ""} onClick={() => selectView(id)} key={id}><Icon name={icon}/><span>{label}</span>{id === "content" && <b>{posts.length}</b>}</button>)}</nav>
      <div className="admin-sidebar__bottom"><div><span>{user.name?.slice(0,2).toUpperCase() || "LB"}</span><p><strong>{user.name}</strong><small>{user.email}</small></p></div><Link href="/" target="_blank">View website <Icon name="external"/></Link></div>
    </aside>
    {sidebarOpen && <button className="admin-backdrop" type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}/>}

    <section className="admin-main">
      <header className="admin-topbar">
        <button className="admin-menu" type="button" aria-label="Open dashboard navigation" onClick={() => setSidebarOpen(true)}><Icon name="menu"/></button>
        <div><span>Website Management</span><h1>{title}</h1></div>
        <div className="admin-topbar__actions"><Status>Database connected</Status><Link href="/" target="_blank">Open site <Icon name="external"/></Link><button className="admin-logout" type="button" onClick={logout} aria-label="Log out"><Icon name="logout"/></button></div>
      </header>

      <div className="admin-content">
        {view === "overview" && <>
          <section className="admin-welcome"><div><span>LEADBRIX CONTROL CENTER</span><h2>Every growth enquiry,<br/><em>in one clear view.</em></h2><p>Review incoming leads, manage follow-ups and keep every LeadBrix service and article easy to find.</p></div><div className="admin-welcome__signal"><i/><strong>Live database connected</strong><span>{newEnquiries} new {newEnquiries === 1 ? "enquiry" : "enquiries"} waiting</span></div></section>
          <section className="admin-metrics">
            <article><span><Icon name="services"/></span><div><small>Service pages</small><strong>{services.length}</strong><p>Complete internal pages</p></div></article>
            <article><span><Icon name="article"/></span><div><small>Published articles</small><strong>{posts.length}</strong><p>Long-form blog content</p></div></article>
            <article><span><Icon name="enquiries"/></span><div><small>Total enquiries</small><strong>{enquiryItems.length}</strong><p>{newEnquiries} currently new</p></div></article>
            <article><span><Icon name="check"/></span><div><small>Lead inbox</small><strong>Live</strong><p>MySQL storage connected</p></div></article>
          </section>
          <div className="admin-grid">
            <section className="admin-panel admin-panel--wide"><div className="admin-panel__head"><div><span>RECENT CONTENT</span><h2>Latest articles</h2></div><button type="button" onClick={() => selectView("content")}>View all</button></div><div className="admin-table">{posts.slice(0,4).map((post) => <Link href={`/blog/${post.slug}`} target="_blank" key={post.slug}><span className="admin-table__icon"><Icon name="article"/></span><div><strong>{post.title}</strong><small>{post.category} · {post.readTime}</small></div><Status>Published</Status><Icon name="arrow"/></Link>)}</div></section>
            <section className="admin-panel"><div className="admin-panel__head"><div><span>QUICK ACTIONS</span><h2>Manage website</h2></div></div><div className="admin-actions"><Link href="/services" target="_blank"><Icon name="services"/><span><strong>Review services</strong><small>Open the public service hub</small></span><Icon name="arrow"/></Link><Link href="/blog" target="_blank"><Icon name="content"/><span><strong>Review articles</strong><small>Open the blog library</small></span><Icon name="arrow"/></Link><Link href="/contact" target="_blank"><Icon name="enquiries"/><span><strong>Test contact flow</strong><small>Open the enquiry form</small></span><Icon name="arrow"/></Link></div></section>
          </div>
        </>}

        {view === "content" && <section className="admin-panel admin-library"><div className="admin-panel__head"><div><span>CONTENT LIBRARY</span><h2>Blog articles</h2></div><label className="admin-search"><Icon name="search"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles"/></label></div><div className="admin-table">{filteredPosts.map((post) => <Link href={`/blog/${post.slug}`} target="_blank" key={post.slug}><span className="admin-table__icon"><Icon name="article"/></span><div><strong>{post.title}</strong><small>{post.category} · {post.date} · {post.readTime}</small></div><Status>Published</Status><Icon name="external"/></Link>)}</div></section>}

        {view === "services" && <section className="admin-panel admin-library"><div className="admin-panel__head"><div><span>SERVICE LIBRARY</span><h2>Internal service pages</h2></div><Status>{services.length} live pages</Status></div><div className="admin-service-list">{services.map((service) => <Link href={`/services/${service.slug}`} target="_blank" key={service.slug}><span><Icon name="services"/></span><div><strong>{service.label}</strong><p>{service.intro}</p></div><Icon name="external"/></Link>)}</div></section>}

        {view === "enquiries" && <section className="admin-panel admin-library admin-enquiries"><div className="admin-panel__head"><div><span>LEAD INBOX</span><h2>Contact enquiries</h2></div><Status>{newEnquiries} new</Status></div>{enquiryItems.length ? <div className="admin-enquiry-list">{enquiryItems.map((item) => <article key={item.id}><div className="admin-enquiry-list__head"><span>{item.name.slice(0,2).toUpperCase()}</span><div><h3>{item.name}</h3><p>{item.service} · {new Date(item.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p></div><select value={item.status} onChange={(event) => changeEnquiryStatus(item.id, event.target.value)} aria-label={`Status for ${item.name}`}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></div><p className="admin-enquiry-list__message">{item.message}</p><div className="admin-enquiry-list__contact"><a href={`mailto:${item.email}`}>{item.email}</a>{item.phone && <a href={`tel:${item.phone.replace(/\s/g, "")}`}>{item.phone}</a>}</div><div className="admin-enquiry-list__actions"><button type="button" onClick={() => setSelectedEnquiry(item)}><Icon name="eye"/> View enquiry</button><button type="button" className="is-danger" disabled={deletingId === item.id} onClick={() => removeEnquiry(item)}><Icon name="trash"/> {deletingId === item.id ? "Deleting..." : "Delete"}</button></div></article>)}</div> : <div className="admin-empty"><span><Icon name="enquiries"/></span><h2>No enquiries yet</h2><p>New contact form submissions will appear here automatically.</p><div><Link href="/contact" target="_blank">Open contact page</Link></div></div>}</section>}

        {view === "settings" && <div className="admin-settings"><section className="admin-panel"><div className="admin-panel__head"><div><span>BUSINESS DETAILS</span><h2>Public contact information</h2></div><Status>Connected</Status></div><dl><div><dt>Business</dt><dd>LeadBrix</dd></div><div><dt>Email</dt><dd>hello@leadbrix.in</dd></div><div><dt>Phone</dt><dd>+91 96677 30052</dd></div><div><dt>Location</dt><dd>Platina Tower, DLF Phase 1, Gurugram</dd></div></dl></section><section className="admin-panel admin-password-panel"><div className="admin-panel__head"><div><span>LOGIN SECURITY</span><h2>Change admin password</h2></div><i className="admin-password-panel__icon"><Icon name="lock"/></i></div><form onSubmit={changePassword}><label>Current password<input type="password" name="currentPassword" autoComplete="current-password" required minLength={8} placeholder="Enter current password"/></label><label>New password<input type="password" name="newPassword" autoComplete="new-password" required minLength={8} placeholder="Minimum 8 characters"/></label><label>Confirm new password<input type="password" name="confirmPassword" autoComplete="new-password" required minLength={8} placeholder="Re-enter new password"/></label>{passwordState.message && <p className={`admin-form-notice is-${passwordState.type}`}>{passwordState.message}</p>}<button type="submit" disabled={passwordState.pending}>{passwordState.pending ? "Updating password..." : "Change Password"}</button><small>After changing the password, you will be signed out and asked to log in again.</small></form></section><section className="admin-panel"><div className="admin-panel__head"><div><span>SYSTEM STATUS</span><h2>Current setup</h2></div></div><div className="admin-checklist"><p><Icon name="check"/><span><strong>Secure admin authentication</strong><small>Signed server session and hashed password</small></span></p><p><Icon name="check"/><span><strong>Responsive navigation</strong><small>Desktop and mobile dashboard</small></span></p><p><Icon name="check"/><span><strong>MySQL enquiry storage</strong><small>Contact submissions saved in real time</small></span></p></div></section></div>}
      </div>
    </section>
    {selectedEnquiry && <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedEnquiry(null); }}><article><header><div><span>ENQUIRY DETAILS</span><h2 id="enquiry-modal-title">{selectedEnquiry.name}</h2></div><button type="button" aria-label="Close enquiry details" onClick={() => setSelectedEnquiry(null)}><Icon name="close"/></button></header><dl><div><dt>Service</dt><dd>{selectedEnquiry.service}</dd></div><div><dt>Status</dt><dd className="is-capitalized">{selectedEnquiry.status}</dd></div><div><dt>Email</dt><dd><a href={`mailto:${selectedEnquiry.email}`}>{selectedEnquiry.email}</a></dd></div><div><dt>Phone</dt><dd>{selectedEnquiry.phone ? <a href={`tel:${selectedEnquiry.phone.replace(/\s/g, "")}`}>{selectedEnquiry.phone}</a> : "Not provided"}</dd></div><div><dt>Received</dt><dd>{new Date(selectedEnquiry.created_at).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}</dd></div><div><dt>Source</dt><dd>{selectedEnquiry.source}</dd></div></dl><section><span>MESSAGE</span><p>{selectedEnquiry.message}</p></section><footer><button type="button" className="is-danger" disabled={deletingId === selectedEnquiry.id} onClick={() => removeEnquiry(selectedEnquiry)}><Icon name="trash"/> {deletingId === selectedEnquiry.id ? "Deleting..." : "Delete enquiry"}</button><button type="button" onClick={() => setSelectedEnquiry(null)}>Close</button></footer></article></div>}
  </main>;
}
