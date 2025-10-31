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
import { constructClassName } from "@/helper";

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
  const getSelectedOptionObject = useCallback(
    (valueToBeSearched: string) => {
      return options?.find(({ value }) => value === valueToBeSearched);
    },
    [options]
  );

  const selectedValue = useMemo(() => {
    const optionMatched = getSelectedOptionObject((value as string) || "");
    return optionMatched?.value || "";
  }, [getSelectedOptionObject, value]);
  const selectName = selectProps?.name || name;

  return (
    <FormControl {...formControlProps} error={error}>
      <InputLabel
        {...inputLabelProps}
        className={constructClassName([
          inputLabelProps?.className as string,
          inputLabelProps?.shrink ? "label-shrink" : "",
        ])}
      />
      <Select
        {...selectProps}
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
          <MenuItem key={`ja-option-${option.value}`} value={option.value}>
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
