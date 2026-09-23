import type { Metadata } from "next";
import { MyOrganizationView } from "@/components/platform/MyOrganizationView";

export const metadata: Metadata = {
  title: "مؤسستي | منصة MUDIU",
};

export default function MyOrganizationPageAr() {
  return <MyOrganizationView locale="ar" />;
}
