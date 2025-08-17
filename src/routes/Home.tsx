import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useDialogs } from "@toolpad/core/useDialogs";
import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router";
import GroupSettingsDialog from "@/components/GroupSettingsDialog";
import config from "@/config";
import { createGroup, useGroups } from "@/plugins/api/groups";

const GroupList = lazy(() => import("@/components/GroupList"));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dialogs = useDialogs();
  const navigate = useNavigate();
  const [, revalidateGroups] = useGroups();

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const openCreate = async () => {
    const values = await dialogs.open(GroupSettingsDialog, {
      mode: "create",
      title: "Create Group",
    });
    if (!values) {
      return;
    }
    const group = await createGroup(values);
    await revalidateGroups();
    navigate(`/groups/${group.id}`);
  };
  return (
    <Box>
      <AppBar
        position="static"
        variant="outlined"
        sx={{
          borderTop: 0,
          borderRight: 0,
          borderLeft: 0,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {config.siteName}
          </Typography>
          <Button color="inherit" onClick={openCreate}>
            New Group
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        {/* Add drawer content here */}
      </Drawer>
    </Box>
  );
};

const Home = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}
  >
    <Header />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 0,
        width: "100%",
      }}
    >
      <Container disableGutters sx={{ pt: 2, pb: 2 }}>
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
          <GroupList />
        </Suspense>
      </Container>
    </Box>
  </Box>
);

export default Home;
