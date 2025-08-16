import BackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, IconButtonProps } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";

export type BackIconButtonProps = IconButtonProps;
const BackIconButton: FC<BackIconButtonProps> = (props) => {
  const navigate = useNavigate();
  return (
    <IconButton {...props} onClick={() => navigate(-1)}>
      <BackIcon />
    </IconButton>
  );
};

export default BackIconButton;
