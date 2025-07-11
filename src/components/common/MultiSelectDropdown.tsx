import React, { useCallback, useMemo } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
} from "@mui/material";
import When from "./When";
import { MultiSelectDropdownProps, Option } from "@/types";
import { colorStyles } from "@/styles";
import { constructClassName } from "@/helper";

function MultiSelectDropdown({
  options = [],
  inputLabelProps,
  formControlProps,
  selectProps,
  onChange,
  onBlur,
  error,
  helperText,
  value = [],
}: MultiSelectDropdownProps) {
  const getSelectedOptionObject = useCallback(
    (valueToBeSearched: string | string[]) => {
      const searchValues = Array.isArray(valueToBeSearched)
        ? valueToBeSearched
        : valueToBeSearched
        ? [valueToBeSearched]
        : [];

      return searchValues.map((selectedValue) =>
        options?.find(({ value }) => selectedValue === value)
      );
    },
    [options]
  );

  const selectedValue = useMemo(() => {
    const optionMatched = getSelectedOptionObject(value);
    return optionMatched?.map((option) => option?.value) || [];
  }, [getSelectedOptionObject, value]);

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
        multiple
        onChange={onChange}
        onBlur={onBlur}
        value={selectedValue}
        error={error}
        renderValue={(valueToBeRendered) => {
          return (
            <span>
              {getSelectedOptionObject(valueToBeRendered as string[])?.map(
                (option) => (
                  <Chip
                    key={`getSelectedOptionObjectChip-${option?.value}`}
                    label={option?.label}
                    size="small"
                    sx={{
                      bgcolor: colorStyles.filterTagsBackgroundColor,
                      color: colorStyles.filterTagsTextColor,
                    }}
                    className="w-fit cursor-pointer p-1 gap-1 text-sm"
                  />
                )
              )}
            </span>
          );
        }}
      >
        {options?.map((option: Option) => (
          <MenuItem
            key={`getSelectedOptionObjectMenuList-${option?.value}`}
            value={option.value}
          >
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

export default MultiSelectDropdown;
