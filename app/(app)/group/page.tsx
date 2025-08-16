"use client";

import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import { notFound, useSearchParams } from "next/navigation";
import { FC } from "react";

const Group = dynamic(() => import("@/components/Group"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  ),
});

const GroupPage: FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (!id) {
    notFound();
  }
  return <Group id={id} />;
};

export default GroupPage;
