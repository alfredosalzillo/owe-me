-- Supabase migration: add avatar_url to profiles and me() function

-- Add avatar_url to public.profiles
alter table public.profiles
    add column avatar_url text;

create policy "Authenticated users can upload their own avatar"
    on storage.objects
    for insert with check (
        auth.uid() is not null
    );

-- Function: public.me()
-- Returns the profile of the currently authenticated user
create or replace function public.me()
    returns public.profiles
    stable
    language sql
    security definer
    set search_path = public, pg_temp
as
$$
select *
from public.profiles
where id = auth.uid();
$$;
