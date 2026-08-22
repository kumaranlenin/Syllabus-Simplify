-- Syllabus Simplify database schema
-- Run this in the Supabase SQL editor, or via `supabase db push` with the CLI.

-- Extensions
create extension if not exists "uuid-ossp";

-- =========================================================
-- TABLES
-- =========================================================

create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade unique,
  name text not null default '',
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.syllabi (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  original_text text not null,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text not null default '',
  category text not null check (category in ('assignment', 'exam', 'lab', 'project', 'quiz')),
  event_date date not null,
  is_manual boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.processing_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null check (status in ('success', 'failed', 'retried')),
  tokens_used integer,
  created_at timestamptz not null default now()
);

-- =========================================================
-- INDEXES
-- =========================================================

create index if not exists events_user_id_idx on public.events (user_id);
create index if not exists events_event_date_idx on public.events (event_date);
create index if not exists syllabi_user_id_idx on public.syllabi (user_id);
create index if not exists processing_logs_user_id_idx on public.processing_logs (user_id);

-- =========================================================
-- ENABLE ROW LEVEL SECURITY
-- =========================================================

alter table public.profiles enable row level security;
alter table public.syllabi enable row level security;
alter table public.events enable row level security;
alter table public.processing_logs enable row level security;

-- =========================================================
-- POLICIES: profiles
-- =========================================================

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = user_id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = user_id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "profiles_delete_own" on public.profiles
  for delete using (auth.uid() = user_id);

-- =========================================================
-- POLICIES: syllabi
-- =========================================================

create policy "syllabi_select_own" on public.syllabi
  for select using (auth.uid() = user_id);

create policy "syllabi_insert_own" on public.syllabi
  for insert with check (auth.uid() = user_id);

create policy "syllabi_update_own" on public.syllabi
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "syllabi_delete_own" on public.syllabi
  for delete using (auth.uid() = user_id);

-- =========================================================
-- POLICIES: events
-- =========================================================

create policy "events_select_own" on public.events
  for select using (auth.uid() = user_id);

create policy "events_insert_own" on public.events
  for insert with check (auth.uid() = user_id);

create policy "events_update_own" on public.events
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "events_delete_own" on public.events
  for delete using (auth.uid() = user_id);

-- =========================================================
-- POLICIES: processing_logs
-- =========================================================

create policy "processing_logs_select_own" on public.processing_logs
  for select using (auth.uid() = user_id);

create policy "processing_logs_insert_own" on public.processing_logs
  for insert with check (auth.uid() = user_id);

create policy "processing_logs_update_own" on public.processing_logs
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "processing_logs_delete_own" on public.processing_logs
  for delete using (auth.uid() = user_id);

-- =========================================================
-- TRIGGERS
-- =========================================================

-- Create a profile row automatically whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep events.updated_at current on every update
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();
