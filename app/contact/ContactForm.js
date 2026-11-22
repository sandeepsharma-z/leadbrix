"use client";

import { useState } from "react";

function Icon({ name }) {
  const paths = {
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-5 3-8 8-8s8 3 8 8"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    phone: <path d="M7 3H4a2 2 0 0 0-2 2c0 9.4 7.6 17 17 17a2 2 0 0 0 2-2v-3l-5-2-2 3c-3.8-1.6-6.4-4.2-8-8l3-2-2-5Z"/>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function ContactForm() {
  const [state, setState] = useState({ loading: false, type: "", message: "" });
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ loading: true, type: "", message: "" });
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to submit your enquiry.");
      form.reset();
      setState({ loading: false, type: "success", message: result.message });
    } catch (error) {
      setState({ loading: false, type: "error", message: error.message });
    }
  }
  return <form onSubmit={submit}>
    <label><Icon name="user"/><input name="name" required minLength={2} maxLength={120} placeholder="Your Name *"/></label>
    <label><Icon name="mail"/><input name="email" type="email" required maxLength={190} placeholder="Your Email *"/></label>
    <label><Icon name="phone"/><input name="phone" type="tel" maxLength={40} placeholder="Your Phone"/></label>
    <label><Icon name="grid"/><select name="service" required defaultValue=""><option value="" disabled>Select a Service *</option><option>SEO &amp; Organic Growth</option><option>Google Ads / PPC</option><option>Social Media Marketing</option><option>Branding &amp; Identity</option><option>Website Development</option><option>App Development</option><option>E-Commerce Solutions</option><option>Business Automation</option></select></label>
    <label className="contact-v2-message"><Icon name="message"/><textarea name="message" required minLength={10} maxLength={4000} placeholder="Tell us about your project... *"/></label>
    <input className="contact-v2-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    {state.message && <p className={`contact-v2-form-status is-${state.type}`} role="status">{state.message}</p>}
    <button type="submit" disabled={state.loading}>{state.loading ? "Sending..." : "Send Message"} <span>→</span></button>
  </form>;
}
