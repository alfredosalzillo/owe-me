import { Fab, Tooltip } from "@mui/material";
import { useDialogs } from "@toolpad/core/useDialogs";
import { FC } from "react";
import ExpenseDialog from "@/components/ExpenseDialog";
import { addExpense } from "@/plugins/api/expenses";

type AddExpenseButtonProps = {
  groupId: string;
  onAdd?: () => void;
};

const AddExpenseButton: FC<AddExpenseButtonProps> = ({ groupId, onAdd }) => {
  const dialogs = useDialogs();

  return (
    <Tooltip title="Add Expense">
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        onClick={async () => {
          try {
            // Open the dialog and wait for the result
            const data = await dialogs.open(ExpenseDialog, {
              groupId,
              title: "Add Expense",
            });

            if (!data) {
              return;
            }

            await addExpense(groupId, {
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

            // Refresh the expenses list
            onAdd?.();
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
        Add Expense
      </Fab>
    </Tooltip>
  );
};

export default AddExpenseButton;
