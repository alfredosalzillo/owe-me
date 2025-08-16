import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import { useGroups } from "@/plugins/api/groups";

const GroupList = () => {
  const [groups] = useGroups();
  return (
    <List disablePadding>
      {groups.map((group) => (
        <ListItem key={group.id} disablePadding>
          <ListItemButton component={Link} href={`/group?id=${group.id}`}>
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
  )
}

export default GroupList