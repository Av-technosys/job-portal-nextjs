import {
  RadioProps as MUIRadioProps,
  FormControlLabelProps,
  FormControlProps,
} from "@mui/material";

export interface RadioProps {
  radioProps?: MUIRadioProps;
  formControlProps?: FormControlProps;
  formControlLabelProps: Omit<FormControlLabelProps, "control">;
  onChange?: MUIRadioProps["onChange"];
  checked?: boolean;
  onBlur?: MUIRadioProps["onBlur"];
  error?: boolean;
  helperText?: string;
}
