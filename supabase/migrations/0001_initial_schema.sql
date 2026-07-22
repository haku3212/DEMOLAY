create extension if not exists "pgcrypto";

do $$
begin
  if to_regtype('public.business_status') is null then
    create type public.business_status as enum (
      'pending',
      'approved',
      'rejected',
      'suspended'
    );
  end if;
end;
$$;

create table if not exists public.business_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  owner_name text not null,
  business_name text not null,
  category text not null,
  specialty text not null,
  department text not null,
  city text not null,
  phone text not null,
  whatsapp text not null,
  description text not null,
  image_url text,
  image_path text,
  publish_authorization boolean not null default false,
  status public.business_status not null default 'pending',
  reviewed_at timestamptz,
  reviewed_by uuid,
  review_notes text
);

create index if not exists business_submissions_status_idx
on public.business_submissions (status);

create index if not exists business_submissions_created_at_idx
on public.business_submissions (created_at desc);

create index if not exists business_submissions_location_idx
on public.business_submissions (department, city);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists business_submissions_set_updated_at
on public.business_submissions;

create trigger business_submissions_set_updated_at
before update on public.business_submissions
for each row
execute function public.set_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'business-profile-images',
  'business-profile-images',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;
