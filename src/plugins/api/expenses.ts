import { StandardExpense } from "@/plugins/api/types";
import { fetchMe } from "@/plugins/api/user";
import supabase from "@/plugins/supabase";

export const addExpense = async (
  groupId: string,
  expense: {
    splitType: StandardExpense["splitType"];
    description?: string | null;
    amount: number;
    currency: string;
    paidBy: string;
    paidAt: Date;
    splits?: { user: string; amount: number; percentage?: number }[];
  },
): Promise<{ id: string }> => {
  const me = await fetchMe();
  const nowIso = new Date().toISOString();
  const { data } = await supabase
    .from("expenses")
    .insert({
      group_id: groupId,
      type: "standard",
      description: expense.description ?? null,
      amount: expense.amount,
      currency: expense.currency,
      paid_by: expense.paidBy,
      paid_at: expense.paidAt.toISOString(),
      created_by: me.id,
      created_at: nowIso,
      updated_at: nowIso,
    })
    .select("id")
    .single()
    .throwOnError();

  const expenseId = data.id as string;
  // add splits
  if (expense.splits?.length) {
    const splitRows = expense.splits.map((s) => ({
      expense_id: expenseId,
      user_id: s.user,
      amount: s.amount,
      percentage: s.percentage ?? null,
    }));
    await supabase.from("expense_splits").insert(splitRows).throwOnError();
  }
  return data;
};

export const addPayment = async (
  groupId: string,
  payment: {
    description?: string | null;
    amount: number;
    currency: string;
    paidBy: string;
    toUser: string;
    paidAt: Date;
  },
): Promise<{ id: string }> => {
  const me = await fetchMe();
  const nowIso = new Date().toISOString();
  const { data } = await supabase
    .from("expenses")
    .insert({
      group_id: groupId,
      type: "payment",
      description: payment.description ?? null,
      amount: payment.amount,
      currency: payment.currency,
      paid_by: payment.paidBy,
      to_user: payment.toUser,
      paid_at: payment.paidAt.toISOString(),
      created_by: me.id,
      created_at: nowIso,
      updated_at: nowIso,
    })
    .select("id")
    .single()
    .throwOnError();
  return data;
};

export const updateExpense = async (
  expenseId: string,
  expenseUpdate: Partial<{
    description: string | null;
    amount: number;
    currency: string;
    paidBy: string;
    paidAt: Date;
    splitType: StandardExpense["splitType"];
    splits: { user: string; amount: number; percentage?: number }[];
  }>,
): Promise<void> => {
  // Update base row
  if (Object.keys(expenseUpdate).length > 0) {
    await supabase
      .from("expenses")
      .update({
        type: "standard",
        description: expenseUpdate.description,
        amount: expenseUpdate.amount,
        currency: expenseUpdate.currency,
        paid_by: expenseUpdate.paidBy,
        paid_at: expenseUpdate.paidAt?.toISOString(),
        split_type: expenseUpdate.splitType,
      })
      .eq("id", expenseId)
      .throwOnError();
  }

  // Replace splits when provided
  if (expenseUpdate.splits) {
    await supabase
      .from("expense_splits")
      .delete({ count: "exact" })
      .eq("expense_id", expenseId)
      .throwOnError();
    if (expenseUpdate.splits.length > 0) {
      const rows = expenseUpdate.splits.map((s) => ({
        expense_id: expenseId,
        user_id: s.user,
        amount: s.amount,
        percentage: s.percentage ?? null,
      }));
      await supabase.from("expense_splits").insert(rows).throwOnError();
    }
  }
};

export const updatePayment = async (
  paymentId: string,
  paymentUpdate: Partial<{
    description: string | null;
    amount: number;
    currency: string;
    paidBy: string;
    toUser: string;
    paidAt: Date;
  }>,
): Promise<void> => {
  if (Object.keys(paymentUpdate).length > 0) {
    await supabase
      .from("expenses")
      .update({
        type: "payment",
        description: paymentUpdate.description,
        amount: paymentUpdate.amount,
        currency: paymentUpdate.currency,
        paid_by: paymentUpdate.paidBy,
        paid_at: paymentUpdate.paidAt?.toISOString(),
        to_user: paymentUpdate.toUser,
        split_type: null,
      })
      .eq("id", paymentId)
      .throwOnError();
  }
};
