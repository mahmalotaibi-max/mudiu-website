import type { OrganizationDataset } from "@/lib/platform/types";
import { buildAllChains, computeFindings } from "@/lib/platform/diagnostics";

// Deterministic, dataset-grounded answers for the "Ask MUDIU" prototype.
// There is no live model call here - every answer is generated from the
// same diagnostics the rest of the platform uses, per the product spec's
// "answers can be generated from the sample dataset" guidance for this stage.

export const presetQuestions = [
  "Why do we have so many initiatives under this strategic goal?",
  "Which initiatives have unclear strategic alignment?",
  "Where is the biggest break in our value chain?",
  "Which benefits are not measurable?",
  "Which initiatives have impact claims without sufficient evidence?",
  "What should leadership review first?",
] as const;

export function answerQuestion(question: string, data: OrganizationDataset): string {
  switch (question) {
    case "Why do we have so many initiatives under this strategic goal?": {
      const findings = computeFindings(data);
      const overlap = findings.find((f) => f.type === "overlap");
      if (!overlap) return "No goal currently has an unusual concentration of initiatives in the same scope.";
      const groups = new Map<string, string[]>();
      for (const i of data.initiatives) {
        if (!i.goalId) continue;
        const key = `${i.goalId}::${i.department}`;
        groups.set(key, [...(groups.get(key) ?? []), i.title]);
      }
      const biggest = [...groups.entries()].sort((a, b) => b[1].length - a[1].length)[0];
      const goalTitle = data.goals.find((g) => g.id === biggest[0].split("::")[0])?.title ?? "this goal";
      return `"${goalTitle}" has ${biggest[1].length} initiatives in the same department and scope (${biggest[1]
        .map((t) => `"${t}"`)
        .join(", ")}). That's not necessarily wrong, but it's worth checking whether they're genuinely distinct or could be consolidated.`;
    }

    case "Which initiatives have unclear strategic alignment?": {
      const unaligned = data.initiatives.filter((i) => !i.goalId);
      if (unaligned.length === 0) return "Every initiative in this dataset is linked to a strategic goal.";
      return `${unaligned.length} initiatives have no strategic goal attached: ${unaligned
        .map((i) => i.title)
        .join(", ")}. That doesn't mean they're not useful - it means their contribution to strategy hasn't been made explicit yet.`;
    }

    case "Where is the biggest break in our value chain?": {
      const chains = buildAllChains(data);
      const riskiest = [...chains].sort(
        (a, b) => b.nodes.filter((n) => n.missing).length - a.nodes.filter((n) => n.missing).length
      )[0];
      const missing = riskiest.nodes.filter((n) => n.missing).map((n) => n.label);
      if (missing.length === 0) {
        return "No goal shows a broken chain right now - every goal has at least a partial path from indicator to impact.";
      }
      return `The chain for "${riskiest.goalTitle}" breaks earliest: it currently has no ${missing
        .join(", ")
        .toLowerCase()}. Until those links exist, it's hard to say whether this goal is being served at all.`;
    }

    case "Which benefits are not measurable?": {
      const weak = data.benefits.filter((b) => !b.measurable);
      if (weak.length === 0) return "Every defined benefit in this dataset has a way to measure it.";
      return `${weak.length} defined benefit${weak.length > 1 ? "s" : ""} ${weak.length > 1 ? "have" : "has"} no clear way to be measured yet: ${weak
        .map((b) => `"${b.title}"`)
        .join(", ")}. Without a measurement approach, it will be hard to know if they were realized.`;
    }

    case "Which initiatives have impact claims without sufficient evidence?": {
      const unevidenced = data.benefits.filter((b) => {
        const impact = data.impacts.find((im) => im.benefitId === b.id);
        return impact && impact.evidenceStatus !== "verified";
      });
      if (unevidenced.length === 0) return "Every claimed impact in this dataset is backed by verified evidence.";
      const named = unevidenced
        .map((b) => {
          const initiative = data.initiatives.find((i) => i.id === b.initiativeId);
          return initiative ? `"${initiative.title}"` : null;
        })
        .filter((v): v is string => v !== null);
      return `${unevidenced.length} claimed impact${unevidenced.length > 1 ? "s" : ""} ${unevidenced.length > 1 ? "are" : "is"} not yet verified: ${named.join(", ")}. An impact being "expected" or "observed" is not the same as it being proven.`;
    }

    case "What should leadership review first?": {
      const findings = computeFindings(data);
      const noBenefit = findings.find((f) => f.type === "benefit-definition");
      const evidence = findings.find((f) => f.type === "impact-evidence");
      const parts: string[] = [];
      if (noBenefit) parts.push(`the ${noBenefit.count} initiatives that have no defined benefit`);
      if (evidence) parts.push(`the ${evidence.count} benefits claiming impact with no supporting evidence`);
      if (parts.length === 0) return "No initiative stands out as urgent to review right now.";
      return `Start with ${parts.join(", then ")} - in both cases, resources may be committed without a clear or proven payoff.`;
    }

    default:
      return "This is a prototype answer set - try one of the suggested questions above.";
  }
}
