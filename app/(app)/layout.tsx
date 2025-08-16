import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import type { FC } from "react";
import React from "react";
import theme from "@/app/theme";
import AppProviders from "@/components/AppProviders";
import config from "@/config";

export const metadata: Metadata = {
  title: `${config.siteName}`,
  description: config.siteDescription,
};

type AppLayoutProps = {
  children: React.ReactNode;
  header: React.ReactNode;
};
const AppLayout: FC<AppLayoutProps> = ({ header, children }) => {
  return (
    <html lang="en" dir="ltr">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <AppProviders>
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
                    p: 0,
                    width: "100%",
                  }}
                >
                  {children}
                </Box>
              </Box>
            </AppProviders>
          </ThemeProvider>
        </AppRouterCacheProvider>
        {config.analytics.googleAnalyticsId && (
          <GoogleAnalytics gaId={config.analytics.googleAnalyticsId} />
        )}
      </body>
    </html>
  );
};

export default AppLayout;
