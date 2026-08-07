"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { useTranslations } from "next-intl";

const positions = [
  { top: "5%",  left: "20%", rotate: -1,   z: 10,  delay: 0 },
  { top: "38%", left: "42%", rotate: 1,    z: 15,  delay: 200 },
  { top: "15%", left: "65%", rotate: 2.5,  z: 20,  delay: 400 },
  { top: "55%", left: "12%", rotate: -2,   z: 12,  delay: 600 },
];

const keys = ["item1", "item2", "item3", "item4"];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay) || 0;
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = el.dataset.transform || "";
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((el) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px) scale(0.95)";
        el.style.transition =
          "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimoni"
      className="relative w-full py-24 md:py-48"
      style={{ overflow: "clip" }}
    >
      {/* Dark grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(rgba(57,80,205,0.25) 1px, transparent 0px) 0% 0% / 18.15px 46.5px repeat,
            linear-gradient(90deg, rgba(57,80,205,0.25) 1px, rgb(8,8,12) 0px) 0% 0% / 18.15px 46.5px repeat
          `,
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-[1330px] px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} />
      </div>

      {/* Cards container */}
      <div className="relative mx-auto max-w-[1330px] mt-16 flex flex-col items-center gap-6 px-6 md:block md:h-[650px]">
        {keys.map((key, i) => {
          const pos = positions[i];
          const finalTransform = `rotate(${pos.rotate}deg)`;
          return (
            <div
              key={key}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-delay={pos.delay}
              data-transform={finalTransform}
              className="w-full max-w-[360px] md:absolute"
              style={{
                top: pos.top,
                left: pos.left,
                zIndex: pos.z,
              }}
            >
            <div
                style={{ transform: `rotate(${pos.rotate}deg)` }}
              >
                <div className="group bg-black/80 backdrop-blur-sm text-white border border-blue-700/50 rounded-2xl p-8 shadow-2xl hover:border-blue-500 transition-colors duration-500">
                  <p className="text-lg leading-[1.6] mb-6 text-white/90 font-normal">
                    &quot;{t(`${key}_q`)}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-red to-brand-cyan flex items-center justify-center font-bold text-white shrink-0">
                      {t(`${key}_n`)[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{t(`${key}_n`)}</p>
                      <p className="text-gray-400 text-xs">{t(`${key}_r`)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
