import {
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";

export const DASHBOARD_PAGE_CONFIG = {
  APPLIED_JOBS: "Applied Jobs",
  SAVED_JOBS: "Saved Jobs",
  ALERTS_JOBS: "Alerts Jobs",
  POSTED_JOBS: "Posted Jobs",
  SAVED_PROFILES: "Saved Profiles",

  SKELETON: {
    COUNT_ICON: {
      width: 40,
      height: 40,
    },
    TITLE_TEXT: {
      width: 100,
      height: 24,
    },
  },
  TITLE_HEADER: (name: string) => {
    return {
      typographyProps: {
        children: `Hello, ${name}`,
        variant: TypographyVariantEnum.H5,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.subtitle,
    };
  },
  TITLE_CAPTION: () => {
    return {
      typographyProps: {
        children: "Here is your daily activities and jobs alerts",
        variant: TypographyVariantEnum.BODY2,
        className: "mt-4",
      },
      fontColor: TypographyFontColor.grey,
      fontWeight: TypographyFontWeight.normal,
    };
  },
  COUNT: (totalCount: number) => {
    return {
      typographyProps: {
        children: totalCount,
        variant: TypographyVariantEnum.H5,
      },
      fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.subtitle,
    };
  },
  TITLE_TEXT: (text: string) => {
    return {
      typographyProps: {
        children: text,
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.bold,
      fontColor: TypographyFontColor.black1,
      fontSize: TypographyFontSize.small,
    };
  },
};
