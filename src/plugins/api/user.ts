import { User } from "@/plugins/api/types";
import supabase from "@/plugins/supabase";
import useAsync from "@/plugins/useAsync";

export const fetchMe = async (): Promise<User> => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error("Not authenticated");
  }
  const authUser = data.user;
  // Fetch profile name if available
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name")
    .eq("id", authUser.id)
    .maybeSingle();
  const name =
    profile?.name ||
    authUser.user_metadata?.name ||
    authUser.email?.split("@")[0] ||
    "User";
  return { id: authUser.id, name };
};

export const useMe = () => {
  return useAsync(`me`, () => fetchMe());
};
