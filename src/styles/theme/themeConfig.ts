import { createTheme } from "@mui/material";
import { poppinsFont } from "../fonts";

export const darkTheme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {},
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: poppinsFont.style.fontFamily,
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      paper: "#ffffff",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {},
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: poppinsFont.style.fontFamily,
  },
});
