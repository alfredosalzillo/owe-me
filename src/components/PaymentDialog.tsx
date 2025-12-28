import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DialogProps } from "@toolpad/core";
import { Controller, useForm } from "react-hook-form";
import useGroupCurrencySettings from "@/plugins/api/useGroupCurrencySettings";
import useGroupMembers from "@/plugins/api/useGroupMembers";

export type PaymentFormData = {
  type: "payment";
  description: string;
  amount: number;
  currency: string;
  paidBy: string;
  paidAt: string;
  toUser: string;
};

export type PaymentDialogProps = DialogProps<
  {
    groupId: string;
    initialData?: Partial<PaymentFormData>;
    title?: string;
  },
  PaymentFormData | void
>;

const PaymentDialog = ({
  open,
  onClose,
  payload: { groupId, initialData, title },
}: PaymentDialogProps) => {
  const currencySettings = useGroupCurrencySettings(groupId);
  const defaultCurrency = currencySettings?.defaultCurrency || "EUR";
  const members = useGroupMembers(groupId);

  // Initialize form with react-hook-form
  const { control, watch } = useForm<PaymentFormData>({
    defaultValues: {
      type: "payment",
      description: initialData?.description || "",
      amount: initialData?.amount || 0,
      currency: initialData?.currency || defaultCurrency,
      paidBy:
        initialData?.paidBy ||
        members.find((member) => member.isMe)?.id ||
        members[0]?.id,
      paidAt: initialData?.paidAt || new Date().toISOString().split("T")[0],
      toUser: initialData?.toUser || "",
    },
  });

  const formData = watch();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => onClose()}
      slotProps={{ paper: { variant: "outlined" } }}
    >
      <DialogTitle>{title || "Record Payment"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField label="Description (Optional)" fullWidth {...field} />
            )}
          />

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
              rules={{ required: "Payer is required" }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error}>
                  <InputLabel>Paid By</InputLabel>
                  <Select {...field} label="Paid By" required>
                    {members.map((member) => (
                      <MenuItem key={member.id} value={member.id}>
                        {member.name} {member.isMe ? "(You)" : ""}
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
                        {member.name} {member.isMe ? "(You)" : ""}
                      </MenuItem>
                    ))}
                </Select>
                {fieldState.error && (
                  <FormHelperText>{fieldState.error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
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

export default PaymentDialog;
