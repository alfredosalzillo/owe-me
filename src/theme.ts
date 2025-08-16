import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0d1117",
      paper: "#0d1117",
    },
  },
  typography: {
    fontSize: 12,
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
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
  },
});

export default responsiveFontSizes(theme);
