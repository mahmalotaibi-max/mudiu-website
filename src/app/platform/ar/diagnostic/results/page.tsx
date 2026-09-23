import type { Metadata } from "next";
import { OrgDiagnosticResultsView } from "@/components/platform/OrgDiagnosticResultsView";

export const metadata: Metadata = {
  title: "نظرة MUDIU على مؤسستك | منصة MUDIU",
};

export default function DiagnosticResultsPageAr() {
  return <OrgDiagnosticResultsView locale="ar" />;
}
