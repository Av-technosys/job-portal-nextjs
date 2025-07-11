import React from "react";
import { FormControl, Button as MUIButton } from "@mui/material";
import { ButtonProps } from "@/types";

function Button({ buttonProps, formControlProps, onClick }: ButtonProps) {
  return (
    <FormControl {...formControlProps}>
      <MUIButton {...buttonProps} onClick={onClick} />
    </FormControl>
  );
}

export default Button;
