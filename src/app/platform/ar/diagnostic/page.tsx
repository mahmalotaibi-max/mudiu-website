import type { Metadata } from "next";
import { OrgDiagnosisQuestionnaire } from "@/components/platform/OrgDiagnosisQuestionnaire";

export const metadata: Metadata = {
  title: "ابدأ التشخيص المجاني | منصة MUDIU",
};

export default function DiagnosticPageAr() {
  return <OrgDiagnosisQuestionnaire locale="ar" />;
}
