-- Migration to add invites table

create table if not exists public.group_invites
(
    id         uuid primary key     default extensions.uuid_generate_v4(),
    group_id   uuid        not null references public.groups (id) on delete cascade,
    email      text, -- optional, if we want to restrict by email
    token      uuid        not null default extensions.uuid_generate_v4(),
    created_at timestamptz not null default now(),
    expires_at timestamptz not null default (now() + interval '7 days'),
    used_at    timestamptz,
    created_by uuid        not null references public.profiles (id),
    invited_user_id uuid references public.profiles (id) on delete cascade -- optional, if we invite a specific existing user
);

-- RLS
alter table public.group_invites enable row level security;

-- Policies
create policy "Admins can manage invites" on public.group_invites
    for all using (public.is_group_admin(group_id));

create policy "Anyone can view invite by token" on public.group_invites
    for select using (true); -- We'll filter by token in the application logic/query

-- GraphQL config
comment on table public.group_invites is e'@graphql({"name": "GroupInvite"})';

comment on constraint group_invites_group_id_fkey on public.group_invites is E'@graphql({"foreign_name": "group", "local_name": "invites", "nullable": false})';
comment on constraint group_invites_created_by_fkey on public.group_invites is E'@graphql({"foreign_name": "createdBy", "local_name": "invitesCreated", "nullable": false})';
comment on constraint group_invites_invited_user_id_fkey on public.group_invites is E'@graphql({"foreign_name": "invitedUser", "local_name": "invitesReceived", "nullable": true})';

-- Function to accept invite
create or replace function public.accept_invite(invite_token uuid)
    returns boolean
    language plpgsql
    security definer
    set search_path = public, pg_temp
as
$$
declare
    v_invite record;
begin
    -- 1. Find the invite
    select * into v_invite
    from public.group_invites
    where token = invite_token
      and used_at is null
      and expires_at > now();

    if not found then
        return false;
    end if;

    -- 1b. Check email restriction if applicable
    if v_invite.email is not null and v_invite.email != (select email from auth.users where id = auth.uid()) then
        return false;
    end if;

    -- 2. Check if user is already a member
    if exists (
        select 1 from public.group_members
        where group_id = v_invite.group_id
          and user_id = auth.uid()
    ) then
        -- Mark invite as used anyway or just return true?
        update public.group_invites
        set used_at = now()
        where id = v_invite.id;
        return true;
    end if;

    -- 3. Add user to group
    insert into public.group_members (group_id, user_id, role)
    values (v_invite.group_id, auth.uid(), 'MEMBER');

    -- 4. Mark invite as used
    update public.group_invites
    set used_at = now()
    where id = v_invite.id;

    return true;
end;
$$;
