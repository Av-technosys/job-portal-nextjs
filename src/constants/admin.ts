import {
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";

export const ADMIN_PAGE_BODY_CONFIG = {
  WELCOME_MESSAGE: (name: string) => {
    return {
      typographyProps: {
        children: `Welcome ${name}`,
        variant: TypographyVariantEnum.H5,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.extraTitle,
      fontColor: TypographyFontColor.black15,
    };
  },
  TAB_TITLE: {
    typographyProps: {
      children: `Your Organisation `,
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.subtitle,
    fontColor: TypographyFontColor.black15,
  },
};
