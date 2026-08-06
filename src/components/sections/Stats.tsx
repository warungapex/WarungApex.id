import { Stagger, StaggerItem } from "@/components/ui/reveal";

const stats = [
  { v: "500+", l: "Akun Terjual" },
  { v: "4.9/5", l: "Rating Pembeli" },
  { v: "24/7", l: "Support Aktif" },
];

export function Stats() {
  return (
    <section className="w-full bg-brand-dark py-24 border-t border-white/5">
      <Stagger className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-12">
        {stats.map((s, i) => (
          <StaggerItem key={s.l} className="relative text-center">
            {i < stats.length - 1 && <div className="hidden sm:block absolute inset-y-0 right-0 w-px bg-white/5" />}
            <div className="inline-block bg-gradient-to-r from-brand-red to-brand-cyan bg-clip-text text-transparent text-4xl md:text-6xl font-[var(--font-display)] font-bold">
              {s.v}
            </div>
            <div className="mt-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-400">{s.l}</div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}