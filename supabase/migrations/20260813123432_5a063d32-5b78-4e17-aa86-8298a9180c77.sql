-- Roles
create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "Users can read their own roles"
on public.user_roles for select to authenticated
using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Bootstrap: the very first authenticated user can claim admin, once.
create or replace function public.claim_first_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    return false;
  end if;
  if exists (select 1 from public.user_roles where role = 'admin') then
    return false;
  end if;
  insert into public.user_roles (user_id, role) values (uid, 'admin')
  on conflict do nothing;
  return true;
end;
$$;

grant execute on function public.claim_first_admin() to authenticated;

-- updated_at helper
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Orders enrichment
alter table public.orders
  add column if not exists source text not null default '',
  add column if not exists file_paths text[] not null default '{}'::text[],
  add column if not exists updated_at timestamptz not null default now();

alter table public.design_requests
  add column if not exists source text not null default '',
  add column if not exists address text not null default '',
  add column if not exists quantity integer not null default 1,
  add column if not exists updated_at timestamptz not null default now();

drop trigger if exists update_orders_updated_at on public.orders;
create trigger update_orders_updated_at
before update on public.orders
for each row execute function public.update_updated_at_column();

drop trigger if exists update_design_requests_updated_at on public.design_requests;
create trigger update_design_requests_updated_at
before update on public.design_requests
for each row execute function public.update_updated_at_column();

-- Normalise statuses to the new workflow
update public.orders set status = 'new'
where status not in ('new','confirmed','preparing','shipped','delivered','cancelled');

update public.design_requests set status = 'new'
where status not in ('new','confirmed','preparing','shipped','delivered','cancelled');

alter table public.orders alter column status set default 'new';
alter table public.design_requests alter column status set default 'new';