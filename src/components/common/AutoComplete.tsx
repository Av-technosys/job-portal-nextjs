import React, { useEffect, useState } from "react";
import { CircularProgressIcon } from "@/assets/icons";
import { AutoCompleteProps } from "@/types";
import { useDebounce } from "@/services";
import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material";
import When from "./When";

function AutoComplete({
  handleDebouncedInputChange,
  getOptionLabel,
  textfieldProps,
  styles,
  searchOptions,
  isLoading = false,
  noOptionsText,
  loadingText,
  isOpen = false,
}: AutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    handleDebouncedInputChange?.(debouncedSearch);
  }, [debouncedSearch, handleDebouncedInputChange]);

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    setSearch(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MuiAutocomplete
      sx={styles?.autocompleteStyles}
      open={open && isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      onInputChange={handleInputChange}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      getOptionLabel={(option) => getOptionLabel?.(option) || option.key}
      options={searchOptions || []}
      loading={isLoading}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...textfieldProps}
            slotProps={{
              input: {
                ...params.InputProps,
                ...textfieldProps?.slotProps?.input,
                endAdornment: (
                  <React.Fragment>
                    <When condition={isLoading}>
                      <CircularProgressIcon color="inherit" size={20} />
                    </When>
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              },
            }}
          />
        );
      }}
      noOptionsText={!searchOptions ? "Start Typing ...." : noOptionsText}
      loadingText={loadingText}
    />
  );
}

export default AutoComplete;
