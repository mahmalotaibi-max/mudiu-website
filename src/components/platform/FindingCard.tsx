"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlatformButton } from "@/components/platform/PlatformButton";
import { useOrgDiagnosis } from "@/components/platform/OrgDiagnosisProvider";
import type { Confidence, Finding, Priority } from "@/lib/platform/orgDiagnosisTypes";
import type { Locale } from "@/lib/platform/types";

// The "explore/request solution" UI (recommended solution, per-dimension
// MockSolution catalog) is deliberately hidden here - see the Phase 2
// Solution-path audit. The catalog (`orgDiagnosisSolutions.ts`) and the
// request-link builder (`solutionRequest.ts`) are kept as a future capability,
// intentionally unused by this component for now: the current journey is
// Signal -> Validation -> Adoption -> Objective only, with no competing
// "explore the solution" path.

const strings = {
  en: {
    evidence: "Evidence",
    affectedArea: "Affected area",
    priority: "Priority",
    confidence: "Confidence",
    whyItMatters: "Why it matters",
    whatToValidate: "What's worth validating",
    missingData: "Missing data",
    explore: "Explore what we found",
    priorityBadge: "Priority to verify",
    priorityLabel: { high: "High", medium: "Medium", low: "Low" } as Record<Priority, string>,
    confidenceLabel: { low: "Low", medium: "Medium", high: "High" } as Record<Confidence, string>,
    validationTitle: "Checking reality",
    validationQuestion: "Does this signal actually reflect your organization's reality?",
    validationHelper: "Your answer helps us understand how accurate this signal is - it doesn't change the diagnostic result.",
    validationYes: "Yes, it reflects our reality",
    validationNo: "No, it doesn't reflect our reality",
    validationNotePlaceholder: "Optional detail",
    adoptionTitle: "The action decision",
    adoptionQuestion: "Now that it's checked, do you see this as worth working on?",
    adoptionYes: "Yes, worth working on",
    adoptionNotNow: "Not now",
    adoptionNeedsValidation: "I need more validation",
    deferredNote: "This has been deferred. You can come back to it anytime.",
    needsValidationNote: "Revisit what's worth validating above, then come back to decide once you have enough.",
    changeQuestion: "What do you want to change?",
    changePlaceholder: "e.g. Performance indicators actually used in monthly review meetings",
    objectiveQuestion: "What would success look like?",
    objectiveHelper: "Describe the situation you want to reach, not the problem itself.",
    objectivePlaceholder: "e.g. Monthly decisions are based on recorded indicators, not impressions.",
    closureTitle: "You've defined what to change and what success looks like.",
    closureBody: "You can come back to this decision anytime in My Organization.",
    closureCta: "View in My Organization",
  },
  ar: {
    evidence: "الدليل",
    affectedArea: "المجال",
    priority: "الأولوية",
    confidence: "درجة الثقة",
    whyItMatters: "لماذا تستحق الانتباه",
    whatToValidate: "ما الذي يستحق التحقق منه",
    missingData: "بيانات ناقصة",
    explore: "استكشف ما اكتشفناه",
    priorityBadge: "الأولوية للتحقق",
    priorityLabel: { high: "عالية", medium: "متوسطة", low: "منخفضة" } as Record<Priority, string>,
    confidenceLabel: { low: "منخفضة", medium: "متوسطة", high: "عالية" } as Record<Confidence, string>,
    validationTitle: "التحقق من الواقع",
    validationQuestion: "هل تعكس هذه الإشارة واقع مؤسستك فعلًا؟",
    validationHelper: "إجابتك تساعدنا على فهم دقة هذه الإشارة، ولا تغيّر نتيجة التشخيص.",
    validationYes: "نعم، تعكس واقعنا",
    validationNo: "لا، لا تعكس واقعنا",
    validationNotePlaceholder: "تفصيل اختياري",
    adoptionTitle: "قرار العمل",
    adoptionQuestion: "بعد التحقق من الإشارة، هل ترى أن هذا الأمر يستحق العمل عليه؟",
    adoptionYes: "نعم، يستحق العمل عليه",
    adoptionNotNow: "ليس الآن",
    adoptionNeedsValidation: "أحتاج إلى مزيد من التحقق",
    deferredNote: "تم تأجيل هذا الأمر. يمكنك العودة إليه لاحقًا.",
    needsValidationNote: "راجع ما يستحق التحقق منه أعلاه، ثم عُد لاتخاذ القرار متى توفرت لديك معلومات كافية.",
    changeQuestion: "ما الذي تريد تغييره؟",
    changePlaceholder: "مثال: أن تُستخدم مؤشرات الأداء فعليًا في اجتماعات المراجعة الشهرية",
    objectiveQuestion: "كيف سيبدو النجاح؟",
    objectiveHelper: "صف الوضع الذي تريد الوصول إليه، لا المشكلة نفسها.",
    objectivePlaceholder: "مثال: قرارات الإدارة الشهرية تستند إلى مؤشرات مسجَّلة، لا إلى الانطباع.",
    closureTitle: "تم تحديد ما تريد تغييره وكيف سيبدو النجاح.",
    closureBody: "يمكنك الرجوع إلى هذا القرار لاحقًا ضمن مؤسستي.",
    closureCta: "عرض في مؤسستي",
  },
};

const priorityDot: Record<Priority, string> = {
  high: "bg-orange",
  medium: "bg-navy",
  low: "bg-line",
};

function ChoiceButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
        selected ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"
      )}
    >
      {children}
    </button>
  );
}

export function FindingCard({
  finding,
  locale = "en",
  variant = "secondary",
}: {
  finding: Finding;
  locale?: Locale;
  variant?: "priority" | "secondary";
}) {
  const { findingProgress, openFinding, setValidation, setAdoption, setObjective } = useOrgDiagnosis();
  const [open, setOpen] = useState(false);
  const progress = findingProgress[finding.id];
  const [validationNote, setValidationNote] = useState(progress?.validationNote ?? "");
  const [changeStatement, setChangeStatement] = useState(progress?.changeStatement ?? "");
  const [objectiveText, setObjectiveText] = useState(progress?.objective ?? "");
  const t = strings[locale];
  const isPriority = variant === "priority";

  function handleToggle() {
    setOpen((v) => {
      const next = !v;
      if (next) openFinding(finding.id);
      return next;
    });
  }

  function handleValidate(confirmed: boolean) {
    setValidation(finding.id, confirmed ? "validated" : "not-validated", validationNote.trim() || undefined);
  }

  function handleValidationNoteBlur() {
    if (progress?.validation) {
      setValidation(finding.id, progress.validation, validationNote.trim() || undefined);
    }
  }

  function handleAdopt(outcome: "adopted" | "deferred" | "needs-validation") {
    setAdoption(finding.id, outcome, outcome === "adopted" ? changeStatement.trim() || undefined : undefined);
  }

  function handleChangeStatementBlur() {
    if (progress?.adoption === "adopted") {
      setAdoption(finding.id, "adopted", changeStatement.trim() || undefined);
    }
  }

  function handleObjectiveBlur() {
    if (objectiveText.trim()) setObjective(finding.id, objectiveText.trim());
  }

  const priorityPill = (
    <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-muted">
      <span className={cn("size-1.5 rounded-full", priorityDot[finding.priority])} aria-hidden />
      {t.priority}: {t.priorityLabel[finding.priority]}
    </span>
  );

  const confidencePill = (
    <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-muted">
      {t.confidence}: {t.confidenceLabel[finding.confidence]}
    </span>
  );

  return (
    <div
      className={cn(
        "rounded-2xl border",
        isPriority ? "border-ink/15 bg-paper-alt/60 p-6 md:p-7" : "border-line px-5 py-4",
      )}
    >
      {isPriority ? (
        <div>
          <span className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
            {t.priorityBadge}
          </span>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-ink md:text-xl">{finding.affectedArea[locale]}</h3>
            <div className="flex items-center gap-3">
              {priorityPill}
              {confidencePill}
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink">{finding.whatWeFound[locale]}</p>

          <div className="mt-4">
            <p className="text-xs font-semibold text-muted">{t.whyItMatters}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink">{finding.whyItMatters[locale]}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-muted">{t.affectedArea}</p>
            <p className="mt-1 text-sm font-semibold text-ink">{finding.affectedArea[locale]}</p>
            <p className="mt-1.5 text-sm text-muted">{finding.whatWeFound[locale]}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {priorityPill}
            {confidencePill}
          </div>
        </div>
      )}

      {!isPriority && (
        <p className="mt-2 text-xs text-muted">{finding.whyItMatters[locale]}</p>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-navy"
      >
        {t.explore}
        {open ? <ChevronUp className="size-3.5" aria-hidden /> : <ChevronDown className="size-3.5" aria-hidden />}
      </button>

      {open && (
        <div className="mt-4 space-y-4 border-t border-line pt-4">
          {finding.evidence[locale].length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted">{t.evidence}</p>
              <ul className="mt-1.5 space-y-1">
                {finding.evidence[locale].map((line) => (
                  <li key={line} className="text-sm text-ink">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-muted">{t.whatToValidate}</p>
            <p className="mt-1 text-sm text-ink">{finding.whatToValidate[locale]}</p>
          </div>

          {finding.missingData && finding.missingData[locale].length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted">{t.missingData}</p>
              <ul className="mt-1.5 space-y-1">
                {finding.missingData[locale].map((line) => (
                  <li key={line} className="text-sm text-muted">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Validation - "does this reflect reality?", never a score, never affects Confidence/Priority. */}
          <div className="rounded-xl bg-paper-alt p-4">
            <p className="text-xs font-semibold text-muted">{t.validationTitle}</p>
            <p className="mt-1 text-sm font-medium text-ink">{t.validationQuestion}</p>
            <p className="mt-1 text-xs text-muted">{t.validationHelper}</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <ChoiceButton selected={progress?.validation === "validated"} onClick={() => handleValidate(true)}>
                {t.validationYes}
              </ChoiceButton>
              <ChoiceButton selected={progress?.validation === "not-validated"} onClick={() => handleValidate(false)}>
                {t.validationNo}
              </ChoiceButton>
            </div>
            <textarea
              value={validationNote}
              onChange={(e) => setValidationNote(e.target.value)}
              onBlur={handleValidationNoteBlur}
              placeholder={finding.verificationPrompt[locale] || t.validationNotePlaceholder}
              rows={2}
              className="mt-2.5 w-full resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-ink"
            />

            {/* Adoption - only meaningful once the signal is validated. A "no" here is a valid, neutral stop, not a failure. */}
            {progress?.validation === "validated" && (
              <div className="mt-4 border-t border-line pt-4">
                <p className="text-xs font-semibold text-muted">{t.adoptionTitle}</p>
                <p className="mt-1 text-sm font-medium text-ink">{t.adoptionQuestion}</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <ChoiceButton selected={progress?.adoption === "adopted"} onClick={() => handleAdopt("adopted")}>
                    {t.adoptionYes}
                  </ChoiceButton>
                  <ChoiceButton selected={progress?.adoption === "deferred"} onClick={() => handleAdopt("deferred")}>
                    {t.adoptionNotNow}
                  </ChoiceButton>
                  <ChoiceButton
                    selected={progress?.adoption === "needs-validation"}
                    onClick={() => handleAdopt("needs-validation")}
                  >
                    {t.adoptionNeedsValidation}
                  </ChoiceButton>
                </div>

                {progress?.adoption === "deferred" && (
                  <p className="mt-2.5 text-xs text-muted">{t.deferredNote}</p>
                )}
                {progress?.adoption === "needs-validation" && (
                  <p className="mt-2.5 text-xs text-muted">{t.needsValidationNote}</p>
                )}

                {progress?.adoption === "adopted" && (
                  <div className="mt-3">
                    <label className="text-xs font-semibold text-muted">{t.changeQuestion}</label>
                    <input
                      type="text"
                      value={changeStatement}
                      onChange={(e) => setChangeStatement(e.target.value)}
                      onBlur={handleChangeStatementBlur}
                      placeholder={t.changePlaceholder}
                      className="mt-1.5 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-ink"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Objective - only once the finding has been adopted for action. */}
            {progress?.adoption === "adopted" && (
              <div className="mt-4 border-t border-line pt-4">
                <p className="text-sm font-medium text-ink">{t.objectiveQuestion}</p>
                <p className="mt-1 text-xs text-muted">{t.objectiveHelper}</p>
                <input
                  type="text"
                  value={objectiveText}
                  onChange={(e) => setObjectiveText(e.target.value)}
                  onBlur={handleObjectiveBlur}
                  placeholder={t.objectivePlaceholder}
                  className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-ink"
                />
              </div>
            )}

            {/* Closure - only once Objective is actually captured, confirming the decision is saved and findable, nothing more. */}
            {progress?.objective && (
              <div className="mt-4 border-t border-line pt-4">
                <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
                  <Check className="size-4 text-orange" aria-hidden />
                  {t.closureTitle}
                </p>
                <p className="mt-1 text-xs text-muted">{t.closureBody}</p>
                <PlatformButton
                  href="/platform/ar/my-organization"
                  locale={locale}
                  variant="secondary"
                  className="mt-3"
                >
                  {t.closureCta}
                </PlatformButton>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
