import {
  Expense,
  Group,
  GroupMember,
  GroupPreview,
  GroupUser,
  MemberRole,
} from "@/plugins/api/types";
import { fetchMe } from "@/plugins/api/user";
import supabase from "@/plugins/supabase";
import useAsync from "@/plugins/useAsync";

const mapProfileToGroupUser = (row: {
  id: string;
  name: string | null;
}): GroupUser => {
  return {
    id: row.id,
    name: row.name || "User",
  };
};

const loadGroupMembers = async (groupId: string): Promise<GroupMember[]> => {
  const { data } = await supabase
    .from("group_members")
    .select("user_id, role, joined_at, profiles(id, name)")
    .eq("group_id", groupId)
    .throwOnError();
  return (
    data?.map((gm) => ({
      user: mapProfileToGroupUser(gm.profiles),
      role: (gm.role as MemberRole) || "MEMBER",
      joinedAt: new Date(gm.joined_at),
    })) || []
  );
};

const loadExpenseSplits = async (expenseId: string) => {
  const { data } = await supabase
    .from("expense_splits")
    .select("user_id, amount, percentage, profiles(id, name)")
    .eq("expense_id", expenseId)
    .throwOnError();
  return (
    data?.map((s) => ({
      user: mapProfileToGroupUser(s.profiles),
      amount: s.amount,
      percentage: s.percentage ?? undefined,
    })) || []
  );
};

const loadGroupExpenses = async (groupId: string): Promise<Expense[]> => {
  const { data } = await supabase
    .from("expenses")
    .select(
      "id, amount, currency, description, type, paid_at, created_at, updated_at, paid_by:profiles!expenses_paid_by_fkey(id, name), created_by:profiles!expenses_created_by_fkey(id, name), to_user:profiles!expenses_to_user_fkey(id, name)",
    )
    .eq("group_id", groupId)
    .order("paid_at", { ascending: false })
    .order("created_at", { ascending: false })
    .throwOnError();

  return await Promise.all(
    (data || []).map(async (e) => {
      const base = {
        id: e.id,
        amount: e.amount,
        currency: e.currency,
        description: e.description ?? "",
        paidBy: mapProfileToGroupUser(e.paid_by),
        paidAt: new Date(e.paid_at),
        createdAt: new Date(e.created_at),
        createdBy: mapProfileToGroupUser(e.created_by),
        updatedAt: new Date(e.updated_at),
      };
      if (e.type === "payment") {
        return {
          ...base,
          type: "payment" as const,
          toUser: e.to_user ? mapProfileToGroupUser(e.to_user) : base.paidBy, // fallback
        };
      }
      // standard expense
      const splits = await loadExpenseSplits(e.id);
      // naive splitType: determine by presence of percentage
      const splitType = splits.some((s) => s.percentage !== undefined)
        ? ("PERCENTAGE" as const)
        : ("EQUAL" as const);
      return {
        ...base,
        type: "standard" as const,
        splitType,
        splits,
      };
    }),
  );
};

export const fetchGroup = async (id: string): Promise<Group> => {
  const { data: groupRow } = await supabase
    .from("groups")
    .select(
      "id, name, description, default_currency, debit_mode, created_at, created_by",
    )
    .eq("id", id)
    .single()
    .throwOnError();

  const members = await loadGroupMembers(id);
  const expenses = await loadGroupExpenses(id);
  const createdByProfile = await supabase
    .from("profiles")
    .select("id, name")
    .eq("id", groupRow.created_by)
    .maybeSingle();

  const createdBy = createdByProfile.data
    ? mapProfileToGroupUser(createdByProfile.data)
    : { id: groupRow.created_by, name: "User" };

  return {
    id: groupRow.id,
    name: groupRow.name,
    description: groupRow.description ?? undefined,
    defaultCurrency: groupRow.default_currency || "USD",
    debitMode: groupRow.debit_mode || "default",
    members,
    expenses,
    balances: [],
    createdAt: new Date(groupRow.created_at),
    createdBy,
    updatedAt: new Date(groupRow.created_at),
  };
};

export const useGroup = (id: string) => {
  return useAsync(`group-${id}`, () => fetchGroup(id));
};

export const fetchGroups = async (): Promise<GroupPreview[]> => {
  const me = await fetchMe();
  const { data } = await supabase
    .from("group_members")
    .select(
      "groups(id, name, description, default_currency, created_at, created_by)",
    )
    .eq("user_id", me.id)
    .throwOnError();
  const rows = (data || []).map((row) => row.groups).filter(Boolean);

  const previews: GroupPreview[] = await Promise.all(
    rows.map(async (g) => {
      const createdBy = await supabase
        .from("profiles")
        .select("id, name")
        .eq("id", g.created_by)
        .maybeSingle();
      return {
        id: g.id,
        name: g.name,
        description: g.description ?? undefined,
        defaultCurrency: g.default_currency || "USD",
        members: [],
        createdAt: new Date(g.created_at),
        createdBy: createdBy.data
          ? mapProfileToGroupUser(createdBy.data)
          : { id: g.created_by, name: "User" },
        updatedAt: new Date(g.created_at),
      };
    }),
  );
  return previews;
};

export const useGroups = () => {
  return useAsync("groups", fetchGroups);
};

export type CreateGroupInput = {
  name: string;
  description?: string;
  defaultCurrency?: string;
  debitMode?: Group["debitMode"];
};

export const createGroup = async (input: CreateGroupInput): Promise<Group> => {
  const me = await fetchMe();
  const nowIso = new Date().toISOString();
  const { data } = await supabase
    .from("groups")
    .insert({
      name: input.name.trim(),
      description: input.description?.trim() || null,
      default_currency: input.defaultCurrency || "USD",
      debit_mode: input.debitMode || "default",
      created_by: me.id,
      created_at: nowIso,
    })
    .select("id")
    .single()
    .throwOnError();

  const groupId = data.id;

  await supabase
    .from("group_members")
    .insert({
      group_id: groupId,
      user_id: me.id,
      role: "ADMIN",
      joined_at: nowIso,
    })
    .throwOnError();

  return fetchGroup(groupId);
};

export type UpdateGroupInput = Partial<
  Pick<Group, "name" | "description" | "defaultCurrency" | "debitMode">
>;

export const updateGroup = async (
  id: string,
  input: UpdateGroupInput,
): Promise<Group> => {
  if (Object.keys(input).length > 0) {
    await supabase
      .from("groups")
      .update({
        name: input.name,
        description: input.description,
        default_currency: input.defaultCurrency,
        debit_mode: input.debitMode,
      })
      .eq("id", id)
      .throwOnError();
  }
  return fetchGroup(id);
};
