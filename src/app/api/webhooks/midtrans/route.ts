import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/supabase/types";

type MidtransNotification = {
  order_id?: string;
  status_code?: string;
  gross_amount?: string;
  signature_key?: string;
  transaction_status?: string;
  fraud_status?: string;
};

type OrderStatus = Database["public"]["Tables"]["orders"]["Update"]["status"];

/** Pemetaan status Midtrans -> status internal. undefined = biarkan (pending). */
function mapStatus(
  transactionStatus: string,
  fraudStatus?: string,
): OrderStatus | undefined {
  switch (transactionStatus) {
    case "capture":
      return fraudStatus === "accept" ? "settlement" : fraudStatus === "deny" ? "failed" : undefined;
    case "settlement":
      return "settlement";
    case "cancel":
      return "cancel";
    case "deny":
      return "failed";
    case "expire":
      return "expire";
    default:
      return undefined;
  }
}

export async function POST(request: Request) {
  let body: MidtransNotification;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { order_id, status_code, gross_amount, signature_key } = body;
  if (!order_id || !signature_key || !status_code || !gross_amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // 1. Verifikasi signature: SHA512(order_id + status_code + gross_amount + ServerKey)
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    console.error("[webhook] MIDTRANS_SERVER_KEY not set");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const expected = createHash("sha512")
    .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
    .digest("hex");

  if (expected !== signature_key) {
    console.warn(`[webhook] invalid signature for ${order_id}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  // 2. Cari order
  const admin = createAdminClient();
  const { data: order } = await admin
    .from("orders")
    .select("id, status")
    .eq("order_id_midtrans", order_id)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // 3. Update status bila berbeda; trigger SQL menyinkronkan accounts.sold
  const newStatus = mapStatus(body.transaction_status ?? "", body.fraud_status);
  if (newStatus && newStatus !== order.status) {
    const { error } = await admin
      .from("orders")
      .update({ status: newStatus })
      .eq("id", order.id);
    if (error) {
      console.error("[webhook] update failed:", error);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
