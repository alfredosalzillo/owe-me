"use client";

import { CircularProgress, Container } from "@mui/material";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";

const GroupList = dynamic(() => import("@/components/GroupList"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  ),
});

const AppHome = () => {
  return (
    <Container disableGutters sx={{ pt: 2, pb: 2 }}>
      <GroupList />
    </Container>
  );
};

export default AppHome;
