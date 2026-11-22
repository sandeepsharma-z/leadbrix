"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [state, setState] = useState({ loading: false, error: "" });

  async function login(event) {
    event.preventDefault();
    setState({ loading: true, error: "" });
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to sign in.");
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setState({ loading: false, error: error.message });
    }
  }

  return <main className="admin-login">
    <section className="admin-login__visual">
      <div><span>LEADBRIX CONTROL CENTER</span><h1>Manage every<br/><em>growth conversation.</em></h1><p>Securely review new enquiries, track follow-ups and keep your digital presence moving forward.</p></div>
    </section>
    <section className="admin-login__panel">
      <form onSubmit={login}>
        <Image src="/images/leadbrix-logo.png" alt="LeadBrix" width={210} height={58} priority/>
        <span>ADMIN ACCESS</span>
        <h2>Welcome back</h2>
        <p>Sign in to open the LeadBrix dashboard.</p>
        <label>Email address<input type="email" name="email" autoComplete="username" required placeholder="admin@leadbrix.in"/></label>
        <label>Password<input type="password" name="password" autoComplete="current-password" required minLength={8} placeholder="Enter your password"/></label>
        {state.error && <div className="admin-login__error" role="alert">{state.error}</div>}
        <button type="submit" disabled={state.loading}>{state.loading ? "Signing in..." : "Sign In Securely"}</button>
        <small>Protected with encrypted credentials and a secure server session.</small>
      </form>
    </section>
  </main>;
}

