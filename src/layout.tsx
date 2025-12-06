import { ApolloProvider } from "@apollo/client/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DialogsProvider, NotificationsProvider } from "@toolpad/core";
import React, { FC, ReactNode } from "react";
import apolloClient from "@/plugins/supabase-graphql";
import theme from "@/theme";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DialogsProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </DialogsProvider>
    </ThemeProvider>
  </ApolloProvider>
);

export default RootLayout;
