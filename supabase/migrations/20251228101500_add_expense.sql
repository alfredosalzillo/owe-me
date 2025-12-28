-- Migration to add RPC functions for expenses

create or replace function public.add_expense(
    p_group_id uuid,
    p_type public.expense_type,
    p_description text,
    p_amount numeric,
    p_currency text,
    p_paid_by uuid,
    p_paid_at timestamptz,
    p_split_type public.split_type default null,
    p_to_user uuid default null,
    p_splits jsonb default '[]'::jsonb
)
    returns public.expenses
    language plpgsql
    security definer
    set search_path = public, pg_temp
as
$$
declare
    v_expense public.expenses;
    v_split   jsonb;
begin
    -- Check if member
    if not public.is_group_member(p_group_id) then
        raise exception 'Only group members can add expenses';
    end if;

    insert into public.expenses (group_id,
                                 type,
                                 description,
                                 amount,
                                 currency,
                                 paid_by,
                                 paid_at,
                                 split_type,
                                 to_user,
                                 created_by)
    values (p_group_id,
            p_type,
            p_description,
            p_amount,
            p_currency,
            p_paid_by,
            p_paid_at,
            p_split_type,
            p_to_user,
            auth.uid())
    returning * into v_expense;

    if p_type = 'standard' and jsonb_array_length(p_splits) > 0 then
        for v_split in select * from jsonb_array_elements(p_splits)
            loop
                insert into public.expense_splits (expense_id, user_id, amount, percentage)
                values (v_expense.id,
                        (v_split ->> 'user_id')::uuid,
                        (v_split ->> 'amount')::numeric,
                        (v_split ->> 'percentage')::numeric);
            end loop;
    end if;

    return v_expense;
end;
$$;

create or replace function public.update_expense(
    p_id uuid,
    p_description text,
    p_amount numeric,
    p_currency text,
    p_paid_by uuid,
    p_paid_at timestamptz,
    p_split_type public.split_type default null,
    p_to_user uuid default null,
    p_splits jsonb default null
)
    returns public.expenses
    language plpgsql
    security definer
    set search_path = public, pg_temp
as
$$
declare
    v_expense public.expenses;
    v_split   jsonb;
begin
    select * into v_expense from public.expenses where id = p_id;

    if not found then
        raise exception 'Expense not found';
    end if;

    -- Check if creator or admin
    if v_expense.created_by != auth.uid() and not public.is_group_admin(v_expense.group_id) then
        raise exception 'Not authorized to update this expense';
    end if;

    update public.expenses
    set description = p_description,
        amount      = p_amount,
        currency    = p_currency,
        paid_by     = p_paid_by,
        paid_at     = p_paid_at,
        split_type  = p_split_type,
        to_user     = p_to_user,
        updated_at  = now()
    where id = p_id
    returning * into v_expense;

    if p_splits is not null then
        delete from public.expense_splits where expense_id = p_id;

        if jsonb_array_length(p_splits) > 0 then
            for v_split in select * from jsonb_array_elements(p_splits)
                loop
                    insert into public.expense_splits (expense_id, user_id, amount, percentage)
                    values (v_expense.id,
                            (v_split ->> 'user_id')::uuid,
                            (v_split ->> 'amount')::numeric,
                            (v_split ->> 'percentage')::numeric);
                end loop;
        end if;
    end if;

    return v_expense;
end;
$$;
