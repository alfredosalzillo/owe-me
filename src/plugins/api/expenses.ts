import { StandardExpense } from "@/plugins/api/types";
import supabase from "@/plugins/supabase/client";

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
  const { data } = await supabase
    .rpc("add_expense", {
      p_group_id: groupId,
      p_type: "standard",
      p_description: expense.description ?? "",
      p_amount: expense.amount,
      p_currency: expense.currency,
      p_paid_by: expense.paidBy,
      p_paid_at: expense.paidAt.toISOString(),
      p_split_type: expense.splitType,
      p_splits:
        expense.splits?.map((s) => ({
          user_id: s.user,
          amount: s.amount,
          percentage: s.percentage ?? null,
        })) ?? [],
    })
    .throwOnError();

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
  const { data } = await supabase
    .rpc("add_expense", {
      p_group_id: groupId,
      p_type: "payment",
      p_description: payment.description ?? "",
      p_amount: payment.amount,
      p_currency: payment.currency,
      p_paid_by: payment.paidBy,
      p_paid_at: payment.paidAt.toISOString(),
      p_to_user: payment.toUser,
    })
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
  await supabase
    .rpc("update_expense", {
      p_id: expenseId,
      p_description: expenseUpdate.description ?? "",
      p_amount: expenseUpdate.amount!,
      p_currency: expenseUpdate.currency!,
      p_paid_by: expenseUpdate.paidBy!,
      p_paid_at: expenseUpdate.paidAt?.toISOString()!,
      p_split_type: expenseUpdate.splitType!,
      p_splits: expenseUpdate.splits
        ? expenseUpdate.splits.map((s) => ({
            user_id: s.user,
            amount: s.amount,
            percentage: s.percentage ?? null,
          }))
        : null,
    })
    .throwOnError();
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
  await supabase
    .rpc("update_expense", {
      p_id: paymentId,
      p_description: paymentUpdate.description ?? "",
      p_amount: paymentUpdate.amount!,
      p_currency: paymentUpdate.currency!,
      p_paid_by: paymentUpdate.paidBy!,
      p_paid_at: paymentUpdate.paidAt?.toISOString()!,
      p_to_user: paymentUpdate.toUser!,
      p_split_type: undefined,
    })
    .throwOnError();
};
