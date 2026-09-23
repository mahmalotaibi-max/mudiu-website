import { PlatformShell } from "@/components/platform/PlatformShell";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function ProductsPage() {
  return (
    <>
      <PlatformShell active="products" />
      <ComingSoon section="Products & Services" />
    </>
  );
}
