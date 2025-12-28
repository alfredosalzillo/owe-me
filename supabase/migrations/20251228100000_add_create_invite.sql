-- Migration to add create_invite RPC function

create or replace function public.create_invite(
    p_group_id uuid,
    p_email text default null
)
    returns public.group_invites
    language plpgsql
    security definer
    set search_path = public, pg_temp
as
$$
declare
    v_invite public.group_invites;
begin
    -- Check if the current user is an admin of the group
    if not public.is_group_admin(p_group_id) then
        raise exception 'Only group admins can create invites';
    end if;

    insert into public.group_invites (group_id, email, created_by)
    values (p_group_id, p_email, auth.uid())
    returning * into v_invite;

    return v_invite;
end;
$$;

-- GraphQL config for the function
comment on function public.create_invite(uuid, text) is e'@graphql({"name": "createInvite"})';
