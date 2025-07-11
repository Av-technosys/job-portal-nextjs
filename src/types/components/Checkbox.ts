import {
  CheckboxProps,
  FormControlLabelProps,
  FormControlProps,
} from "@mui/material";

export interface CheckBoxProps {
  checkboxProps?: CheckboxProps;
  formControlProps?: FormControlProps;
  formControlLabelProps: FormControlLabelProps;
  onChange?: CheckboxProps["onChange"];
  checked?: boolean;
  onBlur?: CheckboxProps["onBlur"];
  error?: boolean;
  helperText?: string;
}
