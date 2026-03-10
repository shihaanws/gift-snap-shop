-- Ensure products table exists with images column and updated_at trigger
create extension if not exists "pgcrypto";

create table if not exists public.products (
  id text primary key,
  name text not null,
  price numeric not null,
  description text not null,
  category text not null,
  images jsonb not null default '[]'::jsonb,
  variants jsonb,
  currency text,
  gst_rate numeric,
  list_price numeric,
  discount_percent numeric,
  available_colors jsonb,
  product_code text,
  material text,
  packing_type text,
  master_carton text,
  customized text,
  min_order_qty integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- RLS and permissive policy (match other tables)
alter table public.products enable row level security;

drop policy if exists "products_public_rw" on public.products;
create policy "products_public_rw"
on public.products
for all
to anon, authenticated
using (true)
with check (true);
