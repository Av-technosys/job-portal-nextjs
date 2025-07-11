import { SkeletonProps as MUISkeletonProps } from "@mui/material";

export enum SkeletonVariantEnum {
  RECTANGULAR = "rectangular",
  TEXT = "text",
  CIRCULAR = "circular",
}
export interface SkeletonProps {
  variant?: SkeletonVariantEnum;
  width?: MUISkeletonProps["width"];
  height?: MUISkeletonProps["height"];
}
