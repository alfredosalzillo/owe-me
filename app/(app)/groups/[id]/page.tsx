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
import { fetchDebits } from "@/plugins/api/debits";
import { fetchGroup } from "@/plugins/api/groups";
import { Expense } from "@/plugins/api/types";
import { fetchMe } from "@/plugins/api/user";
import groupBy from "@/plugins/array/groupBy";
import Price from "@/plugins/price-format/Price";

type GroupedExpense = {
  paidAt: Date;
  expenses: Expense[];
};

const groupExpensesByDate = (expenses: Expense[]): GroupedExpense[] => {
  const grouped = groupBy(expenses, (expense) => {
    const date = new Date(expense.paidAt);
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
  });

  return Object.entries(grouped)
    .map(([dateTime, groupExpenses]) => ({
      paidAt: new Date(dateTime),
      expenses: groupExpenses,
    }))
    .toSorted((a, b) => b.paidAt.getTime() - a.paidAt.getTime());
};

type GroupPageProps = {
  params: Promise<{
    id: string;
  }>;
};
const GroupPage: FC<GroupPageProps> = async ({ params }) => {
  const { id } = await params;
  const group = await fetchGroup(id);
  const debits = await fetchDebits(id);

  const me = await fetchMe();
  const groupedExpenses = groupExpensesByDate(group.expenses);
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
          <Typography variant="h4">{group.name}</Typography>
        </Box>
        <Typography variant="body1" component="p" gutterBottom>
          {group.description}
        </Typography>
        {debits.map((debit) => (
          <Typography key={`${debit.currency}-${debit.from.id}-${debit.to.id}`}>
            {debit.to.id === me.id && (
              <>
                You are owned{" "}
                <Price amount={debit.amount} currency={debit.currency} /> from{" "}
                {debit.from.name}
              </>
            )}
            {debit.from.id === me.id && (
              <>
                You own{" "}
                <Price amount={debit.amount} currency={debit.currency} /> {}
                to {debit.to.name}
              </>
            )}
          </Typography>
        ))}
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
              expense={expense}
              me={me}
              groupId={id}
            />
          ))}
        </List>
      ))}

      {/* Add Expense Button */}
      <AddExpenseButton groupId={id} currentUser={me} />
    </Container>
  );
};
export default GroupPage;
