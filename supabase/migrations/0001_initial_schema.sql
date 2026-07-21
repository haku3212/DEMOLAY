create extension if not exists "pgcrypto";

create type public.business_status as enum (
  'pending',
  'approved',
  'rejected',
  'suspended'
);

create table public.business_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  owner_name text not null check (char_length(owner_name) >= 3),
  business_name text not null check (char_length(business_name) >= 3),
  category text not null,
  specialty text not null,
  department text not null,
  city text not null,
  phone text not null,
  whatsapp text not null,
  description text not null,
  image_url text,
  image_path text,
  authorization boolean not null default false,
  status public.business_status not null default 'pending',
  reviewed_at timestamptz,
  reviewed_by uuid,
  review_notes text
);

create index business_submissions_status_idx on public.business_submissions (status);
create index business_submissions_created_at_idx on public.business_submissions (created_at desc);
create index business_submissions_location_idx on public.business_submissions (department, city);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger business_submissions_set_updated_at
before update on public.business_submissions
for each row
execute function public.set_updated_at();

alter table public.business_submissions enable row level security;

create policy "Anyone can create pending submissions"
on public.business_submissions
for insert
to anon, authenticated
with check (
  authorization = true
  and status = 'pending'
);

create policy "Authenticated users can read submissions"
on public.business_submissions
for select
to authenticated
using (true);

create policy "Authenticated users can review submissions"
on public.business_submissions
for update
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'business-profile-images',
  'business-profile-images',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

create policy "Anyone can upload profile images"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'business-profile-images');

create policy "Anyone can view profile images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'business-profile-images');
