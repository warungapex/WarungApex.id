-- Create accounts table
create table if not exists public.accounts (
  id            text primary key,
  rank          text        not null,
  tier_badge    text        not null,
  badge         text        not null,
  price         integer     not null,
  level         integer     not null,
  badges_tokens integer     not null default 0,
  coins         integer     not null default 0,
  skins         integer     not null default 0,
  featured      boolean     not null default false,
  sold          boolean     not null default false,
  platform      text,
  description   text,
  tags          text[]      default '{}',
  images        jsonb       default '[]',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.accounts enable row level security;

-- Public read policy (anyone can browse accounts)
create policy "accounts_public_read"
  on public.accounts
  for select
  to anon, authenticated
  using (true);

-- Trigger to auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger accounts_updated_at
  before update on public.accounts
  for each row execute function public.set_updated_at();

-- Seed initial data
insert into public.accounts (id, rank, tier_badge, badge, price, level, badges_tokens, coins, skins, featured, sold, platform, tags, description)
values
  (
    'a1', 'Master', 'MAST', 'Master 4K', 3100000, 290, 12, 12200, 144, true, false,
    'PC / PS4 / Xbox',
    array['Level 290', 'Heirloom Wraith', 'Heirloom Karambit'],
    E'✅ Setelah pembayaran kamu akan menerima:\n🏆 Full Access\n⭐ Tidak ada cheat atau bug\n⭐ Aman & Terpercaya\n\n✅ Informasi Tambahan:\n⭐ Level 290+\n⭐ Heirloom Wraith & Karambit\n⭐ 144 Skins Lengkap\n⭐ 12.200 Apex Coins'
  ),
  (
    'a2', 'Master', 'MAST', 'Heirloom Wraith', 6200000, 555, 9, 14700, 266, false, false,
    'PC / PS4 / Xbox',
    array['Level 555', 'Heirloom Wraith', 'Heirloom Loba', 'Heirloom BloodHound', 'Heirloom Gibraltar'],
    E'✅ Setelah pembayaran kamu akan menerima:\n🏆 Full Access\n⭐ Tidak ada cheat atau bug\n⭐ Aman & Terpercaya\n\n✅ Informasi Tambahan:\n⭐ Level 555+\n⭐ 5 Heirloom Lengkap\n⭐ 266 Skins\n⭐ 14.700 Apex Coins'
  ),
  (
    'a3', 'Diamond III', 'D3', 'Heirloom Power Sword', 1300000, 443, 6, 72100, 144, false, false,
    'PC / PS4 / Xbox',
    array['Level 443', 'Heirloom Power Sword'],
    E'✅ Setelah pembayaran kamu akan menerima:\n🏆 Full Access\n⭐ Tidak ada cheat atau bug\n⭐ Aman & Terpercaya\n\n✅ Informasi Tambahan:\n⭐ Level 443+\n⭐ Heirloom Power Sword\n⭐ 144 Skins\n⭐ 72.100 Apex Coins'
  )
on conflict (id) do nothing;
