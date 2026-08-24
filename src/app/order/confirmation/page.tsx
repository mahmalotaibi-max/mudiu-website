import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getStripe } from "@/lib/stripe";
import { getOrderBySessionId } from "@/lib/orders";

export const metadata: Metadata = {
  title: "تأكيد الطلب",
};

const statusCopy: Record<string, { title: string; body: string }> = {
  paid: {
    title: "تم الدفع بنجاح",
    body: "شكرًا لك، تم تأكيد طلبك وستصلك تفاصيل الوصول إلى المنتج على بريدك الإلكتروني.",
  },
  unpaid: {
    title: "الدفع قيد المعالجة",
    body: "عملية الدفع قيد المعالجة حاليًا. سنؤكد لك عبر البريد الإلكتروني فور اكتمالها.",
  },
  no_payment_required: {
    title: "تم تأكيد الطلب",
    body: "تم تأكيد طلبك بنجاح.",
  },
};

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <EmptyState
        title="لا يوجد طلب لعرضه"
        body="تعذّر العثور على تفاصيل الطلب. إن كنت أتممت عملية شراء للتو، تحقق من بريدك الإلكتروني."
      />
    );
  }

  let paymentStatus: string | null = null;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    paymentStatus = session.payment_status;
  } catch {
    paymentStatus = null;
  }

  const order = await getOrderBySessionId(sessionId);

  if (!paymentStatus || !order) {
    return (
      <EmptyState
        title="تعذّر تأكيد حالة الطلب"
        body="تحقق من بريدك الإلكتروني للتأكيد، أو تواصل معنا إذا استمرت المشكلة."
      />
    );
  }

  const copy = statusCopy[paymentStatus] ?? {
    title: "حالة الطلب غير معروفة",
    body: "تواصل معنا وسنساعدك في التحقق من حالة طلبك.",
  };

  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <Container className="max-w-xl">
        <div className="rounded-3xl border border-line p-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{copy.body}</p>

          <dl className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-right">
            <Row label="المنتج" value={order.productName} />
            <Row label="رقم الطلب" value={order.id} mono />
            <Row label="البريد المستخدم" value={order.customerEmail} />
            <Row
              label="حالة الدفع"
              value={paymentStatus === "paid" ? "مدفوع" : paymentStatus}
            />
          </dl>

          <div className="mt-10">
            <Button href="/individuals">استكشف برامج أخرى</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className={mono ? "font-mono text-xs text-ink" : "text-ink"}>{value}</dd>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <Container className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">{body}</p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact">تواصل معنا</Button>
        </div>
      </Container>
    </section>
  );
}
