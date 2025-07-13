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
  type: 'standard';
  description: string;
  splitType: SplitType;
  splits: ExpenseSplit[];
};

export type PaymentExpense = BaseExpense & {
  type: 'payment';
  description?: string; // Optional for payment expenses
  toUser: GroupUser;
};

export type Expense = StandardExpense | PaymentExpense;


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
