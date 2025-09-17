import { SxProps, TextFieldProps } from "@mui/material";
import { ElementRenderType } from "../common";

export type AutoCompleteListItem = {
  key: string;
  title: ElementRenderType;
};

export interface AutoCompleteProps {
  getOptionLabel?: (option: AutoCompleteListItem) => string;
  searchOptions?: AutoCompleteListItem[];
  handleDebouncedInputChange?: (debouncedSearchValue?: string) => void;
  isLoading?: boolean;
  textfieldProps?: TextFieldProps;
  styles?: {
    autocompleteStyles?: SxProps;
  };
  noOptionsText?: string;
  loadingText?: string;
  isOpen?: boolean;
}
