"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const requestTypes = [
  "استشارة مؤسسية",
  "برنامج تدريبي",
  "شراء منتج",
  "شراكة",
  "استفسار عام",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [clientType, setClientType] = useState<"individual" | "institution">("individual");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          clientType,
          requestType: data.get("requestType"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-paper-alt p-8 text-center">
        <p className="text-base font-semibold text-ink">تم إرسال طلبك بنجاح.</p>
        <p className="mt-2 text-sm text-muted">سيتواصل معك فريق مُضيّ في أقرب وقت ممكن.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="الاسم" name="name" required />
        <Field label="البريد الإلكتروني" name="email" type="email" required />
      </div>

      <Field label="الجوال" name="phone" type="tel" dir="ltr" />

      <div>
        <span className="mb-3 block text-sm font-medium text-ink">نوع العميل</span>
        <div className="flex gap-3">
          {(
            [
              { key: "individual", label: "فرد" },
              { key: "institution", label: "مؤسسة" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setClientType(opt.key)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm transition-colors",
                clientType === opt.key
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-muted hover:border-ink hover:text-ink"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="requestType" className="mb-2 block text-sm font-medium text-ink">
          نوع الطلب
        </label>
        <select
          id="requestType"
          name="requestType"
          defaultValue={requestTypes[0]}
          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
        >
          {requestTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          الرسالة
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-orange">حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-navy disabled:opacity-60"
      >
        {status === "submitting" ? "جارِ الإرسال..." : "إرسال الطلب"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  dir,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        dir={dir}
        className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
      />
    </div>
  );
}
