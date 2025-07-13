"use server";

import { fetchGroup } from "@/plugins/api/groups";
import {
  GroupUser,
  PaymentExpense,
  StandardExpense,
} from "@/plugins/api/types";
import { fetchMe } from "@/plugins/api/user";

// Simple function to generate a unique ID
const generateId = () => {
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// Mock implementation for adding a new expense
export const addExpense = async (
  groupId: string,
  expense: Omit<
    StandardExpense,
    "id" | "createdAt" | "createdBy" | "updatedAt"
  >,
): Promise<StandardExpense> => {
  const me = await fetchMe();
  const now = new Date();

  // In a real implementation, this would update the database
  // For now, we'll just return a new expense object with the generated ID
  return {
    ...expense,
    id: `expense-${generateId()}`,
    createdAt: now,
    createdBy: me,
    updatedAt: now,
  };
};

// Mock implementation for adding a new payment
export const addPayment = async (
  groupId: string,
  payment: Omit<PaymentExpense, "id" | "createdAt" | "createdBy" | "updatedAt">,
): Promise<PaymentExpense> => {
  const me = await fetchMe();
  const now = new Date();

  // In a real implementation, this would update the database
  // For now, we'll just return a new payment object with the generated ID
  return {
    ...payment,
    id: `payment-${generateId()}`,
    createdAt: now,
    createdBy: me,
    updatedAt: now,
  };
};

// Mock implementation for updating an expense
export const updateExpense = async (
  groupId: string,
  expenseId: string,
  expenseUpdate: Partial<
    Omit<StandardExpense, "id" | "createdAt" | "createdBy" | "updatedAt">
  >,
): Promise<StandardExpense> => {
  const group = await fetchGroup(groupId);
  const expense = group.expenses.find((e) => e.id === expenseId);

  if (!expense || expense.type !== "standard") {
    throw new Error("Expense not found or not a standard expense");
  }

  // In a real implementation, this would update the database
  // For now, we'll just return an updated expense object
  return {
    ...expense,
    ...expenseUpdate,
    updatedAt: new Date(),
  };
};

// Mock implementation for updating a payment
export const updatePayment = async (
  groupId: string,
  paymentId: string,
  paymentUpdate: Partial<
    Omit<PaymentExpense, "id" | "createdAt" | "createdBy" | "updatedAt">
  >,
): Promise<PaymentExpense> => {
  const group = await fetchGroup(groupId);
  const payment = group.expenses.find((e) => e.id === paymentId);

  if (!payment || payment.type !== "payment") {
    throw new Error("Payment not found or not a payment expense");
  }

  // In a real implementation, this would update the database
  // For now, we'll just return an updated payment object
  return {
    ...payment,
    ...paymentUpdate,
    updatedAt: new Date(),
  };
};

// Helper function to get group members
export const getGroupMembers = async (
  groupId: string,
): Promise<GroupUser[]> => {
  const group = await fetchGroup(groupId);
  return group.members.map((member) => member.user);
};
