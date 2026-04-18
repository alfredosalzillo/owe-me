import { useSuspenseQuery } from "@apollo/client/react";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { FC, Suspense, useState } from "react";
import { useNavigate } from "react-router";
import GroupList from "@/components/GroupList";
import PageContent from "@/components/ui/PageContent";
import PageShell from "@/components/ui/PageShell";
import PageTopBar from "@/components/ui/PageTopBar";
import config from "@/config";
import { graphql } from "@/gql";
import useCreateGroup from "@/plugins/api/useCreateGroup";
import { route } from "@/plugins/app-router-helpers";

const HomeDocument = graphql(`
    query HomePage {
        ...GroupListFragment
    }
`);

type HeaderProps = {
  onCreateGroup?: (groupId: string) => void;
};
const Header: FC<HeaderProps> = ({ onCreateGroup }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const createGroup = useCreateGroup();

  const createGroupAndNavigate = async () => {
    const group = await createGroup();
    if (!group) {
      return;
    }
    onCreateGroup?.(group.id);
  };

  return (
    <Box>
      <PageTopBar
        title={config.siteName}
        startAction={
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        }
        actions={
          <Button color="inherit" onClick={createGroupAndNavigate}>
            New Group
          </Button>
        }
      />
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
        slotProps={{
          paper: {
            variant: "outlined",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate(route("/(private)/settings", {}));
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate(route("/auth/logout", {}));
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

const Home = () => {
  const { refetch } = useSuspenseQuery(HomeDocument);
  const navigate = useNavigate();
  return (
    <PageShell
      header={
        <Header
          onCreateGroup={async (groupId) => {
            await refetch();
            navigate(route("/(private)/groups/[id]", { id: groupId }));
          }}
        />
      }
    >
      <PageContent>
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
          <GroupList
            onCreateGroup={async (groupId) => {
              await refetch();
              navigate(route("/(private)/groups/[id]", { id: groupId }));
            }}
          />
        </Suspense>
      </PageContent>
    </PageShell>
  );
};

export default Home;
