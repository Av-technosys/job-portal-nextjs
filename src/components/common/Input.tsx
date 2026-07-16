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
        {
          "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            transform: "translate(16px, 11px) scale(1)",
            fontSize: "0.875rem",
          },
          "& .MuiInputLabel-shrink": {
            fontSize: "0.875rem",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px !important",
            backgroundColor: "#ffffff !important",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05) !important",
            transition: "all 0.2s ease-in-out",
            fontSize: "0.875rem !important",
            minHeight: "42px !important",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e2e8f0 !important",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#818cf8 !important",
            },
            "&.Mui-focused": {
              boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.15) !important",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4f46e5 !important",
                borderWidth: "1.5px !important",
              },
            },
            "&:not(.MuiInputBase-multiline) .MuiOutlinedInput-input": {
              padding: "10px 16px !important",
            },
            "& .MuiOutlinedInput-input": {
              fontWeight: "600 !important",
              color: "#334155 !important",
            },
          },
        },
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
