"use client";

import { useEffect, useState } from "react";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 560);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav className="floating-actions" aria-label="Quick contact actions">
      <a
        className="floating-action whatsapp-action"
        href="https://wa.me/918890259407?text=Hi%20LeadBrix%2C%20I%27d%20like%20to%20discuss%20growing%20my%20business."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with LeadBrix on WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07a8.12 8.12 0 0 1-2.39-1.48 8.95 8.95 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35ZM12.04 21.79h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.22-3.74.98 1-3.65-.24-.38A9.86 9.86 0 0 1 2.15 11.9a9.89 9.89 0 1 1 9.89 9.89Zm8.41-18.21A11.8 11.8 0 0 0 12.05.1 11.91 11.91 0 0 0 1.73 17.96L.05 24l6.19-1.62A11.9 11.9 0 0 0 24 11.91c0-3.15-1.23-6.11-3.55-8.33Z" /></svg>
        <span>Chat on WhatsApp</span>
      </a>
      <button
        className={`floating-action scroll-top-action ${showTop ? "is-visible" : ""}`}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        tabIndex={showTop ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6" /></svg>
      </button>
    </nav>
  );
}
