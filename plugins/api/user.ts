import { User } from "@/plugins/api/types";
import useAsync from "@/plugins/useAsync";

export const fetchMe = async (): Promise<User> => {
  const mocks = await import("./mocks/mocks");
  return mocks.me;
};

export const useMe = () => {
  return useAsync(`me`, () => fetchMe())
}
