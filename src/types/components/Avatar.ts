import { AvatarProps as MUIAvatarProps } from "@mui/material";

export enum AvatarVariantEnum {
  CIRCULAR = "circular",
  ROUNDED = "rounded",
  SQUARE = "square",
}

export interface AvatarProps extends Omit<MUIAvatarProps, "variant" | "children" | "alt" | "src"> {
  variant: AvatarVariantEnum;
  children?: MUIAvatarProps["children"];
  alt?: any;
  src?: any;
}
