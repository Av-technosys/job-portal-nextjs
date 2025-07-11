import React from "react";
import { StackProps } from "@mui/material";
import { TypographyProps } from "./Typography";

export interface textWithIconProps {
  textWithIconProps?: StackProps; // Props for the parent Stack
  icon: React.ReactNode; // The icon component to render
  textProps?: TypographyProps; // Props for the Typography component
  subTextProps?: TypographyProps; // Props for the subtext Typography
  subIcon?: React.ReactNode; // Optional icon for the subtext
}
