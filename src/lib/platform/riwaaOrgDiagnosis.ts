import type { OrgDiagnosticProfile } from "@/lib/platform/orgDiagnosisTypes";

// Sample organization for the "Explore Sample Organization" shortcut (spec
// item 15): a mid-size Saudi food company selling through stores and
// e-commerce, deliberately answered so that Operations, Knowledge, and
// Value come back critical, Performance and Growth need attention, and
// Direction is comparatively strong - a realistic, uneven profile rather
// than a uniformly bad or uniformly good one.
export const riwaaOrgDiagnosticProfile: OrgDiagnosticProfile = {
  organizationName: "رِواء للأغذية",
  sector: "business",
  growthMetrics: { currentGrowthPct: 8, targetGrowthPct: 15 },
  answers: {
    // Direction - reasonably strong
    "dir-1": "yes",
    "dir-2": "partial",
    "dir-3": "yes",

    // Performance - a real but partial measurement gap
    "perf-1": "no",
    "perf-2": "yes",
    "perf-3": "yes",
    "perf-4": "partial",

    // Growth - tracked, but underperforming and the driver is unknown
    "gro-1": "yes",
    "gro-2": "yes",
    "gro-3": "partial",
    "gro-4": "no",

    // Operations - critical: undocumented, recurring problems
    "ops-1": "partial",
    "ops-2": "no",
    "ops-3": "partial",
    "ops-4": "yes",

    // Knowledge - critical: tied to specific people
    "know-1": "yes",
    "know-2": "partial",
    "know-3": "no",

    // Value - critical: initiatives aren't connected to results
    "val-1": "partial",
    "val-2": "partial",
    "val-3": "no",
  },
};
