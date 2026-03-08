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

create table if not exists public.categories (
  id text primary key,
  name text not null,
  description text not null,
  image text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  session_id text not null,
  id text not null,
  product_id text not null,
  quantity integer not null default 1,
  variant text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (session_id, id)
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

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists cart_items_set_updated_at on public.cart_items;
create trigger cart_items_set_updated_at
before update on public.cart_items
for each row execute function public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.cart_items enable row level security;

drop policy if exists "categories_public_rw" on public.categories;
create policy "categories_public_rw"
on public.categories
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "products_public_rw" on public.products;
create policy "products_public_rw"
on public.products
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "cart_items_public_rw" on public.cart_items;
create policy "cart_items_public_rw"
on public.cart_items
for all
to anon, authenticated
using (true)
with check (true);
