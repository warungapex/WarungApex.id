import { BadgeDollarSign, ShieldCheck, Headset } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const items = [
  {
    icon: BadgeDollarSign,
    title: "Harga Bersaing",
    desc: "Akun tier tinggi dengan harga terbaik di pasaran.",
  },
  {
    icon: ShieldCheck,
    title: "Barang Original",
    desc: "Semua akun asli dan bergaransi, bukan hasil curian.",
  },
  {
    icon: Headset,
    title: "Pelayanan Responsif",
    desc: "Bantuan instan selama 24/7 via WhatsApp & Discord.",
  },
];

export function Advantages() {
  return (
    <section id="keunggulan" className="relative w-full bg-brand-dark py-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading eyebrow="Kenapa Kami" title="KENAPA" accent="WARUNG APEX" />
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <StaggerItem key={it.title}>
              <div className="group relative bg-brand-surface rounded-2xl p-8 h-full border border-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-cyan/60 hover:shadow-[0_20px_50px_-12px_rgba(0,240,255,0.15)]">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan group-hover:bg-brand-cyan/20 group-hover:scale-105 transition">
                  <it.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#f0f2f5]">{it.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{it.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}