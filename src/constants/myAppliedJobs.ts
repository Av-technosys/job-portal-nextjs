import { formatDate, getPluralForm } from "@/helper";
import {
  AvatarVariantEnum,
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";

export const APPLIED_JOB_PAGE_CONFIG = {
  TITLE_COUNT: (totalLength: number) => {
    return {
      typographyProps: {
        children: totalLength,
        variant: TypographyVariantEnum.H5,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.subtitle,
      fontColor: TypographyFontColor.black,
    } as TypographyProps;
  },
  TITLE_HEADER: (totalLength: number) => {
    return {
      typographyProps: {
        children: `Job${getPluralForm({ totalLength })} applied`,
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.black,
    } as TypographyProps;
  },
  TITLE_BAR_CONFIG: {
    JOB: () => {
      return {
        typographyProps: {
          children: "Jobs",
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black7,
      } as TypographyProps;
    },
    JOB_TYPE: () => {
      return {
        typographyProps: {
          children: "Job Type",
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black7,
      } as TypographyProps;
    },
    APPLIED_DATE: () => {
      return {
        typographyProps: {
          children: "Applied Date",
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black7,
      } as TypographyProps;
    },
    ACTION: () => {
      return {
        typographyProps: {
          children: "Action",
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black7,
      } as TypographyProps;
    },
  },
  APPLIED_JOB_CARD: {
    IMAGE: (job: CommonObjectType) => {
      return {
        avatarProps: {
          variant: AvatarVariantEnum.SQUARE,
          src: job?.company_profile_image, // Default image if none is provided
          alt: job?.company_name || "Company logo",

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
    LOCATION: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.location,
          variant: TypographyVariantEnum.CAPTION,
        },
        fontWeight: TypographyFontWeight.semibold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black,
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
        fontColor: TypographyFontColor.black,
      } as TypographyProps;
    },
    JOB_TYPE: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.job_type,
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.semibold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black,
      } as TypographyProps;
    },
    TIME_STAMP: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: formatDate(job?.created_date?.toString()),
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.semibold,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.black8,
      } as TypographyProps;
    },
    VIEW_DETAILS_BUTTON: {
      buttonProps: {
        children: "View Details",
        variant: ButtonVariantEnum.OUTLINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.SMALL,
      },
    },
  },
};
export const EMPTY_BOX_CONFIG = {
  TEXT_FEILD: {
    typographyProps: {
      children: "Didn't apply to job yet?",
      variant: TypographyVariantEnum.BODY2,
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black7,
  },
  APPLY_BUTTON: {
    buttonProps: {
      children: "Apply Now",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
    },
  },
};
