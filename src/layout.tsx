import { CssBaseline, ThemeProvider } from "@mui/material";
import { DialogsProvider, NotificationsProvider } from "@toolpad/core";
import React, { FC, ReactNode } from "react";
import theme from "@/theme";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <DialogsProvider>
      <NotificationsProvider>{children}</NotificationsProvider>
    </DialogsProvider>
  </ThemeProvider>
);

export default RootLayout;
