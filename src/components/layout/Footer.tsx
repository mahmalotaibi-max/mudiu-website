import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { brand, contact, footerNav, legalNav } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-dark bg-ink text-paper">
      <Container className="py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold">{brand.nameAr}</span>
              <span className="text-sm text-muted-on-dark">{brand.nameEn}</span>
            </div>
            <p className="mt-3 text-sm text-muted-on-dark">{brand.tagline}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3 md:flex md:flex-col md:gap-2">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-on-dark transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-on-dark transition-colors hover:text-orange"
              dir="ltr"
            >
              {contact.phoneDisplay}
            </a>
            <span className="text-sm text-muted-on-dark">المملكة العربية السعودية</span>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-line-dark pt-6 text-xs text-muted-on-dark sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} مُضيّ. جميع الحقوق محفوظة.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-paper">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
