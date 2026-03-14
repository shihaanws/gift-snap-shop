-- Add subcategory to products for diaries: planner-diary, notebook-diary
alter table public.products
add column if not exists subcategory text;
