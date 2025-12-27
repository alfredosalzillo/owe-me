import { useSuspenseFragment } from "@apollo/client/react";
import { useMemo } from "react";
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
                        avatarUrl
                        isMe
                    }
                }
            }
        }
    }
`);

type GroupMember = {
  id: string;
  name: string | null;
  avatarUrl: string | null;
  isMe: boolean | null;
};
const useGroupMembers = (groupId: string): GroupMember[] => {
  const { data } = useSuspenseFragment({
    fragment: GroupMembersFragment,
    from: {
      __typename: "Group",
      id: groupId,
    },
  });
  return useMemo(
    () =>
      data.members?.edges
        .map((edge) => edge.node)
        .map((member) => member.user)
        .filter((item) => !!item) ?? [],
    [data],
  );
};

export default useGroupMembers;
