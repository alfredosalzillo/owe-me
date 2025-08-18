import Box from "@mui/material/Box";
import React from "react";
import { useParams } from "react-router";
import Group from "@/components/Group";
import GroupHeader from "@/components/GroupHeader";

const GroupPage = () => {
  const params = useParams<"id">();
  const { id } = params;
  if (!id) {
    throw new Error("Group ID is required");
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <GroupHeader id={id} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: "100%",
        }}
      >
        <Group id={id} />
      </Box>
    </Box>
  );
};

export default GroupPage;
