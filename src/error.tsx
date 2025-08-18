import {
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import theme from "@/theme";

const RootError: React.FC = () => {
  const error = useRouteError();

  const { title, description } = useMemo(() => {
    if (isRouteErrorResponse(error)) {
      const description = (error.data && (error.data.message || error.data)) as
        | string
        | undefined;
      return { title: `${error.status} ${error.statusText}`, description };
    }
    if (error instanceof Error) {
      return { title: "Something went wrong", description: error.message };
    }
    if (typeof error === "string") {
      return { title: "Something went wrong", description: error };
    }
    return { title: "Something went wrong", description: undefined };
  }, [error]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {description}
            </Typography>
          )}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" color="primary" component={Link} to="/">
              Go to Home
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RootError;
