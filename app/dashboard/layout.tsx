import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QRCodeIcon from "@mui/icons-material/QrCode";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Branding, Navigation } from "@toolpad/core";
import { NextAppProvider } from "@toolpad/core/nextjs";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { FC } from "react";
import React from "react";
import theme from "@/app/theme";
import config from "@/config";

export const metadata: Metadata = {
  title: `${config.siteName} - Dashboard`,
  description: config.siteDescription,
};

async function signIn() {
  "use server";

  redirect("/sign-in");
}
async function signOut() {
  "use server";

  redirect("/auth/logout");
}

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "dashboard/menus",
    title: "Menus",
    icon: <MenuBookIcon />,
  },
  {
    segment: "dashboard/qr-code",
    title: "QR Code",
    icon: <QRCodeIcon />,
  },
];

const BRANDING: Branding = {
  homeUrl: "/dashboard",
  title: config.siteName.toUpperCase(),
  logo: <span />,
};

type DashboardLayoutProps = {
  children: React.ReactNode;
};
const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
  return (
    <html lang="en" dir="ltr">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <NextAppProvider
              theme={theme}
              navigation={NAVIGATION}
              branding={BRANDING}
              session={{}}
              authentication={{
                signIn,
                signOut,
              }}
            >
              {children}
            </NextAppProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        {config.analytics.googleAnalyticsId && (
          <GoogleAnalytics gaId={config.analytics.googleAnalyticsId} />
        )}
      </body>
    </html>
  );
};

export default DashboardLayout;
