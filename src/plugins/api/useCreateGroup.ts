import { useDialogs } from "@toolpad/core/useDialogs";
import { useCallback } from "react";
import GroupSettingsDialog from "@/components/GroupSettingsDialog";
import supabase from "@/plugins/supabase";

const useCreateGroup = () => {
  const dialogs = useDialogs();
  return useCallback(async () => {
    const values = await dialogs.open(GroupSettingsDialog, {
      mode: "create",
      title: "Create Group",
    });
    if (!values) {
      return;
    }
    const { data: group } = await supabase
      .rpc("create_group", {
        p_name: values.name,
        p_description: values.description ?? "",
        p_debit_mode: values.debitMode,
        p_default_currency: values.defaultCurrency,
      })
      .select("id")
      .throwOnError();
    return group;
  }, [dialogs]);
};

export default useCreateGroup;
