import { User } from "@/plugins/api/types";

export const fetchMe = async (): Promise<User> => {
  const mocks = await import("./mocks/mocks");
  return mocks.me;
};
