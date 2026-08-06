"use client";

import React, { useEffect, useState } from "react";

const INTRO_STYLE_ID = "wa-faq-animations";

const faqs = [
  {
    question: "Apakah akun yang dijual legal dan original?",
    answer:
      "Ya, semua akun diperoleh dari penjual yang sah dan kami beri garansi. Data login diverifikasi sebelum ditransfer ke pembeli.",
    meta: "Keamanan",
  },
  {
    question: "Bagaimana transaksi dilakukan?",
    answer:
      "Setelah kamu memilih akun dan menghubungi kami, pembayaran dilakukan via QRIS, e-wallet, atau bank. Setelah terverifikasi, akun langsung dikirim.",
    meta: "Transaksi",
  },
  {
    question: "Apa itu garansi akun?",
    answer:
      "Jika ada masalah dengan akun setelah pembelian dalam masa garansi, kami tanggung — termasuk akun yang diblokir pemilik sebelumnya.",
    meta: "Garansi",
  },
  {
    question: "Berapa lama proses pengiriman?",
    answer:
      "Mayoritas akun terkirim dalam hitungan menit setelah pembayaran terverifikasi karena proses transfernya terikat waktu.",
    meta: "Kecepatan",
  },
];

export function FaqArticle() {
  const [introReady, setIntroReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(INTRO_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = INTRO_STYLE_ID;
    style.innerHTML = `
      @keyframes wa-fade-up {
        0% { transform: translate3d(0, 20px, 0); opacity: 0; filter: blur(6px); }
        60% { filter: blur(0); }
        100% { transform: translate3d(0, 0, 0); opacity: 1; filter: blur(0); }
      }
      @keyframes wa-beam-spin { to { transform: rotate(360deg); } }
      @keyframes wa-pulse {
        0% { transform: scale(0.7); opacity: 0.55; }
        60% { opacity: 0.1; }
        100% { transform: scale(1.25); opacity: 0; }
      }
      @keyframes wa-meter {
        0%, 20% { transform: scaleX(0); transform-origin: left; }
        45%, 60% { transform: scaleX(1); transform-origin: left; }
        80%, 100% { transform: scaleX(0); transform-origin: right; }
      }
      @keyframes wa-tick {
        0%, 30% { transform: translateX(-6px); opacity: 0.4; }
        50% { transform: translateX(2px); opacity: 1; }
        100% { transform: translateX(20px); opacity: 0; }
      }
      .wa-faq-enter {
        animation: wa-fade-up 860ms cubic-bezier(0.22, 0.68, 0, 1) forwards;
      }
      .wa-faq-pill {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.9rem;
        margin: 0 auto;
        padding: 1rem 1.5rem;
        width: 100%;
        max-width: 22rem;
        border-radius: 9999px;
        border: 1px solid rgba(0, 240, 255, 0.25);
        background: rgba(18, 19, 26, 0.6);
        color: #00f0ff;
        text-transform: uppercase;
        letter-spacing: 0.35em;
        font-size: 0.65rem;
        overflow: hidden;
        opacity: 0;
        transform: translate3d(0, 12px, 0);
        filter: blur(6px);
        transition: opacity 700ms ease, transform 700ms ease, filter 700ms ease;
        isolation: isolate;
      }
      .wa-faq-pill--ready {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        filter: blur(0);
      }
      .wa-faq-pill__beam,
      .wa-faq-pill__pulse {
        position: absolute;
        inset: -110%;
        pointer-events: none;
        border-radius: 50%;
      }
      .wa-faq-pill__beam {
        background: conic-gradient(from 160deg, rgba(0, 240, 255, 0.3), transparent 32%, rgba(255, 42, 68, 0.25) 58%, transparent 80%);
        animation: wa-beam-spin 18s linear infinite;
        opacity: 0.55;
      }
      .wa-faq-pill__pulse {
        border: 1px solid currentColor;
        opacity: 0.25;
        animation: wa-pulse 3.4s ease-out infinite;
      }
      .wa-faq-pill__label {
        position: relative;
        z-index: 1;
        font-weight: 600;
      }
      .wa-faq-pill__meter {
        position: relative;
        z-index: 1;
        flex: 1 1 auto;
        height: 1px;
        background: linear-gradient(90deg, transparent, currentColor 35%, transparent 85%);
        transform: scaleX(0);
        animation: wa-meter 5.8s ease-in-out infinite;
        opacity: 0.7;
      }
      .wa-faq-pill__tick {
        position: relative;
        z-index: 1;
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 9999px;
        background: currentColor;
        box-shadow: 0 0 0 4px rgba(0, 240, 255, 0.12);
        animation: wa-tick 3.2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) style.remove();
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggle = (index: number) =>
    setActiveIndex((prev) => (prev === index ? -1 : index));

  return (
    <section className="relative w-full overflow-hidden bg-brand-dark py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 90% at 10% 0%, rgba(0,240,255,0.08), transparent 65%), radial-gradient(ellipse 60% 90% at 90% 100%, rgba(255,42,68,0.08), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-12 px-6">
        <div
          className={`wa-faq-pill ${introReady ? "wa-faq-pill--ready" : ""}`}
          aria-hidden="true"
        >
          <span className="wa-faq-pill__beam" />
          <span className="wa-faq-pill__pulse" />
          <span className="wa-faq-pill__label">Warung Fokus</span>
          <span className="wa-faq-pill__meter" />
          <span className="wa-faq-pill__tick" />
        </div>

        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Butuh Bantuan</p>
          <h2 className="mt-3 text-2xl md:text-4xl font-[var(--font-display)] font-bold tracking-widest text-[#f0f2f5]">
            FAQ <span className="text-brand-red">UMUM</span>
          </h2>
          <p className="mt-4 text-gray-400">Semua yang perlu kamu tahu sebelum membeli.</p>
        </header>

        <ul className="space-y-4">
          {faqs.map((item, index) => {
            const open = activeIndex === index;
            const panelId = `wa-faq-panel-${index}`;
            const buttonId = `wa-faq-trigger-${index}`;
            return (
              <li
                key={item.question}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-brand-surface transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-cyan/50"
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="relative flex w-full items-center gap-5 px-6 py-5 text-left"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-105 ${
                      open
                        ? "border-brand-cyan/60 bg-brand-cyan/15 text-brand-cyan rotate-45"
                        : "border-white/20 bg-white/5 text-white"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-5 w-5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                  <span className="flex flex-1 items-center justify-between gap-4">
                    <span className="text-base font-medium text-[#f0f2f5]">{item.question}</span>
                    <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gray-400">
                      {item.meta}
                    </span>
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-[5.25rem] pb-5 text-sm leading-relaxed text-gray-400">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default FaqArticle;