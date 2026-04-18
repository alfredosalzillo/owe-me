import Box from "@mui/material/Box";
import { FC, ReactNode } from "react";

type PageShellProps = {
  header?: ReactNode;
  children: ReactNode;
};

const PageShell: FC<PageShellProps> = ({ header, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {header}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageShell;
