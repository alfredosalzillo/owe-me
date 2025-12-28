-- Function to get invite by token
create or replace function public.invite_by_token(p_token uuid)
    returns public.group_invites
    language sql
    security definer
    set search_path = public, pg_temp
    stable
as
$$
select *
from public.group_invites
where token = p_token
  and used_at is null
  and expires_at > now();
$$;
