import { useSuspenseQuery } from "@apollo/client/react";
import { useDialogs } from "@toolpad/core/useDialogs";
import { useCallback } from "react";
import InviteMemberDialog from "@/components/InviteMemberDialog";
import { graphql } from "@/gql";
import supabase from "@/plugins/supabase/client";

const GetInviteDocument = graphql(`
    query GetInvite($token: UUID!) {
        groupInviteCollection(filter: { token: { eq: $token } }) {
            edges {
                node {
                    id
                    token
                    groupId
                    email
                    group {
                        name
                    }
                }
            }
        }
    }
`);

export const acceptInvite = async (token: string) => {
  const { data } = await supabase
    .rpc("accept_invite", {
      invite_token: token,
    })
    .throwOnError();

  return data;
};

export const createInvite = async (groupId: string, email?: string) => {
  const { data } = await supabase
    .rpc("create_invite", {
      p_group_id: groupId,
      p_email: email || undefined,
    })
    .throwOnError();

  return data;
};

export const useInviteMember = () => {
  const dialogs = useDialogs();

  return useCallback(
    async (groupId: string) => {
      await dialogs.open(InviteMemberDialog, { groupId });
    },
    [dialogs],
  );
};

export const useInvite = (token: string) => {
  const { data } = useSuspenseQuery(GetInviteDocument, {
    variables: {
      token: token,
    },
  });

  return data?.groupInviteCollection?.edges[0]?.node;
};
