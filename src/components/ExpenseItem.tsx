import { useSuspenseFragment } from "@apollo/client/react";
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
import { FC, useMemo } from "react";
import ExpenseDialog, { ExpenseFormData } from "@/components/ExpenseDialog";
import PaymentDialog, { PaymentFormData } from "@/components/PaymentDialog";
import { graphql } from "@/gql";
import { updateExpense, updatePayment } from "@/plugins/api/expenses";
import { Expense, SplitType } from "@/plugins/api/types";
import Price from "@/plugins/price-format/Price";

const expenseAction = (expense: Expense) => {
  // Handle payment expenses
  if (expense.type === "payment") {
    if (expense.paidBy.isMe) {
      return (
        <>
          You paid <Price amount={expense.amount} currency={expense.currency} />{" "}
          to {expense.toUser.name}
        </>
      );
    } else if (expense.toUser.isMe) {
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
    if (expense.paidBy.isMe) {
      const amountLent = expense.splits
        .filter((split) => !split.user.isMe)
        .map((split) => split.amount)
        .reduce((a, b) => a + b, 0);
      const lentTos = expense.splits
        .filter((split) => !split.user.isMe)
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
    const borrowed = expense.splits.find((split) => split.user.isMe);
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

const ExpenseItemFragment = graphql(`
    fragment ExpenseItemFragment on Expense {
        id
        type
        splitType
        description
        amount
        currency
        group {
            id
        }
        toUser {
            id
            name
            isMe
        }
        paidBy {
            id
            name
            isMe
        }
        createdBy {
            id
            name
            isMe
        }
        paidAt
        createdAt,
        updatedAt,
        splits {
            edges {
                node {
                    user {
                        id
                        name
                        isMe
                    }
                    amount
                    percentage
                }
            }
        }
    }
`);

type ExpenseItemProps = {
  id: string;
  onUpdate?: () => void;
};

const ExpenseItem: FC<ExpenseItemProps> = ({ id, onUpdate }) => {
  const theme = useTheme();
  const dialogs = useDialogs();
  const { data } = useSuspenseFragment({
    fragment: ExpenseItemFragment,
    from: {
      __typename: "Expense",
      id,
    },
  });

  const groupId = data.group!.id;
  const expense = useMemo((): Expense => {
    if (data.type === "payment") {
      return {
        type: "payment",
        id: data.id,
        description: data.description ?? "",
        amount: Number(data.amount),
        currency: data.currency,
        paidBy: {
          id: data.paidBy!.id,
          name: data.paidBy!.name ?? "User",
          isMe: !!data.paidBy!.isMe,
        },
        createdBy: {
          id: data.createdBy!.id,
          name: data.createdBy!.name ?? "User",
          isMe: !!data.createdBy!.isMe,
        },
        toUser: {
          id: data.toUser!.id,
          name: data.toUser!.name ?? "User",
          isMe: !!data.toUser!.isMe,
        },
        paidAt: new Date(data.paidAt),
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };
    }
    return {
      type: "standard",
      id: data.id,
      description: data.description ?? "",
      amount: Number(data.amount),
      currency: data.currency,
      paidBy: {
        id: data.paidBy!.id,
        name: data.paidBy!.name ?? "User",
        isMe: !!data.paidBy!.isMe,
      },
      createdBy: {
        id: data.createdBy!.id,
        name: data.createdBy!.name ?? "User",
        isMe: !!data.createdBy!.isMe,
      },
      splitType: data.splitType as SplitType,
      splits:
        data.splits?.edges.map((edge) => ({
          user: {
            id: edge.node.user!.id,
            name: edge.node.user!.name ?? "User",
            isMe: !!edge.node.user!.isMe,
          },
          amount: Number(edge.node.amount),
          percentage: Number(edge.node.percentage),
        })) ?? [],
      paidAt: new Date(data.paidAt),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }, [data]);
  // Use different styling for payments
  const isPayment = expense.type === "payment";

  // Get the first character of description, or use a default
  const getAvatarContent = () => {
    if (isPayment) {
      return <PaymentIcon />;
    }
    if (expense.type === "standard") {
      return expense.description?.[0] || "?";
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
      // Update the expense based on the dialog result
      if (expense.type === "standard") {
        // Open the dialog and wait for the result
        const data = await dialogs.open(ExpenseDialog, {
          groupId,
          title: "Edit Expense",
          initialData: {
            type: expense.type,
            description: expense.description || "",
            amount: expense.amount,
            currency: expense.currency,
            paidBy: expense.paidBy.id,
            paidAt: new Date(expense.paidAt).toISOString().split("T")[0],
            splitType: expense.splitType,
            splits: expense.splits.map((split) => ({
              userId: split.user.id,
              amount: split.amount,
              percentage: split.percentage,
            })),
          },
        });

        if (!data) {
          return;
        }
        await updateExpense(expense.id, {
          description: data.description,
          amount: data.amount,
          currency: data.currency,
          paidBy: data.paidBy,
          paidAt: new Date(data.paidAt),
          splitType: data.splitType,
          splits:
            data.splits?.map((split) => ({
              user: split.userId,
              amount: split.amount,
              percentage: split.percentage,
            })) || [],
        });
      } else {
        // Open the dialog and wait for the result
        const data = await dialogs.open(PaymentDialog, {
          groupId,
          title: "Edit Payment",
          initialData: {
            type: expense.type,
            description: expense.description || "",
            amount: expense.amount,
            currency: expense.currency,
            paidBy: expense.paidBy.id,
            paidAt: new Date(expense.paidAt).toISOString().split("T")[0],
            toUser: expense.toUser.id,
          },
        });

        if (!data) {
          return;
        }
        await updatePayment(expense.id, {
          description: data.description,
          amount: data.amount,
          currency: data.currency,
          paidBy: data.paidBy,
          paidAt: new Date(data.paidAt),
          toUser: data.toUser!,
        });
      }

      onUpdate?.();
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
        secondary={expenseAction(expense)}
      />
    </ListItem>
  );
};

export default ExpenseItem;
