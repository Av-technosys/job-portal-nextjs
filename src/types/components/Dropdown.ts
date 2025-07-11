import { FormControlProps, InputLabelProps, SelectProps } from "@mui/material";
import { ElementRenderType } from "../common";
import { ChangeEventHandler } from "react";

export interface Option {
  value: string;
  label: ElementRenderType;
  key: string;
  icon?: ElementRenderType;
}

export interface DropdownProps {
  options?: Option[];
  inputLabelProps?: InputLabelProps;
  formControlProps?: FormControlProps;
  selectProps?: SelectProps;
  onChange?: SelectProps["onChange"];
  onBlur?: ChangeEventHandler;
  error?: boolean;
  helperText?: string;
  value?: string;
}
