import { useSuspenseQuery } from "@apollo/client/react";
import Box from "@mui/material/Box";
import React from "react";
import { useParams } from "react-router";
import Group from "@/components/Group";
import GroupHeader from "@/components/GroupHeader";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <GroupHeader id={id} onEdit={() => refetch()} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: "100%",
        }}
      >
        <Group id={id} onUpdate={refetch} />
      </Box>
    </Box>
  );
};

export default GroupPage;
