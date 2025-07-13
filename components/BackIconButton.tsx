"use client";
import BackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, IconButtonProps } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";

export type BackIconButtonProps = IconButtonProps;
const BackIconButton: FC<BackIconButtonProps> = (props) => {
  const router = useRouter();
  return (
    <IconButton {...props} onClick={() => router.back()}>
      <BackIcon />
    </IconButton>
  );
};

export default BackIconButton;
