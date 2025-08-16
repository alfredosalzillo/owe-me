import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { lazy, Suspense, useState } from "react";
import config from "@/config";

const GroupList = lazy(() => import("@/components/GroupList"));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
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
          <Typography variant="h6" noWrap component="div">
            {config.siteName}
          </Typography>
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
