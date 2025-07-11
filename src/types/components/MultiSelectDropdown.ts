import { FormControlProps, InputLabelProps, SelectProps } from "@mui/material";
import { ChangeEventHandler } from "react";
import { Option } from "./Dropdown";


export interface MultiSelectDropdownProps {
  options?: Option[];
  inputLabelProps?: InputLabelProps;
  formControlProps?: FormControlProps;
  selectProps?: SelectProps;
  onChange?: SelectProps["onChange"];
  onBlur?: ChangeEventHandler;
  error?: boolean;
  helperText?: string;
  value?: string[];
}
