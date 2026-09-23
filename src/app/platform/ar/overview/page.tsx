import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { DemoBanner } from "@/components/platform/DemoBanner";
import { ScoreCard } from "@/components/platform/ScoreCard";
import { sampleOrganizationAr } from "@/lib/platform/sampleData.ar";
import { computeFindings, computeScores } from "@/lib/platform/diagnostics";
import type { Finding } from "@/lib/platform/types";

export const metadata: Metadata = {
  title: "الصحة الاستراتيجية | منصة MUDIU",
};

const severityLabel: Record<Finding["severity"], string> = {
  high: "يتطلب انتباهًا",
  medium: "يتطلب مراجعة",
  low: "يستحق المراجعة",
};

const severityDot: Record<Finding["severity"], string> = {
  high: "bg-orange",
  medium: "bg-orange/50",
  low: "bg-line",
};

export default function OverviewPageAr() {
  const scores = computeScores(sampleOrganizationAr);
  const findings = computeFindings(sampleOrganizationAr, "ar");

  return (
    <>
      <PlatformShell active="overview" locale="ar" />
      <DemoBanner locale="ar" />
      <Container className="max-w-5xl py-12 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          الصحة الاستراتيجية للمؤسسة
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          نظرة تشخيصية على مدى اتصال استراتيجية مؤسستك بالتنفيذ والقيمة والأثر - بناءً على
          البيانات المقدَّمة.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ScoreCard
            label="الارتباط الاستراتيجي"
            score={scores.strategicAlignment}
            qualifier="مرتبط"
            description="مدى ارتباط المبادرات والأنشطة بالأولويات الاستراتيجية."
          />
          <ScoreCard
            label="جاهزية الأداء"
            score={scores.performanceReadiness}
            qualifier="مدعوم بالبيانات"
            description="مدى اكتمال بنية المؤشرات وقابليتها للاستخدام."
          />
          <ScoreCard
            label="جاهزية المنافع"
            score={scores.benefitReadiness}
            qualifier="مدعوم بالبيانات"
            description="مدى وضوح المنافع المتوقعة وقابليتها للقياس."
          />
          <ScoreCard
            label="أدلة الأثر"
            score={scores.impactReadiness}
            qualifier="مُوثَّق"
            description="مدى وجود دليل داعم للأثر، بدلًا من ادعاء غير مدعوم."
          />
        </div>

        <p className="mt-4 text-xs text-muted">
          هذه مؤشرات تشخيصية مبنية على البيانات المقدَّمة - تصف مدى ترابط بيانات مؤسستك ووجود
          الأدلة عليها، وليست تصنيفًا علميًا أو معدل نجاح. الرقم المنخفض يعني نقصًا في البيانات أو
          الروابط، لا فشلًا.
        </p>

        <div className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-ink">أين تنقطع القيمة</h2>
          <div className="mt-5 divide-y divide-line rounded-2xl border border-line">
            {findings.map((f) => (
              <div key={f.id} className="flex items-start gap-3 px-5 py-4">
                <span className={`mt-1.5 size-2 shrink-0 rounded-full ${severityDot[f.severity]}`} aria-hidden />
                <div>
                  <p className="text-sm text-ink">{f.message}</p>
                  <p className="mt-0.5 text-xs text-muted">{severityLabel[f.severity]}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            هذه ليست أحكامًا نهائية - بل تُبرز أين يوجد رابط مفقود، أو دليل غير مكتمل، أو أمر
            يستحق نظرة أقرب.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/platform/ar/strategy"
            className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy"
          >
            استكشف الهدف ← الأثر
          </Link>
          <Link
            href="/platform/ar/insights"
            className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            اسأل MUDIU
          </Link>
        </div>
      </Container>
    </>
  );
}
