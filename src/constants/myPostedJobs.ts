import { getPluralForm } from "@/helper";
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

export const POSTED_JOB_PAGE_CONFIG = {
  TITLE_COUNT: (totalLength: number) => {
    return {
      typographyProps: {
        children: totalLength,
        variant: TypographyVariantEnum.H4,
        className: "font-extrabold text-blue-700 mr-2",
      },
    };
  },
  TITLE_HEADER: (totalLength: number) => {
    return {
      typographyProps: {
        children: `Job${getPluralForm({ totalLength })} Posted`,
        variant: TypographyVariantEnum.H4,
        className: "font-extrabold text-slate-800 tracking-tight",
      },
    };
  },
  TITLE_BAR_CONFIG: {
    JOB: () => {
      return {
        typographyProps: {
          children: "Jobs",
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    STATUS: () => {
      return {
        typographyProps: {
          children: "Status",
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    APPLICATION: () => {
      return {
        typographyProps: {
          children: "Application",
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    JOB_TYPE: () => {
      return {
        typographyProps: {
          children: "Job Type",
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
  },
  POSTED_JOB_CARD: {
    IMAGE: (job: CommonObjectType) => {
      return {
        avatarProps: {
          variant: AvatarVariantEnum.SQUARE,
          src: job?.company_profile_image, // Default image if none is provided
          alt: job?.company_name || "Company logo",
          sx: {
            width: 56,
            height: 56,
            borderRadius: '12px',
          },
        },
      };
    },
    DESIGNATION: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.role,
          variant: TypographyVariantEnum.H6,
          className: "font-bold text-slate-800",
        },
      } as TypographyProps;
    },
    DESCRIPTION: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.description,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    LOCATION: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.location,
          variant: TypographyVariantEnum.BODY2,
          className: "text-slate-500 font-medium",
        },
      } as TypographyProps;
    },
    SALARY_RANGE: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.salary,
          variant: TypographyVariantEnum.BODY2,
          className: "text-slate-500 font-medium",
        },
      } as TypographyProps;
    },
    JOB_TYPE: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.job_type,
          variant: TypographyVariantEnum.BODY2,
          className: "bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium text-xs",
        },
      } as TypographyProps;
    },
    APPLICANTS: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: `${job?.application_count} Applicant${getPluralForm({
            totalLength: Number(job?.application_count),
          })}`,
          variant: TypographyVariantEnum.BODY2,
          className: "text-blue-600 font-semibold",
        },
      } as TypographyProps;
    },
    STATUS: (color: string, label: string) => {
      return {
        typographyProps: {
          children: label,
          variant: TypographyVariantEnum.BODY2,
          className: "font-bold tracking-wide uppercase text-xs ml-2",
          sx: {
            color,
          },
        },
      } as TypographyProps;
    },
  },
};

export const NOTIFICATION_CONFIG = {
  SUCCESS: {
    message: "Job Status update successfully",
  },
  DELETE_SUCCESS: {
    message: "Job Deleted successfully",
  },
};

export const REOPEN_JOB_POST = "reopen_job_post";
export const MARK_AS_EXPIRED = "mark_as_expired";
export const DELETE_JOB_PERMANENTLY = "delete_job_permanently";

export const ACTIVE_MENU_ITEMS = [
  {
    label: "Delete job permanently",
    key: DELETE_JOB_PERMANENTLY,
  },
  {
    label: "Mark as expired",
    key: MARK_AS_EXPIRED,
  },
];

export const EXPIRED_MENU_ITEMS = [
  {
    label: "Delete job permanently",
    key: DELETE_JOB_PERMANENTLY,
  },
  {
    label: "Reopen job post",
    key: REOPEN_JOB_POST,
  },
];

export const POSTED_JOB_CONFIG = {
  TEXT_FEILD: {
    typographyProps: {
      children: "No job posted yet?",
      variant: TypographyVariantEnum.BODY2,
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black7,
  },
  APPLY_BUTTON: {
    buttonProps: {
      children: "Post Now",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
    },
  },
};
