import { FormControlProps, TextFieldProps } from "@mui/material";

export interface SkillsInputProps {
  inputProps?: TextFieldProps;
  formControlProps?: FormControlProps;
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: boolean;
  helperText?: string;
}
