import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DialogProps } from "@toolpad/core";
import React, { useMemo, useState } from "react";
import type { GroupDebitMode } from "@/plugins/api/types";

export type GroupSettingsValues = {
  name: string;
  description: string | null;
  defaultCurrency: string;
  debitMode: GroupDebitMode;
};

export type GroupSettingsDialogProps = DialogProps<
  {
    mode: "create" | "edit";
    initialValues?: Partial<GroupSettingsValues>;
    title?: string;
  },
  GroupSettingsValues | void
>;

const DEFAULTS: GroupSettingsValues = {
  name: "",
  description: "",
  defaultCurrency: "USD",
  debitMode: "default",
};

const GroupSettingsDialog = ({
  open,
  onClose,
  payload: { mode, initialValues, title: customTitle } = {
    mode: "create",
  },
}: GroupSettingsDialogProps) => {
  const [values, setValues] = useState<GroupSettingsValues>(() => ({
    ...DEFAULTS,
    ...initialValues,
  }));
  const [submitting, setSubmitting] = useState(false);
  const title = useMemo(
    () =>
      customTitle ||
      (mode === "create" ? "Create Group" : "Edit Group Settings"),
    [mode, customTitle],
  );

  const canSubmit = values.name.trim().length > 0 && !submitting;

  const handleChange =
    (key: keyof GroupSettingsValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e?.target?.value;
      setValues((v) => ({ ...v, [key]: value }));
    };

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }
    setSubmitting(true);
    try {
      await onClose({
        name: values.name.trim(),
        description: values.description?.trim() || null,
        defaultCurrency: values.defaultCurrency,
        debitMode: values.debitMode,
      });
    } finally {
      setSubmitting(false);
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            required
            autoFocus
          />
          <TextField
            label="Description"
            value={values.description}
            onChange={handleChange("description")}
            multiline
            minRows={2}
          />
          <FormControl fullWidth>
            <InputLabel id="currency-label">Default currency</InputLabel>
            <Select
              labelId="currency-label"
              label="Default currency"
              value={values.defaultCurrency}
              onChange={(e) =>
                setValues((v) => ({ ...v, defaultCurrency: e.target.value }))
              }
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="debit-mode-label">Debit mode</InputLabel>
            <Select
              labelId="debit-mode-label"
              label="Debit mode"
              value={values.debitMode}
              onChange={(e) =>
                setValues((v) => ({ ...v, debitMode: e.target.value }))
              }
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="simplified">Simplified</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} disabled={submitting} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          variant="contained"
        >
          {mode === "create" ? "Create" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupSettingsDialog;
