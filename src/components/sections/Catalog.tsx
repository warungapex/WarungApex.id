import Link from "next/link";
import { accounts } from "@/lib/accounts";
import { ProductCard } from "@/components/ui/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

export function Catalog() {
  const items = accounts.filter((a) => !a.sold).slice(0, 6);
  return (
    <section id="katalog" className="relative w-full bg-brand-dark py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-brand-red/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading eyebrow="Pilih Akun" title="KATALOG" accent="TERBARU" />
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a) => (
            <StaggerItem key={a.id}>
              <ProductCard a={a} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 text-center">
          <Link
            href="/catalog"
            className="inline-block border border-brand-cyan/40 text-brand-cyan px-10 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-brand-cyan/10 transition"
          >
            Lihat Semua Akun
          </Link>
        </Reveal>
      </div>
    </section>
  );
}