import { createEnquiry } from "../../lib/db";

export const runtime = "nodejs";

const services = new Set([
  "SEO & Organic Growth",
  "Google Ads / PPC",
  "Social Media Marketing",
  "Branding & Identity",
  "Website Development",
  "App Development",
  "E-Commerce Solutions",
  "Business Automation",
]);

function clean(value, limit) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, limit);
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (body.website) return Response.json({ success: true }, { status: 201 });

    const name = clean(body.name, 120);
    const email = clean(body.email, 190).toLowerCase();
    const phone = clean(body.phone, 40);
    const service = clean(body.service, 120);
    const message = clean(body.message, 4000);

    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || !services.has(service) || message.length < 10) {
      return Response.json({ success: false, message: "Please complete all required fields correctly." }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const id = await createEnquiry({
      name,
      email,
      phone,
      service,
      message,
      ipAddress: forwardedFor.split(",")[0].trim().slice(0, 64),
      userAgent: clean(request.headers.get("user-agent"), 500),
    });

    return Response.json({ success: true, enquiryId: String(id), message: "Thank you. Our team will contact you shortly." }, { status: 201 });
  } catch (error) {
    console.error("Contact submission failed", error);
    return Response.json({ success: false, message: "We could not submit your enquiry right now. Please try again." }, { status: 500 });
  }
}

