"use server";

import { Group, GroupPreview } from "@/plugins/api/types";

export const fetchGroup = async (id: string): Promise<Group> => {
  const mocks = await import("./mocks/mocks");
  const group = mocks.groups.find((group) => group.id === id);
  if (!group) {
    throw new Error("Group not found");
  }
  return group;
};

export const fetchGroups = async (): Promise<GroupPreview[]> => {
  const mocks = await import("./mocks/mocks");
  return mocks.groups;
};
