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
          src: candidate?.profile_picture, // Default image if none is provided
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
      const experience = Number(candidate?.experience || 0);
      return {
        typographyProps: {
          children: `${experience} Year${experience === 1 ? "" : "s"}`,
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
  IMAGE: (profile_picture: string) => {
    return {
      avatarProps: {
        variant: AvatarVariantEnum.CIRCULAR,
        src: profile_picture, // Default image if none is provided
        alt: profile_picture || "Company logo",
        children: profile_picture,
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
  NAME: (first_name: string) => {
    return {
      typographyProps: {
        children: first_name,
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.black,
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
  COVER_LETTER: (coverlater: string) => {
    return {
      typographyProps: {
        children: coverlater,
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
    fontSize: TypographyFontSize.small,
  },
  DOB: (date_of_birth: string) => {
    return {
      typographyProps: {
        children: date_of_birth,
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
    fontSize: TypographyFontSize.small,
  },
  NATIONALITY: (nationality: string) => {
    return {
      typographyProps: {
        children: nationality,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  GENDER_TEXT: {
    typographyProps: {
      children: "Gender",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  GENDER: (gender: string) => {
    return {
      typographyProps: {
        children: gender,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  DOWNLOAD_RESUME_TEXT: {
    typographyProps: {
      children: "Download My Resume",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  RESUME: (filename: string) => {
    return {
      typographyProps: {
        children: filename,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  CONTACT_TEXT: {
    typographyProps: {
      children: "Contact Information",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  ACADEMIC_TEXT: {
    typographyProps: {
      children: "Academic Information",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  PROFESSIONAL_TEXT: {
    typographyProps: {
      children: "Professional Information",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  SKILLS_TEXT: {
    typographyProps: {
      children: "SKILLS:-",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  },
  MAIL_TEXT: {
    typographyProps: {
      children: "MAIL",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  EMAIL: (email: string) => {
    return {
      typographyProps: {
        children: email,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  ADDRESS_TEXT: {
    typographyProps: {
      children: "ADDRESS",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  ADDRESS: (address: string) => {
    return {
      typographyProps: {
        children: address,
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
    fontSize: TypographyFontSize.small,
  },
  LOCATION: (state: string, city: string) => {
    return {
      typographyProps: {
        children: `${state},${city}`,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  POSTAL_CODE_TEXT: {
    typographyProps: {
      children: "PINCODE",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  POSTAL_CODE: (code: string | number) => {
    return {
      typographyProps: {
        children: code,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  MOBILE: (phone: string) => {
    return {
      typographyProps: {
        children: phone,
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
    fontSize: TypographyFontSize.small,
  },
  INSTITUTION_NAME: (institude: string) => {
    return {
      typographyProps: {
        children: institude,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  INSTITUTION_NAME_TEXT: {
    typographyProps: {
      children: "INSTITUTION NAME",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  QUALIFICATION_STATUS: (qualificationStatus: string) => {
    return {
      typographyProps: {
        children: qualificationStatus,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  QUALIFICATION_STATUS_TEXT: {
    typographyProps: {
      children: "QUALIFICATION STATUS",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  QUALIFICATION_TYPE: (qualificationType: string) => {
    return {
      typographyProps: {
        children: qualificationType,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  QUALIFICATION_TYPE_TEXT: {
    typographyProps: {
      children: "QUALIFICATION TYPE",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  APPLICANT_SCORE: (score: string) => {
    return {
      typographyProps: {
        children: score,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  APPLICANT_SCORE_TEXT: {
    typographyProps: {
      children: "SCORE",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  CURRENT_SALARY: (institude: string) => {
    return {
      typographyProps: {
        children: institude,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  CURRENT_SALARY_TEXT: {
    typographyProps: {
      children: "CURRENT SALARY",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  EXPECTED_SALARY: (qualificationStatus: string) => {
    return {
      typographyProps: {
        children: qualificationStatus,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  EXPECTED_SALARY_TEXT: {
    typographyProps: {
      children: "EXPECTED SALARY",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  NOTICE_PERIOD: (qualificationType: string) => {
    return {
      typographyProps: {
        children: qualificationType,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  NOTICE_PERIOD_TEXT: {
    typographyProps: {
      children: "NOTICE-PERIOD",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  START_DATE: (score: string) => {
    return {
      typographyProps: {
        children: score,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  START_DATE_TEXT: {
    typographyProps: {
      children: "START DATE",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  },
  END_DATE: (score: string) => {
    return {
      typographyProps: {
        children: score,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  END_DATE_TEXT: {
    typographyProps: {
      children: "END DATE",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
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
      children: "Mark In Review",
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
      children: "Put On Hold",
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
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 24px 72px rgba(24, 25, 28, 0.18)",
    p: { xs: 2, md: 3 },
    maxHeight: "88vh",
    overflow: "auto",
    width: { xs: "94vw", md: "86vw", lg: "78vw" },
    maxWidth: 1180,
  },
};

export const IN_REVIEW = "in_review";
export const ON_HOLD = "on_hold";
export const SHORTLIST = "shortlist";
export const INTERVIEWING = "interviewing";
export const REJECTED = "rejected";
export const SALARY_NEGOTIATION = "salary_negotiation";
export const OFFERED = "offered";
export const JOINED = "joined";

export const CANDIDATE_APPLICATION_MENU_ITEMS = [
  {
    label: "In Review",
    key: IN_REVIEW,
    status: 1,
  },
  {
    label: "On Hold",
    key: ON_HOLD,
    status: 2,
  },
  {
    label: "Shortlisted",
    key: SHORTLIST,
    status: 3,
  },
  {
    label: "Interviewing",
    key: INTERVIEWING,
    status: 4,
  },
  {
    label: "Rejected",
    key: REJECTED,
    status: 5,
  },
  {
    label: "Salary Negotiation",
    key: SALARY_NEGOTIATION,
    status: 6,
  },
  {
    label: "Offered",
    key: OFFERED,
    status: 7,
  },
  {
    label: "Joined",
    key: JOINED,
    status: 8,
  },
];

export const CANDIDATE_APPLICATION_STATUS_LABELS =
  CANDIDATE_APPLICATION_MENU_ITEMS.reduce<Record<number, string>>(
    (acc, item) => {
      acc[item.status] = item.label;
      return acc;
    },
    {}
  );

export const getCandidateApplicationStatusValue = (status?: unknown) => {
  const statusValue =
    typeof status === "string" || typeof status === "number"
      ? Number(status)
      : null;

  return typeof statusValue === "number" && Number.isFinite(statusValue)
    ? statusValue
    : null;
};

export const getCandidateApplicationStatusLabel = (
  status?: unknown,
  fallback = "Received"
) => {
  const statusValue = getCandidateApplicationStatusValue(status);

  if (!statusValue) {
    return fallback;
  }

  return CANDIDATE_APPLICATION_STATUS_LABELS[statusValue] || fallback;
};

export const getCandidateApplicationStatusMenuItems = (
  currentStatus?: unknown
) => {
  const statusValue = getCandidateApplicationStatusValue(currentStatus);

  if (!statusValue) {
    return CANDIDATE_APPLICATION_MENU_ITEMS;
  }

  if (statusValue === 5) {
    return CANDIDATE_APPLICATION_MENU_ITEMS.filter(
      (item) => item.key === REJECTED
    );
  }

  const currentStatusIndex = CANDIDATE_APPLICATION_MENU_ITEMS.findIndex(
    (item) => item.status === statusValue
  );

  if (currentStatusIndex === -1) {
    return CANDIDATE_APPLICATION_MENU_ITEMS;
  }

  return CANDIDATE_APPLICATION_MENU_ITEMS.slice(currentStatusIndex);
};

export const CANDIDATE_NOTIFICATION_CONFIG = {
  SUCCESS: {
    message: "Candidate Status update successfully",
  },
  DELETE_SUCCESS: {
    message: "Candidate Deleted successfully",
  },
};
