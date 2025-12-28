import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNotifications } from "@toolpad/core";
import React, { useState } from "react";
import config from "@/config";
import supabase from "@/plugins/supabase/client";

const Page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const notifications = useNotifications();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${config.siteUrl}/auth/confirm`,
      },
    });
    if (error) {
      notifications.show(error.message ?? "Failed to send magic link.", {
        severity: "error",
      });
      setLoading(false);
      return;
    }
    notifications.show("Check your email for the magic link to log in.", {
      severity: "success",
    });
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Log in
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          We'll send a magic link to your email.
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            type="email"
            label="Email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading || !email}
            loading={loading}
          >
            Send magic link
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Page;
