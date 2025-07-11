import { getJobStatusButtonText, getPluralForm } from "@/helper";
import {
  AvatarVariantEnum,
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  JobStatusEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";

export const SAVED_JOB_PAGE_COFIG = {
  TITLE_COUNT: (totalLength: number) => {
    return {
      typographyProps: {
        children: totalLength,
        variant: TypographyVariantEnum.H5,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.subtitle,
      fontColor: TypographyFontColor.black,
    };
  },
  TITLE_HEADER: (totalLength: number) => {
    return {
      typographyProps: {
        children: `Job${getPluralForm({ totalLength })} saved`,
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.subtitle,
      fontColor: TypographyFontColor.black,
    };
  },
  JOB_SAVE_CARD: {
    IMAGE: (job: CommonObjectType) => {
      return {
        avatarProps: {
          variant: AvatarVariantEnum.SQUARE,
          src: job?.company_profile_image, // Default image if none is provided
          alt: job?.company_name || "Company logo",
          children: job?.company_profile_image,
          sx: {
            width: 54,
            height: 54,
            borderRadius: 1,
          },
        },
      };
    },
    DESIGNATION: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.role,
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.semibold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black,
      } as TypographyProps;
    },
    COMPANY_NAME: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.company_name,
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.extralarge,
        fontColor: TypographyFontColor.black,
      } as TypographyProps;
    },
    DEPARTMENT: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.role,
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.semibold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black6,
      } as TypographyProps;
    },
    JOB_TYPE: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.job_type,
          variant: TypographyVariantEnum.CAPTION,
        },
        fontWeight: TypographyFontWeight.semibold,
        fontSize: TypographyFontSize.extraSmall,
        fontColor: TypographyFontColor.blue1,
      } as TypographyProps;
    },
    SALARY_RANGE: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.salary,
          variant: TypographyVariantEnum.CAPTION,
        },
        fontWeight: TypographyFontWeight.semibold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black6,
      } as TypographyProps;
    },
    LOCATION: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.location,
          variant: TypographyVariantEnum.CAPTION,
        },
        fontWeight: TypographyFontWeight.semibold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black6,
      } as TypographyProps;
    },
    EXPIRY: (job: CommonObjectType) => {
      if (job?.status === JobStatusEnum.EXPIRED) {
        return null;
      }
      return {
        typographyProps: {
          children: `${job?.days_remaining} day${getPluralForm({
            totalLength: Number(job?.days_remaining),
          })} remaining`,
          variant: TypographyVariantEnum.CAPTION,
        },
      } as TypographyProps;
    },
    APPLY_BUTTON: (job: CommonObjectType) => {
      const isExpired = job?.status === JobStatusEnum.EXPIRED;
      const isApplied = job?.is_applied;

      return {
        buttonProps: {
          children: getJobStatusButtonText(isApplied, isExpired),
          variant: isExpired
            ? ButtonVariantEnum.OUTLINED
            : ButtonVariantEnum.CONTAINED,
          color: isExpired ? ButtonColorEnum.ERROR : ButtonColorEnum.PRIMARY,
          size: ButtonSizeEnum.LARGE,
          disabled: isExpired || job?.is_applied,
        },
      };
    },

    SAVE_BUTTON: {
      buttonProps: {
        children: "Save Job",
      },
    },
    NOTIFICATION_CONFIG: {
      DELETE_SUCCESS: {
        message: "Job unsaved successfully",
      },
      APPLIED: {
        message: "Job applied successfully",
      },
    },
  },
};
export const SAVED_BOX_CONFIG = {
  TEXT_FEILD: {
    typographyProps: {
      children: "Didn't saved any jobs",
      variant: TypographyVariantEnum.BODY2,
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black7,
  },
  APPLY_BUTTON: {
    buttonProps: {
      children: "Saved Jobs",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
    },
  },
};
