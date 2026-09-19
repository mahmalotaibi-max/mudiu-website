import type { OrganizationDataset } from "@/lib/platform/types";

// A single realistic-looking sample organization used throughout the
// prototype. Links are deliberately left incomplete in places — initiatives
// with no goal, indicators with no baseline, benefits with no impact record
// — so the diagnostics engine has real gaps to surface instead of a
// hand-picked list of findings.

export const sampleOrganization: OrganizationDataset = {
  name: "Sample Organization",

  goals: [
    { id: "g1", title: "Improve access to healthcare services", ownerDept: "Health Services" },
    { id: "g2", title: "Increase digital service adoption", ownerDept: "Digital Transformation" },
    { id: "g3", title: "Strengthen financial sustainability", ownerDept: "Finance" },
    { id: "g4", title: "Improve employee experience", ownerDept: "Human Capital" },
    { id: "g5", title: "Enhance customer satisfaction", ownerDept: "Customer Experience" },
    { id: "g6", title: "Reduce service delivery time", ownerDept: "Operations" },
    { id: "g7", title: "Expand community outreach programs", ownerDept: "Community Development" },
    { id: "g8", title: "Improve data quality and governance", ownerDept: "Information Technology" },
    { id: "g9", title: "Increase national workforce participation", ownerDept: "Human Capital" },
  ],

  indicators: [
    { id: "ind1", goalId: "g1", name: "Average appointment waiting time", unit: "minutes", baseline: 48, current: 35.4, target: 30 },
    { id: "ind2", goalId: "g2", name: "Digital transaction share", unit: "%", baseline: 40, current: 55, target: 70 },
    { id: "ind3", goalId: "g3", name: "Operating cost ratio", unit: "%", baseline: null, current: 62, target: 55 },
    { id: "ind4", goalId: "g5", name: "Customer satisfaction score (CSAT)", unit: "%", baseline: 68, current: 71, target: 80 },
    { id: "ind5", goalId: "g6", name: "Average service delivery time", unit: "days", baseline: 9, current: 7, target: 5 },
    { id: "ind6", goalId: "g8", name: "Data quality score", unit: "%", baseline: null, current: 58, target: 85 },
  ],

  priorities: [
    { id: "p1", goalId: "g1", title: "Improve appointment accessibility" },
    { id: "p2", goalId: "g2", title: "Simplify digital onboarding" },
    { id: "p3", goalId: "g5", title: "Personalize customer interactions" },
    { id: "p4", goalId: "g6", title: "Automate manual workflows" },
  ],

  initiatives: [
    { id: "i1", title: "Digital Appointment Enhancement", department: "Health Services", goalId: "g1", priorityId: "p1" },
    { id: "i2", title: "Mobile Wallet Integration", department: "Digital Transformation", goalId: "g2", priorityId: "p2" },
    { id: "i3", title: "Customer Loyalty Revamp", department: "Customer Experience", goalId: "g5", priorityId: "p3" },
    { id: "i4", title: "Workflow Automation - Phase 1", department: "Operations", goalId: "g6", priorityId: "p4" },
    { id: "i5", title: "Workflow Automation - Phase 2", department: "Operations", goalId: "g6", priorityId: "p4" },
    { id: "i6", title: "Call Center Modernization", department: "Customer Experience", goalId: "g5", priorityId: null },
    { id: "i7", title: "Data Governance Uplift", department: "Information Technology", goalId: "g8", priorityId: null },
    { id: "i15", title: "Financial Reporting Automation", department: "Finance", goalId: "g3", priorityId: null },
    { id: "i16", title: "Customer Feedback Analytics", department: "Customer Experience", goalId: "g5", priorityId: "p3" },
    { id: "i17", title: "Health Records Digitization", department: "Health Services", goalId: "g1", priorityId: null },
    { id: "i18", title: "Appointment Reminder SMS Service", department: "Health Services", goalId: "g1", priorityId: "p1" },
    { id: "i8", title: "Employee Wellness Program", department: "Human Capital", goalId: null, priorityId: null },
    { id: "i9", title: "Internal Newsletter Redesign", department: "Communications", goalId: null, priorityId: null },
    { id: "i10", title: "Branch Signage Refresh", department: "Operations", goalId: null, priorityId: null },
    { id: "i11", title: "Legacy System Retirement", department: "Information Technology", goalId: null, priorityId: null },
    { id: "i12", title: "Community Volunteering Days", department: "Community Development", goalId: null, priorityId: null },
    { id: "i13", title: "Saudization Fast-Track Program", department: "Human Capital", goalId: null, priorityId: null },
    { id: "i14", title: "Vendor Portal Upgrade", department: "Finance", goalId: null, priorityId: null },
  ],

  outputs: [
    { id: "o1", initiativeId: "i1", title: "Enhanced appointment platform" },
    { id: "o2", initiativeId: "i2", title: "Integrated mobile wallet module" },
    { id: "o3", initiativeId: "i3", title: "Redesigned loyalty program rules" },
    { id: "o4", initiativeId: "i4", title: "Automated approval workflow" },
    { id: "o5", initiativeId: "i5", title: "Automated reporting workflow" },
    { id: "o6", initiativeId: "i6", title: "Unified call center system" },
    { id: "o7", initiativeId: "i7", title: "Data governance policy and tooling" },
    { id: "o8", initiativeId: "i15", title: "Automated financial reports" },
    { id: "o9", initiativeId: "i16", title: "Customer feedback data pipeline" },
    { id: "o10", initiativeId: "i17", title: "Digitized patient records" },
    { id: "o11", initiativeId: "i18", title: "Automated reminder workflow" },
  ],

  productsServices: [
    { id: "ps1", outputId: "o1", title: "Appointment Booking Service", kind: "service" },
    { id: "ps2", outputId: "o2", title: "Mobile Wallet App", kind: "product" },
    { id: "ps3", outputId: "o3", title: "Loyalty Rewards Platform", kind: "product" },
    { id: "ps4", outputId: "o4", title: "Approval Workflow Tool", kind: "product" },
    { id: "ps6", outputId: "o6", title: "Unified Call Center Platform", kind: "service" },
    { id: "ps9", outputId: "o9", title: "Feedback Analytics Dashboard", kind: "product" },
    { id: "ps10", outputId: "o10", title: "Digital Health Records System", kind: "product" },
    { id: "ps11", outputId: "o11", title: "SMS Reminder Service", kind: "service" },
  ],

  benefits: [
    { id: "b1", productServiceId: "ps1", initiativeId: "i1", title: "Reduced waiting time", ownerRole: "Head of Patient Experience", measurable: true, hasBaseline: true },
    { id: "b2", productServiceId: "ps2", initiativeId: "i2", title: "Faster, cashless transactions", ownerRole: "Digital Products Lead", measurable: true, hasBaseline: true },
    { id: "b3", productServiceId: "ps3", initiativeId: "i3", title: "Increased repeat purchase rate", ownerRole: "Customer Experience Lead", measurable: true, hasBaseline: true },
    { id: "b4", productServiceId: "ps4", initiativeId: "i4", title: "Fewer manual processing errors", ownerRole: "Operations Manager", measurable: false, hasBaseline: false },
    { id: "b6", productServiceId: "ps6", initiativeId: "i6", title: "Shorter call resolution time", ownerRole: "Call Center Manager", measurable: true, hasBaseline: false },
    { id: "b9", productServiceId: "ps9", initiativeId: "i16", title: "Faster issue detection and resolution", ownerRole: "Customer Experience Lead", measurable: true, hasBaseline: true },
    { id: "b11", productServiceId: "ps11", initiativeId: "i18", title: "Fewer missed appointments", ownerRole: "Head of Patient Experience", measurable: true, hasBaseline: true },
  ],

  impacts: [
    {
      id: "im1",
      benefitId: "b1",
      title: "Improved beneficiary access and experience",
      status: "expected",
      evidenceStatus: "partial",
      indicatorName: "Average appointment waiting time",
    },
    {
      id: "im2",
      benefitId: "b2",
      title: "Higher trust in digital channels",
      status: "observed",
      evidenceStatus: "partial",
      indicatorName: "Digital transaction share",
    },
    {
      id: "im4",
      benefitId: "b4",
      title: "More reliable service operations",
      status: "observed",
      evidenceStatus: "none",
      indicatorName: "Average service delivery time",
    },
    {
      id: "im9",
      benefitId: "b9",
      title: "Improved customer trust and retention",
      status: "verified",
      evidenceStatus: "verified",
      indicatorName: "Customer satisfaction score (CSAT)",
    },
    // b3, b6, b11 intentionally have no impact record yet — these are the
    // "Impact — Missing" cases surfaced in the Strategy map and dashboard.
  ],
};
