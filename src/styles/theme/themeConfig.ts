import { createTheme } from "@mui/material";
import { futuraPtFont } from "../fonts";

const commonButtonOverrides = {
  styleOverrides: {
    root: {
      textTransform: "none" as const,
      fontWeight: 600,
      borderRadius: "10px",
      transition: "all 0.25s ease-in-out",
      boxShadow: "none",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
        transform: "translateY(-1px)",
      },
    },
    containedPrimary: {
      background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      color: "#ffffff",
      "&:hover": {
        background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
        boxShadow: "0 6px 16px rgba(79, 70, 229, 0.35)",
      },
    },
    outlinedPrimary: {
      borderColor: "#c7d2fe",
      color: "#4f46e5",
      "&:hover": {
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.05)",
      },
    },
  },
};

const commonPalette = {
  primary: {
    main: "#4f46e5", // indigo-600
    light: "#6366f1", // indigo-500
    dark: "#3730a3", // indigo-800
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#3b82f6", // blue-500
    light: "#60a5fa",
    dark: "#1d4ed8",
    contrastText: "#ffffff",
  },
};

const commonOutlinedInputOverrides = {
  styleOverrides: {
    root: {
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
      transition: "all 0.2s ease-in-out",
      minHeight: "42px",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e2e8f0",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#818cf8",
      },
      "&.Mui-focused": {
        boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.15)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#4f46e5",
          borderWidth: "1.5px",
        },
      },
      "&:not(.MuiInputBase-multiline) .MuiOutlinedInput-input": {
        padding: "10px 16px",
      },
    },
    input: {
      fontWeight: 600,
      color: "#334155",
    },
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...commonPalette,
  },
  components: {
    MuiOutlinedInput: commonOutlinedInputOverrides,
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
    MuiButton: commonButtonOverrides,
  },
  typography: {
    fontFamily: futuraPtFont.style.fontFamily,
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...commonPalette,
    background: {
      paper: "#ffffff",
    },
  },
  components: {
    MuiOutlinedInput: commonOutlinedInputOverrides,
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
    MuiButton: commonButtonOverrides,
  },
  typography: {
    fontFamily: futuraPtFont.style.fontFamily,
  },
});
