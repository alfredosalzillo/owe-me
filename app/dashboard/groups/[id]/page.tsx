import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { FC } from "react";
import { fetchDebits } from "@/plugins/api/debits";
import { fetchGroup } from "@/plugins/api/groups";
import { Expense, User } from "@/plugins/api/types";
import { fetchMe } from "@/plugins/api/user";
import groupBy from "@/plugins/array/groupBy";
import Price from "@/plugins/price-format/Price";

const expenseAction = (me: User, expense: Expense) => {
  if (expense.paidBy.id === me.id) {
    const amountLent = expense.splits
      .filter((split) => split.user.id !== me.id)
      .map((split) => split.amount)
      .reduce((a, b) => a + b, 0);
    const lentTos = expense.splits
      .filter((split) => split.user.id !== me.id)
      .map((split) => split.user.name)
      .join(", ");
    return (
      <>
        You lent <Price amount={amountLent} currency={expense.currency} /> to{" "}
        {lentTos} (<Price amount={expense.amount} currency={expense.currency} />{" "}
        total paid)
      </>
    );
  }
  const borrowed = expense.splits.find((split) => split.user.id === me.id);
  if (borrowed) {
    return (
      <>
        You borrowed{" "}
        <Price amount={borrowed.amount} currency={expense.currency} /> from{" "}
        {expense.paidBy.name} (
        <Price amount={expense.amount} currency={expense.currency} /> total
        paid)
      </>
    );
  }
  return (
    <>
      {expense.paidBy.name} paid{" "}
      <Price amount={expense.amount} currency={expense.currency} />
    </>
  );
};

type ExpenseItemProps = {
  expense: Expense;
  me: User;
};
const ExpenseItem: FC<ExpenseItemProps> = ({ me, expense }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="edit">
          <EditIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar alt={expense.createdBy.name}>{expense.description[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={expense.description}
        secondary={expenseAction(me, expense)}
      />
    </ListItem>
  );
};

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
        <Typography variant="h4" gutterBottom>
          {group.name}
        </Typography>
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
            <ExpenseItem key={expense.id} expense={expense} me={me} />
          ))}
        </List>
      ))}
    </Container>
  );
};
export default GroupPage;
