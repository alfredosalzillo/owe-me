import { useSuspenseFragment } from "@apollo/client/react";
import { graphql } from "@/gql";

const GroupMembersFragment = graphql(`
    fragment GroupMembersFragment on Group {
        id
        members {
            edges {
                node {
                    user {
                        id
                        name
                    }
                }
            }
        }
    }
`);

const useGroupMembers = (groupId: string) => {
  const { data } = useSuspenseFragment({
    fragment: GroupMembersFragment,
    from: {
      __typename: "Group",
      id: groupId,
    },
  });
  return (
    data.members?.edges
      .map((edge) => edge.node)
      .map((member) => member.user)
      .filter((item) => !!item) ?? []
  );
};

export default useGroupMembers;
