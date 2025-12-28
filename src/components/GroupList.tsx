import { useSuspenseFragment, useSuspenseQuery } from "@apollo/client/react";
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
import { FC } from "react";
import { Link, useNavigate } from "react-router";
import { graphql } from "@/gql";
import useCreateGroup from "@/plugins/api/useCreateGroup";
import { route } from "@/plugins/app-router-helpers";

const GroupListFragment = graphql(`
    fragment GroupListFragment on Query {
        groups: groupCollection {
            edges {
                node {
                    id
                    name
                    description
                }
            }
        }
    }
`);

type GroupListProps = {
  onCreateGroup?: (groupId: string) => void;
};
const GroupList: FC<GroupListProps> = ({ onCreateGroup }) => {
  const { data } = useSuspenseFragment({
    fragment: GroupListFragment,
    from: {
      __typename: "Query",
    },
  });
  const navigate = useNavigate();
  const createGroup = useCreateGroup();

  const createGroupAndNavigate = async () => {
    const group = await createGroup();
    if (!group) {
      return;
    }
    onCreateGroup?.(group.id);
    navigate(route("/(private)/groups/[id]", { id: group.id }));
  };

  const groups = data.groups?.edges.map((edge) => edge.node) ?? [];

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
        <Button
          variant="contained"
          onClick={createGroupAndNavigate}
          sx={{ mt: 1 }}
        >
          Create your first group
        </Button>
      </Box>
    );
  }

  return (
    <List disablePadding>
      {groups.map((group) => (
        <ListItem key={group.id} disablePadding>
          <ListItemButton
            component={Link}
            to={route("/(private)/groups/[id]", { id: group.id })}
          >
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
