import { getAdminSession } from "../../../../lib/auth";
import { deleteEnquiry, updateEnquiryStatus } from "../../../../lib/db";

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

export async function DELETE(_request, { params }) {
  const user = await getAdminSession();
  if (!user) return Response.json({ success: false }, { status: 401 });

  const { id } = await params;
  if (!/^[1-9]\d*$/.test(id)) {
    return Response.json({ success: false, message: "Invalid enquiry." }, { status: 400 });
  }

  const deleted = await deleteEnquiry(id);
  return Response.json({ success: deleted }, { status: deleted ? 200 : 404 });
}

