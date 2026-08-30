import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

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

  const clientTypeAr = clientType === "individual" ? "فرد" : "مؤسسة";
  const phoneTrimmed = typeof phone === "string" ? phone.trim() : "";
  const requestTypeTrimmed = typeof requestType === "string" ? requestType.trim() : "";

  try {
    await sendMail({
      subject: `طلب تواصل جديد من ${name.trim()}`,
      replyTo: email.trim(),
      text: [
        `الاسم: ${name.trim()}`,
        `البريد الإلكتروني: ${email.trim()}`,
        `رقم الجوال: ${phoneTrimmed || "-"}`,
        `نوع المتواصل: ${clientTypeAr}`,
        `نوع الطلب: ${requestTypeTrimmed || "-"}`,
        "",
        "الرسالة:",
        message.trim(),
      ].join("\n"),
    });
  } catch {
    return NextResponse.json(
      { error: "تعذّر إرسال رسالتك حاليًا. حاول لاحقًا أو تواصل معنا مباشرة على الجوال أو واتساب." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
