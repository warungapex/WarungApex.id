import { requireAdmin } from "@/lib/supabase/auth";
import { getAccount } from "@/lib/supabase/accounts";
import { AccountForm } from "@/components/admin/account-form";
import { notFound } from "next/navigation";

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
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-white mb-8">Edit Akun — {account.badge}</h1>
      <AccountForm account={account} />
    </div>
  );
}
