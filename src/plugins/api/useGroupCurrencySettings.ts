import { useSuspenseFragment } from "@apollo/client/react";
import { graphql } from "@/gql";

const GroupCurrencySettingsFragment = graphql(`
    fragment GroupCurrencySettingsFragment on Group {
        id
        defaultCurrency
    }
`);

const useGroupCurrencySettings = (groupId: string) => {
  const { data } = useSuspenseFragment({
    fragment: GroupCurrencySettingsFragment,
    from: {
      __typename: "Group",
      id: groupId,
    },
  });
  return data;
};

export default useGroupCurrencySettings;
