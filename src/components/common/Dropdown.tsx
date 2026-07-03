import React, { useCallback, useMemo } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import When from "./When";
import { DropdownProps } from "@/types";

function Dropdown({
  options = [],
  inputLabelProps,
  formControlProps,
  selectProps,
  onChange,
  onBlur,
  error,
  helperText,
  value,
  name,
}: DropdownProps) {
  const normalizeOptionValue = (optionValue: string | number) =>
    `${optionValue}`.toLowerCase().replace(/[^a-z0-9]/g, "");

  const getSelectedOptionObject = useCallback(
    (valueToBeSearched: string) => {
      return options?.find(
        ({ label, value }) =>
          value === valueToBeSearched ||
          normalizeOptionValue(value) === normalizeOptionValue(valueToBeSearched) ||
          normalizeOptionValue(label as string) ===
            normalizeOptionValue(valueToBeSearched)
      );
    },
    [options]
  );

  const selectedValue = useMemo(() => {
    const optionMatched = getSelectedOptionObject((value as string) || "");
    return optionMatched?.value || "";
  }, [getSelectedOptionObject, value]);

  const selectName = selectProps?.name || name;
  const labelText = inputLabelProps?.children || selectProps?.label || "";
  const labelId = `dropdown-label-${selectName}`;

  return (
    <FormControl
      {...formControlProps}
      error={error}
      sx={[
        {
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
          },
          "& .MuiSelect-select": {
            padding: "10px 38px 10px 16px !important",
            display: "flex",
            alignItems: "center",
            fontWeight: "600 !important",
            color: "#334155 !important",
            minHeight: "22px !important",
          },
          "& .MuiSelect-icon": {
            right: "12px !important",
            color: "#64748b !important",
          },
        },
        ...(Array.isArray(formControlProps?.sx)
          ? formControlProps.sx
          : [formControlProps?.sx || {}]),
      ]}
    >
      <InputLabel id={labelId} shrink={inputLabelProps?.shrink}>
        {labelText}
      </InputLabel>
      <Select
        {...selectProps}
        labelId={labelId}
        label={labelText}
        // @ts-expect-error MUI Select passes this down to OutlinedInput but doesn't type it
        notched={inputLabelProps?.shrink ? true : undefined}
        onChange={onChange}
        onBlur={onBlur}
        name={selectName}
        value={selectedValue}
        error={error}
        renderValue={(valueToBeRendered) => {
          const selectedOption = getSelectedOptionObject(
            valueToBeRendered as string
          );
          return (
            <span>
              <When condition={selectedOption?.icon !== undefined}>
                <span className={"mr-2"}>{selectedOption?.icon}</span>
              </When>
              {selectedOption?.label}
            </span>
          );
        }}
      >
        {options?.map((option) => (
          <MenuItem key={`ja-option-${option.key}`} value={option.value}>
            <When condition={option?.icon !== undefined}>
              <span className={"mr-2"}>{option.icon}</span>
            </When>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <When condition={helperText !== ""}>
        <FormHelperText>{helperText}</FormHelperText>
      </When>
    </FormControl>
  );
}

export default Dropdown;
