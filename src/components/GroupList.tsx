import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDialogs } from "@toolpad/core/useDialogs";
import { Link, useNavigate } from "react-router";
import GroupSettingsDialog from "@/components/GroupSettingsDialog";
import { createGroup, useGroups } from "@/plugins/api/groups";

const GroupList = () => {
  const [groups, revalidateGroups] = useGroups();
  const dialogs = useDialogs();
  const navigate = useNavigate();

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

  if (groups.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          py: 6,
        }}
      >
        <Typography variant="h6" color="text.secondary" align="center">
          You don’t have any groups yet
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Create your first group to start tracking shared expenses.
        </Typography>
        <Button variant="contained" onClick={openCreate} sx={{ mt: 1 }}>
          Create your first group
        </Button>
      </Box>
    );
  }

  return (
    <List disablePadding>
      {groups.map((group) => (
        <ListItem key={group.id} disablePadding>
          <ListItemButton component={Link} to={`/groups/${group.id}`}>
            <ListItemAvatar>
              <Avatar>{group.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={group.name} secondary={group.description} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default GroupList;
