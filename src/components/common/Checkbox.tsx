import { CheckBoxProps } from "@/types";
import {
  Checkbox as MUICheckbox,
  FormControl,
  FormControlLabel,
} from "@mui/material";

function CheckBox({
  checkboxProps,
  formControlProps,
  formControlLabelProps,
  onChange,
  checked,
  onBlur,
  helperText,
  error,
}: CheckBoxProps) {
  return (
    <FormControl {...formControlProps} error={error}>
      <FormControlLabel
        {...formControlLabelProps}
        control={
          <>
            <MUICheckbox
              {...checkboxProps}
              onChange={onChange}
              onBlur={onBlur}
              checked={checked}
            />
            {helperText}
          </>
        }
      />
    </FormControl>
  );
}
export default CheckBox;
