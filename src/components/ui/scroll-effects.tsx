"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function ScrollEffects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grouped reveals: [data-reveal] children of [data-reveal-group] stagger together
      document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 78%", once: true },
          },
        );
      });

      // Standalone reveals
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.closest("[data-reveal-group]")) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: parseFloat(el.dataset.revealDelay ?? "0"),
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          },
        );
      });

      // Parallax: data-parallax="12" → drifts up 12% over section scroll
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax ?? "10");
        gsap.fromTo(
          el,
          { yPercent: -speed / 2 },
          {
            yPercent: speed / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Scrubbed horizontal lines: grow scaleX as you scroll past
      document.querySelectorAll<HTMLElement>('[data-scrub-line="x"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: { trigger: el, start: "top 90%", end: "top 40%", scrub: true },
          },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
