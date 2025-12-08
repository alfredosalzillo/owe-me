-- Seed data for OweMe
-- This script is idempotent and can be safely re-run.
-- It creates a few auth users, corresponding profiles, a sample group,
-- memberships, expenses and expense splits.

begin;

-- Create or ensure local auth users exist (email/password) without using auth.create_user
-- Note: Creating users via SQL is intended for local development only.
-- We set email_confirmed_at and encrypted_password so the credentials work immediately.
-- Important: Do NOT use ON CONFLICT on auth.users(email) — in GoTrue email alone is not uniquely
-- constrained in all setups. We instead use WHERE NOT EXISTS to keep this idempotent across versions.
with desired as (select *
                 from (values ('alice@example.com'::text, 'Password123!'::text, 'Alice Anderson'::text),
                              ('bob@example.com', 'Password123!', 'Bob Brown'),
                              ('carol@example.com', 'Password123!', 'Carol Clark')) as v(email, pwd, full_name)),
     inserted_users as (
         insert into auth.users (
                                 id,
                                 instance_id,
                                 role,
                                 aud,
                                 email,
                                 confirmation_token,
                                 encrypted_password,
                                 email_confirmed_at,
                                 last_sign_in_at,
                                 created_at,
                                 updated_at,
                                 is_super_admin,
                                 raw_app_meta_data,
                                 raw_user_meta_data,
                                 is_sso_user,
                                 email_change,
                                 email_change_token_new,
                                 recovery_token
             )
             select extensions.gen_random_uuid()                                                    as id,
                    '00000000-0000-0000-0000-000000000000'::uuid                                    as instance_id,
                    'authenticated'                                                                 as role,
                    'authenticated'                                                                 as aud,
                    d.email,
                    ''                                                                              as confirmation_token,
                    extensions.crypt(d.pwd, extensions.gen_salt('bf'))                              as encrypted_password,
                    now()                                                                           as email_confirmed_at,
                    now()                                                                           as last_sign_in_at,
                    now()                                                                           as created_at,
                    now()                                                                           as updated_at,
                    false                                                                           as is_super_admin,
                    jsonb_build_object('provider', 'email', 'providers',
                                       to_jsonb(array ['email']))                                   as raw_app_meta_data,
                    jsonb_build_object('name', d.full_name)                                         as raw_user_meta_data,
                    false                                                                           as is_sso_user,
                    ''                                                                              as email_change,
                    ''                                                                              as email_change_token_new,
                    ''                                                                              as recovery_token
             from desired d
             where not exists (select 1
                               from auth.users u
                               where u.email = d.email)
             returning id, email),
     all_users as (select iu.id, iu.email
                   from inserted_users iu
                   union all
                   select u.id, u.email
                   from auth.users u
                   where u.email in (select email
                                     from desired)),
     inserted_identities as (
         insert into auth.identities (
                                      id,
                                      provider,
                                      provider_id,
                                      user_id,
                                      identity_data,
                                      last_sign_in_at,
                                      created_at,
                                      updated_at
             )
             select extensions.gen_random_uuid() as id,
                    'email'                      as provider,
                    au.email                     as provider_id,
                    au.id                        as user_id,
                    jsonb_build_object(
                            'sub', au.id::text,
                            'email', au.email,
                            'email_verified', true,
                            'phone_verified', false
                    )                            as identity_data,
                    now(),
                    now(),
                    now()
             from all_users au
                      left join auth.identities ai on ai.user_id = au.id and ai.provider = 'email'
             where ai.id is null
             returning user_id),
     ids as (select (select id from all_users where email = 'alice@example.com') as alice_id,
                    (select id from all_users where email = 'bob@example.com')   as bob_id,
                    (select id from all_users where email = 'carol@example.com') as carol_id)
-- Upsert profiles for these users
insert
into public.profiles (id, name)
select alice_id, 'Alice Anderson'
from ids
union all
select bob_id, 'Bob Brown'
from ids
union all
select carol_id, 'Carol Clark'
from ids
on conflict (id) do update set name = excluded.name;

-- Predefined UUIDs for deterministic seeding
-- Groups
-- Ski Trip group
with const as (select '11111111-1111-4111-8111-111111111111'::uuid as ski_group_id,
                      '22222222-2222-4222-8222-222222222222'::uuid as bbq_group_id),
     ids as (select *
             from const,
                  (select (select id from auth.users where email = 'alice@example.com') as alice_id,
                          (select id from auth.users where email = 'bob@example.com')   as bob_id,
                          (select id from auth.users where email = 'carol@example.com') as carol_id) u)
insert
into public.groups (id, name, description, default_currency, debit_mode, created_by)
select ski_group_id, 'Ski Trip', 'Ski weekend with friends', 'EUR', 'default'::debit_mode, alice_id
from ids
union all
select bbq_group_id, 'Family BBQ', 'BBQ event planning', 'EUR', 'default'::debit_mode, bob_id
from ids
on conflict (id) do nothing;

-- Group members
with const as (select '11111111-1111-4111-8111-111111111111'::uuid as ski_group_id,
                      '22222222-2222-4222-8222-222222222222'::uuid as bbq_group_id),
     ids as (select *
             from const,
                  (select (select id from auth.users where email = 'alice@example.com') as alice_id,
                          (select id from auth.users where email = 'bob@example.com')   as bob_id,
                          (select id from auth.users where email = 'carol@example.com') as carol_id) u)
insert
into public.group_members (group_id, user_id, role)
select ski_group_id, alice_id, 'ADMIN'
from ids
union all
select ski_group_id, bob_id, 'MEMBER'
from ids
union all
select ski_group_id, carol_id, 'MEMBER'
from ids
union all
select bbq_group_id, bob_id, 'ADMIN'
from ids
on conflict (group_id, user_id) do update set role = excluded.role;

-- Expenses for Ski Trip group
with ids as (select '11111111-1111-4111-8111-111111111111'::uuid                  as ski_group_id,
                    (select id from auth.users where email = 'alice@example.com') as alice_id,
                    (select id from auth.users where email = 'bob@example.com')   as bob_id,
                    (select id from auth.users where email = 'carol@example.com') as carol_id)
-- Multiple standard expenses and two payment transfers
insert
into public.expenses (id, group_id, type, split_type, description, amount, currency, paid_by, to_user, paid_at,
                      created_by, updated_at)
select 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'EQUAL'::public.split_type,
       'Dinner at mountain hut',
       90.00,
       'EUR',
       alice_id,
       cast(null as uuid),
       now(),
       alice_id,
       now()
from ids
union all
select 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'PERCENTAGE'::public.split_type,
       'Taxi to cabin',
       30.00,
       'EUR',
       bob_id,
       cast(null as uuid),
       now(),
       bob_id,
       now()
from ids
union all
select 'cccccccc-cccc-4ccc-8ccc-cccccccccccc'::uuid,
       ski_group_id,
       'payment'::public.expense_type,
       null,
       'Bob paid Alice back',
       20.00,
       'EUR',
       bob_id,
       alice_id,
       now(),
       bob_id,
       now()
from ids
union all
select 'dddddddd-dddd-4ddd-8ddd-dddddddddddd'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'EQUAL'::public.split_type,
       'Breakfast at cafe',
       24.00,
       'EUR',
       carol_id,
       cast(null as uuid),
       now(),
       carol_id,
       now()
from ids
union all
select 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'EQUAL'::public.split_type,
       'Ski passes',
       180.00,
       'EUR',
       alice_id,
       cast(null as uuid),
       now(),
       alice_id,
       now()
from ids
union all
select 'ffffffff-ffff-4fff-8fff-ffffffffffff'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'EQUAL'::public.split_type,
       'Groceries',
       45.00,
       'EUR',
       bob_id,
       cast(null as uuid),
       now(),
       bob_id,
       now()
from ids
union all
select '11111111-aaaa-4aaa-8aaa-111111111111'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'EQUAL'::public.split_type,
       'Coffee break',
       9.00,
       'EUR',
       carol_id,
       cast(null as uuid),
       now(),
       carol_id,
       now()
from ids
union all
select '22222222-bbbb-4bbb-8bbb-222222222222'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'PERCENTAGE'::public.split_type,
       'Gas for the trip',
       60.00,
       'EUR',
       alice_id,
       cast(null as uuid),
       now(),
       alice_id,
       now()
from ids
union all
select '33333333-cccc-4ccc-8ccc-333333333333'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'EQUAL'::public.split_type,
       'Snacks',
       12.00,
       'EUR',
       bob_id,
       cast(null as uuid),
       now(),
       bob_id,
       now()
from ids
union all
select '44444444-dddd-4ddd-8ddd-444444444444'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'EQUAL'::public.split_type,
       'Lift tickets top-up',
       60.00,
       'EUR',
       alice_id,
       cast(null as uuid),
       now(),
       alice_id,
       now()
from ids
union all
select '55555555-eeee-4eee-8eee-555555555555'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'CUSTOM'::public.split_type,
       'Parking',
       10.00,
       'EUR',
       bob_id,
       cast(null as uuid),
       now(),
       bob_id,
       now()
from ids
union all
select '66666666-ffff-4fff-8fff-666666666666'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'EQUAL'::public.split_type,
       'Equipment rental',
       75.00,
       'EUR',
       carol_id,
       cast(null as uuid),
       now(),
       carol_id,
       now()
from ids
union all
select '77777777-aaaa-4aaa-8aaa-777777777777'::uuid,
       ski_group_id,
       'standard'::public.expense_type,
       'EQUAL'::public.split_type,
       'Hot springs tickets',
       36.00,
       'EUR',
       alice_id,
       cast(null as uuid),
       now(),
       alice_id,
       now()
from ids
union all
select '88888888-bbbb-4bbb-8bbb-888888888888'::uuid,
       ski_group_id,
       'payment'::public.expense_type,
       null,
       'Alice paid Bob back',
       15.00,
       'EUR',
       alice_id,
       bob_id,
       now(),
       alice_id,
       now()
from ids
on conflict (id) do update set description = excluded.description,
                               amount      = excluded.amount,
                               currency    = excluded.currency,
                               paid_by     = excluded.paid_by,
                               to_user     = excluded.to_user,
                               updated_at  = now();

-- Expense splits for standard expenses
-- Dinner €90 split equally among Alice, Bob, Carol => €30 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'::uuid, (select id from auth.users where email = 'alice@example.com'),
        30.00, 33.3333),
       ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'::uuid, (select id from auth.users where email = 'bob@example.com'),
        30.00, 33.3333),
       ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'::uuid, (select id from auth.users where email = 'carol@example.com'),
        30.00, 33.3333)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Taxi €30 split 50/50 between Alice and Bob => €15 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'::uuid, (select id from auth.users where email = 'alice@example.com'),
        15.00, 50.0),
       ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'::uuid, (select id from auth.users where email = 'bob@example.com'),
        15.00, 50.0)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Breakfast €24 split equally among 3 => €8 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('dddddddd-dddd-4ddd-8ddd-dddddddddddd'::uuid, (select id from auth.users where email = 'alice@example.com'),
        8.00, 33.3333),
       ('dddddddd-dddd-4ddd-8ddd-dddddddddddd'::uuid, (select id from auth.users where email = 'bob@example.com'), 8.00,
        33.3333),
       ('dddddddd-dddd-4ddd-8ddd-dddddddddddd'::uuid, (select id from auth.users where email = 'carol@example.com'),
        8.00, 33.3333)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Ski passes €180 split equally => €60 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'::uuid, (select id from auth.users where email = 'alice@example.com'),
        60.00, 33.3333),
       ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'::uuid, (select id from auth.users where email = 'bob@example.com'),
        60.00, 33.3333),
       ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'::uuid, (select id from auth.users where email = 'carol@example.com'),
        60.00, 33.3333)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Groceries €45 split equally => €15 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('ffffffff-ffff-4fff-8fff-ffffffffffff'::uuid, (select id from auth.users where email = 'alice@example.com'),
        15.00, 33.3333),
       ('ffffffff-ffff-4fff-8fff-ffffffffffff'::uuid, (select id from auth.users where email = 'bob@example.com'),
        15.00, 33.3333),
       ('ffffffff-ffff-4fff-8fff-ffffffffffff'::uuid, (select id from auth.users where email = 'carol@example.com'),
        15.00, 33.3333)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Coffee €9 split equally => €3 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('11111111-aaaa-4aaa-8aaa-111111111111'::uuid, (select id from auth.users where email = 'alice@example.com'),
        3.00, 33.3333),
       ('11111111-aaaa-4aaa-8aaa-111111111111'::uuid, (select id from auth.users where email = 'bob@example.com'), 3.00,
        33.3333),
       ('11111111-aaaa-4aaa-8aaa-111111111111'::uuid, (select id from auth.users where email = 'carol@example.com'),
        3.00, 33.3333)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Gas €60 split 50/50 between Alice and Bob => €30 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('22222222-bbbb-4bbb-8bbb-222222222222'::uuid, (select id from auth.users where email = 'alice@example.com'),
        30.00, 50.0),
       ('22222222-bbbb-4bbb-8bbb-222222222222'::uuid, (select id from auth.users where email = 'bob@example.com'),
        30.00, 50.0)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Snacks €12 split equally => €4 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('33333333-cccc-4ccc-8ccc-333333333333'::uuid, (select id from auth.users where email = 'alice@example.com'),
        4.00, 33.3333),
       ('33333333-cccc-4ccc-8ccc-333333333333'::uuid, (select id from auth.users where email = 'bob@example.com'), 4.00,
        33.3333),
       ('33333333-cccc-4ccc-8ccc-333333333333'::uuid, (select id from auth.users where email = 'carol@example.com'),
        4.00, 33.3333)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Lift top-up €60 split equally => €20 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('44444444-dddd-4ddd-8ddd-444444444444'::uuid, (select id from auth.users where email = 'alice@example.com'),
        20.00, 33.3333),
       ('44444444-dddd-4ddd-8ddd-444444444444'::uuid, (select id from auth.users where email = 'bob@example.com'),
        20.00, 33.3333),
       ('44444444-dddd-4ddd-8ddd-444444444444'::uuid, (select id from auth.users where email = 'carol@example.com'),
        20.00, 33.3333)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Parking €10 paid for by group but only Alice used => assign to Alice
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('55555555-eeee-4eee-8eee-555555555555'::uuid, (select id from auth.users where email = 'alice@example.com'),
        10.00, null)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Equipment rental €75 split equally => €25 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('66666666-ffff-4fff-8fff-666666666666'::uuid, (select id from auth.users where email = 'alice@example.com'),
        25.00, 33.3333),
       ('66666666-ffff-4fff-8fff-666666666666'::uuid, (select id from auth.users where email = 'bob@example.com'),
        25.00, 33.3333),
       ('66666666-ffff-4fff-8fff-666666666666'::uuid, (select id from auth.users where email = 'carol@example.com'),
        25.00, 33.3333)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

-- Hot springs €36 split equally => €12 each
insert into public.expense_splits (expense_id, user_id, amount, percentage)
values ('77777777-aaaa-4aaa-8aaa-777777777777'::uuid, (select id from auth.users where email = 'alice@example.com'),
        12.00, 33.3333),
       ('77777777-aaaa-4aaa-8aaa-777777777777'::uuid, (select id from auth.users where email = 'bob@example.com'),
        12.00, 33.3333),
       ('77777777-aaaa-4aaa-8aaa-777777777777'::uuid, (select id from auth.users where email = 'carol@example.com'),
        12.00, 33.3333)
on conflict (expense_id, user_id) do update set amount     = excluded.amount,
                                                percentage = excluded.percentage;

commit;

-- Notes:
-- - Test users:
--   alice@example.com / Password123!
--   bob@example.com   / Password123!
--   carol@example.com / Password123!
-- - You can also sign in with Magic Links; emails will appear in Inbucket at http://localhost:54324
-- - To (re)seed locally: `npm run supabase:db:reset` which runs migrations and then this seed.sql
