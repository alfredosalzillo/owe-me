import { useSuspenseFragment } from "@apollo/client/react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { FC } from "react";
import AddExpenseButton from "@/components/AddExpenseButton";
import ExpenseItem from "@/components/ExpenseItem";
import { graphql } from "@/gql";
import { useMe } from "@/plugins/api/user";
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
                    }
                    toUser {
                        id
                        name
                    }
                }
            }
        }
        expenses {
            edges {
                node {
                    id
                    paidAt
                    ...ExpenseItemFragment
                }
            }
        }
    }
`);

export type GroupProps = {
  id: string;
  onUpdate?: () => void;
};
const Group: FC<GroupProps> = ({ id, onUpdate }) => {
  const [me] = useMe();
  const { data } = useSuspenseFragment({
    fragment: GroupFragment,
    fragmentName: "GroupFragment",
    from: {
      __typename: "Group",
      id,
    },
  });
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
            !(debit.toUser.id === me.id || debit.fromUser.id === me.id) ||
            debit.toUser.id === debit.fromUser.id
          ) {
            return null;
          }
          return (
            <Typography key={debit.nodeId}>
              {debit.toUser.id === me.id && (
                <>
                  You are owned{" "}
                  <Price
                    amount={Number(debit.amount)}
                    currency={debit.currency}
                  />{" "}
                  from {debit.fromUser.name}
                </>
              )}
              {debit.fromUser.id === me.id && (
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
      <AddExpenseButton groupId={id} currentUser={me} onAdd={refreshData} />
    </Container>
  );
};

export default Group;
