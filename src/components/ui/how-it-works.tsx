"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Layers, Search, Zap } from "lucide-react";
import type React from "react";
import { useTranslations } from "next-intl";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
  <div
    className={cn(
      "relative rounded-2xl border bg-card p-6 text-card-foreground transition-all duration-300 ease-in-out",
      "hover:scale-105 hover:shadow-lg hover:border-primary/50 hover:bg-muted"
    )}
  >
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-primary">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="mb-6 text-muted-foreground">{description}</p>
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-3">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <span className="text-muted-foreground">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      icon: <Search className="h-6 w-6" />,
      title: t("step1_title"),
      description: t("step1_desc"),
      benefits: [t("step1_b1"), t("step1_b2"), t("step1_b3")],
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: t("step2_title"),
      description: t("step2_desc"),
      benefits: [t("step2_b1"), t("step2_b2"), t("step2_b3")],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t("step3_title"),
      description: t("step3_desc"),
      benefits: [t("step3_b1"), t("step3_b2"), t("step3_b3")],
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">{t("eyebrow")}</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("title")} <span className="text-brand-red">{t("accent")}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="relative mx-auto mb-8 w-full max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2 bg-border"
          />
          <div className="relative grid grid-cols-3">
            {steps.map((_, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-muted font-semibold text-foreground ring-4 ring-background"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
}