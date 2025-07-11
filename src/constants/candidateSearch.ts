import { getPluralForm } from "@/helper";
import { formatAddress } from "@/helper";
import {
  AvatarVariantEnum,
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";
import { CANDIDATE_SEARCH_LISTING_DROPDOWN_SORT_OPTIONS } from "./common";

export const CANDIDATE_SEARCH_PAGE_CONFIG = {
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
        children: `Total Candidate${getPluralForm({ totalLength })} `,
        variant: TypographyVariantEnum.BODY2,
      },
    };
  },
  CANDIDATE_SEARCH_LISTING_SORT_DROPDOWN: {
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
    options: CANDIDATE_SEARCH_LISTING_DROPDOWN_SORT_OPTIONS,
  },
  CANDIDATE_CARD: {
    IMAGE: (candidate: CommonObjectType) => {
      return {
        avatarProps: {
          variant: AvatarVariantEnum.SQUARE,
          src: candidate?.company_profile_image, // Default image if none is provided
          alt: candidate?.company_name || "Company logo",
          sx: {
            width: 100,
            height: 100,
            borderRadius: 1,
          },
        },
      };
    },
    COMPANY_NAME: (candidate: CommonObjectType) => {
      return {
        typographyProps: {
          children: candidate?.interests,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    JOB_TYPE: (candidate: CommonObjectType) => {
      return {
        typographyProps: {
          children: candidate?.country,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    DESIGNATION: (candidate: CommonObjectType) => {
      return {
        typographyProps: {
          children: candidate?.designation,
          variant: TypographyVariantEnum.H5,
        },
      } as TypographyProps;
    },
    LOCATION: (candidate: CommonObjectType) => {
      return {
        typographyProps: {
          children: candidate?.city,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    EXPERIENCE: (candidate: CommonObjectType) => {
      return {
        typographyProps: {
          children: candidate?.experience,
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
    NOTIFICATION_CONFIG: {
      SUCCESS: {
        message: "Profile saved successfully",
      },
      DELETE_SUCCESS: {
        message: "Profile unsaved successfully",
      },
    },
    ADDRESS: (candidate: CommonObjectType) => {
      const addressKeys = [
        "address_line_1",
        "address_line_2",
        "city",
        "state",
        "postal_code",
      ];

      return {
        typographyProps: {
          children: formatAddress(addressKeys, candidate as Record<string, []>), // Format address dynamically using the keys
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
  },
};
