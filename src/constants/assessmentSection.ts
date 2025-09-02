import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";

export const ASSESSMENT_SECTION_PAGE_CONFIG = {
  SECTION_HEADER: () => {
    return {
      typographyProps: {
        children: "Start Your Test Now",
        variant: TypographyVariantEnum.CAPTION,
      },
      fontSize: TypographyFontSize.semiExtraTitle,
      fontWeight: TypographyFontWeight.extrabold,
      fontColor: TypographyFontColor.blue,
    };
  },
  START_TEST: {
    buttonProps: {
      children: "Start Test",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
    },
  },
  RETAKE_TEST: {
    buttonProps: {
      children: "Retake Test",
      variant: ButtonVariantEnum.TEXT,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
    },
  },
  ANALYSIS_TEST: {
    buttonProps: {
      children: "Analysis",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
    },
  },
  TOTAL_QUESTIONS: {
    typographyProps: {
      children: "50 Questions",
      variant: TypographyVariantEnum.CAPTION,
    },
    fontSize: TypographyFontSize.extraSmall,
  },
  MAX_TIME: {
    typographyProps: {
      children: "60 Min",
      variant: TypographyVariantEnum.CAPTION,
    },
    fontSize: TypographyFontSize.extraSmall,
  },
};
