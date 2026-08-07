"use client";

import { ShieldCheck, BadgeCheck, Timer, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { useTranslations } from "next-intl";

const items = [
  { icon: ShieldCheck, key: "item1" },
  { icon: BadgeCheck, key: "item2" },
  { icon: Timer, key: "item3" },
  { icon: Users, key: "item4" },
];

export function Guarantee() {
  const t = useTranslations("guarantee");

  return (
    <section id="garansi" className="relative w-full bg-brand-surface/40 py-28 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} />
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <StaggerItem key={it.key}>
              <div className="group text-center bg-brand-surface/80 rounded-2xl border border-white/5 p-8 h-full transition-all duration-300 hover:border-brand-cyan/40 hover:-translate-y-1">
                <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-brand-red/10 text-brand-red group-hover:scale-105 transition">
                  <it.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#f0f2f5]">{t(`${it.key}_title`)}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{t(`${it.key}_desc`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}