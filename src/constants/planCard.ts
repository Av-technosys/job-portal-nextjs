import {
  TypographyVariantEnum,
  ButtonVariantEnum,
  TypographyFontWeight,
  TypographyFontSize,
  TypographyFontColor,
} from "@/types";

export const PLAN_CARD_TEXT = {
  TITLE: (text: string) => ({
    typographyProps: {
      variant: TypographyVariantEnum.H6,
      children: text,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black2,
  }),
  SUB_TITLE: (text: string) => ({
    typographyProps: {
      variant: TypographyVariantEnum.BODY2,
      children: text,
      color: "text.secondary",
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.small,
    fontColor: TypographyFontColor.black3,
  }),
  PRICE: (number: number) => ({
    typographyProps: {
      variant: TypographyVariantEnum.H5,
      children: `₹ ${number}`,
      color: "text.primary",
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.largeTitle,
    fontColor: TypographyFontColor.blue1,
  }),
  MONTH: {
    typographyProps: {
      variant: TypographyVariantEnum.BODY2,
      children: "/Month",
      color: "text.secondary",
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black9,
  },
  FEATURES: (feature: string) => ({
    typographyProps: {
      children: feature,
      variant: TypographyVariantEnum.BODY2,
      sx: {
        color: "text.secondary",
      },
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.small,
    fontColor: TypographyFontColor.black10,
  }),
  BUTTON: {
    buttonProps: {
      children: "Make Payment",
      variant: ButtonVariantEnum.CONTAINED,
    },
  },
};
