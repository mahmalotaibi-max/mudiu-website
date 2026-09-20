// Arabic mirror of the MUDIU Platform prototype. Nested inside the parent
// /platform layout (which sets dir="ltr" for the English experience) - this
// layout overrides direction back to RTL for this subtree only, the same
// way the rest of mudiu.co is already RTL.
export default function PlatformArLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="ar" className="min-h-full text-start">
      {children}
    </div>
  );
}
