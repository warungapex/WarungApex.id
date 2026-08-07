import type { Metadata } from "next";
import { accounts } from "@/lib/accounts";
import { ProductDetail } from "@/components/catalog/product-detail";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Detail Akun | Warung Apex",
  description: "Detail akun Apex Legends di Warung Apex.",
};

export function generateStaticParams() {
  return accounts.map((a) => ({ id: a.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = accounts.find((a) => a.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <nav className="text-xs text-gray-500 tracking-wide mb-8">
          <a href="/" className="hover:text-brand-cyan transition">Home</a>
          <span className="mx-2">/</span>
          <a href="/catalog" className="hover:text-brand-cyan transition">Catalog</a>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{product.badge}</span>
        </nav>

        <ProductDetail product={product as any} />
      </div>
    </main>
  );
}
