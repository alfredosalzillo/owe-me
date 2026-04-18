import { useMutation, useSuspenseQuery } from "@apollo/client/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadAvatarIcon from "@mui/icons-material/Edit";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNotifications } from "@toolpad/core";
import React, { FC, Suspense, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { graphql } from "@/gql";
import supabase from "@/plugins/supabase/client";

const SettingsQuery = graphql(`
    query SettingsPage {
        me {
            id
            name
            avatarUrl
        }
    }
`);

const UpdateProfileMutation = graphql(`
    mutation UpdateProfile($name: String, $avatarUrl: String, $id: UUID!) {
        updateProfileCollection(
            filter: { id: { eq: $id } }
            set: { name: $name, avatarUrl: $avatarUrl }
        ) {
            affectedCount
            records {
                id
                name
                avatarUrl
            }
        }
    }
`);

const SettingsForm: FC = () => {
  const notifications = useNotifications();
  const { data } = useSuspenseQuery(SettingsQuery);
  const me = data.me;
  if (!me) {
    throw new Error("User not found");
  }
  const [updateProfile, { loading }] = useMutation(UpdateProfileMutation);

  const [name, setName] = useState(data.me?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(data.me?.avatarUrl || "");
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${me.id}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) {
      notifications.show(
        "Failed to upload avatar image. Please try again later.",
        {
          severity: "error",
        },
      );
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    setAvatarUrl(publicUrlData.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.me?.id) {
      return;
    }

    await updateProfile({
      variables: {
        id: data.me.id,
        name,
        avatarUrl,
      },
    });
    notifications.show("Profile updated successfully", {
      severity: "success",
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Badge
            color="primary"
            slotProps={{
              badge: {
                sx: {
                  width: 40,
                  height: 40,
                },
              },
            }}
            badgeContent={
              <IconButton
                size="large"
                loading={uploading}
                component="label"
                sx={{ borderRadius: "50%" }}
              >
                <UploadAvatarIcon />
                <input
                  type="file"
                  hidden
                  onChange={uploadImage}
                  accept="image/*"
                />
              </IconButton>
            }
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar src={avatarUrl} sx={{ width: 120, height: 120 }} />
          </Badge>
        </Box>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || uploading}
          size="large"
          fullWidth
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        variant="outlined"
        sx={{ borderTop: 0, borderRight: 0, borderLeft: 0 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <SettingsForm />
      </Suspense>
    </Box>
  );
};

export default SettingsPage;
