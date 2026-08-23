import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSnap, generateOrderId } from "@/lib/midtrans";

export async function POST(request: Request) {
  try {
    // 1. Verifikasi sesi user (server-side)
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { account_id } = await request.json();
    if (!account_id || typeof account_id !== "string") {
      return NextResponse.json({ error: "account_id is required" }, { status: 400 });
    }

    const admin = createAdminClient();

    // 2. Klaim akun secara atomik — gagal jika sudah terjual / diklaim user lain.
    // Pakai service role: update accounts dikunci RLS khusus admin, tapi klaim
    // checkout adalah aksi sistem yang sah (identitas user sudah diverifikasi di atas).
    const tryClaim = () =>
      admin
        .from("accounts")
        .update({ sold: true })
        .eq("id", account_id)
        .eq("sold", false)
        .select("id, badge, price")
        .single();

    let claimed = (await tryClaim()).data;

    if (!claimed) {
      // Klaim gagal. Jika penghalangnya order pending milik USER INI sendiri
      // (dia keluar dari Snap dan onClose tidak sempat terkirim), batalkan
      // order pending-nya lalu klaim ulang — user tidak boleh terkunci oleh
      // sisa percobaannya sendiri. Order pending milik user lain tetap mengunci
      // sampai settlement/expiry webhook melepasnya.
      await admin
        .from("orders")
        .update({ status: "cancel" })
        .eq("user_id", user.id)
        .eq("account_id", account_id)
        .eq("status", "pending");

      claimed = (await tryClaim()).data;
      if (!claimed) {
        return NextResponse.json({ error: "Akun sudah terjual" }, { status: 409 });
      }
    }

    // 3. Buat transaksi Snap + simpan order. Gagal di tahap ini = klaim dilepas,
    // supaya akun tidak nyangkut "terjual" tanpa pesanan.
    const orderId = generateOrderId();
    try {
      const snap = getSnap();
      const transaction = await snap.createTransaction({
        transaction_details: {
          order_id: orderId,
          gross_amount: claimed.price,
        },
        item_details: [
          {
            id: claimed.id,
            price: claimed.price,
            quantity: 1,
            name: claimed.badge.slice(0, 50),
          },
        ],
        customer_details: {
          email: user.email,
          first_name:
            (user.user_metadata?.full_name as string | undefined) ??
            (user.user_metadata?.name as string | undefined) ??
            user.email.split("@")[0],
        },
        // Jaring pengaman: kalau buyer tutup tab/browser total (onClose tidak
        // terkirim), klaim lepas otomatis lewat webhook expire maksimal 30 menit.
        expiry: { unit: "minutes", duration: 30 },
      });

      const { error: insertError } = await admin.from("orders").insert({
        user_id: user.id,
        account_id: claimed.id,
        order_id_midtrans: orderId,
        snap_token: transaction.token,
        status: "pending",
        total_amount: claimed.price,
      });

      if (insertError) {
        throw insertError;
      }

      return NextResponse.json({
        snap_token: transaction.token,
        redirect_url: transaction.redirect_url,
        order_id: orderId,
      });
    } catch (err) {
      console.error("[checkout] snap/order failed, melepas klaim:", err);
      await admin
        .from("accounts")
        .update({ sold: false })
        .eq("id", claimed.id)
        .eq("sold", true);
      return NextResponse.json({ error: "Checkout gagal" }, { status: 500 });
    }
  } catch (err) {
    console.error("[checkout] error:", err);
    return NextResponse.json({ error: "Checkout gagal" }, { status: 500 });
  }
}

/** Buyer keluar dari Snap tanpa membayar — batalkan order pending miliknya.
 *  Trigger SQL sync_account_on_order_status otomatis melepas accounts.sold. */
export async function DELETE(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { account_id } = await request.json();
    if (!account_id || typeof account_id !== "string") {
      return NextResponse.json({ error: "account_id is required" }, { status: 400 });
    }

    const admin = createAdminClient();
    console.info("[checkout/close] cek order pending:", user.id, account_id);
    const { data: order } = await admin
      .from("orders")
      .select("id")
      .eq("user_id", user.id)
      .eq("account_id", account_id)
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    // Tidak ada order pending (sudah dibayar / memang tidak ada) — tidak ada yang dilepas
    if (!order) {
      console.info("[checkout/close] tidak ada order pending untuk dilepas");
      return NextResponse.json({ released: false });
    }

    console.info("[checkout/close] membatalkan order:", order.id);
    const { error } = await admin
      .from("orders")
      .update({ status: "cancel" })
      .eq("id", order.id);
    if (error) throw error;

    return NextResponse.json({ released: true });
  } catch (err) {
    console.error("[checkout/close] error:", err);
    return NextResponse.json({ error: "Gagal melepas klaim" }, { status: 500 });
  }
}
