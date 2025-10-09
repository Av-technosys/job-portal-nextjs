import { getPluralForm } from "@/helper";
import {
  AvatarVariantEnum,
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  JobListSortEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";
import { formatTimeUserCentric } from "@/helper";

export const JOB_LISTING_DROPDOWN_SORT_OPTIONS = [
  {
    label: "Created at (ASC)",
    key: "created_date",
    value: JobListSortEnum.CREATED_DATE_ASC,
  },
  {
    label: "Created at (DESC)",
    key: "-created_date",
    value: JobListSortEnum.CREATED_DATE_DESC,
  },
];

export const LIST_JOB_PAGE_CONFIG = {
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
        children: `Job${getPluralForm({ totalLength })} available`,
        variant: TypographyVariantEnum.BODY2,
      },
    };
  },
  SEARCH_TEXT: {
    typographyProps: {
      children: "Sort By Name",
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.small,
    fontColor: TypographyFontColor.black15,
  },
  JOB_LISTING_SORT_DROPDOWN: {
    selectProps: {
      name: "sortby",
    },
    formControlProps: {
      sx: {
        minWidth: 150,
      },
    },
    inputLabelProps: {
      children: "Sort By ",
      shrink: true,
    },
    options: JOB_LISTING_DROPDOWN_SORT_OPTIONS,
  },

  JOB_LIST_CARD: {
    IMAGE: (job: CommonObjectType) => {
      return {
        avatarProps: {
          variant: AvatarVariantEnum.SQUARE,
          src: job?.company_profile_image, // Default image if none is provided
          alt: job?.company_name || "Company logo",
          children: job?.company_profile_image,
          sx: {
            width: 40,
            height: 40,
            borderRadius: 10,
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
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.extralarge,
        fontColor: TypographyFontColor.black,
      } as TypographyProps;
    },
    COMPANY_NAME: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.company_name,
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.normal,
        fontSize: TypographyFontSize.small,
        fontColor: TypographyFontColor.black,
      } as TypographyProps;
    },
    DEPARTMENT: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.role,
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.small,
        fontColor: TypographyFontColor.black6,
      } as TypographyProps;
    },
    JOB_TYPE: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.job_type,
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.small,
        fontColor: TypographyFontColor.black6,
      } as TypographyProps;
    },
    SALARY_RANGE: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.salary,
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.small,
        fontColor: TypographyFontColor.black6,
      } as TypographyProps;
    },
    LOCATION: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: job?.location,
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.small,
        fontColor: TypographyFontColor.black6,
      } as TypographyProps;
    },

    TIME_STAMP: (job: CommonObjectType) => {
      return {
        typographyProps: {
          children: formatTimeUserCentric(job?.created_date?.toString()),
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.normal,
        fontSize: TypographyFontSize.normal,
        fontColor: TypographyFontColor.blue,
      } as TypographyProps;
    },

    APPLY_BUTTON: {
      buttonProps: {
        children: "Job Details",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.SMALL,
      },
    },

    SAVE_BUTTON: {
      buttonProps: {
        children: "Save Job",
      },
    },
    NOTIFICATION_CONFIG: {
      SUCCESS: {
        message: "Job saved successfully",
      },
      DELETE_SUCCESS: {
        message: "Job unsaved successfully",
      },
    },
  },
};
