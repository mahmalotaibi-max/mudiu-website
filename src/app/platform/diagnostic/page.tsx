import type { Metadata } from "next";
import { DiagnosticWizard } from "@/app/platform/diagnostic/DiagnosticWizard";

export const metadata: Metadata = {
  title: "Organizational Diagnostic | MUDIU Platform",
};

export default function DiagnosticPage() {
  return <DiagnosticWizard />;
}
