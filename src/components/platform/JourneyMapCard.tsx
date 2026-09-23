import type { Locale } from "@/lib/platform/types";

// A brand/identity element, not a diagnostic output: the marker's position is
// always the same ("just finished the diagnostic") for every visitor, and
// never shifts based on how strong or weak their answers were. It shows
// where someone stands in MUDIU's overall journey, not a verdict on their
// organization - see the Product Architecture Review discussion this
// implements ("خريطة الرحلة", not "قريب/بعيد من الأثر").
const strings = {
  en: {
    badge: "Diagnostic complete",
    title: "From Diagnosis to Impact",
    body: "This is MUDIU's full journey. You're at the start of it now - a few steps stand between what we found and a real, visible impact.",
    here: "You are here",
    waypoints: ["Diagnosis", "Understanding", "Improvement", "Tracking", "Impact"],
  },
  ar: {
    badge: "أكملت التشخيص",
    title: "من التشخيص إلى الأثر",
    body: "هذه هي رحلة MUDIU الكاملة. أنت الآن في بدايتها - أمامك خطوات نحو تحويل ما اكتشفناه إلى أثر ملموس.",
    here: "أنت هنا",
    waypoints: ["التشخيص", "الفهم", "التحسين", "المتابعة", "الأثر"],
  },
};

export function JourneyMapCard({ locale = "en" }: { locale?: Locale }) {
  const t = strings[locale];
  // English reads left-to-right (start on the left, impact on the right);
  // Arabic reads right-to-left, so the whole path is mirrored instead of
  // redrawn, keeping the dots under the matching label either way.
  const mirrored = locale === "ar";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(700px_500px_at_78%_22%,#2a3f66_0%,#17181c_55%,#101116_100%)] px-6 py-8 md:px-10 md:py-9">
      <span className="inline-flex items-center rounded-full bg-orange/20 px-3 py-1 text-xs font-semibold text-orange-soft">
        {t.badge}
      </span>
      <h2 className="mt-3 text-lg font-semibold text-paper md:text-xl">{t.title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/70">{t.body}</p>

      <div className="mt-6">
        <svg
          viewBox="0 0 760 60"
          className="w-full"
          style={mirrored ? { transform: "scaleX(-1)" } : undefined}
          aria-hidden
        >
          <defs>
            <radialGradient id="journey-orb" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#f4b585" />
              <stop offset="45%" stopColor="#c1622e" />
              <stop offset="100%" stopColor="#7a3a1c" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="journey-line" x1="30" y1="30" x2="730" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c1622e" />
            </linearGradient>
          </defs>
          <path d="M30,30 L730,30" stroke="url(#journey-line)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 10" fill="none" opacity="0.9" />
          <circle cx="30" cy="30" r="9" fill="#ffffff" />
          <circle cx="30" cy="30" r="15" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.5">
            <animate attributeName="r" values="15;22;15" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="205" cy="30" r="6" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <circle cx="380" cy="30" r="6" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <circle cx="555" cy="30" r="6" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <circle cx="730" cy="30" r="26" fill="url(#journey-orb)" />
          <circle cx="730" cy="30" r="8" fill="#c1622e" />
        </svg>

        <div className="mt-2 flex justify-between px-1">
          {t.waypoints.map((label, i) => (
            <div key={label} className="flex w-16 flex-col items-center text-center">
              {i === 0 && (
                <span className="mb-1 whitespace-nowrap rounded-full bg-orange/20 px-2 py-0.5 text-[10px] font-bold text-orange-soft">
                  {t.here}
                </span>
              )}
              <span className={i === 0 ? "text-xs font-semibold text-paper" : "text-xs text-paper/55"}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
