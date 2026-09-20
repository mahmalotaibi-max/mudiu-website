import type { Locale, OrganizationDataset } from "@/lib/platform/types";
import { buildAllChains, computeFindings } from "@/lib/platform/diagnostics";

// Deterministic, dataset-grounded answers for the "Ask MUDIU" prototype.
// There is no live model call here - every answer is generated from the
// same diagnostics the rest of the platform uses, per the product spec's
// "answers can be generated from the sample dataset" guidance for this stage.
//
// Questions are matched by a stable key (not the displayed text) so the
// same logic serves both languages.

export type QuestionKey =
  | "overlap-reason"
  | "unclear-alignment"
  | "biggest-break"
  | "unmeasurable-benefits"
  | "unverified-impact"
  | "leadership-review";

export const questionOrder: QuestionKey[] = [
  "overlap-reason",
  "unclear-alignment",
  "biggest-break",
  "unmeasurable-benefits",
  "unverified-impact",
  "leadership-review",
];

export const questionText: Record<Locale, Record<QuestionKey, string>> = {
  en: {
    "overlap-reason": "Why do we have so many initiatives under this strategic goal?",
    "unclear-alignment": "Which initiatives have unclear strategic alignment?",
    "biggest-break": "Where is the biggest break in our value chain?",
    "unmeasurable-benefits": "Which benefits are not measurable?",
    "unverified-impact": "Which initiatives have impact claims without sufficient evidence?",
    "leadership-review": "What should leadership review first?",
  },
  ar: {
    "overlap-reason": "لماذا لدينا هذا العدد من المبادرات تحت هذا الهدف الاستراتيجي؟",
    "unclear-alignment": "ما المبادرات ذات الارتباط الاستراتيجي غير الواضح؟",
    "biggest-break": "أين أكبر انقطاع في سلسلة القيمة لدينا؟",
    "unmeasurable-benefits": "ما المنافع غير القابلة للقياس؟",
    "unverified-impact": "ما المبادرات التي تدّعي أثرًا دون أدلة كافية؟",
    "leadership-review": "ما الذي يجب أن تراجعه القيادة أولًا؟",
  },
};

export function answerQuestion(key: QuestionKey, data: OrganizationDataset, locale: Locale = "en"): string {
  const ar = locale === "ar";

  switch (key) {
    case "overlap-reason": {
      const findings = computeFindings(data, locale);
      const overlap = findings.find((f) => f.type === "overlap");
      if (!overlap) {
        return ar
          ? "لا يوجد حاليًا هدف يضمّ عددًا غير معتاد من المبادرات في نفس النطاق."
          : "No goal currently has an unusual concentration of initiatives in the same scope.";
      }
      const groups = new Map<string, string[]>();
      for (const i of data.initiatives) {
        if (!i.goalId) continue;
        const key2 = `${i.goalId}::${i.department}`;
        groups.set(key2, [...(groups.get(key2) ?? []), i.title]);
      }
      const biggest = [...groups.entries()].sort((a, b) => b[1].length - a[1].length)[0];
      const goalTitle = data.goals.find((g) => g.id === biggest[0].split("::")[0])?.title ?? (ar ? "هذا الهدف" : "this goal");
      const list = biggest[1].map((t) => `"${t}"`).join(ar ? "، " : ", ");
      return ar
        ? `هدف "${goalTitle}" لديه ${biggest[1].length} مبادرات في نفس الإدارة والنطاق (${list}). هذا ليس خطأً بالضرورة، لكن يستحق التحقق مما إذا كانت مبادرات مستقلة فعلًا أو يمكن دمجها.`
        : `"${goalTitle}" has ${biggest[1].length} initiatives in the same department and scope (${list}). That's not necessarily wrong, but it's worth checking whether they're genuinely distinct or could be consolidated.`;
    }

    case "unclear-alignment": {
      const unaligned = data.initiatives.filter((i) => !i.goalId);
      if (unaligned.length === 0) {
        return ar
          ? "كل مبادرة في هذه البيانات مرتبطة بهدف استراتيجي."
          : "Every initiative in this dataset is linked to a strategic goal.";
      }
      const list = unaligned.map((i) => i.title).join(ar ? "، " : ", ");
      return ar
        ? `${unaligned.length} مبادرات بلا هدف استراتيجي مرتبط: ${list}. هذا لا يعني أنها غير مفيدة، بل يعني أن إسهامها في الاستراتيجية لم يُوضَّح بعد.`
        : `${unaligned.length} initiatives have no strategic goal attached: ${list}. That doesn't mean they're not useful - it means their contribution to strategy hasn't been made explicit yet.`;
    }

    case "biggest-break": {
      const chains = buildAllChains(data, locale);
      const riskiest = [...chains].sort(
        (a, b) => b.nodes.filter((n) => n.missing).length - a.nodes.filter((n) => n.missing).length
      )[0];
      const missing = riskiest.nodes.filter((n) => n.missing).map((n) => n.label);
      if (missing.length === 0) {
        return ar
          ? "لا يوجد هدف بسلسلة منقطعة حاليًا - كل هدف لديه مسار جزئي على الأقل من المؤشر إلى الأثر."
          : "No goal shows a broken chain right now - every goal has at least a partial path from indicator to impact.";
      }
      const list = missing.join(ar ? "، " : ", ");
      return ar
        ? `سلسلة هدف "${riskiest.goalTitle}" تنقطع مبكرًا: لا يوجد لديها حاليًا ${list}. وإلى أن تتوفر هذه الروابط، يصعب معرفة ما إذا كان هذا الهدف يُخدَم فعليًا أم لا.`
        : `The chain for "${riskiest.goalTitle}" breaks earliest: it currently has no ${list.toLowerCase()}. Until those links exist, it's hard to say whether this goal is being served at all.`;
    }

    case "unmeasurable-benefits": {
      const weak = data.benefits.filter((b) => !b.measurable);
      if (weak.length === 0) {
        return ar
          ? "كل منفعة محددة في هذه البيانات لديها طريقة لقياسها."
          : "Every defined benefit in this dataset has a way to measure it.";
      }
      const list = weak.map((b) => `"${b.title}"`).join(ar ? "، " : ", ");
      return ar
        ? `${weak.length === 1 ? "منفعة واحدة محددة" : `${weak.length} منافع محددة`} بلا طريقة واضحة للقياس بعد: ${list}. بدون طريقة قياس، سيصعب معرفة ما إذا تحققت فعلًا.`
        : `${weak.length} defined benefit${weak.length > 1 ? "s" : ""} ${weak.length > 1 ? "have" : "has"} no clear way to be measured yet: ${list}. Without a measurement approach, it will be hard to know if they were realized.`;
    }

    case "unverified-impact": {
      const unevidenced = data.benefits.filter((b) => {
        const impact = data.impacts.find((im) => im.benefitId === b.id);
        return impact && impact.evidenceStatus !== "verified";
      });
      if (unevidenced.length === 0) {
        return ar
          ? "كل أثر مُدَّعى في هذه البيانات مدعوم بأدلة مُثبَتة."
          : "Every claimed impact in this dataset is backed by verified evidence.";
      }
      const named = unevidenced
        .map((b) => {
          const initiative = data.initiatives.find((i) => i.id === b.initiativeId);
          return initiative ? `"${initiative.title}"` : null;
        })
        .filter((v): v is string => v !== null);
      const list = named.join(ar ? "، " : ", ");
      return ar
        ? `${unevidenced.length === 1 ? "أثر واحد مُدَّعى" : `${unevidenced.length} آثار مُدَّعاة`} غير مُثبَت بعد: ${list}. كون الأثر "متوقعًا" أو "مرصودًا" لا يعني أنه مُثبَت.`
        : `${unevidenced.length} claimed impact${unevidenced.length > 1 ? "s" : ""} ${unevidenced.length > 1 ? "are" : "is"} not yet verified: ${list}. An impact being "expected" or "observed" is not the same as it being proven.`;
    }

    case "leadership-review": {
      const findings = computeFindings(data, locale);
      const noBenefit = findings.find((f) => f.type === "benefit-definition");
      const evidence = findings.find((f) => f.type === "impact-evidence");
      const parts: string[] = [];
      const partsAr: string[] = [];
      if (noBenefit) {
        parts.push(`the ${noBenefit.count} initiatives that have no defined benefit`);
        partsAr.push(`${noBenefit.count} مبادرات بلا منفعة محددة`);
      }
      if (evidence) {
        parts.push(`the ${evidence.count} benefits claiming impact with no supporting evidence`);
        partsAr.push(`${evidence.count} منافع تدّعي أثرًا بلا دليل داعم`);
      }
      if (parts.length === 0) {
        return ar ? "لا توجد مبادرة تستدعي مراجعة عاجلة حاليًا." : "No initiative stands out as urgent to review right now.";
      }
      return ar
        ? `ابدأ بـ ${partsAr.join("، ثم ")} - وفي الحالتين، قد تُلتزَم موارد دون عائد واضح أو مُثبَت.`
        : `Start with ${parts.join(", then ")} - in both cases, resources may be committed without a clear or proven payoff.`;
    }

    default:
      return ar ? "هذه مجموعة إجابات تجريبية - جرّب أحد الأسئلة المقترحة أعلاه." : "This is a prototype answer set - try one of the suggested questions above.";
  }
}
