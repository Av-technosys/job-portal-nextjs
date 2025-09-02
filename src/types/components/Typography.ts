import { TypographyProps as MUITypographyProps } from "@mui/material";

export interface TypographyProps {
  typographyProps: MUITypographyProps;
  fontSize?: TypographyFontSize;
  fontWeight?: TypographyFontWeight;
  fontColor?: TypographyFontColor;
}

export enum TypographyVariantEnum {
  H6 = "h6",
  H5 = "h5",
  CAPTION = "caption",
  BODY2 = "body2",
}

export enum TypographyFontWeight {
  extrabold = "700",
  bold = "600",
  semibold = "500",
  normal = "400",
}

export enum TypographyFontSize {
  extraTitle = "48px",
  semiExtraTitle = "40px",
  largeTitle = "36px",
  heading = "32px",
  extraHeading = "30px",
  subHeading = "28px",
  title = "26px",
  subtitle = "24px",
  extralarge = "20px",
  large = "18px",
  normal = "16px",
  small = "14px",
  extraSmall = "12px",
}

export enum TypographyFontColor {
  primary = "primary",
  secondary = "secondary",
  grey = "#989FA9",
  grey1 = "#574F4A",
  white = "#FFFFFF",
  white1 = "#C9C9C9",
  black = "black",
  black1 = "#4B4F53",
  black2 = "#18191C",
  black3 = "#767F8C",
  black4 = "#4D4D4D",
  black5 = "#5E6670",
  black6 = "#6C757D",
  black7 = "#646464",
  black8 = "#666666",
  black9 = "#9199A3",
  black10 = "#474C54",
  black11 = "#676767",
  black12 = "#454545",
  black13 = "#2C2C2C",
  black14 = "#717171",
  black15 = "#110B08",
  black16 = "#191F33",
  green = "#0BA02C",
  blue = "#007AFF",
  blue1 = "#0A65CC",
}
