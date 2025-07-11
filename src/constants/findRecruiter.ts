import { getPluralForm } from "@/helper";
import { formatAddress } from "@/helper";
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
import { RECRUITER_LISTING_DROPDOWN_SORT_OPTIONS } from "./common";

export const FIND_RECRUITER_PAGE_CONFIG = {
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
        children: `Total Recruiter${getPluralForm({ totalLength })} `,
        variant: TypographyVariantEnum.BODY2,
      },
    };
  },
  RECRUITER_LISTING_SORT_DROPDOWN: {
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
    options: RECRUITER_LISTING_DROPDOWN_SORT_OPTIONS,
  },

  RECRUITER_CARD: {
    IMAGE: (recruiter: CommonObjectType) => {
      return {
        avatarProps: {
          variant: AvatarVariantEnum.CIRCULAR,
          src: recruiter?.profile_image, // Default image if none is provided
          alt: recruiter?.industry_type || "Company logo",
          children: recruiter?.profile_image,
          sx: {
            width: 130,
            height: 130,
            borderRadius: 1,
          },
        },
      };
    },
    RECRUITER_NAME: (recruiter: CommonObjectType) => {
      return {
        typographyProps: {
          children: recruiter?.industry_type,
          variant: TypographyVariantEnum.H5,
        },
        fontSize: TypographyFontSize.large,
        fontWeight: TypographyFontWeight.bold,
      } as TypographyProps;
    },
    COMPANY_NAME: (recruiter: CommonObjectType) => {
      return {
        typographyProps: {
          children: recruiter?.first_name,
          variant: TypographyVariantEnum.BODY2,
        },
        fontSize: TypographyFontSize.small,
      } as TypographyProps;
    },

    RECRUITER_DESIGNATION: (recruiter: CommonObjectType) => {
      return {
        typographyProps: {
          children: recruiter?.first_name,
          variant: TypographyVariantEnum.BODY2,
        },
      } as TypographyProps;
    },
    ADDRESS: (recruiter: CommonObjectType) => {
      const addressKeys = ["city", "state"];

      return {
        typographyProps: {
          children: formatAddress(addressKeys, recruiter as Record<string, []>), // Format address dynamically using the keys
          variant: TypographyVariantEnum.BODY2,
        },
        fontSize: TypographyFontSize.small,
        fontColor: TypographyFontColor.grey,
      } as TypographyProps;
    },
    VIEW_PROFILE_BUTTON: {
      buttonProps: {
        children: "View Profile",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.LARGE,
      },
    },
  },
};
export const RECRUITER_APPLICATION_MODAL = {
  MODAL_STYLES: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflow: "auto",
  },
};

export const RECRUITER_APPLICATION_PAGE_CONFIG = {
  IMAGE: (recruiter: CommonObjectType) => {
    return {
      avatarProps: {
        variant: AvatarVariantEnum.CIRCULAR,
        src: recruiter?.company_profile_image, // Default image if none is provided
        alt: recruiter?.company_name || "Company logo",
        children: recruiter?.company_profile_image,
        sx: {
          width: 100,
          height: 100,
          borderRadius: 8,
        },
      },
    };
  },
  DESIGNATION: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.designation,
        variant: TypographyVariantEnum.H5,
      },
    } as TypographyProps;
  },
  NAME: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.name,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.large,
      fontColor: TypographyFontColor.grey,
    } as TypographyProps;
  },
  PROFESSIONAL_OVERVIEW_TEXT: {
    typographyProps: {
      children: "Professional Overview",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  PROFESSIONAL_OVERVIEW: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.overview,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  CARRER_TEXT: {
    typographyProps: {
      children: "career Experience",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  CARRER_EXPERIENCE: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.carrer_experience,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  SKILLS_TEXT: {
    typographyProps: {
      children: "Core Skills & Expertise",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  SKILLS: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.skills,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  FOLLOW_ON_TEXT: {
    typographyProps: {
      children: "Follow Us On Social Media",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  DOB_TEXT: {
    typographyProps: {
      children: "Date Of Birth",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  DOB: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.date_of_birth,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  NATIONALITY_TEXT: {
    typographyProps: {
      children: "Nationality",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  NATIONALITY: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.nationality,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  EXPERIECE_TEXT: {
    typographyProps: {
      children: "Experience",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  EXPERIENCE: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.experience,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  EDUCATION_TEXT: {
    typographyProps: {
      children: "Education",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  DOWNLOAD_RESUME_TEXT: {
    typographyProps: {
      children: "Download My Resume",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  CONTACT_TEXT: {
    typographyProps: {
      children: "Contact Information",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  MAIL_TEXT: {
    typographyProps: {
      children: "MAIL",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  EMAIL: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.email,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  LOCATION_TEXT: {
    typographyProps: {
      children: "LOCATION",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  LOCATION: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.location,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  MOBILE: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.phone,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  MOBILE_TEXT: {
    typographyProps: {
      children: "MOBILE",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  LINKED_IN_URL: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.linked_in_url,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  LINKED_IN_TEXT: {
    typographyProps: {
      children: "LINKEDIN PROFILE",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  EDUCATION: (recruiter: CommonObjectType) => {
    return {
      typographyProps: {
        children: recruiter?.education,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
};
