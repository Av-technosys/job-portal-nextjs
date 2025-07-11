import { AvatarProps as MUIAvatarProps } from "@mui/material";

export enum AvatarVariantEnum {
  CIRCULAR = "circular",
  ROUNDED = "rounded",
  SQUARE = "square",
}

export interface AvatarProps {
  variant: AvatarVariantEnum;
  children: MUIAvatarProps["children"];
}
