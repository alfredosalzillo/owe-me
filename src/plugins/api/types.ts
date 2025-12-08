export type MemberRole = "ADMIN" | "MEMBER";

export type User = {
  id: string;
  name: string;
};

export type GroupUser = {
  id: string;
  name: string;
  isMe: boolean;
};

export type SplitType = "EQUAL" | "PERCENTAGE" | "CUSTOM";

export type ExpenseSplit = {
  user: GroupUser;
  amount: number;
  percentage?: number;
};

export type BaseExpense = {
  id: string;
  amount: number;
  currency: string;
  paidBy: GroupUser;
  paidAt: Date;
  createdAt: Date;
  createdBy: GroupUser;
  updatedAt: Date;
};

export type StandardExpense = BaseExpense & {
  type: "standard";
  description: string;
  splitType: SplitType;
  splits: ExpenseSplit[];
};

export type PaymentExpense = BaseExpense & {
  type: "payment";
  description?: string; // Optional for payment expenses
  toUser: GroupUser;
};

export type Expense = StandardExpense | PaymentExpense;

export type GroupDebitMode = "simplified" | "default";
