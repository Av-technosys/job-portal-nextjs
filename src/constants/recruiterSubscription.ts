import {
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";

export const recruiterSubscription = {
  HEADER_TEXT: {
    typographyProps: {
      children: "Buy Premium Subscription to Post a Job ",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.subtitle,
    fontColor: TypographyFontColor.black2,
  },

  HEADER_SUB_TEXT: {
    typographyProps: {
      children:
        "Donec eu dui ut dolor commodo ornare. Sed arcu libero, malesuada quis justo sit amet, varius tempus neque. Quisque ultrices mi sed lorem condimentum, vel tempus lectus ultricies.",
      variant: TypographyVariantEnum.BODY2,
      color: "text.secondary",
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black5,
  },
};
