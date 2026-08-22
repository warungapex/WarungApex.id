"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  Clock,
  XCircle,
  KeyRound,
  MessageCircle,
  X,
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

const STATUS_STYLES: Record<string, { labelKey: string; className: string; icon: React.ReactNode }> = {
  pending: {
    labelKey: "statusPending",
    className: "bg-amber-400/10 text-amber-300 border-amber-400/30",
    icon: <Clock className="w-3 h-3" />,
  },
  settlement: {
    labelKey: "statusSettlement",
    className: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  failed: {
    labelKey: "statusFailed",
    className: "bg-red-400/10 text-red-300 border-red-400/30",
    icon: <XCircle className="w-3 h-3" />,
  },
  cancel: {
    labelKey: "statusCancel",
    className: "bg-gray-400/10 text-gray-300 border-gray-400/30",
    icon: <XCircle className="w-3 h-3" />,
  },
  expire: {
    labelKey: "statusExpire",
    className: "bg-gray-400/10 text-gray-300 border-gray-400/30",
    icon: <XCircle className="w-3 h-3" />,
  },
};

const CLAIM_STEPS_KEY = [
  "step1",
  "step2",
  "step3",
  "step4",
] as const;

function formatIDR(n: number) {
  return n.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

export function OrderList({
  orders,
  labels,
}: {
  orders: Order[];
  labels: Record<string, string>;
}) {
  const t = useTranslations("orders");
  const [claimOrder, setClaimOrder] = useState<Order | null>(null);
  const [checked, setChecked] = useState<number[]>([]);

  if (orders.length === 0) {
    return (
      <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-12 text-center">
        <p className="text-sm text-gray-400">{labels.empty}</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.04] text-left text-xs text-gray-400 uppercase tracking-wide">
              <th className="px-5 py-4 font-semibold">{labels.colOrder}</th>
              <th className="px-5 py-4 font-semibold">{labels.colAccount}</th>
              <th className="px-5 py-4 font-semibold">{labels.colDate}</th>
              <th className="px-5 py-4 font-semibold">{labels.colTotal}</th>
              <th className="px-5 py-4 font-semibold">{labels.colStatus}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((o) => (
              <OrderRow key={o.id} order={o} labels={labels} onClaim={() => setClaimOrder(o)} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="border border-white/10 rounded-2xl bg-white/[0.03] p-4 space-y-2.5">
            <OrderRowMobile order={o} labels={labels} onClaim={() => setClaimOrder(o)} />
          </div>
        ))}
      </div>

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

  function OrderRow({
    order,
    onClaim,
  }: {
    order: Order;
    labels: Record<string, string>;
    onClaim: () => void;
  }) {
    return (
      <tr className="hover:bg-white/[0.02] transition">
        <td className="px-5 py-4 font-mono text-xs text-gray-300">{order.orderId}</td>
        <td className="px-5 py-4 font-semibold text-white">{order.accountName}</td>
        <td className="px-5 py-4 text-gray-400">{order.createdAt}</td>
        <td className="px-5 py-4 font-semibold text-white">{formatIDR(order.total)}</td>
        <td className="px-5 py-4">
          <StatusBadge status={order.status} />
          {order.status === "settlement" && (
            <button
              onClick={onClaim}
              className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-cyan/10 border border-brand-cyan/40 text-brand-cyan text-xs font-semibold hover:bg-brand-cyan/20 transition"
            >
              <KeyRound className="w-3.5 h-3.5" />
              {t("claim")}
            </button>
          )}
        </td>
      </tr>
    );
  }

  function OrderRowMobile({
    order,
    onClaim,
  }: {
    order: Order;
    labels: Record<string, string>;
    onClaim: () => void;
  }) {
    return (
      <>
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-[11px] text-gray-400">{order.orderId}</span>
          <StatusBadge status={order.status} />
        </div>
        <div className="text-sm font-semibold text-white">{order.accountName}</div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{order.createdAt}</span>
          <span className="font-semibold text-white">{formatIDR(order.total)}</span>
        </div>
        {order.status === "settlement" && (
          <button
            onClick={onClaim}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-brand-cyan/10 border border-brand-cyan/40 text-brand-cyan text-xs font-semibold hover:bg-brand-cyan/20 transition"
          >
            <KeyRound className="w-3.5 h-3.5" />
            {t("claim")}
          </button>
        )}
      </>
    );
  }

  function StatusBadge({ status }: { status: string }) {
    const s = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold capitalize ${s.className}`}
      >
        {s.icon}
        {t(s.labelKey)}
      </span>
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
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#101018] p-6 space-y-5 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-1">
            <h2 className="text-base font-bold text-white pr-8">{t("claimTitle")}</h2>
            <p className="font-mono text-[11px] text-gray-500">{order.orderId}</p>
          </div>

          {/* Kredensial */}
          <div className="rounded-xl border border-brand-cyan/25 bg-brand-cyan/[0.05] p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-cyan">
              <KeyRound className="w-4 h-4" />
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition ${
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
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-sm font-bold hover:bg-[#20bd5a] transition"
          >
            <MessageCircle className="w-4 h-4" />
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
        <span className="text-gray-400 shrink-0">{label}</span>
        <span className="font-mono text-white break-all text-right">
          {!value ? t("credentialPending") : secret && !shown ? "••••••••" : value}
        </span>
        {value && secret && (
          <button onClick={() => setShown(!shown)} className="text-brand-cyan hover:underline shrink-0">
            {shown ? t("hide") : t("show")}
          </button>
        )}
      </div>
    );
  }
}
