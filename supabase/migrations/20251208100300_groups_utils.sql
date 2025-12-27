-- Supabase migration: helper + create_group() function
-- Adds a helper to ensure the caller is authenticated and a SQL function to
-- create a group and automatically add the caller as a member (ADMIN).

-- Function: create_group(name, description, debit_mode, default_currency)
-- Behavior:
--  - Inserts a row in public.groups with created_by = auth.uid()
--  - Inserts the creator into public.group_members as ADMIN
--  - Returns the created group record
create or replace function public.create_group(
    p_name text,
    p_description text default null,
    p_debit_mode public.debit_mode default null,
    p_default_currency text default null
) returns public.groups
    security definer
    language plpgsql
    volatile
    set search_path = ''
as
$$
declare
    v_uid   uuid := auth.uid();
    v_group public.groups;
begin
    insert into public.groups (name, description, debit_mode, default_currency, created_by)
    values (p_name,
            p_description,
            coalesce(p_debit_mode, 'default'::public.debit_mode),
            coalesce(p_default_currency, 'EUR'),
            v_uid)
    returning * into v_group;

    insert into public.group_members (group_id, user_id, role)
    values (v_group.id, v_uid, 'ADMIN');

    return v_group;
end;
$$;

-- Function: update_group(id, name, description, debit_mode, default_currency)
-- Behavior:
--  - Updates a group identified by its id, only if the caller is the creator
--    or an ADMIN member of that group
--  - Any NULL parameter keeps the existing value (via COALESCE)
--  - Returns the updated group record
create or replace function public.update_group(
    p_id uuid,
    p_name text,
    p_description text default null,
    p_debit_mode public.debit_mode default null,
    p_default_currency text default null
) returns public.groups
    security definer
    language plpgsql
    volatile
    set search_path = ''
as
$$
declare
    v_uid   uuid := auth.uid();
    v_group public.groups;
begin
    if v_uid is null then
        raise exception 'Not authenticated';
    end if;

    update public.groups g
    set name = coalesce(p_name, g.name),
        description = coalesce(p_description, g.description),
        debit_mode = coalesce(p_debit_mode, g.debit_mode),
        default_currency = coalesce(p_default_currency, g.default_currency)
    where g.id = p_id
      and (
        g.created_by = v_uid or exists (
            select 1 from public.group_members gm
            where gm.group_id = g.id and gm.user_id = v_uid and gm.role = 'ADMIN'
        )
      )
    returning * into v_group;

    if v_group.id is null then
        raise exception 'Group not found or insufficient permissions';
    end if;

    return v_group;
end;
$$;