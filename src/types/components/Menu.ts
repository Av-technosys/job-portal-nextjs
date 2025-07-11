import { MenuProps as MUIMenuProps } from "@mui/material";
import { CommonObjectType } from "../common";

export type MenuItemProps = {
  label: string;
  key: string;
};

export interface MenuProps {
  onMenuClick?: MUIMenuProps["onClick"];
  handleClose: MUIMenuProps["onClose"];
  anchorEl: MUIMenuProps["anchorEl"];
  children?: React.ReactNode;
  styles?: {
    paperStyles?: CommonObjectType;
  };
}

export interface MenuListProps {
  menuItems: MenuItemProps[];
  onClick?: (key: string, event: React.MouseEvent<HTMLLIElement>) => void;
}
