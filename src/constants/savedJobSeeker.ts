import { getPluralForm } from "@/helper";
import {
  AvatarVariantEnum,
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";
import { formatTimeUserCentric } from "@/helper";

export const SAVED_JOB_SEEKER_PAGE_COFIG = {
  TITLE_COUNT: (totalLength: number) => {
    return {
      typographyProps: {
        children: totalLength,
        variant: TypographyVariantEnum.H5,
      },
    };
  },
  TITLE_HEADER: (totalLength: number) => {
    return {
      typographyProps: {
        children: `Job Seeker${getPluralForm({ totalLength })} saved`,
        variant: TypographyVariantEnum.BODY2,
      },
    };
  },
  SAVE_JOBSEEKER_CARD: {
    IMAGE: (job: CommonObjectType) => {
      return {
        avatarProps: {
          variant: AvatarVariantEnum.SQUARE,
          src: job?.company_profile_image, // Default image if none is provided
          alt: job?.company_name || "Company logo",
          children: job?.company_profile_image,
          sx: {
            width: 100,
            height: 100,
            borderRadius: 1,
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
      } as TypographyProps;
    },
    COMPANY_NAME: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.company_name,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    DEPARTMENT: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.role,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    JOB_TYPE: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.job_type,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    APPLICATION_STATUS: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.job_type,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },

    SALARY_RANGE: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.salary,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    LOCATION: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.location,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    EXPERIENCE_LEVEL: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: formatTimeUserCentric(job?.created_date?.toString()),
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },

    TIME_STAMP: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: formatTimeUserCentric(job?.created_date?.toString()),
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },

    APPLY_BUTTON: {
      buttonProps: {
        children: "View Profile",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.LARGE,
      },
    },

    SAVE_BUTTON: {
      buttonProps: {
        children: "Save Job",
      },
    },
  },
};
