import { ListItemButtonProps, ListItemIconProps } from "@mui/material";

export interface ListItemProps {
  text?: string;
  icon?: ListItemIconProps;
  listItemButton?: ListItemButtonProps;
  toolipText?: string;
  listValue: string;
  key?: string;
}

export interface ListProps {
  listOptions: ListItemProps[];
  defaultListValue?: string;
  onClick: (listValue: ListItemProps["listValue"]) => void;
}
