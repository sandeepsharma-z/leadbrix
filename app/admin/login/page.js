import { redirect } from "next/navigation";
import { getAdminSession } from "../../lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Login | LeadBrix", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const user = await getAdminSession();
  if (user) redirect("/admin");
  return <LoginForm/>;
}

