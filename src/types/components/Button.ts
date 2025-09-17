import { ButtonProps as MUIButtonProps, FormControlProps } from "@mui/material";
import { ButtonHTMLAttributes, MouseEventHandler } from "react";

export interface ButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonProps: (MUIButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) | any;
  formControlProps?: FormControlProps;
  onClick?: MouseEventHandler;
}

export interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export enum ButtonVariantEnum {
  CONTAINED = "contained",
  OUTLINED = "outlined",
  TEXT = "text",
}

export enum ButtonColorEnum {
  PRIMARY = "primary",
  ERROR = "error",
  SUCCESS = "success",
}

export enum ButtonSizeEnum {
  LARGE = "large",
  SMALL = "small",
}
