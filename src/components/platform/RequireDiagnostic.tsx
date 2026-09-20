"use client";

import Link from "next/link";
import { usePlatform } from "@/components/platform/PlatformProvider";
import { Container } from "@/components/ui/Container";
import { PlatformButton } from "@/components/platform/PlatformButton";
import type { Locale } from "@/lib/platform/types";

const strings = {
  en: {
    title: "Run a diagnostic first",
    body: "This view is built from your organization's diagnostic data. Start one with the sample organization to explore it.",
    cta: "Run Organizational Diagnostic",
    diagnosticHref: "/platform/diagnostic",
    back: "Back to MUDIU Platform",
    platformHref: "/platform",
  },
  ar: {
    title: "ابدأ بتشغيل التشخيص أولًا",
    body: "هذه الشاشة مبنية على بيانات تشخيص مؤسستك. ابدأ تشخيصًا باستخدام مؤسسة تجريبية لاستكشافها.",
    cta: "شغّل التشخيص التنظيمي",
    diagnosticHref: "/platform/ar/diagnostic",
    back: "العودة إلى منصة MUDIU",
    platformHref: "/platform/ar",
  },
};

export function RequireDiagnostic({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  const { hasRun } = usePlatform();
  const t = strings[locale];

  if (!hasRun) {
    return (
      <Container className="max-w-2xl py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">{t.body}</p>
        <div className="mt-8 flex justify-center">
          <PlatformButton href={t.diagnosticHref} locale={locale}>
            {t.cta}
          </PlatformButton>
        </div>
        <Link href={t.platformHref} className="mt-6 inline-block text-sm text-muted hover:text-ink">
          {t.back}
        </Link>
      </Container>
    );
  }

  return <>{children}</>;
}
