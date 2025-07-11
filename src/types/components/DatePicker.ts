import {
  DatePickerProps as MUIDatePickerProps,
  PickerValidDate,
} from "@mui/x-date-pickers";
import { FormControlProps, InputLabelProps } from "@mui/material";
import { dayjsInstance } from "../common";

export interface DatePickerProps {
  dateProps?: MUIDatePickerProps<PickerValidDate>;
  value?: dayjsInstance;
  onChange?: MUIDatePickerProps<PickerValidDate>["onChange"];
  error?: boolean;
  helperText?: string;
  formControlProps?: FormControlProps;
  inputLabelProps?: InputLabelProps;
}
