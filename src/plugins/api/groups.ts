import { Group, GroupPreview } from "@/plugins/api/types";
import useAsync from "@/plugins/useAsync";

export const fetchGroup = async (id: string): Promise<Group> => {
  const mocks = await import("./mocks/mocks");
  const group = mocks.groups.find((group) => group.id === id);
  if (!group) {
    throw new Error("Group not found");
  }
  return group;
};

export const useGroup = (id: string) => {
  return useAsync(`group-${id}`, () => fetchGroup(id));
};

export const fetchGroups = async (): Promise<GroupPreview[]> => {
  const mocks = await import("./mocks/mocks");
  return mocks.groups;
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
  const mocks = await import("./mocks/mocks");
  const now = new Date();
  const id = `group-${Math.random().toString(36).slice(2, 10)}`;
  const defaultCurrency = input.defaultCurrency || "USD";
  const debitMode = input.debitMode || "default";
  const me = mocks.me;
  const group: Group = {
    id,
    name: input.name.trim(),
    description: input.description?.trim() || undefined,
    defaultCurrency,
    debitMode,
    members: [
      {
        user: { id: me.id, name: me.name },
        role: "ADMIN",
        joinedAt: now,
      },
    ],
    expenses: [],
    balances: [],
    createdAt: now,
    createdBy: { id: me.id, name: me.name },
    updatedAt: now,
  };
  mocks.groups.push(group);
  return group;
};

export type UpdateGroupInput = Partial<
  Pick<Group, "name" | "description" | "defaultCurrency" | "debitMode">
>;

export const updateGroup = async (
  id: string,
  input: UpdateGroupInput,
): Promise<Group> => {
  const mocks = await import("./mocks/mocks");
  const idx = mocks.groups.findIndex((g) => g.id === id);
  if (idx === -1) {
    throw new Error("Group not found");
  }
  const prev = mocks.groups[idx];
  const updated: Group = {
    ...prev,
    ...input,
    name: input.name !== undefined ? input.name : prev.name,
    description:
      input.description !== undefined ? input.description : prev.description,
    defaultCurrency:
      input.defaultCurrency !== undefined
        ? input.defaultCurrency
        : prev.defaultCurrency,
    debitMode: input.debitMode !== undefined ? input.debitMode : prev.debitMode,
    updatedAt: new Date(),
  };
  mocks.groups[idx] = updated;
  return updated;
};
