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

export const CANDIDATE_APPLICATION_PAGE_CONFIG = {
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
  CANDIDATE_CARD: {
    IMAGE: (candidate: CommonObjectType) => {
      return {
        avatarProps: {
          variant: AvatarVariantEnum.SQUARE,
          src: candidate?.company_profile_image, // Default image if none is provided
          alt: candidate?.company_profile_image || "Company logo",
          children: candidate?.company_profile_image,
          sx: {
            width: 130,
            height: 130,
            borderRadius: 8,
          },
        },
      };
    },
    NAME: (candidate: CommonObjectType) => {
      return {
        typographyProps: {
          children: candidate?.first_name,
          variant: TypographyVariantEnum.BODY2,
        },
        fontWeight: TypographyFontWeight.bold,
        fontSize: TypographyFontSize.extralarge,
        fontColor: TypographyFontColor.black,
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
    EXPERIENCE: (candidate: CommonObjectType) => {
      return {
        typographyProps: {
          children: candidate?.gender,
          variant: TypographyVariantEnum.H5,
        },
        fontSize: TypographyFontSize.small,
        fontColor: TypographyFontColor.black6,
      } as TypographyProps;
    },
    JOB_TYPE: (candidate: CommonObjectType) => {
      return {
        typographyProps: {
          children: candidate?.job_type,
          variant: TypographyVariantEnum.BODY2,
        },
        fontSize: TypographyFontSize.small,
        fontColor: TypographyFontColor.black6,
      } as TypographyProps;
    },
    LOCATION: (candidate: CommonObjectType) => {
      return {
        typographyProps: {
          children: candidate?.city,
          variant: TypographyVariantEnum.BODY2,
        },
        fontSize: TypographyFontSize.small,
        fontColor: TypographyFontColor.black6,
      } as TypographyProps;
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
    BUTTON: {
      buttonProps: {
        children: "Open Profile",
        variant: ButtonVariantEnum.CONTAINED,
        size: ButtonSizeEnum.SMALL,
        sx: {
          marginTop: "2rem",
          width: "100px",
        },
      },
      formControlProps: {
        fullWidth: false,
        sx: {
          alignItems: "center",
        },
      },
    },
  },
};

export const JOB_DETAILS_SECTION = {
  JOB_TITLE: (jobTitle: string) => {
    return {
      typographyProps: {
        children: `${jobTitle}`,
        variant: TypographyVariantEnum.H6,
      },
      fontColor: TypographyFontColor.black,
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.subtitle,
    };
  },
};

export const CANDIDATE_DETAILS_PAGE_CONFIG = {
  IMAGE: (candidate: CommonObjectType) => {
    return {
      avatarProps: {
        variant: AvatarVariantEnum.CIRCULAR,
        src: candidate?.company_profile_image, // Default image if none is provided
        alt: candidate?.company_name || "Company logo",
        children: candidate?.company_profile_image,
        sx: {
          width: 100,
          height: 100,
          borderRadius: 8,
        },
      },
    };
  },
  DESIGNATION: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.designation,
        variant: TypographyVariantEnum.H5,
      },
    } as TypographyProps;
  },
  NAME: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.name,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.large,
      fontColor: TypographyFontColor.grey,
    } as TypographyProps;
  },
  BIOGRAPHY_TEXT: {
    typographyProps: {
      children: "Biography",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  BIOGRAPHY: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.description,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  COVER_LETTER_TEXT: {
    typographyProps: {
      children: "Cover Letter",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  COVER_LETTER: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.cover_letter,
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
  DOB: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.date_of_birth,
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
  NATIONALITY: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.nationality,
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
  EXPERIENCE: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.experience,
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
  EMAIL: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.email,
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
  LOCATION: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.location,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  MOBILE: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.phone,
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
  EDUCATION: (candidate: CommonObjectType) => {
    return {
      typographyProps: {
        children: candidate?.education,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  NOT_SHORTLISTED_BUTTON: {
    buttonProps: {
      children: "Not Shortlisted ",
      variant: ButtonVariantEnum.OUTLINED,
      size: ButtonSizeEnum.LARGE,
    },
  },
  SAVE_FOR_LATER_BUTTON: {
    buttonProps: {
      children: "Save For Later",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },
  SCEHDULE_INTERVIEW_BUTTON: {
    buttonProps: {
      children: "Scehdule Interview ",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },
};

export const APPLICATION_MODAL = {
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

export const SHORTLIST = "shortlist";
export const NOT_SHORTLISTED = "not_shortlisted";
export const SELECT = "select";
export const INTERVIEWED = "interviewed";
export const NOT_INTERVIEWED = "not_interviewed";

export const CANDIDATE_APPLICATION_MENU_ITEMS = [
  {
    label: "Select",
    key: SELECT,
  },

  {
    label: "Shortlist",
    key: SHORTLIST,
  },
  {
    label: "Not Shortlisted",
    key: NOT_SHORTLISTED,
  },
  {
    label: "Interviewed",
    key: INTERVIEWED,
  },

  {
    label: "Not Interviewed",
    key: NOT_INTERVIEWED,
  },
];

export const CANDIDATE_NOTIFICATION_CONFIG = {
  SUCCESS: {
    message: "Candidate Status update successfully",
  },
  DELETE_SUCCESS: {
    message: "Candidate Deleted successfully",
  },

};