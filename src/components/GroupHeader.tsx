import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import { FC } from "react";
import BackIconButton from "@/components/BackIconButton";
import { useGroup } from "@/plugins/api/groups";
import useUpdateGroup from "@/plugins/api/useUpdateGroup";

type GroupHeaderProps = {
  id: string;
};
const GroupHeader: FC<GroupHeaderProps> = ({ id }) => {
  const [group, revalidateGroup] = useGroup(id);

  const updateGroup = useUpdateGroup();

  const openDialog = async () => {
    await updateGroup(group.id, group);
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
