import { ShieldCheck, BadgeCheck, Timer, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const items = [
  { icon: ShieldCheck, t: "Garansi Resmi", d: "Semua akun bergaransi penuh. Kena scam? Kami tanggung." },
  { icon: BadgeCheck, t: "Akun Terverifikasi", d: "Data login diverifikasi satu per satu sebelum dijual." },
  { icon: Timer, t: "Transfer Instan", d: "Proses terikat waktu, akun terkirim dalam hitungan menit." },
  { icon: Users, t: "+500 Pembeli", d: "Dipercaya ratusan pembeli dengan ulasan rating 4.9/5." },
];

export function Guarantee() {
  return (
    <section id="garansi" className="relative w-full bg-brand-surface/40 py-28 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading eyebrow="Jaminan Kami" title="GARANSI" accent="100%" />
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <StaggerItem key={it.t}>
              <div className="group text-center bg-brand-surface/80 rounded-2xl border border-white/5 p-8 h-full transition-all duration-300 hover:border-brand-cyan/40 hover:-translate-y-1">
                <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-brand-red/10 text-brand-red group-hover:scale-105 transition">
                  <it.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#f0f2f5]">{it.t}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{it.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}