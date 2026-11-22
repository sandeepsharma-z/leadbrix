import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findAdminById } from "./db";

const COOKIE_NAME = "leadbrix_admin_session";
const SESSION_SECONDS = 60 * 60 * 12;

function sessionSecret() {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters long");
  }
  return process.env.SESSION_SECRET;
}

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function sign(payload) {
  return crypto.createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

function secureEqual(left, right) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function createSessionToken(user) {
  const payload = encode({
    userId: String(user.id),
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
    nonce: crypto.randomBytes(12).toString("hex"),
  });
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  try {
    const [payload, signature] = String(token || "").split(".");
    if (!payload || !signature || !secureEqual(signature, sign(payload))) return null;
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!session.userId || session.role !== "admin" || session.exp <= Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

export async function setAdminSession(user) {
  const store = await cookies();
  store.set(COOKIE_NAME, createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
    priority: "high",
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
}

export async function getAdminSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const session = verifySessionToken(token);
  if (!session) return null;
  const user = await findAdminById(session.userId);
  return user?.role === "admin" ? user : null;
}

export async function requireAdmin() {
  const user = await getAdminSession();
  if (!user) redirect("/admin/login");
  return user;
}

