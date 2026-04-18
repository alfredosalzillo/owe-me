import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AppBar,
  IconButton,
  type SxProps,
  type Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";

type PageTopBarProps = {
  title: ReactNode;
  startAction?: ReactNode;
  onBack?: () => void;
  actions?: ReactNode;
  sx?: SxProps<Theme>;
};

const PageTopBar: FC<PageTopBarProps> = ({
  title,
  startAction,
  onBack,
  actions,
  sx,
}) => {
  return (
    <AppBar sx={sx}>
      <Toolbar>
        {onBack ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={onBack}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        ) : (
          startAction
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {actions}
      </Toolbar>
    </AppBar>
  );
};

export default PageTopBar;
