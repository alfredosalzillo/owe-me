import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router";

const RootNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h1" component="h1" sx={{ fontSize: { xs: 56, sm: 72 }, fontWeight: 800, letterSpacing: -1 }} gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="p" gutterBottom>
          Oops! Page not found.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you’re looking for doesn’t exist or may have been moved.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" component={Link} to="/">
            Go to Home
          </Button>
          <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default RootNotFound;
