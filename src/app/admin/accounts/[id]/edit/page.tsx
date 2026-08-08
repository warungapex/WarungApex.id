import { requireAdmin } from "@/lib/supabase/auth";
import { getAccount } from "@/lib/supabase/accounts";
import { AccountForm } from "@/components/admin/account-form";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditAccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const account = await getAccount(id);
  if (!account) notFound();

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-brand-red" />
          <h1 className="text-xl font-bold text-white">Edit Akun — {account.badge}</h1>
        </div>
        <Link
          href="/admin"
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>
      </div>
      <AccountForm account={account} />
    </div>
  );
}
