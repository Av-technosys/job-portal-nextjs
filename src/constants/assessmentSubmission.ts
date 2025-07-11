import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";

export const ASSESSMENT_SUBMISSION_PAGE_CONFIG = {
  WELCOME_TEXT: () => {
    return {
      typographyProps: {
        children: "Welcome User",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  JOB_SEEKER_ID: () => {
    return {
      typographyProps: {
        children: "Job Seeker ID: 45131836",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  TIME: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.time,
        variant: TypographyVariantEnum.H5,
      },
    } as TypographyProps;
  },
  SECTION_NAME_ITEM: (section: CommonObjectType) => {
    return {
      typographyProps: {
        children: section?.sectionName,
        variant: TypographyVariantEnum.CAPTION,
      },
    } as TypographyProps;
  },
  ATTEMPT_ITEM: (section: CommonObjectType) => {
    return {
      typographyProps: {
        children: section?.attempted,
        variant: TypographyVariantEnum.CAPTION,
      },
    } as TypographyProps;
  },
  ACTION_ITEM: (section: CommonObjectType) => {
    return {
      typographyProps: {
        children: section?.action,
        variant: TypographyVariantEnum.CAPTION,
      },
    } as TypographyProps;
  },
  SUMMERY: () => {
    return {
      typographyProps: {
        children: "Summery (35/35) ",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  SECTION_NAME: () => {
    return {
      typographyProps: {
        children: "Section Name",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  ATTEMPTED: () => {
    return {
      typographyProps: {
        children: "Attempted",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  ACTION: () => {
    return {
      typographyProps: {
        children: "Action",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },

  BACK_TO_TEST: {
    buttonProps: {
      children: "Back To Test",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },

  SUBMIT_BUTTON: {
    buttonProps: {
      children: "Submit",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.SUCCESS,
      size: ButtonSizeEnum.LARGE,
    },
  },
};
