import { AvatarProps as MUIAvatarProps } from "@mui/material";

export enum AvatarVariantEnum {
  CIRCULAR = "circular",
  ROUNDED = "rounded",
  SQUARE = "square",
}

export interface AvatarProps extends Omit<MUIAvatarProps, "variant" | "alt" | "src"> {
  variant?: AvatarVariantEnum;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alt?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src?: any;
}
