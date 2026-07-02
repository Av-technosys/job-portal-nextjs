import React, { useState } from "react";
import { TextField, FormControl, InputLabel, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const isPasswordField = inputProps?.type === "password";
  const type = isPasswordField ? (showPassword ? "text" : "password") : inputProps?.type;

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
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        value={value}
        helperText={helperText}
        autoComplete={isPasswordField ? "new-password" : "off"}
        InputProps={{
          ...inputProps?.InputProps,
          endAdornment: isPasswordField ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : inputProps?.InputProps?.endAdornment,
        }}
      />
    </FormControl>
  );
}

export default Input;
