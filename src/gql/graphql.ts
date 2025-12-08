/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: string; output: string; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: string; output: string; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date without time information */
  Date: { input: string; output: string; }
  /** A date and time */
  Datetime: { input: string; output: string; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: string; output: string; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: string; output: string; }
  /** A universally unique identifier */
  UUID: { input: string; output: string; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq: InputMaybe<Scalars['BigFloat']['input']>;
  gt: InputMaybe<Scalars['BigFloat']['input']>;
  gte: InputMaybe<Scalars['BigFloat']['input']>;
  in: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is: InputMaybe<FilterIs>;
  lt: InputMaybe<Scalars['BigFloat']['input']>;
  lte: InputMaybe<Scalars['BigFloat']['input']>;
  neq: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  contains: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  eq: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is: InputMaybe<FilterIs>;
  overlaps: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq: InputMaybe<Scalars['BigInt']['input']>;
  gt: InputMaybe<Scalars['BigInt']['input']>;
  gte: InputMaybe<Scalars['BigInt']['input']>;
  in: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is: InputMaybe<FilterIs>;
  lt: InputMaybe<Scalars['BigInt']['input']>;
  lte: InputMaybe<Scalars['BigInt']['input']>;
  neq: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contains: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eq: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is: InputMaybe<FilterIs>;
  overlaps: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq: InputMaybe<Scalars['Boolean']['input']>;
  is: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy: InputMaybe<Array<Scalars['Boolean']['input']>>;
  contains: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is: InputMaybe<FilterIs>;
  overlaps: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq: InputMaybe<Scalars['Date']['input']>;
  gt: InputMaybe<Scalars['Date']['input']>;
  gte: InputMaybe<Scalars['Date']['input']>;
  in: InputMaybe<Array<Scalars['Date']['input']>>;
  is: InputMaybe<FilterIs>;
  lt: InputMaybe<Scalars['Date']['input']>;
  lte: InputMaybe<Scalars['Date']['input']>;
  neq: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy: InputMaybe<Array<Scalars['Date']['input']>>;
  contains: InputMaybe<Array<Scalars['Date']['input']>>;
  eq: InputMaybe<Array<Scalars['Date']['input']>>;
  is: InputMaybe<FilterIs>;
  overlaps: InputMaybe<Array<Scalars['Date']['input']>>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq: InputMaybe<Scalars['Datetime']['input']>;
  gt: InputMaybe<Scalars['Datetime']['input']>;
  gte: InputMaybe<Scalars['Datetime']['input']>;
  in: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is: InputMaybe<FilterIs>;
  lt: InputMaybe<Scalars['Datetime']['input']>;
  lte: InputMaybe<Scalars['Datetime']['input']>;
  neq: InputMaybe<Scalars['Datetime']['input']>;
};

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy: InputMaybe<Array<Scalars['Datetime']['input']>>;
  contains: InputMaybe<Array<Scalars['Datetime']['input']>>;
  eq: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is: InputMaybe<FilterIs>;
  overlaps: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export type Debit = Node & {
  __typename?: 'Debit';
  amount: Maybe<Scalars['BigFloat']['output']>;
  currency: Maybe<Scalars['String']['output']>;
  fromUser: Maybe<Profile>;
  group: Maybe<Group>;
  groupId: Maybe<Scalars['UUID']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  toUser: Maybe<Profile>;
};

export type DebitConnection = {
  __typename?: 'DebitConnection';
  edges: Array<DebitEdge>;
  pageInfo: PageInfo;
};

export type DebitDeleteResponse = {
  __typename?: 'DebitDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Debit>;
};

export type DebitEdge = {
  __typename?: 'DebitEdge';
  cursor: Scalars['String']['output'];
  node: Debit;
};

export type DebitFilter = {
  amount: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and: InputMaybe<Array<DebitFilter>>;
  currency: InputMaybe<StringFilter>;
  fromUser: InputMaybe<UuidFilter>;
  groupId: InputMaybe<UuidFilter>;
  nodeId: InputMaybe<IdFilter>;
  /** Negates a filter */
  not: InputMaybe<DebitFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or: InputMaybe<Array<DebitFilter>>;
  toUser: InputMaybe<UuidFilter>;
};

export type DebitInsertInput = {
  amount: InputMaybe<Scalars['BigFloat']['input']>;
  currency: InputMaybe<Scalars['String']['input']>;
  fromUser: InputMaybe<Scalars['UUID']['input']>;
  groupId: InputMaybe<Scalars['UUID']['input']>;
  toUser: InputMaybe<Scalars['UUID']['input']>;
};

export type DebitInsertResponse = {
  __typename?: 'DebitInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Debit>;
};

export enum DebitMode {
  Default = 'default',
  Simplified = 'simplified'
}

/** Boolean expression comparing fields on type "DebitMode" */
export type DebitModeFilter = {
  eq: InputMaybe<DebitMode>;
  in: InputMaybe<Array<DebitMode>>;
  is: InputMaybe<FilterIs>;
  neq: InputMaybe<DebitMode>;
};

export type DebitOrderBy = {
  amount: InputMaybe<OrderByDirection>;
  currency: InputMaybe<OrderByDirection>;
  fromUser: InputMaybe<OrderByDirection>;
  groupId: InputMaybe<OrderByDirection>;
  toUser: InputMaybe<OrderByDirection>;
};

export type DebitUpdateInput = {
  amount: InputMaybe<Scalars['BigFloat']['input']>;
  currency: InputMaybe<Scalars['String']['input']>;
  fromUser: InputMaybe<Scalars['UUID']['input']>;
  groupId: InputMaybe<Scalars['UUID']['input']>;
  toUser: InputMaybe<Scalars['UUID']['input']>;
};

export type DebitUpdateResponse = {
  __typename?: 'DebitUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Debit>;
};

export type Expense = Node & {
  __typename?: 'Expense';
  amount: Scalars['BigFloat']['output'];
  createdAt: Scalars['Datetime']['output'];
  createdBy: Maybe<Profile>;
  currency: Scalars['String']['output'];
  description: Maybe<Scalars['String']['output']>;
  group: Maybe<Group>;
  groupId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  paidAt: Scalars['Datetime']['output'];
  paidBy: Maybe<Profile>;
  splitType: Maybe<SplitType>;
  splits: Maybe<ExpenseSplitConnection>;
  toUser: Maybe<Profile>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['Datetime']['output'];
};


export type ExpenseSplitsArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<ExpenseSplitFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<ExpenseSplitOrderBy>>;
};

export type ExpenseConnection = {
  __typename?: 'ExpenseConnection';
  edges: Array<ExpenseEdge>;
  pageInfo: PageInfo;
};

export type ExpenseDeleteResponse = {
  __typename?: 'ExpenseDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Expense>;
};

export type ExpenseEdge = {
  __typename?: 'ExpenseEdge';
  cursor: Scalars['String']['output'];
  node: Expense;
};

export type ExpenseFilter = {
  amount: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and: InputMaybe<Array<ExpenseFilter>>;
  createdAt: InputMaybe<DatetimeFilter>;
  createdBy: InputMaybe<UuidFilter>;
  currency: InputMaybe<StringFilter>;
  description: InputMaybe<StringFilter>;
  groupId: InputMaybe<UuidFilter>;
  id: InputMaybe<UuidFilter>;
  nodeId: InputMaybe<IdFilter>;
  /** Negates a filter */
  not: InputMaybe<ExpenseFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or: InputMaybe<Array<ExpenseFilter>>;
  paidAt: InputMaybe<DatetimeFilter>;
  paidBy: InputMaybe<UuidFilter>;
  splitType: InputMaybe<SplitTypeFilter>;
  toUser: InputMaybe<UuidFilter>;
  type: InputMaybe<StringFilter>;
  updatedAt: InputMaybe<DatetimeFilter>;
};

export type ExpenseInsertInput = {
  amount: InputMaybe<Scalars['BigFloat']['input']>;
  createdAt: InputMaybe<Scalars['Datetime']['input']>;
  createdBy: InputMaybe<Scalars['UUID']['input']>;
  currency: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  groupId: InputMaybe<Scalars['UUID']['input']>;
  id: InputMaybe<Scalars['UUID']['input']>;
  paidAt: InputMaybe<Scalars['Datetime']['input']>;
  paidBy: InputMaybe<Scalars['UUID']['input']>;
  splitType: InputMaybe<SplitType>;
  toUser: InputMaybe<Scalars['UUID']['input']>;
  type: InputMaybe<Scalars['String']['input']>;
  updatedAt: InputMaybe<Scalars['Datetime']['input']>;
};

export type ExpenseInsertResponse = {
  __typename?: 'ExpenseInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Expense>;
};

export type ExpenseOrderBy = {
  amount: InputMaybe<OrderByDirection>;
  createdAt: InputMaybe<OrderByDirection>;
  createdBy: InputMaybe<OrderByDirection>;
  currency: InputMaybe<OrderByDirection>;
  description: InputMaybe<OrderByDirection>;
  groupId: InputMaybe<OrderByDirection>;
  id: InputMaybe<OrderByDirection>;
  paidAt: InputMaybe<OrderByDirection>;
  paidBy: InputMaybe<OrderByDirection>;
  splitType: InputMaybe<OrderByDirection>;
  toUser: InputMaybe<OrderByDirection>;
  type: InputMaybe<OrderByDirection>;
  updatedAt: InputMaybe<OrderByDirection>;
};

export type ExpenseSplit = Node & {
  __typename?: 'ExpenseSplit';
  amount: Scalars['BigFloat']['output'];
  expense: Maybe<Expense>;
  expenseId: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  percentage: Maybe<Scalars['BigFloat']['output']>;
  user: Maybe<Profile>;
  userId: Scalars['UUID']['output'];
};

export type ExpenseSplitConnection = {
  __typename?: 'ExpenseSplitConnection';
  edges: Array<ExpenseSplitEdge>;
  pageInfo: PageInfo;
};

export type ExpenseSplitDeleteResponse = {
  __typename?: 'ExpenseSplitDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<ExpenseSplit>;
};

export type ExpenseSplitEdge = {
  __typename?: 'ExpenseSplitEdge';
  cursor: Scalars['String']['output'];
  node: ExpenseSplit;
};

export type ExpenseSplitFilter = {
  amount: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and: InputMaybe<Array<ExpenseSplitFilter>>;
  expenseId: InputMaybe<UuidFilter>;
  nodeId: InputMaybe<IdFilter>;
  /** Negates a filter */
  not: InputMaybe<ExpenseSplitFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or: InputMaybe<Array<ExpenseSplitFilter>>;
  percentage: InputMaybe<BigFloatFilter>;
  userId: InputMaybe<UuidFilter>;
};

export type ExpenseSplitInsertInput = {
  amount: InputMaybe<Scalars['BigFloat']['input']>;
  expenseId: InputMaybe<Scalars['UUID']['input']>;
  percentage: InputMaybe<Scalars['BigFloat']['input']>;
  userId: InputMaybe<Scalars['UUID']['input']>;
};

export type ExpenseSplitInsertResponse = {
  __typename?: 'ExpenseSplitInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<ExpenseSplit>;
};

export type ExpenseSplitOrderBy = {
  amount: InputMaybe<OrderByDirection>;
  expenseId: InputMaybe<OrderByDirection>;
  percentage: InputMaybe<OrderByDirection>;
  userId: InputMaybe<OrderByDirection>;
};

export type ExpenseSplitUpdateInput = {
  amount: InputMaybe<Scalars['BigFloat']['input']>;
  expenseId: InputMaybe<Scalars['UUID']['input']>;
  percentage: InputMaybe<Scalars['BigFloat']['input']>;
  userId: InputMaybe<Scalars['UUID']['input']>;
};

export type ExpenseSplitUpdateResponse = {
  __typename?: 'ExpenseSplitUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<ExpenseSplit>;
};

export type ExpenseUpdateInput = {
  amount: InputMaybe<Scalars['BigFloat']['input']>;
  createdAt: InputMaybe<Scalars['Datetime']['input']>;
  createdBy: InputMaybe<Scalars['UUID']['input']>;
  currency: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  groupId: InputMaybe<Scalars['UUID']['input']>;
  id: InputMaybe<Scalars['UUID']['input']>;
  paidAt: InputMaybe<Scalars['Datetime']['input']>;
  paidBy: InputMaybe<Scalars['UUID']['input']>;
  splitType: InputMaybe<SplitType>;
  toUser: InputMaybe<Scalars['UUID']['input']>;
  type: InputMaybe<Scalars['String']['input']>;
  updatedAt: InputMaybe<Scalars['Datetime']['input']>;
};

export type ExpenseUpdateResponse = {
  __typename?: 'ExpenseUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Expense>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq: InputMaybe<Scalars['Float']['input']>;
  gt: InputMaybe<Scalars['Float']['input']>;
  gte: InputMaybe<Scalars['Float']['input']>;
  in: InputMaybe<Array<Scalars['Float']['input']>>;
  is: InputMaybe<FilterIs>;
  lt: InputMaybe<Scalars['Float']['input']>;
  lte: InputMaybe<Scalars['Float']['input']>;
  neq: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy: InputMaybe<Array<Scalars['Float']['input']>>;
  contains: InputMaybe<Array<Scalars['Float']['input']>>;
  eq: InputMaybe<Array<Scalars['Float']['input']>>;
  is: InputMaybe<FilterIs>;
  overlaps: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type Group = Node & {
  __typename?: 'Group';
  createdAt: Scalars['Datetime']['output'];
  createdBy: Maybe<Profile>;
  debitMode: DebitMode;
  debits: Maybe<DebitConnection>;
  defaultCurrency: Scalars['String']['output'];
  description: Maybe<Scalars['String']['output']>;
  expenses: Maybe<ExpenseConnection>;
  id: Scalars['UUID']['output'];
  members: Maybe<GroupMemberConnection>;
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
};


export type GroupDebitsArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<DebitFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<DebitOrderBy>>;
};


export type GroupExpensesArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<ExpenseFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<ExpenseOrderBy>>;
};


export type GroupMembersArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<GroupMemberFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GroupMemberOrderBy>>;
};

export type GroupConnection = {
  __typename?: 'GroupConnection';
  edges: Array<GroupEdge>;
  pageInfo: PageInfo;
};

export type GroupDeleteResponse = {
  __typename?: 'GroupDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Group>;
};

export type GroupEdge = {
  __typename?: 'GroupEdge';
  cursor: Scalars['String']['output'];
  node: Group;
};

export type GroupFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and: InputMaybe<Array<GroupFilter>>;
  createdAt: InputMaybe<DatetimeFilter>;
  createdBy: InputMaybe<UuidFilter>;
  debitMode: InputMaybe<DebitModeFilter>;
  defaultCurrency: InputMaybe<StringFilter>;
  description: InputMaybe<StringFilter>;
  id: InputMaybe<UuidFilter>;
  name: InputMaybe<StringFilter>;
  nodeId: InputMaybe<IdFilter>;
  /** Negates a filter */
  not: InputMaybe<GroupFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or: InputMaybe<Array<GroupFilter>>;
};

export type GroupInsertInput = {
  createdAt: InputMaybe<Scalars['Datetime']['input']>;
  createdBy: InputMaybe<Scalars['UUID']['input']>;
  debitMode: InputMaybe<DebitMode>;
  defaultCurrency: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['UUID']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
};

export type GroupInsertResponse = {
  __typename?: 'GroupInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Group>;
};

export type GroupMember = Node & {
  __typename?: 'GroupMember';
  group: Maybe<Group>;
  groupId: Scalars['UUID']['output'];
  joinedAt: Scalars['Datetime']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  user: Maybe<Profile>;
  userId: Scalars['UUID']['output'];
};

export type GroupMemberConnection = {
  __typename?: 'GroupMemberConnection';
  edges: Array<GroupMemberEdge>;
  pageInfo: PageInfo;
};

export type GroupMemberDeleteResponse = {
  __typename?: 'GroupMemberDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<GroupMember>;
};

export type GroupMemberEdge = {
  __typename?: 'GroupMemberEdge';
  cursor: Scalars['String']['output'];
  node: GroupMember;
};

export type GroupMemberFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and: InputMaybe<Array<GroupMemberFilter>>;
  groupId: InputMaybe<UuidFilter>;
  joinedAt: InputMaybe<DatetimeFilter>;
  nodeId: InputMaybe<IdFilter>;
  /** Negates a filter */
  not: InputMaybe<GroupMemberFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or: InputMaybe<Array<GroupMemberFilter>>;
  role: InputMaybe<StringFilter>;
  userId: InputMaybe<UuidFilter>;
};

export type GroupMemberInsertInput = {
  groupId: InputMaybe<Scalars['UUID']['input']>;
  joinedAt: InputMaybe<Scalars['Datetime']['input']>;
  role: InputMaybe<Scalars['String']['input']>;
  userId: InputMaybe<Scalars['UUID']['input']>;
};

export type GroupMemberInsertResponse = {
  __typename?: 'GroupMemberInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<GroupMember>;
};

export type GroupMemberOrderBy = {
  groupId: InputMaybe<OrderByDirection>;
  joinedAt: InputMaybe<OrderByDirection>;
  role: InputMaybe<OrderByDirection>;
  userId: InputMaybe<OrderByDirection>;
};

export type GroupMemberUpdateInput = {
  groupId: InputMaybe<Scalars['UUID']['input']>;
  joinedAt: InputMaybe<Scalars['Datetime']['input']>;
  role: InputMaybe<Scalars['String']['input']>;
  userId: InputMaybe<Scalars['UUID']['input']>;
};

export type GroupMemberUpdateResponse = {
  __typename?: 'GroupMemberUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<GroupMember>;
};

export type GroupOrderBy = {
  createdAt: InputMaybe<OrderByDirection>;
  createdBy: InputMaybe<OrderByDirection>;
  debitMode: InputMaybe<OrderByDirection>;
  defaultCurrency: InputMaybe<OrderByDirection>;
  description: InputMaybe<OrderByDirection>;
  id: InputMaybe<OrderByDirection>;
  name: InputMaybe<OrderByDirection>;
};

export type GroupUpdateInput = {
  createdAt: InputMaybe<Scalars['Datetime']['input']>;
  createdBy: InputMaybe<Scalars['UUID']['input']>;
  debitMode: InputMaybe<DebitMode>;
  defaultCurrency: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['UUID']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
};

export type GroupUpdateResponse = {
  __typename?: 'GroupUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Group>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq: InputMaybe<Scalars['Int']['input']>;
  gt: InputMaybe<Scalars['Int']['input']>;
  gte: InputMaybe<Scalars['Int']['input']>;
  in: InputMaybe<Array<Scalars['Int']['input']>>;
  is: InputMaybe<FilterIs>;
  lt: InputMaybe<Scalars['Int']['input']>;
  lte: InputMaybe<Scalars['Int']['input']>;
  neq: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy: InputMaybe<Array<Scalars['Int']['input']>>;
  contains: InputMaybe<Array<Scalars['Int']['input']>>;
  eq: InputMaybe<Array<Scalars['Int']['input']>>;
  is: InputMaybe<FilterIs>;
  overlaps: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `Debit` collection */
  deleteFromDebitCollection: DebitDeleteResponse;
  /** Deletes zero or more records from the `Expense` collection */
  deleteFromExpenseCollection: ExpenseDeleteResponse;
  /** Deletes zero or more records from the `ExpenseSplit` collection */
  deleteFromExpenseSplitCollection: ExpenseSplitDeleteResponse;
  /** Deletes zero or more records from the `Group` collection */
  deleteFromGroupCollection: GroupDeleteResponse;
  /** Deletes zero or more records from the `GroupMember` collection */
  deleteFromGroupMemberCollection: GroupMemberDeleteResponse;
  /** Deletes zero or more records from the `Profile` collection */
  deleteFromProfileCollection: ProfileDeleteResponse;
  /** Adds one or more `Debit` records to the collection */
  insertIntoDebitCollection: Maybe<DebitInsertResponse>;
  /** Adds one or more `Expense` records to the collection */
  insertIntoExpenseCollection: Maybe<ExpenseInsertResponse>;
  /** Adds one or more `ExpenseSplit` records to the collection */
  insertIntoExpenseSplitCollection: Maybe<ExpenseSplitInsertResponse>;
  /** Adds one or more `Group` records to the collection */
  insertIntoGroupCollection: Maybe<GroupInsertResponse>;
  /** Adds one or more `GroupMember` records to the collection */
  insertIntoGroupMemberCollection: Maybe<GroupMemberInsertResponse>;
  /** Adds one or more `Profile` records to the collection */
  insertIntoProfileCollection: Maybe<ProfileInsertResponse>;
  /** Updates zero or more records in the `Debit` collection */
  updateDebitCollection: DebitUpdateResponse;
  /** Updates zero or more records in the `Expense` collection */
  updateExpenseCollection: ExpenseUpdateResponse;
  /** Updates zero or more records in the `ExpenseSplit` collection */
  updateExpenseSplitCollection: ExpenseSplitUpdateResponse;
  /** Updates zero or more records in the `Group` collection */
  updateGroupCollection: GroupUpdateResponse;
  /** Updates zero or more records in the `GroupMember` collection */
  updateGroupMemberCollection: GroupMemberUpdateResponse;
  /** Updates zero or more records in the `Profile` collection */
  updateProfileCollection: ProfileUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromDebitCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<DebitFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromExpenseCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<ExpenseFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromExpenseSplitCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<ExpenseSplitFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromGroupCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<GroupFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromGroupMemberCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<GroupMemberFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromProfileCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<ProfileFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoDebitCollectionArgs = {
  objects: Array<DebitInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoExpenseCollectionArgs = {
  objects: Array<ExpenseInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoExpenseSplitCollectionArgs = {
  objects: Array<ExpenseSplitInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoGroupCollectionArgs = {
  objects: Array<GroupInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoGroupMemberCollectionArgs = {
  objects: Array<GroupMemberInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoProfileCollectionArgs = {
  objects: Array<ProfileInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateDebitCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<DebitFilter>;
  set: DebitUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateExpenseCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<ExpenseFilter>;
  set: ExpenseUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateExpenseSplitCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<ExpenseSplitFilter>;
  set: ExpenseSplitUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateGroupCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<GroupFilter>;
  set: GroupUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateGroupMemberCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<GroupMemberFilter>;
  set: GroupMemberUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateProfileCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter: InputMaybe<ProfileFilter>;
  set: ProfileUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq: InputMaybe<Scalars['Opaque']['input']>;
  is: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Maybe<Scalars['String']['output']>;
};

export type Profile = Node & {
  __typename?: 'Profile';
  createdAt: Scalars['Datetime']['output'];
  credits: Maybe<DebitConnection>;
  debits: Maybe<DebitConnection>;
  expensesCreated: Maybe<ExpenseConnection>;
  expensesPaid: Maybe<ExpenseConnection>;
  expensesReceived: Maybe<ExpenseConnection>;
  groupsCreated: Maybe<GroupConnection>;
  groupsParticipating: Maybe<GroupMemberConnection>;
  id: Scalars['UUID']['output'];
  name: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  splitsParticipating: Maybe<ExpenseSplitConnection>;
};


export type ProfileCreditsArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<DebitFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<DebitOrderBy>>;
};


export type ProfileDebitsArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<DebitFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<DebitOrderBy>>;
};


export type ProfileExpensesCreatedArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<ExpenseFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<ExpenseOrderBy>>;
};


export type ProfileExpensesPaidArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<ExpenseFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<ExpenseOrderBy>>;
};


export type ProfileExpensesReceivedArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<ExpenseFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<ExpenseOrderBy>>;
};


export type ProfileGroupsCreatedArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<GroupFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GroupOrderBy>>;
};


export type ProfileGroupsParticipatingArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<GroupMemberFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GroupMemberOrderBy>>;
};


export type ProfileSplitsParticipatingArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<ExpenseSplitFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<ExpenseSplitOrderBy>>;
};

export type ProfileConnection = {
  __typename?: 'ProfileConnection';
  edges: Array<ProfileEdge>;
  pageInfo: PageInfo;
};

export type ProfileDeleteResponse = {
  __typename?: 'ProfileDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

export type ProfileEdge = {
  __typename?: 'ProfileEdge';
  cursor: Scalars['String']['output'];
  node: Profile;
};

export type ProfileFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and: InputMaybe<Array<ProfileFilter>>;
  createdAt: InputMaybe<DatetimeFilter>;
  id: InputMaybe<UuidFilter>;
  name: InputMaybe<StringFilter>;
  nodeId: InputMaybe<IdFilter>;
  /** Negates a filter */
  not: InputMaybe<ProfileFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or: InputMaybe<Array<ProfileFilter>>;
};

export type ProfileInsertInput = {
  createdAt: InputMaybe<Scalars['Datetime']['input']>;
  id: InputMaybe<Scalars['UUID']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
};

export type ProfileInsertResponse = {
  __typename?: 'ProfileInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

export type ProfileOrderBy = {
  createdAt: InputMaybe<OrderByDirection>;
  id: InputMaybe<OrderByDirection>;
  name: InputMaybe<OrderByDirection>;
};

export type ProfileUpdateInput = {
  createdAt: InputMaybe<Scalars['Datetime']['input']>;
  id: InputMaybe<Scalars['UUID']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
};

export type ProfileUpdateResponse = {
  __typename?: 'ProfileUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `Debit` */
  debitCollection: Maybe<DebitConnection>;
  /** A pagable collection of type `Expense` */
  expenseCollection: Maybe<ExpenseConnection>;
  /** A pagable collection of type `ExpenseSplit` */
  expenseSplitCollection: Maybe<ExpenseSplitConnection>;
  group: Maybe<Group>;
  /** A pagable collection of type `Group` */
  groupCollection: Maybe<GroupConnection>;
  /** A pagable collection of type `GroupMember` */
  groupMemberCollection: Maybe<GroupMemberConnection>;
  isGroupAdmin: Maybe<Scalars['Boolean']['output']>;
  isGroupMember: Maybe<Scalars['Boolean']['output']>;
  /** Retrieve a record by its `ID` */
  node: Maybe<Node>;
  /** A pagable collection of type `Profile` */
  profileCollection: Maybe<ProfileConnection>;
};


/** The root type for querying data */
export type QueryDebitCollectionArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<DebitFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<DebitOrderBy>>;
};


/** The root type for querying data */
export type QueryExpenseCollectionArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<ExpenseFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<ExpenseOrderBy>>;
};


/** The root type for querying data */
export type QueryExpenseSplitCollectionArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<ExpenseSplitFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<ExpenseSplitOrderBy>>;
};


/** The root type for querying data */
export type QueryGroupArgs = {
  gid: Scalars['UUID']['input'];
};


/** The root type for querying data */
export type QueryGroupCollectionArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<GroupFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GroupOrderBy>>;
};


/** The root type for querying data */
export type QueryGroupMemberCollectionArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<GroupMemberFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<GroupMemberOrderBy>>;
};


/** The root type for querying data */
export type QueryIsGroupAdminArgs = {
  gid: Scalars['UUID']['input'];
};


/** The root type for querying data */
export type QueryIsGroupMemberArgs = {
  gid: Scalars['UUID']['input'];
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryProfileCollectionArgs = {
  after: InputMaybe<Scalars['Cursor']['input']>;
  before: InputMaybe<Scalars['Cursor']['input']>;
  filter: InputMaybe<ProfileFilter>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Array<ProfileOrderBy>>;
};

export enum SplitType {
  Custom = 'CUSTOM',
  Equal = 'EQUAL',
  Percentage = 'PERCENTAGE'
}

/** Boolean expression comparing fields on type "SplitType" */
export type SplitTypeFilter = {
  eq: InputMaybe<SplitType>;
  in: InputMaybe<Array<SplitType>>;
  is: InputMaybe<FilterIs>;
  neq: InputMaybe<SplitType>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq: InputMaybe<Scalars['String']['input']>;
  gt: InputMaybe<Scalars['String']['input']>;
  gte: InputMaybe<Scalars['String']['input']>;
  ilike: InputMaybe<Scalars['String']['input']>;
  in: InputMaybe<Array<Scalars['String']['input']>>;
  iregex: InputMaybe<Scalars['String']['input']>;
  is: InputMaybe<FilterIs>;
  like: InputMaybe<Scalars['String']['input']>;
  lt: InputMaybe<Scalars['String']['input']>;
  lte: InputMaybe<Scalars['String']['input']>;
  neq: InputMaybe<Scalars['String']['input']>;
  regex: InputMaybe<Scalars['String']['input']>;
  startsWith: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy: InputMaybe<Array<Scalars['String']['input']>>;
  contains: InputMaybe<Array<Scalars['String']['input']>>;
  eq: InputMaybe<Array<Scalars['String']['input']>>;
  is: InputMaybe<FilterIs>;
  overlaps: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq: InputMaybe<Scalars['Time']['input']>;
  gt: InputMaybe<Scalars['Time']['input']>;
  gte: InputMaybe<Scalars['Time']['input']>;
  in: InputMaybe<Array<Scalars['Time']['input']>>;
  is: InputMaybe<FilterIs>;
  lt: InputMaybe<Scalars['Time']['input']>;
  lte: InputMaybe<Scalars['Time']['input']>;
  neq: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy: InputMaybe<Array<Scalars['Time']['input']>>;
  contains: InputMaybe<Array<Scalars['Time']['input']>>;
  eq: InputMaybe<Array<Scalars['Time']['input']>>;
  is: InputMaybe<FilterIs>;
  overlaps: InputMaybe<Array<Scalars['Time']['input']>>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq: InputMaybe<Scalars['UUID']['input']>;
  in: InputMaybe<Array<Scalars['UUID']['input']>>;
  is: InputMaybe<FilterIs>;
  neq: InputMaybe<Scalars['UUID']['input']>;
};

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy: InputMaybe<Array<Scalars['UUID']['input']>>;
  contains: InputMaybe<Array<Scalars['UUID']['input']>>;
  eq: InputMaybe<Array<Scalars['UUID']['input']>>;
  is: InputMaybe<FilterIs>;
  overlaps: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type GroupPageQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GroupPageQuery = { __typename: 'Query', group: (
    { __typename: 'Group', id: string }
    & { ' $fragmentRefs'?: { 'GroupHeaderFragmentFragment': GroupHeaderFragmentFragment;'GroupFragmentFragment': GroupFragmentFragment } }
  ) | null };

export type ExpenseItemFragmentFragment = { __typename: 'Expense', id: string, type: string, splitType: SplitType | null, description: string | null, amount: string, currency: string, paidAt: string, createdAt: string, updatedAt: string, group: { __typename: 'Group', id: string } | null, toUser: { __typename: 'Profile', id: string, name: string | null } | null, paidBy: { __typename: 'Profile', id: string, name: string | null } | null, createdBy: { __typename: 'Profile', id: string, name: string | null } | null, splits: { __typename: 'ExpenseSplitConnection', edges: Array<{ __typename: 'ExpenseSplitEdge', node: { __typename: 'ExpenseSplit', amount: string, percentage: string | null, user: { __typename: 'Profile', id: string, name: string | null } | null } }> } | null } & { ' $fragmentName'?: 'ExpenseItemFragmentFragment' };

export type GroupFragmentFragment = (
  { __typename: 'Group', id: string, name: string, description: string | null, defaultCurrency: string, debitMode: DebitMode, debits: { __typename: 'DebitConnection', edges: Array<{ __typename: 'DebitEdge', node: { __typename: 'Debit', nodeId: string, amount: string | null, currency: string | null, fromUser: { __typename: 'Profile', id: string, name: string | null } | null, toUser: { __typename: 'Profile', id: string, name: string | null } | null } }> } | null, expenses: { __typename: 'ExpenseConnection', edges: Array<{ __typename: 'ExpenseEdge', node: (
        { __typename: 'Expense', id: string, paidAt: string }
        & { ' $fragmentRefs'?: { 'ExpenseItemFragmentFragment': ExpenseItemFragmentFragment } }
      ) }> } | null }
  & { ' $fragmentRefs'?: { 'GroupMembersFragmentFragment': GroupMembersFragmentFragment } }
) & { ' $fragmentName'?: 'GroupFragmentFragment' };

export type GroupHeaderFragmentFragment = { __typename: 'Group', id: string, name: string, description: string | null, defaultCurrency: string, debitMode: DebitMode } & { ' $fragmentName'?: 'GroupHeaderFragmentFragment' };

export type GroupListQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupListQuery = { __typename: 'Query', groups: { __typename: 'GroupConnection', edges: Array<{ __typename: 'GroupEdge', node: { __typename: 'Group', id: string, name: string, description: string | null } }> } | null };

export type GroupMembersFragmentFragment = { __typename: 'Group', id: string, members: { __typename: 'GroupMemberConnection', edges: Array<{ __typename: 'GroupMemberEdge', node: { __typename: 'GroupMember', user: { __typename: 'Profile', id: string, name: string | null } | null } }> } | null } & { ' $fragmentName'?: 'GroupMembersFragmentFragment' };

export const ExpenseItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"splitType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paidBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paidAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ExpenseItemFragmentFragment, unknown>;
export const GroupMembersFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupMembersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GroupMembersFragmentFragment, unknown>;
export const GroupFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"defaultCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"debitMode"}},{"kind":"Field","name":{"kind":"Name","value":"debits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nodeId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"fromUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"expenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paidAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseItemFragment"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupMembersFragment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"splitType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paidBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paidAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupMembersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GroupFragmentFragment, unknown>;
export const GroupHeaderFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupHeaderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"defaultCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"debitMode"}}]}}]} as unknown as DocumentNode<GroupHeaderFragmentFragment, unknown>;
export const GroupPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupHeaderFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"splitType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paidBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paidAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"splits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupMembersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupHeaderFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"defaultCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"debitMode"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"defaultCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"debitMode"}},{"kind":"Field","name":{"kind":"Name","value":"debits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"nodeId"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"fromUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"expenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paidAt"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseItemFragment"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupMembersFragment"}}]}}]} as unknown as DocumentNode<GroupPageQuery, GroupPageQueryVariables>;
export const GroupListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"groups"},"name":{"kind":"Name","value":"groupCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GroupListQuery, GroupListQueryVariables>;