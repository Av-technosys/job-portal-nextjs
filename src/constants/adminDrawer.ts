import {
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";

export const ADMIN_DRAWER_CONFIG = {
  MAIN_HEADING_TEXT: (heading: any) =>
    ({
      typographyProps: {
        children: heading,
        variant: TypographyVariantEnum.CAPTION,
      },
      fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.black,
      backgroundColor: "#4CAF50",
      padding: "4px 12px",
      borderRadius: "6px",
    } as TypographyProps),

  HEADING_TEXT: (heading: any) =>
    ({
      typographyProps: {
        children: heading,
        variant: TypographyVariantEnum.CAPTION,
      },
      fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.normal,
      fontColor: TypographyFontColor.black,
      backgroundColor: "#4CAF50",
      padding: "4px 12px",
      borderRadius: "6px",
    } as TypographyProps),
};
