import { requireAdmin } from "@/lib/supabase/auth";
import { getAccounts } from "@/lib/supabase/accounts";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminPage() {
  await requireAdmin();
  const accounts = await getAccounts();

  return <AdminDashboard accounts={accounts} />;
}
