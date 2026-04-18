import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNotifications } from "@toolpad/core";
import type { FC, FormEvent } from "react";
import { useState } from "react";
import config from "@/config";
import supabase from "@/plugins/supabase/client";

const Page: FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const notifications = useNotifications();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: decodeURIComponent(
          new URL(window.location.href).searchParams.get("returnUrl") ??
            `${config.siteUrl}`,
        ),
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
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(circle at 0% 0%, rgba(79,140,255,0.18) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(79,140,255,0.12) 0, transparent 45%)",
      }}
    >
      <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 } }}>
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: { xs: 2, sm: 3 },
            backdropFilter: "blur(8px)",
          }}
        >
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                O
              </Avatar>
              <Typography variant="h5">Welcome back</Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in with your email to keep splitting expenses with your
                groups.
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField
                  type="email"
                  label="Email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ minHeight: 44 }}
                  disabled={loading || !email}
                  loading={loading}
                >
                  Send magic link
                </Button>
              </Stack>
            </Box>

            <Typography variant="caption" color="text.secondary">
              By continuing, you&apos;ll receive a secure sign-in link in your
              inbox.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Page;
