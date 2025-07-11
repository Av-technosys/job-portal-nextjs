import {
  FormControlProps,
  InputLabelProps,
  TextFieldProps,
} from "@mui/material";
export interface InputProps {
  inputProps?: TextFieldProps;
  inputLabelProps?: InputLabelProps;
  formControlProps?: FormControlProps;
  value?: string | number;
  onChange?: TextFieldProps["onChange"];
  onBlur?: TextFieldProps["onBlur"];
  error?: boolean;
  helperText?: string;
}
