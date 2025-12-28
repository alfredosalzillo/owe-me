import CopyIcon from "@mui/icons-material/ContentCopy";
import CopySuccessIcon from "@mui/icons-material/Done";
import { IconButton } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

type CopyIconButtonProps = {
  value: string;
};
const CopyIconButton: FC<CopyIconButtonProps> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
  };
  return (
    <IconButton disabled={copied} onClick={copyToClipboard}>
      {copied ? <CopySuccessIcon /> : <CopyIcon />}
    </IconButton>
  );
};

export default CopyIconButton;
