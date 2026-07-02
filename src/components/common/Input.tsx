import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputProps } from "@/types";

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
    <TextField
      {...inputProps}
      label={inputLabelProps?.children as string || inputProps?.label}
      InputLabelProps={{
        shrink: inputLabelProps?.shrink,
      }}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      value={value}
      helperText={helperText}
      autoComplete={isPasswordField ? "new-password" : "off"}
      disabled={formControlProps?.disabled || inputProps?.disabled}
      sx={[
        formControlProps?.sx as object,
        inputProps?.sx as object,
      ].filter(Boolean)}
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
  );
}

export default Input;
