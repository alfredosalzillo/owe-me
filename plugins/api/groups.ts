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
  return useAsync(`group-${id}`, () => fetchGroup(id))
}

export const fetchGroups = async (): Promise<GroupPreview[]> => {
  const mocks = await import("./mocks/mocks");
  return mocks.groups;
};


export const useGroups = () => {
  return useAsync('groups', fetchGroups);
};