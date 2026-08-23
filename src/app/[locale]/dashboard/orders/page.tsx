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
    <main className="relative min-h-screen bg-brand-dark overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 90% at 90% 0%, rgba(0,240,255,0.06), transparent 60%), radial-gradient(ellipse 60% 90% at 5% 100%, rgba(255,42,68,0.06), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-brand-cyan">
              <span className="h-px w-8 bg-brand-cyan/50" />
              Warung Apex
              <span className="h-px w-8 bg-brand-cyan/50" />
            </div>
            <h1 className="mt-3 font-[var(--font-display)] text-2xl md:text-4xl font-black tracking-widest text-[#f0f2f5]">
              {t("title")}
            </h1>
            <p className="mt-2 text-sm text-gray-400">{t("subtitle")}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 pt-1">
            <LocaleSwitcherModal />
            <UserMenu />
          </div>
        </div>

        <OrderList orders={orders} />
      </div>
    </main>
  );
}
