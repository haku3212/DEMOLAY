do $$
begin
  if to_regtype('public.profile_report_status') is null then
    create type public.profile_report_status as enum (
      'pending',
      'reviewed',
      'dismissed'
    );
  end if;
end;
$$;

create table if not exists public.profile_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  profile_id uuid not null,
  profile_name text not null,
  profile_slug text not null,
  reporter_name text,
  reporter_contact text,
  reason text not null,
  status public.profile_report_status not null default 'pending',
  reviewed_at timestamptz
);

create index if not exists profile_reports_status_idx
on public.profile_reports (status);

create index if not exists profile_reports_created_at_idx
on public.profile_reports (created_at desc);

create index if not exists profile_reports_profile_id_idx
on public.profile_reports (profile_id);
