import { formatDate } from "@/helper";
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

export const JOB_DETAIL_PAGE_CONFIG = {
  IMAGE: (job: CommonObjectType) => {
    return {
      avatarProps: {
        variant: AvatarVariantEnum.CIRCULAR,
        src: job?.company_profile_image, // Default image if none is provided
        alt: job?.company_name || "Company logo",
        children: job?.company_profile_image,
        sx: {
          width: 96,
          height: 96,
          borderRadius: 100,
        },
      },
    };
  },
  DESIGNATION: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.title,
        variant: TypographyVariantEnum.H5,
      },
      fontSize: TypographyFontSize.subtitle,
    } as TypographyProps;
  },
  COMPANY_NAME: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: `at ${job?.company_name}`,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
      fontColor: TypographyFontColor.grey,
    } as TypographyProps;
  },
  JOB_TYPE: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.job_type,
        variant: TypographyVariantEnum.BODY2,
      },
      fontColor: TypographyFontColor.white,
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  APPLY_BUTTON: {
    buttonProps: {
      children: "Apply Now",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },
  DESCRIPTION_TEXT: () => {
    return {
      typographyProps: {
        children: "Job Description",
        variant: TypographyVariantEnum.H6,
      },
      fontWeight: TypographyFontWeight.bold,
    };
  },
  JOB_DESCRIPTION: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.description,
        variant: TypographyVariantEnum.BODY2,
      },
    } as TypographyProps;
  },

  SALARY_TEXT: () => {
    return {
      typographyProps: {
        children: "Salary (INR)",
        variant: TypographyVariantEnum.H6,
      },
    };
  },
  SALARY: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: `${job?.salary} `,
        variant: TypographyVariantEnum.CAPTION,
      },
      fontColor: TypographyFontColor.green,
    } as TypographyProps;
  },
  SALARY_YEAR_TEXT: () => {
    return {
      typographyProps: {
        children: "Yearly Salary",
        variant: TypographyVariantEnum.BODY2,
      },
      fontColor: TypographyFontColor.grey,
      fontSize: TypographyFontSize.small,
    };
  },
  LOCATION_TEXT: () => {
    return {
      typographyProps: {
        children: "Job Location",
        variant: TypographyVariantEnum.H6,
      },
    };
  },
  LOCATION: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.location,
        variant: TypographyVariantEnum.BODY2,
      },
      fontColor: TypographyFontColor.grey,
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  POSTED_DATE: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: formatDate(job?.created_date?.toString()),
        variant: TypographyVariantEnum.BODY2,
      },
    } as TypographyProps;
  },
  JOB_OVERVIEW_TEXT: () => {
    return {
      typographyProps: {
        children: "Job Overview",
        variant: TypographyVariantEnum.H6,
      },
      fontWeight: TypographyFontWeight.bold,
    };
  },
  JOB_POSTED_TEXT: () => {
    return {
      typographyProps: {
        children: "JOB POSTED",
        variant: TypographyVariantEnum.BODY2,
      },
      fontColor: TypographyFontColor.grey,
      fontSize: TypographyFontSize.small,
    };
  },
  JOB_EXPIRE_TEXT: () => {
    return {
      typographyProps: {
        children: "JOB EXPIRE IN",
        variant: TypographyVariantEnum.BODY2,
      },
      fontColor: TypographyFontColor.grey,
      fontSize: TypographyFontSize.small,
    };
  },
  JOB_EXPIRE: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: formatDate(job?.expired_at?.toString()),
        variant: TypographyVariantEnum.BODY2,
      },
    } as TypographyProps;
  },
  JOB_LEVEL_TEXT: () => {
    return {
      typographyProps: {
        children: "JOB LEVEL",
        variant: TypographyVariantEnum.BODY2,
      },
      fontColor: TypographyFontColor.grey,
      fontSize: TypographyFontSize.small,
    };
  },
  JOB_LEVEL: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.job_level,
        variant: TypographyVariantEnum.BODY2,
      },
    } as TypographyProps;
  },
  EXPERIENCE_TEXT: () => {
    return {
      typographyProps: {
        children: "EXPERIENCE",
        variant: TypographyVariantEnum.BODY2,
      },
      fontColor: TypographyFontColor.grey,
      fontSize: TypographyFontSize.small,
    };
  },
  EXPERIENCE: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.experience,
        variant: TypographyVariantEnum.BODY2,
      },
    } as TypographyProps;
  },
  EDUCATION_TEXT: () => {
    return {
      typographyProps: {
        children: "EDUCATION",
        variant: TypographyVariantEnum.BODY2,
      },
      fontColor: TypographyFontColor.grey,
      fontSize: TypographyFontSize.small,
    };
  },
  EDUCATION: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.education,
        variant: TypographyVariantEnum.BODY2,
      },
    } as TypographyProps;
  },
  SOCIAL_HANDLE: {
    typographyProps: {
      children: "Follow Us On Social Media :",
      variant: TypographyVariantEnum.BODY2,
    },
    fontWeight: TypographyFontWeight.bold,
  },
  NOTIFICATION_CONFIG: {
    APPLIED: {
      message: "Job applied successfully",
    },
  },
};
