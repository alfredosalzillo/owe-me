-- Migration: add debits function and view implementing fetchDebits logic
-- Date: 2025-12-08 08:30

-- Function: _group_debits(gid)
-- Computes debits for a group. If group.debit_mode = 'simplified',
-- it aggregates balances and matches debtors to creditors (greedy),
-- otherwise it returns pairwise net debits per currency.
-- The above placeholder approach is removed; a single definitive function is defined below.
create or replace function public._group_debits(gid uuid)
    returns table
            (
                out_group_id  uuid,
                from_user uuid,
                to_user   uuid,
                out_amount    numeric,
                out_currency  text
            )
    language plpgsql
    stable
as
$$
declare
    v_mode       public.debit_mode;
    rec          record;
    cur          text;
    debtor_ids   uuid[];
    creditor_ids uuid[];
    debtor_bal   numeric[];
    creditor_bal numeric[];
    i            int;
    j            int;
begin
    select debit_mode into v_mode from public.groups where id = gid;

    -- Note: We avoid temporary tables in a STABLE function. Instead we inline
    -- the common CTE chain and reuse it in the queries below.

    if v_mode = 'default' then
        return query
        with base_flows as (
            select e.group_id,
                   es.user_id as debtor,
                   e.paid_by  as creditor,
                   es.amount  as amount,
                   e.currency as currency
            from public.expenses e
                     join public.expense_splits es on es.expense_id = e.id
            where e.group_id = gid
              and e.type = 'standard'

            union all

            select e.group_id,
                   e.to_user  as debtor,
                   e.paid_by  as creditor,
                   e.amount   as amount,
                   e.currency as currency
            from public.expenses e
            where e.group_id = gid
              and e.type = 'payment'
              and e.to_user is not null
        ),
        pairwise as (
            select group_id, debtor, creditor, currency, sum(amount) as amount
            from base_flows
            group by group_id, debtor, creditor, currency
        ),
        net_pairs as (
            select s.group_id,
                   case when s.tot >= 0 then s.a else s.b end as from_user,
                   case when s.tot >= 0 then s.b else s.a end as to_user,
                   abs(s.tot) as amount,
                   s.currency
            from (
                select group_id,
                       currency,
                       a,
                       b,
                       sum(case when debtor = a and creditor = b then amount else -amount end) as tot
                from (
                         select group_id,
                                currency,
                                least(debtor, creditor)    as a,
                                greatest(debtor, creditor) as b,
                                debtor,
                                creditor,
                                amount
                         from pairwise
                     ) t
                group by group_id, currency, a, b
            ) s
            where abs(s.tot) > 0
        )
        select gid as out_group_id, np.from_user, np.to_user, np.amount as out_amount, np.currency as out_currency
        from net_pairs np;
        return;
    end if;

    if v_mode = 'simplified' then
        -- For each currency, compute balances and match
        for cur in
            with base_flows as (
                select e.group_id,
                       es.user_id as debtor,
                       e.paid_by  as creditor,
                       es.amount  as amount,
                       e.currency as currency
                from public.expenses e
                         join public.expense_splits es on es.expense_id = e.id
                where e.group_id = gid
                  and e.type = 'standard'

                union all

                select e.group_id,
                       e.to_user  as debtor,
                       e.paid_by  as creditor,
                       e.amount   as amount,
                       e.currency as currency
                from public.expenses e
                where e.group_id = gid
                  and e.type = 'payment'
                  and e.to_user is not null
            ),
            pairwise as (
                select group_id, debtor, creditor, currency, sum(amount) as amount
                from base_flows
                group by group_id, debtor, creditor, currency
            ),
            net_pairs as (
                select s.group_id,
                       case when s.tot >= 0 then s.a else s.b end as from_user,
                       case when s.tot >= 0 then s.b else s.a end as to_user,
                       abs(s.tot) as amount,
                       s.currency
                from (
                    select group_id,
                           currency,
                           a,
                           b,
                           sum(case when debtor = a and creditor = b then amount else -amount end) as tot
                    from (
                             select group_id,
                                    currency,
                                    least(debtor, creditor)    as a,
                                    greatest(debtor, creditor) as b,
                                    debtor,
                                    creditor,
                                    amount
                             from pairwise
                         ) t
                    group by group_id, currency, a, b
                ) s
                where abs(s.tot) > 0
            )
            select distinct currency from net_pairs
            loop
                select array_agg(user_id order by balance desc),
                       array_agg(balance order by balance desc)
                into debtor_ids, debtor_bal
                from (
                    with base_flows as (
                        select e.group_id,
                               es.user_id as debtor,
                               e.paid_by  as creditor,
                               es.amount  as amount,
                               e.currency as currency
                        from public.expenses e
                                 join public.expense_splits es on es.expense_id = e.id
                        where e.group_id = gid
                          and e.type = 'standard'

                        union all

                        select e.group_id,
                               e.to_user  as debtor,
                               e.paid_by  as creditor,
                               e.amount   as amount,
                               e.currency as currency
                        from public.expenses e
                        where e.group_id = gid
                          and e.type = 'payment'
                          and e.to_user is not null
                    ),
                    pairwise as (
                        select group_id, debtor, creditor, currency, sum(amount) as amount
                        from base_flows
                        group by group_id, debtor, creditor, currency
                    ),
                    net_pairs as (
                        select s.group_id,
                               case when s.tot >= 0 then s.a else s.b end as from_user,
                               case when s.tot >= 0 then s.b else s.a end as to_user,
                               abs(s.tot) as amount,
                               s.currency
                        from (
                            select group_id,
                                   currency,
                                   a,
                                   b,
                                   sum(case when debtor = a and creditor = b then amount else -amount end) as tot
                            from (
                                     select group_id,
                                            currency,
                                            least(debtor, creditor)    as a,
                                            greatest(debtor, creditor) as b,
                                            debtor,
                                            creditor,
                                            amount
                                     from pairwise
                                 ) t
                            group by group_id, currency, a, b
                        ) s
                        where abs(s.tot) > 0
                    )
                    select user_id, sum(sum_amt_from - sum_amt_to) as balance
                    from (
                        select np.from_user as user_id, sum(amount) as sum_amt_from, 0::numeric as sum_amt_to
                        from net_pairs np
                        where currency = cur
                        group by np.from_user
                        union all
                        select np.to_user as user_id, 0::numeric, sum(amount)
                        from net_pairs np
                        where currency = cur
                        group by np.to_user
                    ) x
                    group by user_id
--                     having balance <> 0
                ) b
                where b.balance > 0;

                select array_agg(user_id order by balance asc),
                       array_agg(balance order by balance asc)
                into creditor_ids, creditor_bal
                from (
                    with base_flows as (
                        select e.group_id,
                               es.user_id as debtor,
                               e.paid_by  as creditor,
                               es.amount  as amount,
                               e.currency as currency
                        from public.expenses e
                                 join public.expense_splits es on es.expense_id = e.id
                        where e.group_id = gid
                          and e.type = 'standard'

                        union all

                        select e.group_id,
                               e.to_user  as debtor,
                               e.paid_by  as creditor,
                               e.amount   as amount,
                               e.currency as currency
                        from public.expenses e
                        where e.group_id = gid
                          and e.type = 'payment'
                          and e.to_user is not null
                    ),
                    pairwise as (
                        select group_id, debtor, creditor, currency, sum(amount) as amount
                        from base_flows
                        group by group_id, debtor, creditor, currency
                    ),
                    net_pairs as (
                        select s.group_id,
                               case when s.tot >= 0 then s.a else s.b end as from_user,
                               case when s.tot >= 0 then s.b else s.a end as to_user,
                               abs(s.tot) as amount,
                               s.currency
                        from (
                            select group_id,
                                   currency,
                                   a,
                                   b,
                                   sum(case when debtor = a and creditor = b then amount else -amount end) as tot
                            from (
                                     select group_id,
                                            currency,
                                            least(debtor, creditor)    as a,
                                            greatest(debtor, creditor) as b,
                                            debtor,
                                            creditor,
                                            amount
                                     from pairwise
                                 ) t
                            group by group_id, currency, a, b
                        ) s
                        where abs(s.tot) > 0
                    )
                    select user_id, sum(sum_amt_from - sum_amt_to) as balance
                    from (
                        select np.from_user as user_id, sum(amount) as sum_amt_from, 0::numeric as sum_amt_to
                        from net_pairs np
                        where currency = cur
                        group by np.from_user
                        union all
                        select np.to_user as user_id, 0::numeric, sum(amount)
                        from net_pairs np
                        where currency = cur
                        group by np.to_user
                    ) y
                    group by user_id
--                     having sum_amt_from - sum_amt_to <> 0
                ) c
                where c.balance < 0;

                i := 1;
                j := 1;
                while debtor_ids is not null and creditor_ids is not null and i <= array_length(debtor_ids, 1) and
                      j <= array_length(creditor_ids, 1)
                    loop
                        if debtor_bal[i] is null or creditor_bal[j] is null then
                            exit;
                        end if;

                        -- amounts: debtor_bal is positive, creditor_bal is negative
                        if debtor_bal[i] = 0 then
                            i := i + 1;
                            continue;
                        end if;
                        if creditor_bal[j] = 0 then
                            j := j + 1;
                            continue;
                        end if;

                        if debtor_bal[i] <= abs(creditor_bal[j]) then
                            -- debtor fully pays this creditor
                            out_group_id := gid;
                            from_user := debtor_ids[i];
                            to_user := creditor_ids[j];
                            out_amount := debtor_bal[i];
                            out_currency := cur;
                            return next;
                            creditor_bal[j] := creditor_bal[j] + debtor_bal[i];
                            debtor_bal[i] := 0;
                            i := i + 1;
                            if creditor_bal[j] = 0 then
                                j := j + 1;
                            end if;
                        else
                            -- debtor partially pays this creditor
                            out_group_id := gid;
                            from_user := debtor_ids[i];
                            to_user := creditor_ids[j];
                            out_amount := abs(creditor_bal[j]);
                            out_currency := cur;
                            return next;
                            debtor_bal[i] := debtor_bal[i] - abs(creditor_bal[j]);
                            creditor_bal[j] := 0;
                            j := j + 1;
                        end if;
                    end loop;
            end loop;
    end if;

end;
$$;

-- View: debits for all groups via lateral call, enforcing RLS via groups
create or replace view public.debits with (security_invoker = on) as
select g.id as group_id,
       d.from_user,
       d.to_user,
       d.amount,
       d.currency
from public.groups g
         cross join lateral public._group_debits(g.id) as d(out_group_id, from_user, to_user, amount, currency);

comment on view public.debits is e'
    @graphql({
        "name": "Debit",
        "primary_key_columns": ["group_id", "from_user", "to_user"],
        "foreign_keys": [
          {
            "local_name": "debits",
            "local_columns": ["group_id"],
            "foreign_name": "group",
            "foreign_schema": "public",
            "foreign_table": "groups",
            "foreign_columns": ["id"]
          },
          {
            "local_name": "debits",
            "local_columns": ["from_user"],
            "foreign_name": "fromUser",
            "foreign_schema": "public",
            "foreign_table": "profiles",
            "foreign_columns": ["id"]
          },
          {
            "local_name": "credits",
            "local_columns": ["to_user"],
            "foreign_name": "toUser",
            "foreign_schema": "public",
            "foreign_table": "profiles",
            "foreign_columns": ["id"]
          }
        ]
    })
';


