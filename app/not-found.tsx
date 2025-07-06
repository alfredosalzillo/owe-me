import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import NextLink from "next/link";
import React from "react";
import theme from "@/app/theme";
import config from "@/config";

export const metadata: Metadata = {
  title: `Not Found - ${config.siteName}`,
  description: config.siteDescription,
};

const NotFoundPage = () => (
  <html lang="en" dir="ltr">
    <body>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Container maxWidth="sm">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                textAlign: "center",
                py: 4,
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ErrorOutlineIcon
                  sx={{ fontSize: 48, color: "error", mb: 2 }}
                />
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  fontWeight="bold"
                >
                  404
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  Page Not Found
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  The page you are looking for doesn&apos;t exist or has been
                  moved.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={NextLink}
                  href="/"
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Back to Home
                </Button>
              </Paper>
            </Box>
          </Container>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default NotFoundPage;
