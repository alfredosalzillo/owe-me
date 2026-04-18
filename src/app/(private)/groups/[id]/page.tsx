import { useSuspenseQuery } from "@apollo/client/react";
import React from "react";
import { useParams } from "react-router";
import Group from "@/components/Group";
import GroupHeader from "@/components/GroupHeader";
import PageShell from "@/components/ui/PageShell";
import { graphql } from "@/gql";

const GroupPageDocument = graphql(`
    query GroupPage($id: UUID!) {
        group(gid: $id) {
            id
            ...GroupHeaderFragment
            ...GroupFragment
        }
    }
`);
const GroupPage = () => {
  const params = useParams<"id">();
  const { id } = params;
  if (!id) {
    throw new Error("Group ID is required");
  }
  const { data, refetch } = useSuspenseQuery(GroupPageDocument, {
    variables: { id },
  });

  if (!data.group) {
    throw new Error("Group not found");
  }

  return (
    <PageShell header={<GroupHeader id={id} onEdit={() => refetch()} />}>
      <Group id={id} onUpdate={refetch} />
    </PageShell>
  );
};

export default GroupPage;
