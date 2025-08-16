"use client";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Tooltip } from "@mui/material";
import { useDialogs } from "@toolpad/core/useDialogs";
import { FC } from "react";
import ExpenseDialog from "@/components/ExpenseDialog";
import { addExpense, addPayment } from "@/plugins/api/expenses";
import {
  ExpenseSplit,
  PaymentExpense,
  StandardExpense,
  User,
} from "@/plugins/api/types";

type AddExpenseButtonProps = {
  groupId: string;
  currentUser: User;
  onAdd?: () => void;
};

const AddExpenseButton: FC<AddExpenseButtonProps> = ({
  groupId,
  currentUser,
  onAdd,
}) => {
  const dialogs = useDialogs();

  return (
    <Tooltip title="Add Expense or Payment">
      <Fab
        color="primary"
        aria-label="add"
        onClick={async () => {
          try {
            // Open the dialog and wait for the result
            const data = await dialogs.open(ExpenseDialog, {
              groupId,
              currentUserId: currentUser.id,
              title: "Add Expense",
            });

            if (!data) {
              return;
            }

            if (data.type === "standard") {
              // Convert the form data to the format expected by the API
              const splits: ExpenseSplit[] =
                data.splits?.map((split) => ({
                  user: {
                    id: split.userId,
                    name: "", // This will be filled by the server
                  },
                  amount: split.amount,
                  percentage: split.percentage,
                })) || [];

              const expenseData: Omit<
                StandardExpense,
                "id" | "createdAt" | "createdBy" | "updatedAt"
              > = {
                type: "standard",
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
              };

              await addExpense(groupId, expenseData);
            } else {
              // Convert the form data to the format expected by the API
              const paymentData: Omit<
                PaymentExpense,
                "id" | "createdAt" | "createdBy" | "updatedAt"
              > = {
                type: "payment",
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
              };

              await addPayment(groupId, paymentData);
            }

            // Refresh the expenses list
            onAdd?.()
          } catch (error) {
            // biome-ignore lint/suspicious/noConsole: allowed
            console.error("Failed to add expense:", error);
            // In a real app, you would show an error message to the user
          }
        }}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default AddExpenseButton;
