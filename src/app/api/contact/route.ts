import { NextRequest, NextResponse } from "next/server";
import { appendRecord } from "@/lib/fileStore";

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  clientType: "individual" | "institution";
  requestType: string;
  message: string;
  submittedAt: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, clientType, requestType, message } = body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof message !== "string" ||
    !message.trim() ||
    (clientType !== "individual" && clientType !== "institution")
  ) {
    return NextResponse.json({ error: "بيانات الطلب غير مكتملة." }, { status: 400 });
  }

  const submission: ContactSubmission = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim(),
    phone: typeof phone === "string" ? phone.trim() : "",
    clientType,
    requestType: typeof requestType === "string" ? requestType.trim() : "",
    message: message.trim(),
    submittedAt: new Date().toISOString(),
  };

  await appendRecord<ContactSubmission>("contact-submissions.json", submission);

  return NextResponse.json({ ok: true, id: submission.id });
}
