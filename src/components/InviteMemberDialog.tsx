import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DialogProps, useNotifications } from "@toolpad/core";
import React, { useState } from "react";
import CopyIconButton from "@/components/CopyIconButton";
import { createInvite } from "@/plugins/api/invites";

export type InviteMemberDialogProps = DialogProps<{ groupId: string }, void>;

const InviteMemberDialog = ({
  open,
  onClose,
  payload: { groupId },
}: InviteMemberDialogProps) => {
  const notifications = useNotifications();
  const [email, setEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);

  const generateInviteLink = async () => {
    setLoading(true);
    try {
      const invite = await createInvite(groupId, email);
      const link = `${window.location.origin}/join/${invite.token}`;
      setInviteLink(link);
    } catch (_) {
      notifications.show("Failed to create invite link", { severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>Invite Member</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!inviteLink || loading}
            helperText="If provided, only this email can use the invite link"
          />
          {!inviteLink ? (
            <Button
              variant="contained"
              onClick={generateInviteLink}
              disabled={loading}
            >
              Generate Invite Link
            </Button>
          ) : (
            <TextField
              label="Invite Link"
              value={inviteLink}
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <CopyIconButton value={inviteLink} />
                    </InputAdornment>
                  ),
                },
              }}
              fullWidth
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteMemberDialog;
