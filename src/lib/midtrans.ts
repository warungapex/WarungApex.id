import { Snap } from "midtrans-client";

let snapClient: Snap | null = null;

/** Server-only Midtrans Snap client. Jangan import di client component. */
export function getSnap(): Snap {
  if (snapClient) return snapClient;

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

  if (!serverKey || !clientKey) {
    throw new Error("Missing MIDTRANS_SERVER_KEY or NEXT_PUBLIC_MIDTRANS_CLIENT_KEY");
  }

  snapClient = new Snap({ isProduction, serverKey, clientKey });
  return snapClient;
}

/** order_id unik, contoh: WA-APEX-1724400000000-K7Q2XZ */
export function generateOrderId(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `WA-APEX-${Date.now()}-${rand}`;
}
