import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import config from "@/config";
import supabase from "@/plugins/supabase/client";

const Page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${config.siteUrl}/auth/confirm`,
        },
      });
      if (error) {
        throw error;
      }
      setMessage("Check your email for the magic link to log in.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err?.message ?? "Failed to send magic link.");
        return;
      }
      setError("Failed to send magic link.");
    } finally {
      setLoading(false);
    }
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
          >
            {loading ? "Sending..." : "Send magic link"}
          </Button>
        </Box>
        {message && (
          <Alert sx={{ mt: 2 }} severity="success">
            {message}
          </Alert>
        )}
        {error && (
          <Alert sx={{ mt: 2 }} severity="error">
            {error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default Page;
