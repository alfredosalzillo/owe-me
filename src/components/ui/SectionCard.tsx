import Paper from "@mui/material/Paper";
import { FC, ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
};

const SectionCard: FC<SectionCardProps> = ({ children }) => {
  return (
    <Paper sx={{ width: 1, p: { xs: 1.5, sm: 2 }, borderRadius: 1.5 }}>
      {children}
    </Paper>
  );
};

export default SectionCard;
