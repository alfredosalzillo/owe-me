import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { fetchGroups } from "@/plugins/api/groups";

const DashboardHome = async () => {
  const groups = await fetchGroups();
  return (
    <Container disableGutters sx={{ pt: 2, pb: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Groups
      </Typography>

      <List>
        {groups.map((group) => (
          <ListItem key={group.id} disablePadding>
            <ListItemButton
              component={Link}
              href={`/dashboard/groups/${group.id}`}
            >
              <ListItemAvatar>
                <Avatar>{group.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={group.name}
                secondary={group.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DashboardHome;
