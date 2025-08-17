import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import { useDialogs } from "@toolpad/core/useDialogs";
import { FC } from "react";
import BackIconButton from "@/components/BackIconButton";
import GroupSettingsDialog from "@/components/GroupSettingsDialog";
import { updateGroup, useGroup } from "@/plugins/api/groups";

type GroupHeaderProps = {
  id: string;
};
const GroupHeader: FC<GroupHeaderProps> = ({ id }) => {
  const dialogs = useDialogs();
  const [group, revalidateGroup] = useGroup(id);

  const openDialog = async () => {
    const values = await dialogs.open(GroupSettingsDialog, {
      mode: "edit",
      title: "Edit Group Settings",
      initialValues: {
        name: group.name,
        description: group.description,
        defaultCurrency: group.defaultCurrency,
        debitMode: group.debitMode,
      },
    });
    if (!values) {
      return;
    }
    await updateGroup(id, values);
    await revalidateGroup();
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <BackIconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="back"
        />
        <Box sx={{ flexGrow: 1 }}>
          <Container disableGutters>
            <Avatar>{group.name[0]}</Avatar>
          </Container>
        </Box>
        <IconButton
          size="large"
          aria-label="settings"
          edge="end"
          color="inherit"
          onClick={openDialog}
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default GroupHeader;
