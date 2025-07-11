import { formatTimeUserCentric } from "@/helper";
import {
  TypographyVariantEnum,
  ButtonVariantEnum,
  ElementRenderType,
  StackProps,
  TypographyFontWeight,
  TypographyFontSize,
  CommonObjectType,
  TypographyProps,
  AvatarVariantEnum,
  TypographyFontColor,
} from "@/types";

// Typography config functions
export const TITLE_TEXT_CONFIG = ({ text }: { text: ElementRenderType }) => ({
  typographyProps: {
    children: text,
    variant: TypographyVariantEnum.H6,
  },
  fontWeight: TypographyFontWeight.bold,
  fontColor: TypographyFontColor.white,
});

export const BODY_TEXT_CONFIG = ({ text }: { text: ElementRenderType }) => ({
  typographyProps: {
    children: text,
    variant: TypographyVariantEnum.BODY2,
    sx: { color: "rgba(255, 255, 255, 0.7)" },
  },
});

export const CAPTION_TEXT_CONFIG = ({ text }: { text: ElementRenderType }) => ({
  typographyProps: {
    children: text,
    variant: TypographyVariantEnum.CAPTION,
    sx: { color: "rgba(255, 255, 255, 0.5)" },
  },
});

export enum StackDirectionEnum {
  ROW = "row",
  COLUMN = "column",
}

export const FOOTER_STACK_STYLES = {
  mainContainer: {
    stackProps: {
      sx: {
        backgroundColor: "#0B1120",
        color: "#fff",
        marginTop: 0,
      },
    } as StackProps,
  },
  topSection: {
    stackProps: {
      direction: { xs: "column", md: "row" },
      spacing: { xs: 2, sm: 3, md: 4 },
      width: "100%",
      sx: {
        paddingTop: "16px",
      },
    },
  } as StackProps,
  section: {
    stackProps: {
      spacing: { xs: 1, sm: 2 },
      flex: 1,
      paddingLeft: "20px",
      paddingBottom: "20px",
      minWidth: { xs: "100%", md: "auto" },
    },
  } as StackProps,
  socialSection: {
    stackProps: {
      spacing: { xs: 1, sm: 2 },
      flex: 1,
      paddingRight: "20px",
      paddingBottom: "20px",
      minWidth: { xs: "100%", md: "auto" },
      alignItems: "flex-end",
      justifyContent: "center",
    },
  } as StackProps,
  newsletterContainer: {
    stackProps: {
      direction: { xs: "column", sm: "row" },
      spacing: { xs: 1, sm: 2 },
      width: "100%",
      paddingRight: "20px",
      paddingBottom: "20px",
    } as StackProps,
  },
  socialIconsContainer: {
    stackProps: {
      direction: "row",
      spacing: 1,
    },
  } as StackProps,
  bottomSection: {
    stackProps: {
      direction: { xs: "column", sm: "row" },
      spacing: { xs: 2, sm: 2, md: 3 },
      pt: { xs: 2, sm: 3 },
      borderTop: "1px solid #3a3f47",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingBottom: "20px",
    },
  } as StackProps,
  contactItem: {
    stackProps: {
      direction: "row",
      alignItems: "center",
      spacing: 1,
      minWidth: { xs: "100%", sm: "auto" },
    },
  } as StackProps,
};

// Input config
export const NEWSLETTER_INPUT_CONFIG = {
  inputProps: {
    placeholder: "Enter Your Email",
    sx: { backgroundColor: "#fff", borderRadius: 1 },
  },
  formControlProps: {
    fullWidth: true,
  },
};

// Button config
export const SUBSCRIBE_BUTTON_CONFIG = {
  buttonProps: {
    variant: ButtonVariantEnum.CONTAINED,
    sx: { backgroundColor: "#1976d2", color: "#fff" },
    children: "Subscribe",
  },
};

// Icon button config
export const SOCIAL_ICON_BUTTON_CONFIG = {
  sx: { color: "#fff" },
};

// Footer text content
export const FOOTER_CONTENT = {
  COPYRIGHT_TEXT: {
    typographyProps: {
      children: "© 2021 Job Assured. All rights reserved",
      variant: TypographyVariantEnum.CAPTION,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  FOLLOW_US_TEXT: {
    typographyProps: {
      children: "Follow Us : ",
      variant: TypographyVariantEnum.CAPTION,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
    fontWeight: TypographyFontWeight.semibold,
  },
  LOCATION_TEXT: {
    typographyProps: {
      children: "238, Mangalam Tower, jaipur, 322001 ",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  EMAIL_TEXT: {
    typographyProps: {
      children: "Ourstudio@hello.com ",
      variant: TypographyVariantEnum.CAPTION,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  CONTACT_TEXT: {
    typographyProps: {
      children: "+91 9414173314",
      variant: TypographyVariantEnum.CAPTION,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
};

export const FOOTER_QUICK_LINKS_MENU = {
  QUICK_LINKS_TEXT: {
    typographyProps: {
      children: "Quick Links",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.small,
    fontWeight: TypographyFontWeight.bold,
    fontColor: TypographyFontColor.grey,
  },
  HOME_TEXT: {
    typographyProps: {
      children: "Home",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  ABOUT_US_TEXT: {
    typographyProps: {
      children: "About Us",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
};
export const JOB_SEEKER_MENU = {
  JOB_SEEKER_TEXT: {
    typographyProps: {
      children: "Job Seeker",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.small,
    fontWeight: TypographyFontWeight.bold,
    fontColor: TypographyFontColor.grey,
  },
  SEARCH_JOB_TEXT: {
    typographyProps: {
      children: "Search Jobs",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  SEARCH_RECRUITER_TEXT: {
    typographyProps: {
      children: "Search Recruiters",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  JOBSEERKER_DASHBOARD_TEXT: {
    typographyProps: {
      children: "Jobseeker's Dashboard",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  SAVED_JOBS_TEXT: {
    typographyProps: {
      children: "Saved Jobs",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
};
export const RECRUITER_MENU = {
  POST_JOB_TEXT: {
    typographyProps: {
      children: "Post A New Jobs",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  SEARCH_JOBSEEKER_TEXT: {
    typographyProps: {
      children: "Search Jobseeker",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  RECUITER_DASHBOARD_TEXT: {
    typographyProps: {
      children: "Recruiter's Dashboard",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  APPLICATION_TEXT: {
    typographyProps: {
      children: "Applications",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  RECRUITER_TEXT: {
    typographyProps: {
      children: "Recruiter",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.small,
    fontWeight: TypographyFontWeight.bold,

    fontColor: TypographyFontColor.grey,
  },
};

export const SUPPORT_MENU = {
  SUPPORT_TEXT: {
    typographyProps: {
      children: "Support",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.small,

    fontWeight: TypographyFontWeight.bold,
    fontColor: TypographyFontColor.grey,
  },
  CONTACT_US_TEXT: {
    typographyProps: {
      children: "Contact Us",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  PRIVACY_POLICY_TEXT: {
    typographyProps: {
      children: "Privacy Policy",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
  TERMS_CONDITION_TEXT: {
    typographyProps: {
      children: "Terms & Conditions",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.extraSmall,
    fontColor: TypographyFontColor.grey,
  },
};

export const TESTIMONIAL_PAGE_CONFIG = {
  IMAGE: (card: CommonObjectType) => {
    return {
      avatarProps: {
        variant: AvatarVariantEnum.CIRCULAR,
        src: card?.profile_image, // Default image if none is provided
        alt: card?.profile_image || "prifile image",
        children: card?.profile_image,
        sx: {
          width: 80,
          height: 80,
          borderRadius: 10,
        },
      },
    };
  },
  HEADER_TEXT: () => {
    return {
      typographyProps: {
        children: "Testimonial",
        variant: TypographyVariantEnum.H6,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.subtitle,
    };
  },
  TESTIMONIAL_DESC_TEXT: () => {
    return {
      typographyProps: {
        children:
          "explore what our satisfied clients and customers have to say about their experiences. Their words inspire us to keep delivering excellence every day",
        variant: TypographyVariantEnum.H6,
      },
      fontSize: TypographyFontSize.small,
    };
  },
  CONTENT: (card: CommonObjectType) => {
    return {
      typographyProps: {
        children: card?.content,
        variant: TypographyVariantEnum.BODY2,
      },
    } as TypographyProps;
  },
  NAME: (card: CommonObjectType) => {
    return {
      typographyProps: {
        children: card?.name,
        variant: TypographyVariantEnum.H6,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.subtitle,
    } as TypographyProps;
  },
  DESIGNATION: (card: CommonObjectType) => {
    return {
      typographyProps: {
        children: card?.designation,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
      fontColor: TypographyFontColor.grey,
    } as TypographyProps;
  },
};

export const LATEST_JOB_OPENINGS_CONFIG = {
  HEADER_TEXT_1: () => {
    return {
      typographyProps: {
        children: "Latest",
        variant: TypographyVariantEnum.H6,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.subtitle,
      fontColor: TypographyFontColor.primary,
    };
  },
  HEADER_TEXT_2: () => {
    return {
      typographyProps: {
        children: "Job Opportunities",
        variant: TypographyVariantEnum.H6,
      },

      fontSize: TypographyFontSize.subtitle,
    };
  },
};

export const JOB_OPPPORTUNITY_PAGE_CONFIG = {
  DESIGNATION: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.designation,
        variant: TypographyVariantEnum.BODY2,
        sx: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      },
      fontSize: TypographyFontSize.extralarge,
      fontWeight: TypographyFontWeight.bold,
    } as TypographyProps;
  },
  JOB_TYPE: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.jobType,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
  SALARY_RANGE: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.salaryRange,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.extralarge,
    } as TypographyProps;
  },
  POSTED_DATE: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: formatTimeUserCentric(job?.postedDate?.toString()),
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
      fontColor: TypographyFontColor.grey,
    } as TypographyProps;
  },
  IMAGE: (job: CommonObjectType) => {
    return {
      avatarProps: {
        variant: AvatarVariantEnum.CIRCULAR,
        src: job?.companyProfileImage, // Default image if none is provided
        alt: job?.company_name || "Company logo",
        children: job?.company_profile_image,
        sx: {
          width: 40,
          height: 40,
        },
      },
    };
  },
  COMPANY_NAME: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.companyName,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.small,
      fontColor: TypographyFontColor.grey,
    } as TypographyProps;
  },
  EMPLOYEE_COUNT: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: job?.numberOfEmployees,
        variant: TypographyVariantEnum.BODY2,
      },
      fontSize: TypographyFontSize.large,
      fontColor: TypographyFontColor.grey,
    } as TypographyProps;
  },
  JOB_COUNT: (job: CommonObjectType) => {
    return {
      typographyProps: {
        children: `${job?.jobsAvailableInCompany} Jobs`,
        variant: TypographyVariantEnum.BODY2,
        className: "job-count",
      },
      fontSize: TypographyFontSize.small,
    } as TypographyProps;
  },
};
