-- ── RBAC: tabel profiles dengan role 'user' | 'admin' ──
create table if not exists public.profiles (
  id         uuid        primary key references auth.users (id) on delete cascade,
  role       text        not null default 'user'
             check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- User hanya boleh membaca profilnya sendiri.
-- Tidak ada policy UPDATE/DELETE untuk user — promosi role hanya
-- lewat service role / Supabase Dashboard.
create policy "profiles_self_select"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

-- Auto-update updated_at (reuse fungsi dari migrasi accounts)
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Setiap user baru otomatis mendapat profile role 'user'
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill: user yang sudah ada sebelum migrasi
insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

-- ── Perbaikan lubang keamanan accounts ──
-- Policy lama memberi INSERT/UPDATE/DELETE bebas ke SEMUA authenticated user.
-- Diganti: hanya role 'admin'.
drop policy if exists accounts_admin_insert on public.accounts;
drop policy if exists accounts_admin_update on public.accounts;
drop policy if exists accounts_admin_delete on public.accounts;

create policy "accounts_admin_insert"
  on public.accounts for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "accounts_admin_update"
  on public.accounts for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "accounts_admin_delete"
  on public.accounts for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ── PROMOSI ADMIN (jalankan manual setelah migrasi, hapus email placeholder):
-- UPDATE public.profiles SET role = 'admin'
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'email-admin-mu@email.com');
