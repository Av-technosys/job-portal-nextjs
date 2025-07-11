import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  TypographyVariantEnum,
} from "@/types";

export const ASSESSMENT_SUMMARY_PAGE_CONFIG = {
  SUBMITTED_MESSAGE: () => {
    return {
      typographyProps: {
        children: "Your Aptitude Test is successfully submitted!",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  SUMMERY_TEXT: () => {
    return {
      typographyProps: {
        children:
          "Your profile is now complete and ready to be shared with recruiter",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  ASSESSMENT: () => {
    return {
      typographyProps: {
        children: "Assessment",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  ASSESSMENT_TEXT: () => {
    return {
      typographyProps: {
        children: "Aptitude Test For Data Analyst",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  TIME_TAKEN: () => {
    return {
      typographyProps: {
        children: "Time Taken",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  TIME: () => {
    return {
      typographyProps: {
        children: "3 minuted 53 Seconds",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  SUBMITTED_ON_TEXT: () => {
    return {
      typographyProps: {
        children: "Submitted On",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  SUBMITTED_ON_TIME: () => {
    return {
      typographyProps: {
        children: "11 Nov, 2018",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  SUBMITTED_TIME_TEXT: () => {
    return {
      typographyProps: {
        children: "Submitted Time",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  SUBMITTED_TIME: () => {
    return {
      typographyProps: {
        children: "12 : 30 PM",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  JOB_SEEKER_ID: () => {
    return {
      typographyProps: {
        children: "Job Seeker ID",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  JOB_SEEKER_ID_VALUE: () => {
    return {
      typographyProps: {
        children: "123456",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  FEEDBACK_TEXT: () => {
    return {
      typographyProps: {
        children:
          "Please share your assessment experience. It should not take more than 2 Minutes.",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },

  GIVE_FEEDBACK: {
    buttonProps: {
      children: "Give Feedback",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
    },
  },
  SHOW_SCORE: {
    buttonProps: {
      children: "Show Score",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
    },
  },
};
