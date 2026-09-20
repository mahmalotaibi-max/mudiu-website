import type {
  Benefit,
  Chain,
  ChainNode,
  Finding,
  GapType,
  Impact,
  Locale,
  OrganizationDataset,
  ReadinessScores,
} from "@/lib/platform/types";

function pct(numerator: number, denominator: number) {
  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 100);
}

function plural(count: number, noun: string, pluralNoun = `${noun}s`) {
  return count === 1 ? noun : pluralNoun;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Arabic count phrase: "واحد(ة) + مفرد" for 1, "رقم + جمع" for 2-10, "رقم + مفرد" for 11+ (matches the tamyiz rule for 11-99). */
function arCount(n: number, singular: string, pluralForm: string, gender: "m" | "f" = "f") {
  if (n === 1) return `${singular} ${gender === "f" ? "واحدة" : "واحد"}`;
  if (n >= 11) return `${n} ${singular}`;
  return `${n} ${pluralForm}`;
}

/**
 * Findings follow the rules in the product spec's "Dashboard Logic" section
 * verbatim — nothing here is a hardcoded example number, it's derived from
 * the actual relationships in the dataset passed in.
 */
export function computeFindings(data: OrganizationDataset, locale: Locale = "en"): Finding[] {
  const findings: Finding[] = [];

  const unaligned = data.initiatives.filter((i) => !i.goalId);
  if (unaligned.length > 0) {
    findings.push({
      id: "alignment",
      type: "alignment",
      severity: "high",
      entityIds: unaligned.map((i) => i.id),
      count: unaligned.length,
      message:
        locale === "ar"
          ? `${arCount(unaligned.length, "مبادرة", "مبادرات", "f")} لا ترتبط بوضوح بهدف استراتيجي`
          : `${unaligned.length} ${plural(unaligned.length, "initiative")} ${unaligned.length === 1 ? "is" : "are"} not clearly linked to a strategic goal`,
    });
  }

  const goalsWithoutIndicator = data.goals.filter(
    (g) => !data.indicators.some((ind) => ind.goalId === g.id)
  );
  if (goalsWithoutIndicator.length > 0) {
    const n = goalsWithoutIndicator.length;
    findings.push({
      id: "measurement",
      type: "measurement",
      severity: "medium",
      entityIds: goalsWithoutIndicator.map((g) => g.id),
      count: n,
      message:
        locale === "ar"
          ? `${arCount(n, "هدف استراتيجي", "أهداف استراتيجية", "m")} ${n === 1 ? "يفتقر" : "تفتقر"} إلى مؤشر نتائج قابل للقياس`
          : `${n} strategic ${plural(n, "goal")} ${n === 1 ? "lacks" : "lack"} a measurable outcome indicator`,
    });
  }

  const indicatorsWithoutBaseline = data.indicators.filter((i) => i.baseline === null);
  if (indicatorsWithoutBaseline.length > 0) {
    const n = indicatorsWithoutBaseline.length;
    findings.push({
      id: "baseline",
      type: "baseline",
      severity: "medium",
      entityIds: indicatorsWithoutBaseline.map((i) => i.id),
      count: n,
      message:
        locale === "ar"
          ? `${arCount(n, "مؤشر", "مؤشرات", "m")} ${n === 1 ? "ليس له" : "ليس لها"} خط أساس مسجّل`
          : `${n} ${plural(n, "indicator")} ${n === 1 ? "has" : "have"} no baseline value recorded`,
    });
  }

  const initiativesWithoutBenefit = data.initiatives.filter(
    (i) => !data.benefits.some((b) => b.initiativeId === i.id)
  );
  if (initiativesWithoutBenefit.length > 0) {
    const n = initiativesWithoutBenefit.length;
    findings.push({
      id: "benefit-definition",
      type: "benefit-definition",
      severity: "medium",
      entityIds: initiativesWithoutBenefit.map((i) => i.id),
      count: n,
      message:
        locale === "ar"
          ? `${arCount(n, "مبادرة", "مبادرات", "f")} ليس لها منفعة محددة`
          : `${n} ${plural(n, "initiative")} ${n === 1 ? "has" : "have"} no defined benefit`,
    });
  }

  const unmeasurableBenefits = data.benefits.filter((b) => !b.measurable);
  if (unmeasurableBenefits.length > 0) {
    const n = unmeasurableBenefits.length;
    findings.push({
      id: "benefit-measurement",
      type: "benefit-measurement",
      severity: "medium",
      entityIds: unmeasurableBenefits.map((b) => b.id),
      count: n,
      message:
        locale === "ar"
          ? `${arCount(n, "منفعة", "منافع", "f")} ليس لها طريقة قياس محددة`
          : n === 1
            ? "1 benefit has no defined way to measure it"
            : `${n} benefits have no defined way to measure them`,
    });
  }

  const benefitsWithoutEvidence = data.benefits.filter((b) => {
    const impact = data.impacts.find((im) => im.benefitId === b.id);
    return !impact || impact.evidenceStatus === "none";
  });
  if (benefitsWithoutEvidence.length > 0) {
    const n = benefitsWithoutEvidence.length;
    findings.push({
      id: "impact-evidence",
      type: "impact-evidence",
      severity: "high",
      entityIds: benefitsWithoutEvidence.map((b) => b.id),
      count: n,
      message:
        locale === "ar"
          ? `${arCount(n, "منفعة متوقعة", "منافع متوقعة", "f")} لا يوجد لها دليل أثر بعد`
          : `${n} expected ${plural(n, "benefit")} ${n === 1 ? "has" : "have"} no impact evidence yet`,
    });
  }

  const overlapGroups = new Map<string, string[]>();
  for (const i of data.initiatives) {
    if (!i.goalId) continue;
    const key = `${i.goalId}::${i.department}`;
    overlapGroups.set(key, [...(overlapGroups.get(key) ?? []), i.id]);
  }
  const overlapping = [...overlapGroups.values()].filter((ids) => ids.length > 1).flat();
  if (overlapping.length > 0) {
    const n = overlapping.length;
    findings.push({
      id: "overlap",
      type: "overlap",
      severity: "low",
      entityIds: overlapping,
      count: n,
      message:
        locale === "ar"
          ? `${arCount(n, "مبادرة", "مبادرات", "f")} تُظهر تداخلاً محتملاً في الهدف والنطاق`
          : `${n} ${plural(n, "initiative")} ${n === 1 ? "shows" : "show"} potential overlap in goal and scope`,
    });
  }

  return findings.sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity));
}

function severityWeight(s: Finding["severity"]) {
  return s === "high" ? 3 : s === "medium" ? 2 : 1;
}

export function computeScores(data: OrganizationDataset): ReadinessScores {
  const alignedInitiatives = data.initiatives.filter((i) => i.goalId).length;
  const fullyDefinedIndicators = data.indicators.filter(
    (i) => i.baseline !== null && i.current !== null && i.target !== null
  ).length;
  const measurableBenefitInitiatives = data.initiatives.filter((i) =>
    data.benefits.some((b) => b.initiativeId === i.id && b.measurable)
  ).length;
  const evidencedBenefits = data.benefits.filter((b) => {
    const impact = data.impacts.find((im) => im.benefitId === b.id);
    return impact && impact.evidenceStatus !== "none";
  }).length;

  return {
    strategicAlignment: pct(alignedInitiatives, data.initiatives.length),
    performanceReadiness: pct(fullyDefinedIndicators, data.goals.length),
    benefitReadiness: pct(measurableBenefitInitiatives, data.initiatives.length),
    impactReadiness: pct(evidencedBenefits, Math.max(data.benefits.length, 1)),
  };
}

function gapNode(reason: string): Omit<ChainNode, "key" | "label"> {
  return { title: null, detail: null, missing: true, missingReason: reason };
}

const chainLabels = {
  en: {
    goal: "Strategic Goal",
    indicator: "Indicator",
    gap: "Gap",
    performanceGap: "Performance Gap",
    priority: "Priority",
    initiative: "Initiative",
    output: "Output",
    product: "Product / Service",
    benefit: "Expected Benefit",
    impact: "Impact",
    baseline: "Baseline",
    current: "Current",
    target: "Target",
    notRecorded: "Not recorded",
    productKind: "Product",
    serviceKind: "Service",
    ownerPrefix: "Owner",
    linkedIndicatorPrefix: "Linked indicator",
    noIndicator: "No outcome indicator has been defined for this goal.",
    noGapNoIndicator: "No indicator, so no gap can be calculated.",
    noGapNoData: "Not enough data to calculate the performance gap.",
    noPriority: "No priority has been set for this goal yet.",
    noInitiative: "No initiative is currently linked to this goal.",
    noOutput: "This initiative has not produced a defined output yet.",
    noProduct: "This output has not been turned into a product or service yet.",
    noBenefit: "No benefit has been defined for this product or service.",
    noImpact: "Impact evidence is not yet available.",
  },
  ar: {
    goal: "الهدف الاستراتيجي",
    indicator: "المؤشر",
    gap: "الفجوة",
    performanceGap: "فجوة الأداء",
    priority: "الأولوية",
    initiative: "المبادرة",
    output: "المخرج",
    product: "المنتج / الخدمة",
    benefit: "المنفعة المتوقعة",
    impact: "الأثر",
    baseline: "خط الأساس",
    current: "الوضع الحالي",
    target: "الهدف الرقمي",
    notRecorded: "غير مسجَّل",
    productKind: "منتج",
    serviceKind: "خدمة",
    ownerPrefix: "المسؤول",
    linkedIndicatorPrefix: "المؤشر المرتبط",
    noIndicator: "لم يُحدَّد مؤشر نتائج لهذا الهدف بعد.",
    noGapNoIndicator: "لا يوجد مؤشر، ولذلك لا يمكن احتساب الفجوة.",
    noGapNoData: "لا تتوفر بيانات كافية لاحتساب فجوة الأداء.",
    noPriority: "لم تُحدَّد أولوية لهذا الهدف بعد.",
    noInitiative: "لا توجد مبادرة مرتبطة بهذا الهدف حاليًا.",
    noOutput: "لم تُنتج هذه المبادرة مخرجًا محددًا بعد.",
    noProduct: "لم يتحول هذا المخرج إلى منتج أو خدمة بعد.",
    noBenefit: "لم تُحدَّد منفعة لهذا المنتج أو الخدمة بعد.",
    noImpact: "لا يتوفر دليل على الأثر بعد.",
  },
} as const;

/** Walks one goal's best-available path all the way to Impact, marking every stage that has no data instead of inventing one. */
export function buildChain(data: OrganizationDataset, goalId: string, locale: Locale = "en"): Chain {
  const t = chainLabels[locale];
  const goal = data.goals.find((g) => g.id === goalId);
  if (!goal) throw new Error(`Unknown goal: ${goalId}`);

  const indicator = data.indicators.find((i) => i.goalId === goal.id) ?? null;
  const priority = data.priorities.find((p) => p.goalId === goal.id) ?? null;
  const initiative = data.initiatives.find((i) => i.goalId === goal.id) ?? null;
  const output = initiative ? (data.outputs.find((o) => o.initiativeId === initiative.id) ?? null) : null;
  const product = output ? (data.productsServices.find((p) => p.outputId === output.id) ?? null) : null;
  const benefit = product ? (data.benefits.find((b) => b.productServiceId === product.id) ?? null) : null;
  const impact = benefit ? (data.impacts.find((im) => im.benefitId === benefit.id) ?? null) : null;

  const nodes: ChainNode[] = [
    {
      key: "goal",
      label: t.goal,
      title: goal.title,
      detail: goal.ownerDept,
      missing: false,
    },
    indicator
      ? {
          key: "indicator",
          label: t.indicator,
          title: indicator.name,
          detail: null,
          missing: false,
          metrics: [
            { label: t.baseline, value: indicator.baseline !== null ? `${indicator.baseline} ${indicator.unit}` : t.notRecorded },
            { label: t.current, value: indicator.current !== null ? `${indicator.current} ${indicator.unit}` : t.notRecorded },
            { label: t.target, value: indicator.target !== null ? `${indicator.target} ${indicator.unit}` : t.notRecorded },
          ],
        }
      : { key: "indicator", label: t.indicator, ...gapNode(t.noIndicator) },
    (() => {
      if (!indicator) {
        return { key: "gap" as const, label: t.gap, ...gapNode(t.noGapNoIndicator) };
      }
      if (indicator.current === null || indicator.target === null) {
        return { key: "gap" as const, label: t.gap, ...gapNode(t.noGapNoData) };
      }
      const gapPct = Math.round((Math.abs(indicator.current - indicator.target) / indicator.target) * 100);
      return {
        key: "gap" as const,
        label: t.performanceGap,
        title: `${gapPct}%`,
        detail:
          locale === "ar"
            ? `${indicator.current} ${indicator.unit} مقابل هدف قدره ${indicator.target} ${indicator.unit}`
            : `${indicator.current} ${indicator.unit} vs a target of ${indicator.target} ${indicator.unit}`,
        missing: false,
      };
    })(),
    priority
      ? { key: "priority", label: t.priority, title: priority.title, detail: null, missing: false }
      : { key: "priority", label: t.priority, ...gapNode(t.noPriority) },
    initiative
      ? {
          key: "initiative",
          label: t.initiative,
          title: initiative.title,
          detail: initiative.department,
          missing: false,
        }
      : { key: "initiative", label: t.initiative, ...gapNode(t.noInitiative) },
    output
      ? { key: "output", label: t.output, title: output.title, detail: null, missing: false }
      : { key: "output", label: t.output, ...gapNode(t.noOutput) },
    product
      ? {
          key: "product",
          label: t.product,
          title: product.title,
          detail: product.kind === "product" ? t.productKind : t.serviceKind,
          missing: false,
        }
      : { key: "product", label: t.product, ...gapNode(t.noProduct) },
    benefit
      ? {
          key: "benefit",
          label: t.benefit,
          title: benefit.title,
          detail: `${t.ownerPrefix}: ${benefit.ownerRole}`,
          missing: false,
          note: benefitNote(benefit, locale),
        }
      : { key: "benefit", label: t.benefit, ...gapNode(t.noBenefit) },
    impact
      ? {
          key: "impact",
          label: statusLabel(impact.status, locale),
          title: impact.title,
          detail: `${t.linkedIndicatorPrefix}: ${impact.indicatorName}`,
          missing: false,
          note: impactNote(impact, locale),
        }
      : { key: "impact", label: t.impact, ...gapNode(t.noImpact) },
  ];

  return {
    goalId: goal.id,
    goalTitle: goal.title,
    nodes,
    complete: nodes.every((n) => !n.missing),
  };
}

function statusLabel(status: "expected" | "observed" | "verified", locale: Locale = "en") {
  if (locale === "ar") {
    if (status === "verified") return "أثر مُثبَت";
    if (status === "observed") return "أثر مرصود";
    return "أثر متوقع";
  }
  if (status === "verified") return "Verified Impact";
  if (status === "observed") return "Observed Impact";
  return "Expected Impact";
}

function benefitNote(benefit: Benefit, locale: Locale = "en"): string {
  if (locale === "ar") {
    if (benefit.measurable && benefit.hasBaseline) return "المنفعة قابلة للقياس، ولها خط أساس يمكن المقارنة به.";
    if (benefit.measurable) return "المنفعة قابلة للقياس، لكن لا يوجد خط أساس للمقارنة بعد.";
    return "المنفعة محددة، لكن لا توجد طريقة واضحة لقياسها بعد.";
  }
  if (benefit.measurable && benefit.hasBaseline) return "Benefit is measurable and has a baseline to compare against.";
  if (benefit.measurable) return "Benefit is measurable, but there is no baseline to compare it against yet.";
  return "Benefit is defined, but there is no clear way to measure it yet.";
}

function impactNote(impact: Impact, locale: Locale = "en"): string {
  if (locale === "ar") {
    if (impact.evidenceStatus === "verified") return "هذا الأثر مدعوم بأدلة كافية - أثر مُثبَت، وليس مجرد ادعاء.";
    const word = impact.status === "observed" ? "أثر مرصود" : "أثر متوقع";
    if (impact.evidenceStatus === "partial") return `${word}، لكن الأدلة عليه ما زالت غير مكتملة.`;
    return `${word}، لكن لا يوجد دليل داعم له بعد.`;
  }
  if (impact.evidenceStatus === "verified") return "This impact is backed by sufficient evidence - it is verified, not just claimed.";
  if (impact.evidenceStatus === "partial") return `${statusLabel(impact.status).replace(" Impact", "")} impact, but evidence is still incomplete.`;
  return `${statusLabel(impact.status).replace(" Impact", "")} impact is claimed, but there is no supporting evidence yet.`;
}

export function buildAllChains(data: OrganizationDataset, locale: Locale = "en"): Chain[] {
  return data.goals.map((g) => buildChain(data, g.id, locale));
}

export interface ExecutiveSummary {
  /** "1. Where are we aligned?" */
  alignedGoals: number;
  needsAttentionGoals: number;
  requiresReviewGoals: number;
  totalGoals: number;
  alignmentMessage: string;
  /** "2. Where are the biggest gaps?" */
  biggestGapsMessage: string;
  /** "3. Which initiatives are creating measurable value?" */
  measurableValueMessage: string;
  /** "4. Where is evidence missing?" */
  missingEvidenceMessage: string;
  /** "5. What needs leadership attention?" */
  attentionActions: string[];
}

function goalRiskLevel(chain: Chain, data: OrganizationDataset): "on-track" | "needs-attention" | "requires-review" {
  const missingCount = chain.nodes.filter((n) => n.missing).length;
  const relatedInitiative = data.initiatives.find((i) => i.goalId === chain.goalId);
  const weakImpact =
    relatedInitiative &&
    data.benefits.some((b) => {
      if (b.initiativeId !== relatedInitiative.id) return false;
      const impact = data.impacts.find((im) => im.benefitId === b.id);
      return impact && impact.evidenceStatus === "none";
    });

  const score = missingCount + (weakImpact ? 1 : 0);
  if (score === 0) return "on-track";
  if (score <= 2) return "needs-attention";
  return "requires-review";
}

export function computeExecutiveSummary(data: OrganizationDataset, locale: Locale = "en"): ExecutiveSummary {
  const chains = buildAllChains(data, locale);
  let alignedGoals = 0;
  let needsAttentionGoals = 0;
  let requiresReviewGoals = 0;
  for (const chain of chains) {
    const level = goalRiskLevel(chain, data);
    if (level === "on-track") alignedGoals += 1;
    else if (level === "needs-attention") needsAttentionGoals += 1;
    else requiresReviewGoals += 1;
  }

  const linkedGoalIds = [...new Set(data.initiatives.map((i) => i.goalId).filter((id): id is string => id !== null))];
  const strongestGoalId = linkedGoalIds.sort(
    (a, b) =>
      data.initiatives.filter((i) => i.goalId === b).length -
      data.initiatives.filter((i) => i.goalId === a).length
  )[0];
  const strongestGoal = data.goals.find((g) => g.id === strongestGoalId);

  const alignmentMessage =
    locale === "ar"
      ? strongestGoal
        ? `${alignedGoals} من أصل ${chains.length} أهداف تملك سلسلة متصلة بالكامل من المؤشر إلى الأثر. هدف "${strongestGoal.title}" هو الأكثر دعمًا بالمبادرات حاليًا.`
        : `${alignedGoals} من أصل ${chains.length} أهداف تملك سلسلة متصلة بالكامل من المؤشر إلى الأثر.`
      : strongestGoal
        ? `${alignedGoals} of ${chains.length} goals have a fully connected chain from indicator to impact. "${strongestGoal.title}" is currently the most strongly supported by initiatives.`
        : `${alignedGoals} of ${chains.length} goals have a fully connected chain from indicator to impact.`;

  const findings = computeFindings(data, locale);
  const top = findings.slice(0, 2);
  const biggestGapsMessage =
    top.length > 0
      ? locale === "ar"
        ? `أكبر الفجوات حاليًا: ${top.map((f) => `${describeGap(f.type, "ar")} (${f.count})`).join("، و")}.`
        : capitalize(top.map((f) => `${describeGap(f.type)} (${f.count})`).join(", and ")) + " are the largest gaps right now."
      : locale === "ar"
        ? "لم يتم رصد فجوات كبيرة في البيانات المقدَّمة."
        : "No major gaps were found in the submitted data.";

  const measurableInitiatives = data.initiatives.filter((i) =>
    data.benefits.some((b) => b.initiativeId === i.id && b.measurable)
  );
  const measurableValueMessage =
    measurableInitiatives.length > 0
      ? locale === "ar"
        ? `${arCount(measurableInitiatives.length, "مبادرة", "مبادرات", "f")} ذات منفعة قابلة للقياس بوضوح، منها ${measurableInitiatives
            .slice(0, 2)
            .map((i) => `"${i.title}"`)
            .join(" و")}.`
        : `${measurableInitiatives.length} ${plural(measurableInitiatives.length, "initiative")} ${measurableInitiatives.length === 1 ? "has" : "have"} a clearly measurable benefit, including ${measurableInitiatives
            .slice(0, 2)
            .map((i) => `"${i.title}"`)
            .join(" and ")}.`
      : locale === "ar"
        ? "لا توجد حاليًا مبادرة ذات منفعة قابلة للقياس بوضوح."
        : "No initiative currently has a clearly measurable benefit defined.";

  const unevidenced = data.benefits.filter((b) => {
    const impact = data.impacts.find((im) => im.benefitId === b.id);
    return !impact || impact.evidenceStatus === "none";
  });
  const missingEvidenceMessage =
    unevidenced.length > 0
      ? locale === "ar"
        ? `${arCount(unevidenced.length, "منفعة متوقعة", "منافع متوقعة", "f")} بلا دليل داعم حتى الآن، منها ${unevidenced
            .slice(0, 2)
            .map((b) => `"${b.title}"`)
            .join(" و")}.`
        : `${unevidenced.length} expected ${plural(unevidenced.length, "benefit")} ${unevidenced.length === 1 ? "has" : "have"} no supporting evidence yet, including ${unevidenced
            .slice(0, 2)
            .map((b) => `"${b.title}"`)
            .join(" and ")}.`
      : locale === "ar"
        ? "كل منفعة متوقعة لديها حاليًا دليل ولو جزئي."
        : "Every expected benefit currently has at least partial evidence.";

  const attentionActions = findings.slice(0, 3).map((f) => actionFor(f, locale));

  return {
    alignedGoals,
    needsAttentionGoals,
    requiresReviewGoals,
    totalGoals: chains.length,
    alignmentMessage,
    biggestGapsMessage,
    measurableValueMessage,
    missingEvidenceMessage,
    attentionActions,
  };
}

function describeGap(type: GapType, locale: Locale = "en") {
  if (locale === "ar") {
    switch (type) {
      case "alignment":
        return "ضعف الربط بين المبادرات والأهداف الاستراتيجية";
      case "measurement":
        return "أهداف استراتيجية بلا مؤشر نتائج";
      case "baseline":
        return "مؤشرات بلا خط أساس مسجَّل";
      case "benefit-definition":
        return "مبادرات بلا منفعة محددة";
      case "benefit-measurement":
        return "منافع لا يمكن قياسها بعد";
      case "impact-evidence":
        return "منافع متوقعة بلا دليل أثر";
      case "overlap":
        return "مبادرات يُحتمل تداخلها في النطاق";
    }
  }
  switch (type) {
    case "alignment":
      return "weak linkage between initiatives and strategic goals";
    case "measurement":
      return "strategic goals with no outcome indicator";
    case "baseline":
      return "indicators with no recorded baseline";
    case "benefit-definition":
      return "initiatives with no defined benefit";
    case "benefit-measurement":
      return "benefits that cannot yet be measured";
    case "impact-evidence":
      return "expected benefits with no impact evidence";
    case "overlap":
      return "initiatives that potentially overlap in scope";
  }
}

function actionFor(f: Finding, locale: Locale = "en") {
  if (locale === "ar") {
    switch (f.type) {
      case "alignment":
        return `راجع ${arCount(f.count, "مبادرة", "مبادرات", "f")} ذات ارتباط استراتيجي غير واضح.`;
      case "measurement":
        return `حدِّد مؤشر نتائج لـ ${arCount(f.count, "هدف استراتيجي", "أهداف استراتيجية", "m")}.`;
      case "baseline":
        return `أسِّس خط أساس لـ ${arCount(f.count, "مؤشر", "مؤشرات", "m")}.`;
      case "benefit-definition":
        return `حدِّد منافع قابلة للقياس لـ ${arCount(f.count, "مبادرة", "مبادرات", "f")}.`;
      case "benefit-measurement":
        return `اتفق على طريقة قياس ${arCount(f.count, "منفعة", "منافع", "f")}.`;
      case "impact-evidence":
        return `اجمع أدلة على ${arCount(f.count, "منفعة متوقعة", "منافع متوقعة", "f")}.`;
      case "overlap":
        return `راجع ${arCount(f.count, "مبادرة", "مبادرات", "f")} لاحتمال التداخل بينها.`;
    }
  }
  switch (f.type) {
    case "alignment":
      return `Review ${f.count} ${plural(f.count, "initiative")} with unclear strategic alignment.`;
    case "measurement":
      return `Define an outcome indicator for ${f.count} strategic ${plural(f.count, "goal")}.`;
    case "baseline":
      return `Establish a baseline for ${f.count} ${plural(f.count, "indicator")}.`;
    case "benefit-definition":
      return `Define measurable benefits for ${f.count} ${plural(f.count, "initiative")}.`;
    case "benefit-measurement":
      return `Agree on how to measure ${f.count} ${plural(f.count, "benefit")}.`;
    case "impact-evidence":
      return `Collect evidence for ${f.count} expected ${plural(f.count, "benefit")}.`;
    case "overlap":
      return `Review ${f.count} ${plural(f.count, "initiative")} for potential overlap.`;
  }
}
