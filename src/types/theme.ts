import { Theme } from "@mui/material";

export enum ThemeType {
  DARK = "dark",
  LIGHT = "light",
}

export interface GlobalThemeInitialState {
  toggleTheme: () => void;
  theme: Theme;
  isDark: boolean;
  themeKey: ThemeType;
}

export interface GlobalThemeProps {
  children: React.ReactNode;
  theme: Theme;
  isDark: boolean;
  toggleIsDark: (P: boolean) => void;
}
