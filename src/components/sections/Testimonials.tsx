import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { useTranslations } from "next-intl";

const testimonials = [
  { key: "item1" },
  { key: "item2" },
  { key: "item3" },
];

function Stars() {
  return (
    <div className="flex text-brand-cyan" aria-label="5 rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7L12 18l-6.3 3.3 1.6-7L2 9.6 9 9l3-7z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section id="testimoni" className="relative w-full bg-brand-surface/40 py-28 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} />
        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <StaggerItem key={item.key}>
              <div className="h-full flex flex-col justify-between bg-brand-surface rounded-2xl p-8 border border-white/5 hover:border-brand-cyan/40 transition group">
                <div>
                  <Stars />
                  <p className="mt-5 text-gray-300 leading-relaxed">&quot;{t(`${item.key}_q`)}&quot;</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-red to-brand-cyan flex items-center justify-center font-bold text-white">
                    {t(`${item.key}_n`)[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-[#f0f2f5]">{t(`${item.key}_n`)}</div>
                    <div className="text-xs text-gray-400">{t(`${item.key}_r`)}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}