import type { OrgDiagnosticProfile } from "@/lib/platform/orgDiagnosisTypes";

// Sample organization for the "Explore Sample Organization" shortcut: a
// mid-size Saudi food company, deliberately answered so that Direction shows
// no signal, while Performance/Growth/Operations/Knowledge/Value each show a
// signal worth checking - with Evidence left intentionally incomplete for
// Performance and Value, so the demo also shows what "medium" and "low"
// Confidence look like, not just "high".
export const riwaaOrgDiagnosticProfile: OrgDiagnosticProfile = {
  organizationName: "رِواء للأغذية",
  sector: "business",
  growthMetrics: { currentGrowthPct: 8, targetGrowthPct: 15 },
  answers: {
    // Direction - clean signal, no deep dive triggered
    "dir-sig-existence": "yes",
    "dir-sig-clarity": "yes",

    // Performance - signal triggered; only one of two Evidence questions
    // answered, so this finding lands at "medium" confidence.
    "perf-sig-existence": "no",
    "perf-evi-measurement": "no",

    // Growth - signal triggered (tracked, but under target); Evidence fully
    // answered -> "high" confidence.
    "gro-sig-measurement": "partial",
    "gro-evi-ownership": "no",

    // Operations - signal triggered; all Evidence answered -> "high" confidence.
    "ops-sig-existence": "no",
    "ops-evi-accessibility": "no",
    "ops-evi-improvement": "yes",
    "ops-evi-ownership": "partial",

    // Knowledge - signal triggered; Evidence answered -> "high" confidence.
    "know-sig-existence": "yes",
    "know-evi-accessibility": "no",

    // Value - signal triggered; Evidence left unanswered on purpose, so this
    // finding lands at "low" confidence.
    "val-sig-measurement": "partial",
  },
};
