import { blogs } from "../blog/blog-data";
import { serviceDetails } from "../services/service-data";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin Dashboard | LeadBrix",
  description: "LeadBrix website content and performance overview.",
};

export default function AdminPage() {
  const posts = blogs.map(({ slug, title, category, date, readTime }) => ({ slug, title, category, date, readTime }));
  const services = serviceDetails.map(({ slug, label, intro, icon }) => ({ slug, label, intro, icon }));
  return <AdminDashboard posts={posts} services={services}/>;
}
