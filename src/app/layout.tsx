import { ApolloProvider } from "@apollo/client/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DialogsProvider, NotificationsProvider } from "@toolpad/core";
import React, { FC, ReactNode } from "react";
import theme from "@/app/theme";
import apolloClient from "@/plugins/supabase/apollo-client";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationsProvider>
        <DialogsProvider>{children}</DialogsProvider>
      </NotificationsProvider>
    </ThemeProvider>
  </ApolloProvider>
);

export default RootLayout;
