import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getSnap, generateOrderId } from "@/lib/midtrans";

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();

    // 1. Verifikasi sesi user (server-side)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { account_id } = await request.json();
    if (!account_id || typeof account_id !== "string") {
      return NextResponse.json({ error: "account_id is required" }, { status: 400 });
    }

    // 2. Klaim akun secara atomik — gagal jika sudah terjual / diklaim user lain
    const { data: claimed } = await supabase
      .from("accounts")
      .update({ sold: true })
      .eq("id", account_id)
      .eq("sold", false)
      .select("id, badge, price")
      .single();

    if (!claimed) {
      return NextResponse.json({ error: "Akun sudah terjual" }, { status: 409 });
    }

    // 3. Buat transaksi Snap
    const orderId = generateOrderId();
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
    });

    // 4. Simpan order awal status 'pending'
    const { error: insertError } = await supabase.from("orders").insert({
      user_id: user.id,
      account_id: claimed.id,
      order_id_midtrans: orderId,
      snap_token: transaction.token,
      status: "pending",
      total_amount: claimed.price,
    });

    if (insertError) {
      console.error("[checkout] insert order failed:", insertError);
      return NextResponse.json({ error: "Gagal menyimpan pesanan" }, { status: 500 });
    }

    return NextResponse.json({
      snap_token: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: orderId,
    });
  } catch (err) {
    console.error("[checkout] error:", err);
    return NextResponse.json({ error: "Checkout gagal" }, { status: 500 });
  }
}
