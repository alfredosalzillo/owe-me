-- Supabase migration: add helper function to check if a given profile row is the authenticated user

-- Function: public.is_me(profile)
-- Returns true if the provided profile record belongs to the authenticated user
create or replace function public._is_me(p public.profiles)
    returns boolean
    stable
    language sql
    security definer
    set search_path = public, pg_temp
as
$$
select p.id = auth.uid();
$$;
