import { blogs } from "../blog/blog-data";
import { serviceDetails } from "../services/service-data";
import { requireAdmin } from "../lib/auth";
import { listEnquiries } from "../lib/db";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | LeadBrix",
  description: "LeadBrix website content and performance overview.",
};

export default async function AdminPage() {
  const user = await requireAdmin();
  const enquiries = await listEnquiries();
  const posts = blogs.map(({ slug, title, category, date, readTime }) => ({ slug, title, category, date, readTime }));
  const services = serviceDetails.map(({ slug, label, intro, icon }) => ({ slug, label, intro, icon }));
  return <AdminDashboard posts={posts} services={services} enquiries={enquiries} user={user}/>;
}
