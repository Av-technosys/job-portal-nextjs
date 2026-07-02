import { DATE_FORMAT } from "@/helper";
import { DatePickerProps } from "@/types";
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
  const labelText = inputLabelProps?.children as string | undefined;

  return (
    <ADatePicker
      {...dateProps}
      format={DATE_FORMAT}
      onChange={onChange}
      label={labelText}
      value={value}
      sx={formControlProps?.sx}
      slotProps={{
        textField: {
          error,
          helperText,
          InputLabelProps: {
            shrink: inputLabelProps?.shrink,
          },
          fullWidth: true,
        },
      }}
    />
  );
}

export default DatePicker;
