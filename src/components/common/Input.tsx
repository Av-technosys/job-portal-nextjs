import React from "react";
import { TextField, FormControl, InputLabel } from "@mui/material";
import { InputProps } from "@/types";
import { constructClassName } from "@/helper";

function Input({
  inputProps,
  inputLabelProps,
  formControlProps,
  onChange,
  onBlur,
  error,
  helperText,
  value,
}: InputProps) {
  return (
    <FormControl {...formControlProps} error={error}>
      <InputLabel
        {...inputLabelProps}
        className={constructClassName([
          inputLabelProps?.className as string,
          inputLabelProps?.shrink ? "label-shrink" : "",
        ])}
      />
      <TextField
        {...inputProps}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        value={value}
        helperText={helperText}
        autoComplete={inputProps?.type === "password" ? "new-password" : "off"}
      />
    </FormControl>
  );
}

export default Input;
