import supabase from "@/plugins/supabase/client";

export const fetchMe = async (): Promise<{
  id: string;
  name: string;
}> => {
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
