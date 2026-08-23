"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  CheckCircle2,
  Clock,
  XCircle,
  KeyRound,
  MessageCircle,
  X,
  PackageSearch,
} from "lucide-react";

type Order = {
  id: string;
  orderId: string;
  status: string;
  total: number;
  createdAt: string;
  credentialEmail: string | null;
  credentialPassword: string | null;
  accountName: string;
};

type Filter = "all" | "settlement" | "pending";

const STATUS_META: Record<
  string,
  { labelKey: string; chip: string; accent: string; icon: typeof Clock }
> = {
  pending: {
    labelKey: "statusPending",
    chip: "text-amber-300 border-amber-400/30 bg-amber-400/10",
    accent: "border-l-amber-400/60",
    icon: Clock,
  },
  settlement: {
    labelKey: "statusSettlement",
    chip: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
    accent: "border-l-emerald-400/60",
    icon: CheckCircle2,
  },
  failed: {
    labelKey: "statusFailed",
    chip: "text-red-300 border-red-400/30 bg-red-400/10",
    accent: "border-l-red-400/60",
    icon: XCircle,
  },
  cancel: {
    labelKey: "statusCancel",
    chip: "text-gray-400 border-white/15 bg-white/5",
    accent: "border-l-white/30",
    icon: XCircle,
  },
  expire: {
    labelKey: "statusExpire",
    chip: "text-gray-400 border-white/15 bg-white/5",
    accent: "border-l-white/30",
    icon: XCircle,
  },
};

const CLAIM_STEPS_KEY = ["step1", "step2", "step3", "step4"] as const;

function formatIDR(n: number) {
  return n.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

export function OrderList({ orders }: { orders: Order[] }) {
  const t = useTranslations("orders");
  const [claimOrder, setClaimOrder] = useState<Order | null>(null);
  const [checked, setChecked] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: orders.length,
      settlement: orders.filter((o) => o.status === "settlement").length,
      pending: orders.filter((o) => o.status === "pending").length,
    }),
    [orders],
  );

  const visible = useMemo(
    () =>
      filter === "all"
        ? orders
        : orders.filter((o) => o.status === filter),
    [orders, filter],
  );

  if (orders.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-14 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-cyan/30 bg-brand-cyan/10">
          <PackageSearch className="h-6 w-6 text-brand-cyan" />
        </div>
        <p className="text-sm text-gray-400">{t("empty")}</p>
        <Link
          href="/catalog"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-cyan px-6 py-2.5 text-xs font-bold text-gray-900 transition hover:brightness-110"
        >
          {t("browseCatalog")}
        </Link>
      </div>
    );
  }

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: t("filterAll"), count: counts.all },
    { key: "settlement", label: t("statusSettlement"), count: counts.settlement },
    { key: "pending", label: t("statusPending"), count: counts.pending },
  ];

  return (
    <>
      {/* Filter status */}
      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
              filter === f.key
                ? "border-white bg-white text-gray-900"
                : "border-white/15 bg-white/[0.03] text-gray-400 hover:border-white/30 hover:text-white"
            }`}
          >
            {f.label}
            <span className={filter === f.key ? "text-gray-500" : "text-gray-600"}>
              {" "}
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Daftar pesanan */}
      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-gray-500">
          {t("empty")}
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((o) => (
            <OrderCard key={o.id} order={o} onClaim={() => setClaimOrder(o)} />
          ))}
        </div>
      )}

      {/* Claim modal */}
      {claimOrder && (
        <ClaimModal
          order={claimOrder}
          checked={checked}
          onToggle={(i) =>
            setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))
          }
          onClose={() => {
            setClaimOrder(null);
            setChecked([]);
          }}
        />
      )}
    </>
  );

  function OrderCard({ order, onClaim }: { order: Order; onClaim: () => void }) {
    const meta = STATUS_META[order.status] ?? STATUS_META.pending;
    const Icon = meta.icon;
    return (
      <article
        className={`relative overflow-hidden rounded-2xl border border-white/10 border-l-2 ${meta.accent} bg-white/[0.03] p-5 transition hover:border-white/25 hover:bg-white/[0.05]`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">{order.accountName}</h3>
            <p className="mt-1 truncate font-mono text-[11px] text-gray-500">
              {order.orderId}
            </p>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${meta.chip}`}
          >
            <Icon className="h-3 w-3" />
            {t(meta.labelKey)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/5 pt-3">
          <div>
            <p className="font-[var(--font-display)] text-lg font-bold tracking-wide text-white">
              {formatIDR(order.total)}
            </p>
            <p className="mt-0.5 text-[11px] text-gray-500">{order.createdAt}</p>
          </div>
          {order.status === "settlement" && (
            <button
              onClick={onClaim}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-brand-cyan/40 bg-brand-cyan/10 px-3.5 py-2 text-xs font-semibold text-brand-cyan transition hover:bg-brand-cyan/20"
            >
              <KeyRound className="h-3.5 w-3.5" />
              {t("claim")}
            </button>
          )}
        </div>
      </article>
    );
  }

  function ClaimModal({
    order,
    checked,
    onToggle,
    onClose,
  }: {
    order: Order;
    checked: number[];
    onToggle: (i: number) => void;
    onClose: () => void;
  }) {
    const waText = encodeURIComponent(
      `Halo Admin Warung Apex, saya butuh bantuan verifikasi OTP untuk pesanan ${order.orderId}`,
    );
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative max-h-[90vh] w-full max-w-md space-y-5 overflow-y-auto rounded-2xl border border-white/10 bg-[#101018] p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-1">
            <h2 className="pr-8 text-base font-bold text-white">{t("claimTitle")}</h2>
            <p className="font-mono text-[11px] text-gray-500">{order.orderId}</p>
          </div>

          {/* Kredensial */}
          <div className="space-y-2.5 rounded-xl border border-brand-cyan/25 bg-brand-cyan/[0.05] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-cyan">
              <KeyRound className="h-4 w-4" />
              {t("credentials")}
            </div>
            <CredentialField label={t("credentialEmail")} value={order.credentialEmail} />
            <CredentialField label={t("credentialPassword")} value={order.credentialPassword} secret />
          </div>

          {/* Checklist serah terima */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-300">{t("stepsTitle")}</p>
            {CLAIM_STEPS_KEY.map((key, i) => (
              <label
                key={key}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition ${
                  checked.includes(i)
                    ? "border-emerald-400/40 bg-emerald-400/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked.includes(i)}
                  onChange={() => onToggle(i)}
                  className="accent-emerald-400"
                />
                <span className={`text-xs ${checked.includes(i) ? "text-emerald-300 line-through" : "text-gray-200"}`}>
                  {t(key)}
                </span>
              </label>
            ))}
          </div>

          {/* Support */}
          <a
            href={`https://wa.me/6285167202134?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a]"
          >
            <MessageCircle className="h-4 w-4" />
            {t("support")}
          </a>
        </div>
      </div>
    );
  }

  function CredentialField({
    label,
    value,
    secret,
  }: {
    label: string;
    value: string | null;
    secret?: boolean;
  }) {
    const [shown, setShown] = useState(false);
    return (
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="shrink-0 text-gray-400">{label}</span>
        <span className="break-all text-right font-mono text-white">
          {!value ? t("credentialPending") : secret && !shown ? "••••••••" : value}
        </span>
        {value && secret && (
          <button onClick={() => setShown(!shown)} className="shrink-0 text-brand-cyan hover:underline">
            {shown ? t("hide") : t("show")}
          </button>
        )}
      </div>
    );
  }
}
