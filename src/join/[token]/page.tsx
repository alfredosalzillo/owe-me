import { Button, Container, Paper, Typography } from "@mui/material";
import { useNotifications } from "@toolpad/core";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { acceptInvite, useInvite } from "@/plugins/api/invites";
import supabase from "@/plugins/supabase/client";

const JoinGroupPage = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notifications = useNotifications();

  if (!token) {
    throw new Error("Token is required");
  }

  const invite = useInvite(token);

  if (!invite) {
    throw new Error("Cannot find any invite");
  }

  const acceptInviteAndJoinGroup = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Redirect to login but save the invite token to join after login
        // For now, let's just use the current origin
        navigate(
          `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`,
        );
        return;
      }

      const success = await acceptInvite(token!);
      if (success) {
        navigate(`/groups/${invite.groupId}`, { replace: true });
        return;
      }
      notifications.show(
        "Failed to join group. The invite might be expired or already used.",
        {
          severity: "error",
        },
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        notifications.show(err.message, {
          severity: "error",
        });
        return;
      }
      notifications.show("An error occurred while joining the group", {
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, textAlign: "center" }} variant="outlined">
        <Typography variant="h4" gutterBottom>
          You're invited!
        </Typography>
        <Typography variant="body1" gutterBottom>
          You have been invited to join the group{" "}
          <strong>{invite?.group?.name}</strong>.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={acceptInviteAndJoinGroup}
          sx={{ mt: 4 }}
          fullWidth
          loading={loading}
        >
          Join Group
        </Button>
      </Paper>
    </Container>
  );
};

export default JoinGroupPage;
