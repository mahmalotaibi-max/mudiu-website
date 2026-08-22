import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "تم إلغاء العملية",
};

export default function CheckoutCancelledPage() {
  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <Container className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          تم إلغاء عملية الدفع
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          لم تكتمل عملية الدفع ولم يتم خصم أي مبلغ. يمكنك المحاولة مرة أخرى في أي وقت.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/individuals">العودة للمنتجات</Button>
          <Button href="/contact" variant="secondary">
            تواصل معنا
          </Button>
        </div>
      </Container>
    </section>
  );
}
