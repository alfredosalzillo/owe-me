import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import { FC } from "react";
import BackIconButton from "@/components/BackIconButton";
import { fetchGroup } from "@/plugins/api/groups";

type HeaderGroupSlotProps = {
  params: Promise<{
    id: string;
  }>;
};
const HeaderGroupSlot: FC<HeaderGroupSlotProps> = async ({ params }) => {
  const { id } = await params;
  const group = await fetchGroup(id);
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
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderGroupSlot;
