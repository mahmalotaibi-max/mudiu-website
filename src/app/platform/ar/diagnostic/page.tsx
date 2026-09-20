import type { Metadata } from "next";
import { DiagnosticWizard } from "@/app/platform/diagnostic/DiagnosticWizard";

export const metadata: Metadata = {
  title: "التشخيص التنظيمي | منصة MUDIU",
};

export default function DiagnosticPageAr() {
  return <DiagnosticWizard locale="ar" />;
}
