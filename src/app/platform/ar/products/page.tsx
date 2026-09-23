import { PlatformShell } from "@/components/platform/PlatformShell";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function ProductsPageAr() {
  return (
    <>
      <PlatformShell active="products" locale="ar" />
      <ComingSoon section="المنتجات والخدمات" locale="ar" />
    </>
  );
}
