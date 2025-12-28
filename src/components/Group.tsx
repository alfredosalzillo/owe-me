import { useSuspenseFragment } from "@apollo/client/react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { FC, useMemo } from "react";
import AddExpenseButton from "@/components/AddExpenseButton";
import ExpenseItem from "@/components/ExpenseItem";
import { graphql } from "@/gql";
import { useInviteMember } from "@/plugins/api/invites";
import useGroupMembers from "@/plugins/api/useGroupMembers";
import groupBy from "@/plugins/array/groupBy";
import Price from "@/plugins/price-format/Price";

const GroupFragment = graphql(`
    fragment GroupFragment on Group {
        id
        name
        description
        defaultCurrency
        debitMode
        debits {
            edges {
                node {
                    nodeId
                    amount
                    currency
                    fromUser {
                        id
                        name
                        isMe
                    }
                    toUser {
                        id
                        name
                        isMe
                    }
                }
            }
        }
        expenses(orderBy: [{
            paidAt: DescNullsFirst
        }]) {
            edges {
                node {
                    id
                    paidAt
                    ...ExpenseItemFragment
                }
            }
        }
        ...GroupMembersFragment
        ...GroupCurrencySettingsFragment
    }
`);

const useGroup = (groupId: string) => {
  const { data } = useSuspenseFragment({
    fragment: GroupFragment,
    fragmentName: "GroupFragment",
    from: {
      __typename: "Group",
      id: groupId,
    },
  });
  return useMemo(() => {
    const debits = data.debits?.edges.map((edge) => edge.node) ?? [];
    const expenses = data.expenses?.edges.map((edge) => edge.node) ?? [];

    const groupedExpenses = Object.entries(
      groupBy(expenses, (expense) => {
        const date = new Date(expense.paidAt);
        date.setHours(0, 0, 0, 0);
        return date.toISOString();
      }),
    )
      .map(([dateTime, groupExpenses]) => ({
        paidAt: new Date(dateTime),
        expenses: groupExpenses,
      }))
      .toSorted((a, b) => b.paidAt.getTime() - a.paidAt.getTime());

    return {
      data,
      debits,
      expenses,
      groupedExpenses,
    };
  }, [data]);
};

type GroupMembersProps = {
  groupId: string;
};
const GroupMembers: FC<GroupMembersProps> = ({ groupId }) => {
  const members = useGroupMembers(groupId);
  const inviteMember = useInviteMember();

  return (
    <Container
      sx={{
        pt: 2,
        pb: 2,
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h5">Members</Typography>
      <AvatarGroup sx={{ flex: 1 }}>
        {members.map((member) => (
          <Avatar src={member.avatarUrl ?? undefined} key={member.id}>
            {member.name?.[0] ?? "U"}
          </Avatar>
        ))}
      </AvatarGroup>
      <IconButton
        color="primary"
        onClick={() => inviteMember(groupId)}
        aria-label="invite member"
      >
        <PersonAddIcon />
      </IconButton>
    </Container>
  );
};

export type GroupProps = {
  id: string;
  onUpdate?: () => void;
};
const Group: FC<GroupProps> = ({ id, onUpdate }) => {
  const { data, debits, groupedExpenses } = useGroup(id);
  const refreshData = () => {
    onUpdate?.();
  };
  return (
    <Container disableGutters>
      <Container sx={{ pt: 2, pb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4">{data.name}</Typography>
        </Box>
        <Typography variant="body1" component="p" gutterBottom>
          {data.description}
        </Typography>
        {debits.map((debit) => {
          if (
            !debit.toUser ||
            !debit.fromUser ||
            !debit.amount ||
            !debit.currency
          ) {
            return null;
          }
          if (
            !(debit.toUser.isMe || debit.fromUser.isMe) ||
            debit.toUser.id === debit.fromUser.id
          ) {
            return null;
          }
          return (
            <Typography key={debit.nodeId}>
              {debit.toUser.isMe && (
                <>
                  You are owned{" "}
                  <Price
                    amount={Number(debit.amount)}
                    currency={debit.currency}
                  />{" "}
                  from {debit.fromUser.name}
                </>
              )}
              {debit.fromUser.isMe && (
                <>
                  You own{" "}
                  <Price
                    amount={Number(debit.amount)}
                    currency={debit.currency}
                  />{" "}
                  {}
                  to {debit.toUser.name}
                </>
              )}
            </Typography>
          );
        })}
      </Container>
      <Divider />
      <GroupMembers groupId={id} />
      <Divider />
      {groupedExpenses.map(({ paidAt, expenses }) => (
        <List key={paidAt.toISOString()}>
          <ListItem>
            <ListItemText primary={paidAt.toLocaleDateString()} />
          </ListItem>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              id={expense.id}
              onUpdate={refreshData}
            />
          ))}
        </List>
      ))}
      <Toolbar />
      <AddExpenseButton groupId={id} onAdd={refreshData} />
    </Container>
  );
};

export default Group;
