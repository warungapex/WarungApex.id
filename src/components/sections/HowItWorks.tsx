import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const steps = [
  { n: "01", t: "Pilih Akun", d: "Jelajahi katalog dan temukan akun yang sesuai budget & kebutuhan." },
  { n: "02", t: "Hubungi Kami", d: "Chat via WhatsApp untuk konfirmasi ketersediaan dan spesifikasi." },
  { n: "03", t: "Bayar", d: "Pembayaran aman via QRIS, e-wallet, atau transfer bank." },
  { n: "04", t: "Terima Instan", d: "Akun dikirim segera setelah pembayaran terverifikasi." },
];

export function HowItWorks() {
  return (
    <section id="carabeli" className="relative w-full bg-brand-surface/40 py-28 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[250px] bg-brand-cyan/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading eyebrow="Proses Mudah" title="CARA" accent="BELI" />
        </Reveal>
        <Stagger className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((s, i) => (
            <StaggerItem key={s.n}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%+1rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-brand-cyan/40 to-transparent" />
                )}
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-brand-red text-white font-[var(--font-display)] font-bold text-lg shadow-[0_0_25px_-5px_rgba(255,42,68,0.6)]">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#f0f2f5]">{s.t}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{s.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}