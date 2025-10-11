// components/CommonCheckbox.tsx
import React from "react";
import { Checkbox as MUICheckbox, FormControlLabel } from "@mui/material";

type CommonCheckboxProps = {
  label: string;
  name?: string;
  value?: string | number;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const Checkbox: React.FC<CommonCheckboxProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <FormControlLabel
      control={
        <MUICheckbox
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
