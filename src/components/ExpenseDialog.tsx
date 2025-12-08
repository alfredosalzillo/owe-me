import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DialogProps } from "@toolpad/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { SplitType } from "@/plugins/api/types";
import useGroupMembers from "@/plugins/api/useGroupMembers";

export type ExpenseType = "standard" | "payment";
export type ExpenseFormData = {
  type: ExpenseType;
  description: string;
  amount: number;
  currency: string;
  paidBy: string;
  paidAt: string;
  splitType: SplitType;
  toUser?: string;
  splits?: Array<{
    userId: string;
    amount: number;
    percentage?: number;
  }>;
};

export type ExpenseDialogProps = DialogProps<
  {
    groupId: string;
    initialData?: Partial<ExpenseFormData>;
    title?: string;
    currentUserId: string;
  },
  ExpenseFormData | void
>;

const ExpenseDialog = ({
  open,
  onClose,
  payload: { groupId, initialData, title, currentUserId },
}: ExpenseDialogProps) => {
  const members = useGroupMembers(groupId);

  // Initialize form with react-hook-form
  const { control, watch, setValue } = useForm<ExpenseFormData>({
    defaultValues: {
      type: initialData?.type || "standard",
      description: initialData?.description || "",
      amount: initialData?.amount || 0,
      currency: initialData?.currency || "USD",
      paidBy: initialData?.paidBy || currentUserId,
      paidAt: initialData?.paidAt || new Date().toISOString().split("T")[0],
      splitType: initialData?.splitType || "EQUAL",
      toUser: initialData?.toUser || "",
      splits: initialData?.splits || [],
    },
  });

  // Watch form values for reactive updates
  const formData = watch();

  // Calculate splits when amount, splitType, or paidBy changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: should not be called when splits change
  useEffect(() => {
    if (formData.type === "standard" && members.length > 0) {
      const totalAmount = formData.amount || 0;
      let newSplits: ExpenseFormData["splits"] = [];

      if (formData.splitType === "EQUAL") {
        const memberCount = members.length;
        const amountPerMember = totalAmount / memberCount;

        newSplits = members.map((member) => ({
          userId: member.id,
          amount: parseFloat(amountPerMember.toFixed(2)),
          percentage: 100 / memberCount,
        }));
      } else if (formData.splitType === "PERCENTAGE") {
        // Default to equal percentages
        const percentage = 100 / members.length;

        newSplits = members.map((member) => ({
          userId: member.id,
          amount: parseFloat(((totalAmount * percentage) / 100).toFixed(2)),
          percentage,
        }));
      } else if (formData.splitType === "CUSTOM") {
        // Keep existing splits or initialize with equal amounts
        if (!formData.splits || formData.splits.length === 0) {
          const amountPerMember = totalAmount / members.length;

          newSplits = members.map((member) => ({
            userId: member.id,
            amount: parseFloat(amountPerMember.toFixed(2)),
          }));
        } else {
          newSplits = formData.splits;
        }
      }

      setValue("splits", newSplits);
    }
  }, [
    formData.amount,
    formData.splitType,
    formData.paidBy,
    formData.type,
    members,
    setValue,
  ]);

  const handleSplitAmountChange = (userId: string, amount: number) => {
    if (formData.splits) {
      const newSplits = formData.splits.map((split) =>
        split.userId === userId ? { ...split, amount } : split,
      );
      setValue("splits", newSplits);
    }
  };

  const handleSplitPercentageChange = (userId: string, percentage: number) => {
    if (formData.splits) {
      const newSplits = formData.splits.map((split) => {
        if (split.userId === userId) {
          const amount = parseFloat(
            ((formData.amount * percentage) / 100).toFixed(2),
          );
          return { ...split, percentage, amount };
        }
        return split;
      });
      setValue("splits", newSplits);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => onClose()}
      slotProps={{ paper: { variant: "outlined" } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, mt: 1 }}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <RadioGroup
                row
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  // Ensure the value is properly typed
                  setValue("type", e.target.value as "standard" | "payment");
                }}
              >
                <FormControlLabel
                  value="standard"
                  control={<Radio />}
                  label="Expense"
                />
                <FormControlLabel
                  value="payment"
                  control={<Radio />}
                  label="Payment"
                />
              </RadioGroup>
            )}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {formData.type === "standard" && (
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required for expenses" }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Description"
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  required
                />
              )}
            />
          )}

          {formData.type === "payment" && (
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Description (Optional)"
                  fullWidth
                  {...field}
                />
              )}
            />
          )}

          <Box sx={{ display: "flex", gap: 2 }}>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required",
                min: {
                  value: 0.01,
                  message: "Amount must be greater than 0",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Amount"
                  type="number"
                  fullWidth
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />

            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select {...field} label="Currency">
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Controller
              name="paidBy"
              control={control}
              rules={{ required: "Paid by is required" }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error}>
                  <InputLabel>Paid By</InputLabel>
                  <Select {...field} label="Paid By" required>
                    {members.map((member) => (
                      <MenuItem key={member.id} value={member.id}>
                        {member.name}{" "}
                        {member.id === currentUserId ? "(You)" : ""}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldState.error && (
                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="paidAt"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  required
                />
              )}
            />
          </Box>

          {formData.type === "payment" && (
            <Controller
              name="toUser"
              control={control}
              rules={{
                required: "Recipient is required for payments",
                validate: (value) =>
                  value !== formData.paidBy ||
                  "Recipient cannot be the same as payer",
              }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error}>
                  <InputLabel>Paid To</InputLabel>
                  <Select {...field} label="Paid To" required>
                    {members
                      .filter((member) => member.id !== formData.paidBy)
                      .map((member) => (
                        <MenuItem key={member.id} value={member.id}>
                          {member.name}{" "}
                          {member.id === currentUserId ? "(You)" : ""}
                        </MenuItem>
                      ))}
                  </Select>
                  {fieldState.error && (
                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          )}

          {formData.type === "standard" && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1">Split Details</Typography>

              <Controller
                name="splitType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Split Type</InputLabel>
                    <Select {...field} label="Split Type">
                      <MenuItem value="EQUAL">Equal</MenuItem>
                      <MenuItem value="PERCENTAGE">Percentage</MenuItem>
                      <MenuItem value="CUSTOM">Custom</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              {formData.splits && formData.splits.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  {formData.splits.map((split) => {
                    const member = members.find((m) => m.id === split.userId);
                    return (
                      <Box
                        key={split.userId}
                        sx={{ display: "flex", gap: 2, mb: 1 }}
                      >
                        <Typography sx={{ width: "30%", pt: 1 }}>
                          {member?.name}{" "}
                          {member?.id === currentUserId ? "(You)" : ""}
                        </Typography>

                        {formData.splitType === "PERCENTAGE" ? (
                          <TextField
                            label="Percentage"
                            type="number"
                            value={split.percentage || 0}
                            onChange={(e) =>
                              handleSplitPercentageChange(
                                split.userId,
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              },
                            }}
                            sx={{ width: "35%" }}
                          />
                        ) : null}

                        <TextField
                          label="Amount"
                          type="number"
                          value={split.amount}
                          onChange={(e) =>
                            handleSplitAmountChange(
                              split.userId,
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          disabled={formData.splitType !== "CUSTOM"}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            },
                          }}
                          sx={{
                            width:
                              formData.splitType === "PERCENTAGE"
                                ? "35%"
                                : "70%",
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              )}
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button
          onClick={() => onClose(formData)}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseDialog;
