"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileDown, Sparkles, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { usePlatform } from "@/components/platform/PlatformProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/platform/types";

const strings = {
  en: {
    step1: "Step 1 of 2",
    title1: "Start with your existing data",
    body1:
      "You don't need to rebuild your strategy inside MUDIU. Give it the data you already have, and let it map how your organization connects from strategy to value.",
    uploadPrompt: "Upload Excel / CSV",
    dragDrop: "or drag and drop a file here",
    downloadTemplate: "Download Sample Template",
    or: "or",
    sampleFileName: "Sample Organization.xlsx",
    sampleTitle: "Use a sample organization",
    sampleBody: "Explore the platform with realistic sample data — no file needed.",
    step2: "Step 2 of 2",
    title2: "Confirm your data mapping",
    body2:
      "MUDIU matched the columns it found to its own model. Review the mapping below — you can adjust it later from Settings.",
    yourColumn: "Your column",
    mudiuField: "MUDIU field",
    runDiagnostic: "Run Diagnostic",
    back: "Back",
    analyzing: "Analyzing your organization's data…",
    checking: "Checking alignment, performance, benefits, and impact evidence.",
    overviewHref: "/platform/overview",
    columnMap: [
      { source: "Goal", field: "Strategic Goal" },
      { source: "KPI", field: "Indicator" },
      { source: "Project", field: "Initiative" },
      { source: "Service", field: "Product / Service" },
      { source: "Benefit", field: "Benefit" },
      { source: "Impact", field: "Impact" },
    ],
    templateCsv:
      "Goal,KPI,Baseline,Current,Target,Project,Output,Service,Benefit,Benefit Owner,Impact,Evidence Status\n" +
      "Improve access to healthcare services,Average waiting time,48,35,30,Digital Appointment Enhancement,Enhanced appointment platform,Appointment Booking Service,Reduced waiting time,Head of Patient Experience,Improved beneficiary access and experience,Partial\n",
  },
  ar: {
    step1: "الخطوة ١ من ٢",
    title1: "ابدأ ببياناتك الحالية",
    body1:
      "لا تحتاج لإعادة بناء استراتيجيتك داخل MUDIU. زوّدها بالبيانات التي تملكها أصلًا، ودعها ترسم كيف تتصل مؤسستك من الاستراتيجية إلى القيمة.",
    uploadPrompt: "ارفع ملف إكسل / CSV",
    dragDrop: "أو اسحب الملف وأفلته هنا",
    downloadTemplate: "تحميل نموذج تجريبي",
    or: "أو",
    sampleFileName: "مؤسسة تجريبية.xlsx",
    sampleTitle: "استخدم مؤسسة تجريبية",
    sampleBody: "استكشف المنصة ببيانات تجريبية واقعية - بلا حاجة لملف.",
    step2: "الخطوة ٢ من ٢",
    title2: "تأكيد ربط البيانات",
    body2: "طابقت MUDIU الأعمدة التي وجدتها مع نموذجها الخاص. راجع الربط أدناه - يمكنك تعديله لاحقًا من الإعدادات.",
    yourColumn: "عمودك",
    mudiuField: "حقل MUDIU",
    runDiagnostic: "شغّل التشخيص",
    back: "رجوع",
    analyzing: "جارٍ تحليل بيانات مؤسستك…",
    checking: "نتحقق من الارتباط والأداء والمنافع وأدلة الأثر.",
    overviewHref: "/platform/ar/overview",
    columnMap: [
      { source: "الهدف", field: "الهدف الاستراتيجي" },
      { source: "المؤشر", field: "المؤشر" },
      { source: "المشروع", field: "المبادرة" },
      { source: "الخدمة", field: "المنتج / الخدمة" },
      { source: "المنفعة", field: "المنفعة" },
      { source: "الأثر", field: "الأثر" },
    ],
    templateCsv:
      "الهدف,المؤشر,خط الأساس,الوضع الحالي,الهدف الرقمي,المشروع,المخرج,الخدمة,المنفعة,مسؤول المنفعة,الأثر,حالة الدليل\n" +
      "تحسين الوصول إلى الخدمات الصحية,متوسط وقت انتظار الموعد,48,35,30,تطوير حجز المواعيد الرقمي,منصة حجز مواعيد محسّنة,خدمة حجز المواعيد,تقليل وقت الانتظار,مدير تجربة المريض,تحسّن وصول المستفيدين وتجربتهم,جزئي\n",
  },
};

function downloadTemplate(csv: string) {
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mudiu-sample-template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

type Step = "source" | "mapping" | "running";

export function DiagnosticWizard({ locale = "en" }: { locale?: Locale }) {
  const [step, setStep] = useState<Step>("source");
  const [fileName, setFileName] = useState<string | null>(null);
  const { runDiagnostic } = usePlatform();
  const router = useRouter();
  const t = strings[locale];
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  function handleRun() {
    setStep("running");
    setTimeout(() => {
      runDiagnostic();
      router.push(t.overviewHref);
    }, 1400);
  }

  return (
    <Container className="max-w-2xl py-16 md:py-24">
      {step === "source" && (
        <div>
          <Eyebrow>{t.step1}</Eyebrow>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{t.title1}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.body1}</p>

          <label
            className={cn(
              "mt-8 flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-10 text-center transition-colors hover:border-ink"
            )}
          >
            <Upload className="size-6 text-muted" aria-hidden />
            <span className="text-sm font-medium text-ink">{fileName ? fileName : t.uploadPrompt}</span>
            <span className="text-xs text-muted">{t.dragDrop}</span>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setFileName(f ? f.name : null);
                setStep("mapping");
              }}
            />
          </label>

          <button
            type="button"
            onClick={() => downloadTemplate(t.templateCsv)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <FileDown className="size-4" aria-hidden />
            {t.downloadTemplate}
          </button>

          <div className="mt-10 flex items-center gap-4 text-sm text-muted">
            <span className="h-px flex-1 bg-line" />
            {t.or}
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            type="button"
            onClick={() => {
              setFileName(t.sampleFileName);
              setStep("mapping");
            }}
            className="mt-6 flex w-full items-center justify-between rounded-2xl border border-line px-6 py-5 text-start transition-colors hover:border-ink"
          >
            <span>
              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Sparkles className="size-4 text-orange" aria-hidden />
                {t.sampleTitle}
              </span>
              <span className="mt-1 block text-sm text-muted">{t.sampleBody}</span>
            </span>
          </button>
        </div>
      )}

      {step === "mapping" && (
        <div>
          <Eyebrow>{t.step2}</Eyebrow>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{t.title2}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.body2}</p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-2 bg-paper-alt px-5 py-3 text-xs font-semibold text-muted">
              <span>{t.yourColumn}</span>
              <span>{t.mudiuField}</span>
            </div>
            {t.columnMap.map((row) => (
              <div
                key={row.source}
                className="grid grid-cols-2 items-center border-t border-line px-5 py-3 text-sm"
              >
                <span className="text-ink">{row.source}</span>
                <span className="flex items-center gap-2 text-ink">
                  <CheckCircle2 className="size-4 text-orange" aria-hidden />
                  {row.field}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={handleRun}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 outline-offset-4 hover:-translate-y-0.5 hover:bg-navy hover:shadow-[0_16px_32px_-16px_rgba(30,47,82,0.5)] focus-visible:outline-orange"
            >
              <span>{t.runDiagnostic}</span>
              <Arrow
                className={cn(
                  "size-4 transition-transform duration-300",
                  locale === "ar" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                )}
                aria-hidden
              />
            </button>
            <button type="button" onClick={() => setStep("source")} className="text-sm text-muted hover:text-ink">
              {t.back}
            </button>
          </div>
        </div>
      )}

      {step === "running" && (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="size-10 animate-spin rounded-full border-2 border-line border-t-ink" aria-hidden />
          <p className="mt-6 text-base font-medium text-ink">{t.analyzing}</p>
          <p className="mt-2 text-sm text-muted">{t.checking}</p>
        </div>
      )}
    </Container>
  );
}
