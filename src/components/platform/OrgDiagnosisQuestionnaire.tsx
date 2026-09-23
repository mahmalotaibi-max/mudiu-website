"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/platform/types";
import type { AnswerValue, DimensionKey, QuestionLevel } from "@/lib/platform/orgDiagnosisTypes";
import { dimensionKeys } from "@/lib/platform/orgDiagnosisTypes";
import { dimensionLabels, dimensionQuestion, questionsFor } from "@/lib/platform/orgDiagnosisQuestions";
import { computeDimensionResults } from "@/lib/platform/orgDiagnosis";
import { useOrgDiagnosis } from "@/components/platform/OrgDiagnosisProvider";
import { riwaaOrgDiagnosticProfile } from "@/lib/platform/riwaaOrgDiagnosis";

const strings = {
  en: {
    step: (i: number, n: number) => `Step ${i} of ${n}`,
    deepDiveStep: (i: number, n: number, dimension: string) => `A signal appeared in ${dimension} worth a closer look - Step ${i} of ${n}`,
    introTitle: "Start Free Diagnostic",
    introBody:
      "A short, free diagnostic - no data upload needed. Answer a few simple questions about your organization, and MUDIU will show you where signals worth checking appear, and what to work on next.",
    orgNameLabel: "Your organization's name (optional)",
    orgNamePlaceholder: "e.g. Riwaa Foods",
    sampleTitle: "Try it with a sample organization",
    sampleBody: "See MUDIU work end to end on Riwaa Foods, a mid-size Saudi food company, before answering for your own.",
    start: "Start",
    next: "Next",
    back: "Back",
    finish: "See my results",
    yes: "Yes",
    partial: "Partial",
    no: "No",
    analyzing: "Putting your organizational view together…",
    resultsHref: "/platform/ar/diagnostic/results",
  },
  ar: {
    step: (i: number, n: number) => `الخطوة ${i} من ${n}`,
    deepDiveStep: (i: number, n: number, dimension: string) => `ظهرت إشارة في ${dimension} تستحق فهمًا أعمق - الخطوة ${i} من ${n}`,
    introTitle: "ابدأ التشخيص المجاني",
    introBody:
      "تشخيص قصير ومجاني - بلا حاجة لرفع بيانات. أجب على بضعة أسئلة بسيطة عن مؤسستك، وستُظهر لك MUDIU أين تظهر إشارات تستحق التحقق، وما الذي يستحق العمل عليه بعد ذلك.",
    orgNameLabel: "اسم مؤسستك (اختياري)",
    orgNamePlaceholder: "مثال: رِواء للأغذية",
    sampleTitle: "جرّبها بمؤسسة تجريبية",
    sampleBody: "شاهد كيف تعمل MUDIU على \"رِواء للأغذية\"، شركة أغذية سعودية متوسطة، قبل أن تجيب عن مؤسستك.",
    start: "ابدأ",
    next: "التالي",
    back: "رجوع",
    finish: "اعرض نتيجتي",
    yes: "نعم",
    partial: "جزئيًا",
    no: "لا",
    analyzing: "نجهّز نظرة مضي على مؤسستك…",
    resultsHref: "/platform/ar/diagnostic/results",
  },
};

const answerOptions: AnswerValue[] = ["yes", "partial", "no"];

interface DimensionStep {
  dimension: DimensionKey;
  level: QuestionLevel;
}
type Step = "intro" | DimensionStep | "running";

export function OrgDiagnosisQuestionnaire({ locale = "en" }: { locale?: Locale }) {
  const t = strings[locale];
  const router = useRouter();
  const { complete, completeWithProfile } = useOrgDiagnosis();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  // A stack, not an index: which dimensions get a follow-up Evidence step
  // depends on how each Signal step is answered, so "back" replays whatever
  // path was actually taken instead of a fixed sequence.
  const [history, setHistory] = useState<Step[]>(["intro"]);
  const [orgName, setOrgName] = useState("");
  const [answers, setAnswers] = useState<Partial<Record<string, AnswerValue>>>({});

  const step = history[history.length - 1];

  function pushStep(next: Step) {
    setHistory((h) => [...h, next]);
  }

  function goBack() {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  }

  function startDiagnostic() {
    pushStep({ dimension: dimensionKeys[0], level: "signal" });
  }

  function goToNextDimensionOrFinish(dimensionIndex: number) {
    if (dimensionIndex + 1 >= dimensionKeys.length) {
      finish();
    } else {
      pushStep({ dimension: dimensionKeys[dimensionIndex + 1], level: "signal" });
    }
  }

  function advanceFromSignal(dimension: DimensionKey) {
    const dimensionIndex = dimensionKeys.indexOf(dimension);
    const results = computeDimensionResults({ organizationName: orgName, sector: "business", answers });
    const hasEvidenceQuestions = questionsFor(dimension, "evidence").length > 0;
    if (results[dimension].status === "signal" && hasEvidenceQuestions) {
      pushStep({ dimension, level: "evidence" });
    } else {
      goToNextDimensionOrFinish(dimensionIndex);
    }
  }

  function advanceFromEvidence(dimension: DimensionKey) {
    goToNextDimensionOrFinish(dimensionKeys.indexOf(dimension));
  }

  function finish() {
    pushStep("running");
    setTimeout(() => {
      complete(orgName.trim(), answers);
      router.push(t.resultsHref);
    }, 900);
  }

  function useSample() {
    pushStep("running");
    setTimeout(() => {
      completeWithProfile(riwaaOrgDiagnosticProfile);
      router.push(t.resultsHref);
    }, 900);
  }

  return (
    <Container className="max-w-2xl py-16 md:py-24">
      {step === "intro" && (
        <div>
          <Eyebrow>{t.introTitle}</Eyebrow>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{t.introTitle}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.introBody}</p>

          <label className="mt-8 block">
            <span className="text-sm font-medium text-ink">{t.orgNameLabel}</span>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder={t.orgNamePlaceholder}
              className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
          </label>

          <button
            type="button"
            onClick={startDiagnostic}
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 outline-offset-4 hover:-translate-y-0.5 hover:bg-navy hover:shadow-[0_16px_32px_-16px_rgba(30,47,82,0.5)] focus-visible:outline-orange"
          >
            <span>{t.start}</span>
            <Arrow
              className={cn("size-4 transition-transform duration-300", locale === "ar" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1")}
              aria-hidden
            />
          </button>

          <div className="mt-10 flex items-center gap-4 text-sm text-muted">
            <span className="h-px flex-1 bg-line" />
            {locale === "ar" ? "أو" : "or"}
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            type="button"
            onClick={useSample}
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

      {step !== "intro" && step !== "running" && (
        <DimensionStep
          dimension={step.dimension}
          level={step.level}
          locale={locale}
          answers={answers}
          onAnswer={(id, value) => setAnswers((prev) => ({ ...prev, [id]: value }))}
          onBack={goBack}
          onNext={() =>
            step.level === "signal" ? advanceFromSignal(step.dimension) : advanceFromEvidence(step.dimension)
          }
          isLastDimension={dimensionKeys.indexOf(step.dimension) === dimensionKeys.length - 1}
          stepLabel={
            step.level === "signal"
              ? t.step(dimensionKeys.indexOf(step.dimension) + 1, dimensionKeys.length)
              : t.deepDiveStep(
                  dimensionKeys.indexOf(step.dimension) + 1,
                  dimensionKeys.length,
                  dimensionLabels[step.dimension][locale]
                )
          }
          t={t}
        />
      )}

      {step === "running" && (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="size-10 animate-spin rounded-full border-2 border-line border-t-ink" aria-hidden />
          <p className="mt-6 text-base font-medium text-ink">{t.analyzing}</p>
        </div>
      )}
    </Container>
  );
}

function DimensionStep({
  dimension,
  level,
  locale,
  answers,
  onAnswer,
  onBack,
  onNext,
  isLastDimension,
  stepLabel,
  t,
}: {
  dimension: DimensionKey;
  level: QuestionLevel;
  locale: Locale;
  answers: Partial<Record<string, AnswerValue>>;
  onAnswer: (id: string, value: AnswerValue) => void;
  onBack: () => void;
  onNext: () => void;
  isLastDimension: boolean;
  stepLabel: string;
  t: (typeof strings)["en"];
}) {
  const qs = questionsFor(dimension, level);
  const allAnswered = qs.every((q) => answers[q.id]);
  const answerLabel: Record<AnswerValue, string> = { yes: t.yes, partial: t.partial, no: t.no };

  // Whether clicking "next" will finish the diagnostic or reveal a deep-dive
  // step depends on how the Signal questions were just answered, so this is
  // recomputed live to label the button correctly ("Next" vs "See my results").
  const willNeedEvidence =
    level === "signal" &&
    computeDimensionResults({ organizationName: "", sector: "business", answers })[dimension].status === "signal" &&
    questionsFor(dimension, "evidence").length > 0;
  const isFinalStep = isLastDimension && (level === "evidence" || !willNeedEvidence);

  return (
    <div>
      <Eyebrow>{stepLabel}</Eyebrow>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-orange">
        {dimensionLabels[dimension][locale]}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {dimensionQuestion[dimension][locale]}
      </h1>

      <div className="mt-8 space-y-5">
        {qs.map((q) => (
          <div key={q.id} className="rounded-2xl border border-line p-5">
            <p className="text-sm font-medium text-ink">{q.text[locale]}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {answerOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onAnswer(q.id, option)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    answers[q.id] === option
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-ink hover:border-ink"
                  )}
                >
                  {answerLabel[option]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          disabled={!allAnswered}
          onClick={onNext}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
            allAnswered
              ? "bg-ink text-paper hover:-translate-y-0.5 hover:bg-navy"
              : "cursor-not-allowed bg-paper-alt text-muted"
          )}
        >
          {isFinalStep ? t.finish : t.next}
        </button>
        <button type="button" onClick={onBack} className="text-sm text-muted hover:text-ink">
          {t.back}
        </button>
      </div>
    </div>
  );
}
