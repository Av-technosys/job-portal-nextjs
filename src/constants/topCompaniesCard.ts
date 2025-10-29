import { getInitials } from "@/helper";
import {
  AvatarVariantEnum,
  LinkProps,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";

export const TOP_COMPANY_CARD_CONFIG = {
  HEADER_TEXT: () => {
    return {
      typographyProps: {
        // sx: {
        //   marginBottom: "32px",
        // },
        children: "Top Companies",
        variant: TypographyVariantEnum.H5,
      },
      fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.largeTitle,
      fontColor: TypographyFontColor.black4,
    } as TypographyProps;
  },
  JOB_DETAIL_LINK: ({ onClick }: { onClick: () => void }): LinkProps => {
    return {
      linkProps: {
        onClick,
        className: "cursor-pointer",
      },
      children: "Job Details",
    };
  },
  BACKGROUND_IMAGE: (background_image: string, name: string) => {
    return {
      variant: AvatarVariantEnum.SQUARE,
      src: background_image,
      alt: "Background Image",
      children: getInitials({ name: name }),
      sx: {
        width: "100%",
        height: 286,
        borderRadius: 1,
      },
    };
  },
  COMPANY_LOGO: (logo_image: string, name: string) => {
    return {
      variant: AvatarVariantEnum.SQUARE,
      src: logo_image,
      alt: "Company logo",
      children: getInitials({ name: name }),
      sx: {
        width: 32,
        height: 32,
      },
    };
  },
  LOCATION: (location: string) => {
    return {
      typographyProps: {
        children: location,
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.small,
      fontColor: TypographyFontColor.black3,
    } as TypographyProps;
  },
  COMPANY_NAME: (company_Name: string) => {
    return {
      typographyProps: {
        children: company_Name,
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.black2,
    } as TypographyProps;
  },
  JOB_ROLE: (jobRole: string) => {
    return {
      typographyProps: {
        children: jobRole,
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.small,
      fontColor: TypographyFontColor.black3,
    } as TypographyProps;
  },
};
