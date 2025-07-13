"use client";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useDialogs } from "@toolpad/core/useDialogs";
import { useRouter } from "next/navigation";
import { FC } from "react";
import ExpenseDialog, { ExpenseFormData } from "@/components/ExpenseDialog";
import { updateExpense, updatePayment } from "@/plugins/api/expenses";
import { Expense, User } from "@/plugins/api/types";
import Price from "@/plugins/price-format/Price";

const expenseAction = (me: User, expense: Expense) => {
  // Handle payment expenses
  if (expense.type === "payment") {
    if (expense.paidBy.id === me.id) {
      return (
        <>
          You paid <Price amount={expense.amount} currency={expense.currency} />{" "}
          to {expense.toUser.name}
        </>
      );
    } else if (expense.toUser.id === me.id) {
      return (
        <>
          {expense.paidBy.name} paid you{" "}
          <Price amount={expense.amount} currency={expense.currency} />
        </>
      );
    } else {
      return (
        <>
          {expense.paidBy.name} paid{" "}
          <Price amount={expense.amount} currency={expense.currency} /> to{" "}
          {expense.toUser.name}
        </>
      );
    }
  }

  // Handle standard expenses
  if (expense.type === "standard") {
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
          {lentTos} (
          <Price amount={expense.amount} currency={expense.currency} /> total
          paid)
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
  }

  // Default case
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
  groupId: string;
};

const ExpenseItem: FC<ExpenseItemProps> = ({ me, expense, groupId }) => {
  const theme = useTheme();
  const dialogs = useDialogs();
  const router = useRouter();
  // Use different styling for payments
  const isPayment = expense.type === "payment";

  // Get the first character of description, or use a default
  const getAvatarContent = () => {
    if (isPayment) {
      return <PaymentIcon />;
    }
    if (expense.type === "standard") {
      return expense.description[0] || "?";
    }
    return "?";
  };

  // Get the description text, handling optional description for payments
  const getDescription = () => {
    if (expense.type === "payment") {
      return expense.description || "Payment";
    }
    return expense.description;
  };

  // Handle edit button click
  const handleEdit = async () => {
    try {
      // Convert expense to ExpenseFormData format
      const initialData: Partial<ExpenseFormData> = {
        type: expense.type,
        description: expense.description || "",
        amount: expense.amount,
        currency: expense.currency,
        paidBy: expense.paidBy.id,
        paidAt: new Date(expense.paidAt).toISOString().split("T")[0],
      };

      if (expense.type === "standard") {
        initialData.splitType = expense.splitType;
        initialData.splits = expense.splits.map((split) => ({
          userId: split.user.id,
          amount: split.amount,
          percentage: split.percentage,
        }));
      } else if (expense.type === "payment") {
        initialData.toUser = expense.toUser.id;
      }

      // Open the dialog and wait for the result
      const data = await dialogs.open(ExpenseDialog, {
        groupId,
        initialData,
        currentUserId: me.id,
        title: "Edit Expense",
      });

      if (!data) {
        return;
      }

      // Update the expense based on the dialog result
      if (data.type === "standard") {
        const splits =
          data.splits?.map((split) => ({
            user: {
              id: split.userId,
              name: "", // This will be filled by the server
            },
            amount: split.amount,
            percentage: split.percentage,
          })) || [];

        await updateExpense(groupId, expense.id, {
          description: data.description,
          amount: data.amount,
          currency: data.currency,
          paidBy: {
            id: data.paidBy,
            name: "", // This will be filled by the server
          },
          paidAt: new Date(data.paidAt),
          splitType: data.splitType,
          splits,
        });
      } else {
        await updatePayment(groupId, expense.id, {
          description: data.description,
          amount: data.amount,
          currency: data.currency,
          paidBy: {
            id: data.paidBy,
            name: "", // This will be filled by the server
          },
          paidAt: new Date(data.paidAt),
          toUser: {
            id: data.toUser || "",
            name: "", // This will be filled by the server
          },
        });
      }

      // Refresh the page to show the updated expense
      router.refresh();
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: allowed
      console.error("Failed to update expense:", error);
      // In a real app, you would show an error message to the user
    }
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      }
      sx={
        isPayment
          ? {
              backgroundColor: `${theme.palette.success.light}15`, // 15 is for 0.05 opacity in hex
              borderLeft: `3px solid ${theme.palette.success.main}`,
            }
          : {}
      }
    >
      <ListItemAvatar>
        <Avatar
          alt={expense.createdBy.name}
          sx={isPayment ? { backgroundColor: theme.palette.success.main } : {}}
        >
          {getAvatarContent()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            {isPayment && (
              <span
                style={{
                  color: theme.palette.success.main,
                  fontWeight: "bold",
                }}
              >
                Payment:{" "}
              </span>
            )}
            {getDescription()}
          </>
        }
        secondary={expenseAction(me, expense)}
      />
    </ListItem>
  );
};

export default ExpenseItem;
