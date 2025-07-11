import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";

export const ASSESSMENT_SCORE_PAGE_CONFIG = {
  SCORE_TEXT: () => {
    return {
      typographyProps: {
        children: " Your Score ",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  SCORE_VALUE_1: () => {
    return {
      typographyProps: {
        children: " 76 ",
        variant: TypographyVariantEnum.H5,
      },
    };
  },
  SCORE_VALUE_2: () => {
    return {
      typographyProps: {
        children: "  of 100 ",
        variant: TypographyVariantEnum.H6,
      },
    };
  },
  SCORE_VALUE_3: (section: CommonObjectType) => {
    return {
      typographyProps: {
        children: section?.value,
        variant: TypographyVariantEnum.CAPTION,
      },
    } as TypographyProps;
  },

  ASSESSMENT_SPREAD_TEXT: () => {
    return {
      typographyProps: {
        children: " Assessment Spread ",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  CONGRATS_TEXT: () => {
    return {
      typographyProps: {
        children:
          " Congratulations, your score exceeds 65% and you are cleared to move forward with the next phase of the process. ",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  SUMMERY: (section: CommonObjectType) => {
    return {
      typographyProps: {
        children: section?.summery,
        variant: TypographyVariantEnum.CAPTION,
      },
    } as TypographyProps;
  },
  RETAKE_TEST: {
    buttonProps: {
      children: "Retake Test",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },

  CONTINUE_BUTTON: {
    buttonProps: {
      children: "Continue",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.SUCCESS,
      size: ButtonSizeEnum.LARGE,
    },
  },
};
