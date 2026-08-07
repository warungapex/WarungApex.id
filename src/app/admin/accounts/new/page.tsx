import { requireAdmin } from "@/lib/supabase/auth";
import { AccountForm } from "@/components/admin/account-form";

export default async function NewAccountPage() {
  await requireAdmin();
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-white mb-8">Tambah Akun Baru</h1>
      <AccountForm />
    </div>
  );
}
