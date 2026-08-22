-- Tabel orders untuk checkout Midtrans Snap
create table if not exists public.orders (
  id                uuid        primary key default gen_random_uuid(),
  user_id           uuid        not null references auth.users (id) on delete cascade,
  account_id        text        not null references public.accounts (id) on delete cascade,
  snap_token        text,
  order_id_midtrans text        not null unique,
  status            text        not null default 'pending'
                    check (status in ('pending', 'settlement', 'expire', 'cancel', 'failed')),
  total_amount      numeric(12, 2) not null,
  credential_email    text,
  credential_password text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_account_id_idx on public.orders (account_id);

-- ── Row Level Security ──
alter table public.orders enable row level security;

-- User hanya bisa membaca pesanan miliknya sendiri
create policy "orders_owner_select"
  on public.orders for select
  to authenticated
  using (auth.uid() = user_id);

-- User hanya bisa membuat pesanan atas nama dirinya sendiri
create policy "orders_owner_insert"
  on public.orders for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Tidak ada policy UPDATE/DELETE untuk user — status hanya diubah
-- oleh webhook Midtrans via service role (bypass RLS).

-- Auto-update updated_at (reuse fungsi dari migrasi accounts)
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ── Sinkronisasi otomatis accounts.sold ──
-- settlement -> akun terjual; cancel/deny/expire/failed -> akun kembali tersedia
-- (kecuali sudah ada order lain yang settlement untuk akun yang sama).
create or replace function public.sync_account_on_order_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'settlement' then
    update public.accounts set sold = true where id = new.account_id;
  elsif new.status in ('cancel', 'deny', 'expire', 'failed') then
    update public.accounts a
    set sold = false
    where a.id = new.account_id
      and not exists (
        select 1 from public.orders o
        where o.account_id = new.account_id
          and o.status = 'settlement'
          and o.id <> new.id
      );
  end if;
  return new;
end;
$$;

create trigger orders_sync_account
  after update of status on public.orders
  for each row
  when (old.status is distinct from new.status)
  execute function public.sync_account_on_order_status();
