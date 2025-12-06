-- Supabase migration: initial schema for OweMe
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enum for debit mode
create type public.debit_mode as enum ('default', 'simplified');

-- Profiles table (maps auth.users -> app profile)
create table if not exists public.profiles
(
    id         uuid primary key references auth.users (id) on delete cascade,
    name       text,
    created_at timestamptz not null default now()
);

-- Groups
create table if not exists public.groups
(
    id               uuid primary key           default uuid_generate_v4(),
    name             text              not null,
    description      text,
    default_currency text              not null default 'EUR',
    debit_mode       public.debit_mode not null default 'default',
    created_at       timestamptz       not null default now(),
    created_by       uuid              not null references public.profiles (id)
);

-- Group members
create table if not exists public.group_members
(
    group_id  uuid        not null references public.groups (id) on delete cascade,
    user_id   uuid        not null references public.profiles (id) on delete cascade,
    role      text        not null default 'MEMBER', -- 'ADMIN' | 'MEMBER'
    joined_at timestamptz not null default now(),
    primary key (group_id, user_id)
);

-- Expenses (both standard and payment)
create table if not exists public.expenses
(
    id          uuid primary key     default uuid_generate_v4(),
    group_id    uuid        not null references public.groups (id) on delete cascade,
    type        text        not null,                 -- 'standard' | 'payment'
    description text,
    amount      numeric     not null,
    currency    text        not null,
    paid_by     uuid        not null references public.profiles (id),
    to_user     uuid references public.profiles (id), -- for payment type
    paid_at     timestamptz not null default now(),
    created_at  timestamptz not null default now(),
    created_by  uuid        not null references public.profiles (id),
    updated_at  timestamptz not null default now()
);

-- Expense splits (only for standard)
create table if not exists public.expense_splits
(
    expense_id uuid    not null references public.expenses (id) on delete cascade,
    user_id    uuid    not null references public.profiles (id) on delete cascade,
    amount     numeric not null,
    percentage numeric,
    primary key (expense_id, user_id)
);

-- RLS
alter table public.profiles
    enable row level security;
alter table public.groups
    enable row level security;
alter table public.group_members
    enable row level security;
alter table public.expenses
    enable row level security;
alter table public.expense_splits
    enable row level security;

-- Helper functions to avoid RLS recursion
create or replace function public.is_group_member(gid uuid)
    returns boolean
    language sql
    security definer
    set search_path = public, pg_temp
as $$
select exists(
    select 1
    from public.group_members gm
    where gm.group_id = gid
      and gm.user_id = auth.uid()
);
$$;

create or replace function public.is_group_admin(gid uuid)
    returns boolean
    language sql
    security definer
    set search_path = public, pg_temp
as $$
select exists(
    select 1
    from public.group_members gm
    where gm.group_id = gid
      and gm.user_id = auth.uid()
      and gm.role = 'ADMIN'
);
$$;

-- Policies
-- Profiles: user can read own profile and others' basic info; user can upsert own profile
create policy "Profiles are readable by authenticated users" on public.profiles
    for select using (auth.role() = 'authenticated');
create policy "Users can upsert their own profile" on public.profiles
    for insert with check (id = auth.uid());
create policy "Users can update their own profile" on public.profiles
    for update using (id = auth.uid()) with check (id = auth.uid());

-- Groups: members can select; creators can insert; members can update
create policy "Group select for members" on public.groups
    for select using (public.is_group_member(groups.id));
create policy "Group insert for authenticated users" on public.groups
    for insert with check (created_by = auth.uid());
create policy "Group update for admins" on public.groups
    for update using (public.is_group_admin(groups.id));

-- Group members: members can select; admins can insert/update/delete
create policy "Group members select for members" on public.group_members
    for select using (public.is_group_member(group_members.group_id));
create policy "Group members modify by admins" on public.group_members
    for all using (public.is_group_admin(group_members.group_id))
    with check (public.is_group_admin(group_members.group_id));

-- Expenses: members can select; members can insert; authors/admins can update
create policy "Expenses select for members" on public.expenses
    for select using (public.is_group_member(expenses.group_id));
create policy "Expenses insert for members" on public.expenses
    for insert with check (public.is_group_member(expenses.group_id));
create policy "Expenses update by creator or admin" on public.expenses
    for update using (
      created_by = auth.uid() or public.is_group_admin(expenses.group_id)
    );

-- Expense splits: follow expenses policy
create policy "Expense splits select for members" on public.expense_splits
    for select using (exists (
        select 1 from public.expenses e
        where e.id = expense_splits.expense_id
          and public.is_group_member(e.group_id)
    ));
create policy "Expense splits insert for members" on public.expense_splits
    for insert with check (exists (
        select 1 from public.expenses e
        where e.id = expense_splits.expense_id
          and public.is_group_member(e.group_id)
    ));
