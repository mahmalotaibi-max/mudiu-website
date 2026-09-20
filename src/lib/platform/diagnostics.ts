import type {
  Benefit,
  Chain,
  ChainNode,
  Finding,
  GapType,
  Impact,
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

/**
 * Findings follow the rules in the product spec's "Dashboard Logic" section
 * verbatim — nothing here is a hardcoded example number, it's derived from
 * the actual relationships in the dataset passed in.
 */
export function computeFindings(data: OrganizationDataset): Finding[] {
  const findings: Finding[] = [];

  const unaligned = data.initiatives.filter((i) => !i.goalId);
  if (unaligned.length > 0) {
    findings.push({
      id: "alignment",
      type: "alignment",
      severity: "high",
      entityIds: unaligned.map((i) => i.id),
      count: unaligned.length,
      message: `${unaligned.length} ${plural(unaligned.length, "initiative")} ${unaligned.length === 1 ? "is" : "are"} not clearly linked to a strategic goal`,
    });
  }

  const goalsWithoutIndicator = data.goals.filter(
    (g) => !data.indicators.some((ind) => ind.goalId === g.id)
  );
  if (goalsWithoutIndicator.length > 0) {
    findings.push({
      id: "measurement",
      type: "measurement",
      severity: "medium",
      entityIds: goalsWithoutIndicator.map((g) => g.id),
      count: goalsWithoutIndicator.length,
      message: `${goalsWithoutIndicator.length} strategic ${plural(goalsWithoutIndicator.length, "goal")} ${goalsWithoutIndicator.length === 1 ? "lacks" : "lack"} a measurable outcome indicator`,
    });
  }

  const indicatorsWithoutBaseline = data.indicators.filter((i) => i.baseline === null);
  if (indicatorsWithoutBaseline.length > 0) {
    findings.push({
      id: "baseline",
      type: "baseline",
      severity: "medium",
      entityIds: indicatorsWithoutBaseline.map((i) => i.id),
      count: indicatorsWithoutBaseline.length,
      message: `${indicatorsWithoutBaseline.length} ${plural(indicatorsWithoutBaseline.length, "indicator")} ${indicatorsWithoutBaseline.length === 1 ? "has" : "have"} no baseline value recorded`,
    });
  }

  const initiativesWithoutBenefit = data.initiatives.filter(
    (i) => !data.benefits.some((b) => b.initiativeId === i.id)
  );
  if (initiativesWithoutBenefit.length > 0) {
    findings.push({
      id: "benefit-definition",
      type: "benefit-definition",
      severity: "medium",
      entityIds: initiativesWithoutBenefit.map((i) => i.id),
      count: initiativesWithoutBenefit.length,
      message: `${initiativesWithoutBenefit.length} ${plural(initiativesWithoutBenefit.length, "initiative")} ${initiativesWithoutBenefit.length === 1 ? "has" : "have"} no defined benefit`,
    });
  }

  const unmeasurableBenefits = data.benefits.filter((b) => !b.measurable);
  if (unmeasurableBenefits.length > 0) {
    findings.push({
      id: "benefit-measurement",
      type: "benefit-measurement",
      severity: "medium",
      entityIds: unmeasurableBenefits.map((b) => b.id),
      count: unmeasurableBenefits.length,
      message:
        unmeasurableBenefits.length === 1
          ? "1 benefit has no defined way to measure it"
          : `${unmeasurableBenefits.length} benefits have no defined way to measure them`,
    });
  }

  const benefitsWithoutEvidence = data.benefits.filter((b) => {
    const impact = data.impacts.find((im) => im.benefitId === b.id);
    return !impact || impact.evidenceStatus === "none";
  });
  if (benefitsWithoutEvidence.length > 0) {
    findings.push({
      id: "impact-evidence",
      type: "impact-evidence",
      severity: "high",
      entityIds: benefitsWithoutEvidence.map((b) => b.id),
      count: benefitsWithoutEvidence.length,
      message: `${benefitsWithoutEvidence.length} expected ${plural(benefitsWithoutEvidence.length, "benefit")} ${benefitsWithoutEvidence.length === 1 ? "has" : "have"} no impact evidence yet`,
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
    findings.push({
      id: "overlap",
      type: "overlap",
      severity: "low",
      entityIds: overlapping,
      count: overlapping.length,
      message: `${overlapping.length} ${plural(overlapping.length, "initiative")} ${overlapping.length === 1 ? "shows" : "show"} potential overlap in goal and scope`,
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

/** Walks one goal's best-available path all the way to Impact, marking every stage that has no data instead of inventing one. */
export function buildChain(data: OrganizationDataset, goalId: string): Chain {
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
      label: "Strategic Goal",
      title: goal.title,
      detail: goal.ownerDept,
      missing: false,
    },
    indicator
      ? {
          key: "indicator",
          label: "Indicator",
          title: indicator.name,
          detail: null,
          missing: false,
          metrics: [
            { label: "Baseline", value: indicator.baseline !== null ? `${indicator.baseline} ${indicator.unit}` : "Not recorded" },
            { label: "Current", value: indicator.current !== null ? `${indicator.current} ${indicator.unit}` : "Not recorded" },
            { label: "Target", value: indicator.target !== null ? `${indicator.target} ${indicator.unit}` : "Not recorded" },
          ],
        }
      : { key: "indicator", label: "Indicator", ...gapNode("No outcome indicator has been defined for this goal.") },
    (() => {
      if (!indicator) {
        return { key: "gap" as const, label: "Gap", ...gapNode("No indicator, so no gap can be calculated.") };
      }
      if (indicator.current === null || indicator.target === null) {
        return { key: "gap" as const, label: "Gap", ...gapNode("Not enough data to calculate the performance gap.") };
      }
      const gapPct = Math.round((Math.abs(indicator.current - indicator.target) / indicator.target) * 100);
      return {
        key: "gap" as const,
        label: "Performance Gap",
        title: `${gapPct}%`,
        detail: `${indicator.current} ${indicator.unit} vs a target of ${indicator.target} ${indicator.unit}`,
        missing: false,
      };
    })(),
    priority
      ? { key: "priority", label: "Priority", title: priority.title, detail: null, missing: false }
      : { key: "priority", label: "Priority", ...gapNode("No priority has been set for this goal yet.") },
    initiative
      ? {
          key: "initiative",
          label: "Initiative",
          title: initiative.title,
          detail: initiative.department,
          missing: false,
        }
      : { key: "initiative", label: "Initiative", ...gapNode("No initiative is currently linked to this goal.") },
    output
      ? { key: "output", label: "Output", title: output.title, detail: null, missing: false }
      : { key: "output", label: "Output", ...gapNode("This initiative has not produced a defined output yet.") },
    product
      ? {
          key: "product",
          label: "Product / Service",
          title: product.title,
          detail: product.kind === "product" ? "Product" : "Service",
          missing: false,
        }
      : { key: "product", label: "Product / Service", ...gapNode("This output has not been turned into a product or service yet.") },
    benefit
      ? {
          key: "benefit",
          label: "Expected Benefit",
          title: benefit.title,
          detail: `Owner: ${benefit.ownerRole}`,
          missing: false,
          note: benefitNote(benefit),
        }
      : { key: "benefit", label: "Expected Benefit", ...gapNode("No benefit has been defined for this product or service.") },
    impact
      ? {
          key: "impact",
          label: statusLabel(impact.status),
          title: impact.title,
          detail: `Linked indicator: ${impact.indicatorName}`,
          missing: false,
          note: impactNote(impact),
        }
      : { key: "impact", label: "Impact", ...gapNode("Impact evidence is not yet available.") },
  ];

  return {
    goalId: goal.id,
    goalTitle: goal.title,
    nodes,
    complete: nodes.every((n) => !n.missing),
  };
}

function statusLabel(status: "expected" | "observed" | "verified") {
  if (status === "verified") return "Verified Impact";
  if (status === "observed") return "Observed Impact";
  return "Expected Impact";
}

function benefitNote(benefit: Benefit): string {
  if (benefit.measurable && benefit.hasBaseline) return "Benefit is measurable and has a baseline to compare against.";
  if (benefit.measurable) return "Benefit is measurable, but there is no baseline to compare it against yet.";
  return "Benefit is defined, but there is no clear way to measure it yet.";
}

function impactNote(impact: Impact): string {
  if (impact.evidenceStatus === "verified") return "This impact is backed by sufficient evidence - it is verified, not just claimed.";
  if (impact.evidenceStatus === "partial") return `${statusLabel(impact.status).replace(" Impact", "")} impact, but evidence is still incomplete.`;
  return `${statusLabel(impact.status).replace(" Impact", "")} impact is claimed, but there is no supporting evidence yet.`;
}

export function buildAllChains(data: OrganizationDataset): Chain[] {
  return data.goals.map((g) => buildChain(data, g.id));
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

export function computeExecutiveSummary(data: OrganizationDataset): ExecutiveSummary {
  const chains = buildAllChains(data);
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
  const alignmentMessage = strongestGoal
    ? `${alignedGoals} of ${chains.length} goals have a fully connected chain from indicator to impact. "${strongestGoal.title}" is currently the most strongly supported by initiatives.`
    : `${alignedGoals} of ${chains.length} goals have a fully connected chain from indicator to impact.`;

  const findings = computeFindings(data);
  const top = findings.slice(0, 2);
  const biggestGapsMessage =
    top.length > 0
      ? capitalize(top.map((f) => `${describeGap(f.type)} (${f.count})`).join(", and ")) + " are the largest gaps right now."
      : "No major gaps were found in the submitted data.";

  const measurableInitiatives = data.initiatives.filter((i) =>
    data.benefits.some((b) => b.initiativeId === i.id && b.measurable)
  );
  const measurableValueMessage =
    measurableInitiatives.length > 0
      ? `${measurableInitiatives.length} ${plural(measurableInitiatives.length, "initiative")} ${measurableInitiatives.length === 1 ? "has" : "have"} a clearly measurable benefit, including ${measurableInitiatives
          .slice(0, 2)
          .map((i) => `"${i.title}"`)
          .join(" and ")}.`
      : "No initiative currently has a clearly measurable benefit defined.";

  const unevidenced = data.benefits.filter((b) => {
    const impact = data.impacts.find((im) => im.benefitId === b.id);
    return !impact || impact.evidenceStatus === "none";
  });
  const missingEvidenceMessage =
    unevidenced.length > 0
      ? `${unevidenced.length} expected ${plural(unevidenced.length, "benefit")} ${unevidenced.length === 1 ? "has" : "have"} no supporting evidence yet, including ${unevidenced
          .slice(0, 2)
          .map((b) => `"${b.title}"`)
          .join(" and ")}.`
      : "Every expected benefit currently has at least partial evidence.";

  const attentionActions = findings.slice(0, 3).map((f) => actionFor(f));

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

function describeGap(type: GapType) {
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

function actionFor(f: Finding) {
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
