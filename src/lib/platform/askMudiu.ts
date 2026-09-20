import type { OrganizationDataset } from "@/lib/platform/types";
import { buildAllChains, computeFindings } from "@/lib/platform/diagnostics";

// Deterministic, dataset-grounded answers for the "Ask MUDIU" prototype.
// There is no live model call here — every answer is generated from the
// same diagnostics the rest of the platform uses, per the product spec's
// "mock AI responses are fine" guidance for this stage.

export const presetQuestions = [
  "Why is this goal at risk?",
  "Which initiatives are poorly aligned?",
  "Where are the biggest gaps?",
  "Which benefits are not measurable yet?",
  "Which initiatives should be reviewed first?",
] as const;

export function answerQuestion(question: string, data: OrganizationDataset): string {
  switch (question) {
    case "Why is this goal at risk?": {
      const chains = buildAllChains(data);
      const riskiest = [...chains].sort(
        (a, b) => b.nodes.filter((n) => n.missing).length - a.nodes.filter((n) => n.missing).length
      )[0];
      const missing = riskiest.nodes.filter((n) => n.missing).map((n) => n.label);
      if (missing.length === 0) {
        return "No goal shows a broken chain right now — every goal has at least a partial path from indicator to impact.";
      }
      return `"${riskiest.goalTitle}" is the goal with the most open gaps: it currently has no ${missing
        .join(", ")
        .toLowerCase()}. Until those links exist, it's hard to say whether this goal is being served at all.`;
    }

    case "Which initiatives are poorly aligned?": {
      const unaligned = data.initiatives.filter((i) => !i.goalId);
      if (unaligned.length === 0) return "Every initiative in this dataset is linked to a strategic goal.";
      return `${unaligned.length} initiatives have no strategic goal attached: ${unaligned
        .map((i) => i.title)
        .join(", ")}. That doesn't mean they're not useful — it means their contribution to strategy hasn't been made explicit yet.`;
    }

    case "Where are the biggest gaps?": {
      const findings = computeFindings(data);
      const top = findings.slice(0, 3);
      return top.map((f, i) => `${i + 1}. ${f.message}.`).join(" ");
    }

    case "Which benefits are not measurable yet?": {
      const weak = data.benefits.filter((b) => !b.measurable);
      if (weak.length === 0) return "Every defined benefit in this dataset has a way to measure it.";
      return `${weak.length} defined benefit${weak.length > 1 ? "s" : ""} ${weak.length > 1 ? "have" : "has"} no clear way to be measured yet: ${weak
        .map((b) => `"${b.title}"`)
        .join(", ")}. Without a measurement approach, it will be hard to know if they were realized.`;
    }

    case "Which initiatives should be reviewed first?": {
      const findings = computeFindings(data);
      const overlap = findings.find((f) => f.type === "overlap");
      const noBenefit = findings.find((f) => f.type === "benefit-definition");
      const parts: string[] = [];
      if (noBenefit) parts.push(`start with the ${noBenefit.count} initiatives that have no defined benefit`);
      if (overlap) parts.push(`then review the ${overlap.count} initiatives that potentially overlap in scope`);
      if (parts.length === 0) return "No initiative stands out as urgent to review right now.";
      return `We'd ${parts.join(", ")} — in both cases, resources may be committed without a clear or unique payoff.`;
    }

    default:
      return "This is a prototype answer set — try one of the suggested questions above.";
  }
}
