import React, { createContext, useContext } from "react";
import { lightTheme } from "./themeConfig";
import { getCurrentTheme } from "@/helper";
import { GlobalThemeInitialState, GlobalThemeProps, ThemeType } from "@/types";

const initialState: GlobalThemeInitialState = {
  toggleTheme: () => {},
  theme: lightTheme,
  isDark: false,
  themeKey: ThemeType.LIGHT,
};

const ThemeContext = createContext(initialState);

export const useThemeContext = () => useContext(ThemeContext);

export const GlobalTheme = ({
  children,
  theme,
  isDark,
  toggleIsDark,
}: GlobalThemeProps) => {
  const toggleTheme = () => {
    toggleIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark, themeKey: getCurrentTheme(isDark) }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
