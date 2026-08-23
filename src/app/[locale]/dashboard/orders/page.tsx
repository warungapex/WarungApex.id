import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/auth/user-menu";
import { LocaleSwitcherModal } from "@/components/ui/locale-switcher-modal";
import { OrderList } from "@/components/orders/order-list";

export const dynamic = "force-dynamic";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login?redirectTo=/dashboard/orders`);
  }

  // Join nama akun untuk ditampilkan di daftar pesanan
  const { data: rows } = await supabase
    .from("orders")
    .select(
      "id, order_id_midtrans, status, total_amount, created_at, credential_email, credential_password, accounts(badge)",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const t = await getTranslations({ locale, namespace: "orders" });
  const dateLocale = locale === "en" ? "en-US" : "id-ID";

  const orders = (rows ?? []).map((r) => ({
    id: r.id as string,
    orderId: r.order_id_midtrans,
    status: r.status,
    total: Number(r.total_amount),
    createdAt: new Date(r.created_at).toLocaleDateString(dateLocale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    credentialEmail: r.credential_email ?? null,
    credentialPassword: r.credential_password ?? null,
    accountName:
      (r.accounts as { badge: string } | null)?.badge ?? "-",
  }));

  return (
    <main className="min-h-screen bg-brand-dark">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-white">{t("title")}</h1>
          <div className="flex items-center gap-3">
            <LocaleSwitcherModal />
            <UserMenu />
          </div>
        </div>

        <OrderList
          orders={orders}
          labels={{
            empty: t("empty"),
            colOrder: t("colOrder"),
            colAccount: t("colAccount"),
            colDate: t("colDate"),
            colTotal: t("colTotal"),
            colStatus: t("colStatus"),
            claim: t("claim"),
          }}
        />
      </div>
    </main>
  );
}
