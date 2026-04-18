import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4f8cff",
    },
    secondary: {
      main: "#8b9cb5",
    },
    divider: "#273042",
    background: {
      default: "#0d1117",
      paper: "#111827",
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontSize: 13,
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    body2: {
      color: "#9aa4b2",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        position: "static",
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderTop: 0,
          borderRight: 0,
          borderLeft: 0,
          backgroundImage: "none",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
        variant: "contained",
      },
    },
    MuiFab: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 56,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});

export default responsiveFontSizes(theme);
