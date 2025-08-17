import { fetchGroup } from "@/plugins/api/groups";
import {
  GroupUser,
  PaymentExpense,
  StandardExpense,
} from "@/plugins/api/types";
import { fetchMe } from "@/plugins/api/user";
import supabase from "@/plugins/supabase";

const mapProfileToGroupUser = (row: {
  id: string;
  name: string | null;
}): GroupUser => {
  return { id: row.id, name: row.name || "User" };
};

export const addExpense = async (
  groupId: string,
  expense: Omit<
    StandardExpense,
    "id" | "createdAt" | "createdBy" | "updatedAt"
  >,
): Promise<StandardExpense> => {
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
      paid_by: expense.paidBy.id,
      paid_at: expense.paidAt.toISOString(),
      created_by: me.id,
      created_at: nowIso,
      updated_at: nowIso,
    })
    .select("id")
    .single()
    .throwOnError();
  const expenseId = data.id as string;

  // replace splits
  if (expense.splits?.length) {
    const splitRows = expense.splits.map((s) => ({
      expense_id: expenseId,
      user_id: s.user.id,
      amount: s.amount,
      percentage: s.percentage ?? null,
    }));
    await supabase.from("expense_splits").insert(splitRows).throwOnError();
  }

  // Return full expense via fetchGroup reconstruction
  const group = await fetchGroup(groupId);
  const created = group.expenses.find((e) => e.id === expenseId);
  if (!created || created.type !== "standard") {
    throw new Error("Failed to create expense");
  }
  return created;
};

export const addPayment = async (
  groupId: string,
  payment: Omit<PaymentExpense, "id" | "createdAt" | "createdBy" | "updatedAt">,
): Promise<PaymentExpense> => {
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
      paid_by: payment.paidBy.id,
      to_user: payment.toUser.id,
      paid_at: payment.paidAt.toISOString(),
      created_by: me.id,
      created_at: nowIso,
      updated_at: nowIso,
    })
    .select("id")
    .single()
    .throwOnError();
  const expenseId = data.id as string;
  const group = await fetchGroup(groupId);
  const created = group.expenses.find((e) => e.id === expenseId);
  if (!created || created.type !== "payment") {
    throw new Error("Failed to create payment");
  }
  return created;
};

export const updateExpense = async (
  groupId: string,
  expenseId: string,
  expenseUpdate: Partial<
    Omit<StandardExpense, "id" | "createdAt" | "createdBy" | "updatedAt">
  >,
): Promise<StandardExpense> => {
  // Update base row
  if (Object.keys(expenseUpdate).length > 0) {
    await supabase
      .from("expenses")
      .update({
        description: expenseUpdate.description,
        amount: expenseUpdate.amount,
        currency: expenseUpdate.currency,
        paid_by: expenseUpdate.paidBy?.id,
        paid_at: expenseUpdate.paidAt?.toISOString(),
      })
      .eq("id", expenseId)
      .throwOnError();
  }

  // Replace splits when provided
  if (expenseUpdate.splits) {
    await supabase
      .from("expense_splits")
      .delete()
      .eq("expense_id", expenseId)
      .throwOnError();
    if (expenseUpdate.splits.length > 0) {
      const rows = expenseUpdate.splits.map((s) => ({
        expense_id: expenseId,
        user_id: s.user.id,
        amount: s.amount,
        percentage: s.percentage ?? null,
      }));
      await supabase.from("expense_splits").insert(rows).throwOnError();
    }
  }
  const group = await fetchGroup(groupId);
  const updated = group.expenses.find((e) => e.id === expenseId);
  if (!updated || updated.type !== "standard") {
    throw new Error("Expense not found or not a standard expense");
  }
  return updated;
};

export const updatePayment = async (
  groupId: string,
  paymentId: string,
  paymentUpdate: Partial<
    Omit<PaymentExpense, "id" | "createdAt" | "createdBy" | "updatedAt">
  >,
): Promise<PaymentExpense> => {
  if (Object.keys(paymentUpdate).length > 0) {
    await supabase
      .from("expenses")
      .update({
        description: paymentUpdate.description,
        amount: paymentUpdate.amount,
        currency: paymentUpdate.currency,
        paid_by: paymentUpdate.paidBy?.id,
        paid_at: paymentUpdate.paidAt?.toISOString(),
        to_user: paymentUpdate.toUser?.id,
      })
      .eq("id", paymentId)
      .throwOnError();
  }
  const group = await fetchGroup(groupId);
  const updated = group.expenses.find((e) => e.id === paymentId);
  if (!updated || updated.type !== "payment") {
    throw new Error("Payment not found or not a payment expense");
  }
  return updated;
};

export const getGroupMembers = async (
  groupId: string,
): Promise<GroupUser[]> => {
  const { data } = await supabase
    .from("group_members")
    .select("profiles(id, name)")
    .eq("group_id", groupId)
    .throwOnError();
  return (data || []).map((r) => mapProfileToGroupUser(r.profiles));
};
