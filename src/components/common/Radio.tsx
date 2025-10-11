import {
  Radio as MUIRadio,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { RadioProps } from "@/types";

function Radio({
  radioProps,
  formControlProps,
  formControlLabelProps,
  onChange,
  checked,
  onBlur,
  helperText,
  error,
  label,
  name,
  value,
}: RadioProps) {
  return (
    <FormControl {...formControlProps} error={error}>
      <FormControlLabel
        {...formControlLabelProps}
        control={
          <>
            <MUIRadio
              {...radioProps}
              onChange={onChange}
              onBlur={onBlur}
              checked={checked}
              name={name}
              value={value}
            />
            {helperText}
          </>
        }
        label={label}
      />
    </FormControl>
  );
}
export default Radio;
