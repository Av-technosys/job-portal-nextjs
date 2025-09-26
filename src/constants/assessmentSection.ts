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
  BACK_BUTTON: {
    buttonProps: {
      children: "Back",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.ERROR,
      size: ButtonSizeEnum.LARGE,
    },
  },
  TOTAL_QUESTIONS: (questions: number) => {
    return {
      typographyProps: {
        children: `${questions} Questions`,
        variant: TypographyVariantEnum.CAPTION,
      },
      fontSize: TypographyFontSize.extraSmall,
    };
  },
  MAX_TIME: (time: number) => {
    return {
      typographyProps: {
        children: `${time} Min`,
        variant: TypographyVariantEnum.CAPTION,
      },
      fontSize: TypographyFontSize.extraSmall,
    };
  },
};
