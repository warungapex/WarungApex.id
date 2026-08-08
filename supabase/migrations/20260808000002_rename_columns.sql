-- Rename skins → legendary_skins
alter table public.accounts rename column skins to legendary_skins;

-- Rename badges_tokens → crafting_materials
alter table public.accounts rename column badges_tokens to crafting_materials;

-- Add new column crafting_materials_legends
alter table public.accounts
  add column if not exists crafting_materials_legends integer not null default 0;

-- Add images as text[] (replaces jsonb for cleaner typing)
alter table public.accounts
  alter column images type text[] using array(select jsonb_array_elements_text(images));

-- Update seed data with correct column names
update public.accounts set
  crafting_materials_legends = 0
where crafting_materials_legends is null;
