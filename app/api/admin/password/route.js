import bcrypt from "bcryptjs";
import { clearAdminSession, getAdminSession } from "../../../lib/auth";
import { findAdminByEmail, updateAdminPassword } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const sessionUser = await getAdminSession();
    if (!sessionUser) return Response.json({ success: false, message: "Please sign in again." }, { status: 401 });

    const { currentPassword = "", newPassword = "" } = await request.json();
    if (String(newPassword).length < 8) {
      return Response.json({ success: false, message: "New password must be at least 8 characters." }, { status: 400 });
    }
    if (currentPassword === newPassword) {
      return Response.json({ success: false, message: "Choose a password different from the current password." }, { status: 400 });
    }

    const admin = await findAdminByEmail(sessionUser.email);
    const valid = admin && await bcrypt.compare(String(currentPassword), admin.password_hash);
    if (!valid) return Response.json({ success: false, message: "Current password is incorrect." }, { status: 400 });

    const passwordHash = await bcrypt.hash(String(newPassword), 12);
    const updated = await updateAdminPassword(admin.id, passwordHash);
    if (!updated) return Response.json({ success: false, message: "Password could not be updated." }, { status: 500 });

    await clearAdminSession();
    return Response.json({ success: true, message: "Password changed. Please sign in with your new password." });
  } catch (error) {
    console.error("Admin password update failed", error);
    return Response.json({ success: false, message: "Password change is temporarily unavailable." }, { status: 500 });
  }
}
