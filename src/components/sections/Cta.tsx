import { Reveal } from "@/components/ui/reveal";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Cta() {
  const t = useTranslations("cta");

  return (
    <section className="relative w-full py-32 overflow-hidden bg-brand-dark">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-red/15 blur-[130px] rounded-full pointer-events-none" />
      <Reveal className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-[var(--font-display)] font-bold tracking-tight text-[#f0f2f5]">
          {t("title")} <span className="text-brand-red">{t("accent")}</span>
        </h2>
        <p className="mt-6 text-gray-400 max-w-xl mx-auto leading-relaxed">
          {t("desc")}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/catalog"
            className="w-full sm:w-auto bg-brand-red text-white px-9 py-4 rounded-full font-semibold tracking-wide hover:bg-brand-red/80 transition shadow-[0_0_35px_-5px_rgba(255,42,68,0.6)]"
          >
            {t("btnCatalog")}
          </Link>
          <a
            href="https://wa.me/6285167202134"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white text-gray-900 px-9 py-4 rounded-full font-semibold tracking-wide hover:bg-gray-100 transition border border-gray-100"
          >
            {t("btnContact")}
          </a>
        </div>
      </Reveal>
    </section>
  );
}