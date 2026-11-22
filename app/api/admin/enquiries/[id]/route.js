import { getAdminSession } from "../../../../lib/auth";
import { updateEnquiryStatus } from "../../../../lib/db";

export const runtime = "nodejs";

export async function PATCH(request, { params }) {
  const user = await getAdminSession();
  if (!user) return Response.json({ success: false }, { status: 401 });

  const { id } = await params;
  const { status } = await request.json();
  if (!/^[1-9]\d*$/.test(id) || !["new", "contacted", "closed"].includes(status)) {
    return Response.json({ success: false, message: "Invalid enquiry update." }, { status: 400 });
  }

  const updated = await updateEnquiryStatus(id, status);
  return Response.json({ success: updated }, { status: updated ? 200 : 404 });
}

