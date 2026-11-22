import bcrypt from "bcryptjs";
import { findAdminByEmail, recordAdminLogin } from "../../../lib/db";
import { setAdminSession } from "../../../lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { email = "", password = "" } = await request.json();
    const user = await findAdminByEmail(String(email).trim().toLowerCase());
    const valid = user && await bcrypt.compare(String(password), user.password_hash);
    if (!valid) return Response.json({ success: false, message: "Invalid email or password." }, { status: 401 });

    await recordAdminLogin(user.id);
    await setAdminSession(user);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Admin login failed", error);
    return Response.json({ success: false, message: "Login is temporarily unavailable." }, { status: 500 });
  }
}

