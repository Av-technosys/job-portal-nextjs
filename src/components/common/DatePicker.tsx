import { constructClassName, DATE_FORMAT } from "@/helper";
import { DatePickerProps } from "@/types";
import { FormControl, InputLabel } from "@mui/material";
import { DatePicker as ADatePicker } from "@mui/x-date-pickers";

function DatePicker({
  dateProps,
  onChange,
  error,
  helperText,
  value,
  formControlProps,
  inputLabelProps,
}: DatePickerProps) {
  return (
    <>
      <FormControl {...formControlProps} error={error}>
        <InputLabel
          {...inputLabelProps}
          className={constructClassName([
            inputLabelProps?.className as string,
            inputLabelProps?.shrink ? "label-shrink" : "",
          ])}
        />
        <ADatePicker
          {...dateProps}
          format={DATE_FORMAT}
          onChange={onChange}
          slotProps={{
            textField: {
              error,
              helperText,
              value,
            },
          }}
        />
      </FormControl>
    </>
  );
}

export default DatePicker;
