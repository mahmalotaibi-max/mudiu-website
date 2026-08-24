import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ContactForm } from "@/components/ContactForm";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "لنبدأ من التحدي. تواصل مع فريق مُضيّ وابدأ رحلتك نحو الأثر.",
};

export default function ContactPage() {
  return (
    <section id="booking" className="pt-16 pb-24 md:pt-24 md:pb-32">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <RevealOnScroll>
          <Eyebrow>تواصل معنا</Eyebrow>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            لنبدأ من التحدي.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
            شارك تفاصيل طلبك وسنعود إليك قريبًا، أو تواصل معنا مباشرة عبر واتساب.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              <MessageCircle className="size-4 text-orange" aria-hidden />
              تواصل عبر واتساب
            </a>
            <a
              href={`tel:${contact.phoneE164}`}
              className="inline-flex items-center gap-3 text-sm text-muted"
              dir="ltr"
            >
              <Phone className="size-4" aria-hidden />
              {contact.phoneDisplay}
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100} className="rounded-3xl border border-line p-8 md:p-10">
          <ContactForm />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
