import { useDialogs } from "@toolpad/core/useDialogs";
import { useCallback } from "react";
import GroupSettingsDialog, {
  GroupSettingsValues,
} from "@/components/GroupSettingsDialog";
import supabase from "@/plugins/supabase/client";

const useUpdateGroup = () => {
  const dialogs = useDialogs();
  return useCallback(
    async (id: string, group: GroupSettingsValues) => {
      const values = await dialogs.open(GroupSettingsDialog, {
        mode: "edit",
        title: "Edit Group Settings",
        initialValues: {
          name: group.name,
          description: group.description,
          defaultCurrency: group.defaultCurrency,
          debitMode: group.debitMode,
        },
      });
      if (!values) {
        return;
      }
      await supabase
        .rpc("update_group", {
          p_id: id,
          p_name: values.name,
          p_description: values.description ?? "",
          p_debit_mode: values.debitMode,
          p_default_currency: values.defaultCurrency,
        })
        .throwOnError();
    },
    [dialogs],
  );
};

export default useUpdateGroup;
