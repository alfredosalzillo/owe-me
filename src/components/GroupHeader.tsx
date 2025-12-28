import { useSuspenseFragment } from "@apollo/client/react";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { FC } from "react";
import BackIconButton from "@/components/BackIconButton";
import { graphql } from "@/gql";
import useUpdateGroup from "@/plugins/api/useUpdateGroup";

const GroupHeaderFragment = graphql(`
    fragment GroupHeaderFragment on Group {
        id
        name
        description
        defaultCurrency
        debitMode
    }
`);

type GroupHeaderProps = {
  id: string;
  onEdit?: () => void;
};
const GroupHeader: FC<GroupHeaderProps> = ({ id, onEdit }) => {
  const { data: group } = useSuspenseFragment({
    fragment: GroupHeaderFragment,
    from: {
      __typename: "Group",
      id,
    },
  });

  const updateGroup = useUpdateGroup();

  const editGroup = async () => {
    await updateGroup(group.id, group);
    onEdit?.();
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
        <Container
          disableGutters
          sx={{ display: "flex", gap: 2, flexGrow: 1, alignItems: "center" }}
        >
          <Avatar sx={{ width: 32, height: 32 }}>{group.name[0]}</Avatar>
          <Typography variant="h5">{group.name}</Typography>
        </Container>
        <IconButton
          size="large"
          aria-label="settings"
          edge="end"
          color="inherit"
          onClick={editGroup}
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default GroupHeader;
