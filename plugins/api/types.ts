export type MemberRole = "ADMIN" | "MEMBER";

export type User = {
  id: string;
  name: string;
};

export type GroupUser = {
  id: string;
  name: string;
};

export type GroupMember = {
  user: GroupUser;
  role: MemberRole;
  joinedAt: Date;
};

export type SplitType = "EQUAL" | "PERCENTAGE" | "CUSTOM";

export type ExpenseSplit = {
  user: GroupUser;
  amount: number;
  percentage?: number;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  currency: string;
  paidBy: GroupUser;
  paidAt: Date;
  splitType: SplitType;
  splits: ExpenseSplit[];
  createdAt: Date;
  createdBy: GroupUser;
  updatedAt: Date;
};

export type Payment = {
  id: string;
  fromUser: GroupUser;
  toUser: GroupUser;
  amount: number;
  currency: string;
  description?: string;
  createdAt: Date;
};

export type Balance = {
  user: GroupUser;
  amount: number;
  currency: string;
};

export type GroupBalance = {
  balances: Balance[];
};

export type GroupDebitMode = "simplified" | "default";

export type Group = {
  id: string;
  name: string;
  description?: string;
  defaultCurrency: string;
  debitMode: GroupDebitMode;
  members: GroupMember[];
  expenses: Expense[];
  payments: Payment[];
  balances: GroupBalance[];
  createdAt: Date;
  createdBy: GroupUser;
  updatedAt: Date;
};

export type GroupPreview = {
  id: string;
  name: string;
  description?: string;
  defaultCurrency: string;
  members: GroupMember[];
  createdAt: Date;
  createdBy: GroupUser;
  updatedAt: Date;
};

export type GroupDebit = {
  from: User;
  to: User;
  amount: number;
  currency: string;
};
