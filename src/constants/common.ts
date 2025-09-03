import {
  AvatarVariantEnum,
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CandidateSearchListSortEnum,
  DividerProps,
  DropdownProps,
  ElementRenderType,
  JobSeekerDocumentKeyEnum,
  Option,
  RecruiterDocumentKeyEnum,
  RecruiterListSortEnum,
  ShowNotificationProps,
  StudentListSortEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
  TypographyVariantEnum,
  UserType,
} from "@/types";
import {
  ABOUT_US_URL,
  CONTACT_US_URL,
  DASHBOARD_URL,
  HOW_IT_WORKS_URL,
  JOBS_URL,
  LANDING_URL,
  RECRUITER_URL,
} from "./navigationUrl";
import { getDocumentName, getInitials } from "@/helper";
import SUBSCRIPTION from "./subscription.json";
import COMPANIESDATA from "./companiesData.json";
export const ADDRESS_KEY_CONFIG: string[] = [
  "addressLine1",
  "addressLine2",
  "city",
  "state",
  "postalCode",
  "country",
];

export const JOB_SEEKER_TITLE = "Job Seeker";
export const RECRUITER_TITLE = "Recruiter";

export const USER_TYPE: Option[] = [
  {
    label: JOB_SEEKER_TITLE,
    key: "job_seeker",
    value: UserType.JOB_SEEKER_TYPE,
  },
  {
    label: RECRUITER_TITLE,
    key: "recruiter",
    value: UserType.RECUITER_TYPE,
  },
];

export const RECRUITER_LISTING_DROPDOWN_SORT_OPTIONS = [
  {
    label: "Created at (ASC)",
    key: "created_date",
    value: RecruiterListSortEnum.CREATED_DATE_ASC,
  },
  {
    label: "Created at (DESC)",
    key: "-created_date",
    value: RecruiterListSortEnum.CREATED_DATE_DESC,
  },
  {
    label: "Company (ASC)",
    key: "first_name",
    value: RecruiterListSortEnum.COMPANY_ASC,
  },
  {
    label: "Company (DESC)",
    key: "-first_name",
    value: RecruiterListSortEnum.COMPANY_DESC,
  },
];

export const STUDENT_LISTING_DROPDOWN_SORT_OPTIONS = [
  {
    label: "Created at (ASC)",
    key: "created_date",
    value: StudentListSortEnum.CREATED_DATE_ASC,
  },
  {
    label: "Created at (DESC)",
    key: "-created_date",
    value: StudentListSortEnum.CREATED_DATE_DESC,
  },
  {
    label: "Company (ASC)",
    key: "first_name",
    value: StudentListSortEnum.COMPANY_ASC,
  },
  {
    label: "Company (DESC)",
    key: "-first_name",
    value: StudentListSortEnum.COMPANY_DESC,
  },
];

export const SKILLS_OPTIONS = [
  { label: "Skill 1", value: "skill_1" },
  { label: "Skill 2", value: "skill_2" },
  { label: "Skill 3", value: "skill_3" },
];

export const CANDIDATE_SEARCH_LISTING_DROPDOWN_SORT_OPTIONS = [
  {
    label: "Created at (ASC)",
    key: "created_date",
    value: CandidateSearchListSortEnum.CREATED_DATE_ASC,
  },
  {
    label: "Created at (DESC)",
    key: "-created_date",
    value: CandidateSearchListSortEnum.CREATED_DATE_DESC,
  },
  {
    label: "Designation (ASC)",
    key: "designation",
    value: CandidateSearchListSortEnum.DESIGNATION_ASC,
  },
  {
    label: "Designation (DESC)",
    key: "-designation",
    value: CandidateSearchListSortEnum.DESIGNATION_DESC,
  },
];

export const FEATURE_WIP_CONFIG = {
  BUTTON_CONFIG: {
    buttonProps: {
      children: "Home",
    },
  },
  TITLE_TEXT_CONFIG: ({ text }: { text: ElementRenderType }) => {
    return {
      typographyProps: {
        children: text,
        variant: TypographyVariantEnum.H6,
      },
      fontSize: TypographyFontSize.title,
      fontWeight: TypographyFontWeight.bold,
    };
  },
  DESCRIPTION_TEXT_CONFIG: ({ text }: { text: ElementRenderType }) => {
    return {
      typographyProps: {
        children: text,
        variant: TypographyVariantEnum.CAPTION,
      },
      fontSize: TypographyFontSize.normal,
      fontWeight: TypographyFontWeight.normal,
    };
  },
};

export const GENDER_OPTIONS = [
  {
    label: "Male",
    value: "0",
    key: "0",
  },
  {
    label: "Female",
    value: "1",
    key: "1",
  },
  {
    label: "Other",
    value: "2",
    key: "2",
  },
];

export const STATE_OPTIONS = [
  {
    label: "Maharashtra",
    value: "maharashtra",
    key: "maharashtra",
  },
  {
    label: "Rajasthan",
    value: "rajasthan",
    key: "rajasthan",
  },
];

export const NOTICE_PERIOD_OPTIONS = [
  {
    label: "Immediately",
    value: "0",
    key: "0",
  },
  {
    label: "15 days",
    value: "1",
    key: "1",
  },
  {
    label: "30 days",
    value: "2",
    key: "2",
  },
  {
    label: "30+ days",
    value: "3",
    key: "3",
  },
];

export const SEARCH_STATUS_OPTIONS = [
  {
    label: "Actively Looking",
    value: "0",
    key: "0",
  },
  {
    label: "Passively Looking",
    value: "1",
    key: "1",
  },
  {
    label: "Not Looking",
    value: "2",
    key: "2",
  },
];

export const PROFILE_PICTURE_UPLOAD_CONFIG = {
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Profile Picture Updated Successfully",
    } as ShowNotificationProps,
    DELETE_SUCCESS: {
      message: "Profile Picture Deleted Successfully",
    } as ShowNotificationProps,
  },
};

export const QUESTION_PICTURE_UPLOAD_CONFIG = {
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Question Picture Updated Successfully",
    } as ShowNotificationProps,
    DELETE_SUCCESS: {
      message: "Question Picture Deleted Successfully",
    } as ShowNotificationProps,
  },
};

export const TOP_RIBBON_AUTH_REDIRECT_CONFIG = {
  LOGIN_BUTTON: {
    buttonProps: {
      children: "Login",
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },
  REGISTER_BUTTON: {
    buttonProps: {
      children: "Register",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },
};

export const TOP_RIBBON_CONFIG_FOR_NON_AUTHENTICATED_USER = [
  {
    label: "Home",
    value: LANDING_URL,
    key: LANDING_URL,
    children: null,
  },
  {
    label: "About Us",
    value: ABOUT_US_URL,
    key: ABOUT_US_URL,
    children: null,
  },
  {
    label: "Contact Us",
    value: CONTACT_US_URL,
    key: CONTACT_US_URL,
    children: null,
  },
  {
    label: "How it works",
    value: HOW_IT_WORKS_URL,
    key: HOW_IT_WORKS_URL,
    children: null,
  },
];

export const TOP_RIBBON_CONFIG_JOB_SEEKER = [
  {
    label: "Home",
    value: LANDING_URL,
    key: LANDING_URL,
    children: null,
  },
  {
    label: "Find Jobs",
    value: JOBS_URL,
    key: JOBS_URL,
    children: null,
  },
  {
    label: "Find Recruiters",
    value: RECRUITER_URL,
    key: RECRUITER_URL,
    children: null,
  },
  {
    label: "Dashboard",
    value: DASHBOARD_URL,
    key: DASHBOARD_URL,
    children: null,
  },
  {
    label: "Contact Us",
    value: CONTACT_US_URL,
    key: CONTACT_US_URL,
    children: null,
  },
];

export const TOP_RIBBON_CONFIG_RECRUITER = [
  {
    label: "Home",
    value: LANDING_URL,
    key: LANDING_URL,
    children: null,
  },
  {
    label: "Dashboard",
    value: DASHBOARD_URL,
    key: DASHBOARD_URL,
    children: null,
  },
  {
    label: "Contact Us",
    value: CONTACT_US_URL,
    key: CONTACT_US_URL,
    children: null,
  },
];

export const ACCOUNT_POPOVER_CONFIG = {
  TEXT_CONFIG: ({ loggedInUser }: { loggedInUser: string }) => {
    return {
      typographyProps: {
        children: `Welcome, ${loggedInUser} !`,
        variant: TypographyVariantEnum.BODY2,
        className: "p-4",
      },
    };
  },
  AVATAR_CONFIG: (profileImage: string, name: string) => {
    return {
      variant: AvatarVariantEnum.CIRCULAR,
      sx: {
        width: "48px",
        height: "48px",
      },
      className: "border",
      src: profileImage,
      alt: name,
      children: getInitials({ name: name }),
    };
  },
  MENU_ITEMS: [
    {
      label: "Profile",
      key: "profile",
    },
    {
      label: "Logout",
      key: "logout",
    },
  ],
};

export const USER_WISE_DASHBOARD_TITLE = ({
  userType,
}: {
  userType: UserType;
}) => {
  return {
    typographyProps: {
      children: `${
        userType === UserType.JOB_SEEKER_TYPE ? "Job Seeker's" : "Recruiter's"
      } Dashboard`,
      variant: TypographyVariantEnum.H6,
      className: "p-4",
    },
  };
};

export const JOB_TYPE_OPTION = [
  {
    label: "Part Time",
    value: "Part Time",
    key: "part time",
  },
  {
    label: "Full Time",
    value: "Full Time",
    key: "full time",
  },
];

export const BREADCRUMB_LINK_TITLE_CONFIG = ({ title }: { title: string }) => {
  return {
    typographyProps: {
      children: title,
      variant: TypographyVariantEnum.BODY2,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.large,
    fontColor: TypographyFontColor.black2,
  };
};

export const PAGIANTION_LIMIT = 7;

export const PAGIANTION_SEARCH_LIMIT = 20;

export const PAGIANTION_NOTIFICATION_LIMIT = 20;

export const SEARCH_BAR_HEADER_CONFIG = {
  jobSearch: {
    searchMappingKey: ["designation", "department"],
    searchTextConfig: {
      input: {
        placeholder: "Job title, keyword",
      },
      autoComplete: {
        noOptionsText: "No job results found, please try a different search",
        loadingText: "Searching for jobs...",
      },
    },
  },
  candidateSearch: {
    searchMappingKey: ["designation", "country"],
    searchTextConfig: {
      input: {
        placeholder: "Candidate name, keyword",
      },
      autoComplete: {
        noOptionsText:
          "No candidate results found, please try a different search",
        loadingText: "Searching for candidates...",
      },
    },
  },
  recruiterSearch: {
    searchMappingKey: ["company_name", "country"],
    searchTextConfig: {
      input: {
        placeholder: "Recruiter name, keyword",
      },
      autoComplete: {
        noOptionsText:
          "No recruiter results found, please try a different search",
        loadingText: "Searching for recruiters...",
      },
    },
  },
};

// ... existing imports ...
export const JOB_ROLE_OPTIONS = [
  {
    key: "software-engineer",
    value: "software-engineer",
    label: "Software Engineer",
  },
  {
    key: "product-manager",
    value: "product-manager",
    label: "Product Manager",
  },
  { key: "data-scientist", value: "data-scientist", label: "Data Scientist" },
  { key: "ux-designer", value: "ux-designer", label: "UX Designer" },
  {
    key: "marketing-manager",
    value: "marketing-manager",
    label: "Marketing Manager",
  },
];

export const MIN_SALARY_RANGE_OPTIONS = [
  { key: "25000", value: 25000, label: "25,000" },
  { key: "50000", value: 50000, label: "50,000" },
  { key: "75000", value: 75000, label: "75,000" },
  { key: "90000", value: 90000, label: "90,000" },
  { key: "100000+", value: 100000, label: "100,000+" },
];

export const MAX_SALARY_RANGE_OPTIONS = [
  { key: "25000", value: 25000, label: "25,000" },
  { key: "50000", value: 50000, label: "50,000" },
  { key: "75000", value: 75000, label: "75,000" },
  { key: "90000", value: 90000, label: "90,000" },
  { key: "100000+", value: 100000, label: "100,000+" },
];

export const EDUCATION_OPTIONS = [
  { key: "high-school", value: "high-school", label: "High School" },
  { key: "bachelors", value: "bachelors", label: "Bachelor's Degree" },
  { key: "masters", value: "masters", label: "Master's Degree" },
  { key: "phd", value: "phd", label: "Ph.D." },
];

export const EXPERIENCE_OPTIONS = [
  { key: "0-1", value: 1, label: "0-1 years" },
  { key: "1-3", value: 2, label: "1-3 years" },
  { key: "3-5", value: 3, label: "3-5 years" },
  { key: "5-10", value: 4, label: "5-10 years" },
  { key: "10+", value: 5, label: "10+ years" },
];
export const JOB_TYPE_OPTIONS = [
  { key: "full-time", value: "full-time", label: "Full Time" },
  { key: "part-time", value: "part-time", label: "Part Time" },
  { key: "contract", value: "contract", label: "Contract" },
  { key: "internship", value: "internship", label: "Internship" },
  { key: "remote", value: "remote", label: "Remote" },
];
export const JOB_LEVEL_OPTIONS = [
  { key: "entry", value: "entry", label: "Entry Level" },
  { key: "mid", value: "mid", label: "Mid Level" },
  { key: "senior", value: "senior", label: "Senior Level" },
  { key: "lead", value: "lead", label: "Lead" },
  { key: "manager", value: "manager", label: "Manager" },
];

export const COUNTRY_OPTIONS = [{ label: "India", value: "India" }];

export const CITY_OPTIONS = [
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi", value: "delhi" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Pune", value: "pune" },
  // Add more cities as needed
];
export const QUESTION_OPTIONS = [
  { label: "Option 1", value: "option_1" },
  { label: "Option 2", value: "option_2" },
  { label: "Option 3", value: "option_3" },
  { label: "Option 4", value: "option_4" },
  // Add more cities as needed
];

export const VACANCY_OPTIONS = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

export const TYPO_SIZE_UPLOAD_CONFIG = {
  typographyProps: {
    children: "SVG, PNG, or JPG (max. 3MB)",
    variant: TypographyVariantEnum.BODY2,
  },
};
export const TYPO_DRAG_DROP_UPLOAD_CONFIG = {
  typographyProps: {
    children: "Click to upload or drag and drop",
    variant: TypographyVariantEnum.BODY2,
  },
};

export const IMAGE = (profilePictureData: string) => {
  return {
    avatarProps: {
      variant: AvatarVariantEnum.CIRCULAR,
      src: profilePictureData,
      alt: profilePictureData,
      className: "border",
      sx: {
        width: 200,
        height: 200,
      },
    },
  };
};

export const QUALIFICATION_STATUS_OPTIONS = [
  {
    label: "Pursuing",
    value: "0",
    key: "0-Pursuing",
  },
  {
    label: "Completed",
    value: "1",
    key: "1-Completed",
  },
];

export const PROFICIENCY_LEVEL_OPTIONS = [
  {
    label: "Beginner",
    value: "0",
    key: "0-0eginner",
  },
  {
    label: "Intermediate",
    value: "1",
    key: "1-Intermediate",
  },
  {
    label: "Advanced",
    value: "2",
    key: "2-Advanced",
  },
  {
    label: "Expert",
    value: "3",
    key: "3-Expert",
  },
];

export const INDUSTRY_OPTIONS = [
  {
    label: "Information Technology",
    value: "information_technology",
    key: "information_technology",
  },
  {
    label: "Healthcare",
    value: "healthcare",
    key: "healthcare",
  },
  {
    label: "Finance",
    value: "finance",
    key: "finance",
  },
  {
    label: "Education",
    value: "education",
    key: "education",
  },
  {
    label: "Manufacturing",
    value: "manufacturing",
    key: "manufacturing",
  },
];

export const ORGANIZATION_OPTIONS = [
  {
    label: "Private",
    value: "private",
    key: "private",
  },
  {
    label: "Public",
    value: "public",
    key: "public",
  },
  {
    label: "Non-Profit",
    value: "non_profit",
    key: "non_profit",
  },
  {
    label: "Government",
    value: "government",
    key: "government",
  },
  {
    label: "Start-up",
    value: "start_up",
    key: "start_up",
  },
];

export const COMPANY_SIZE_OPTIONS = [
  {
    label: "1-10",
    value: "1-10",
    key: "1-10",
  },
  {
    label: "11-50",
    value: "11-50",
    key: "11-50",
  },
  {
    label: "51-200",
    value: "51-200",
    key: "51-200",
  },
  {
    label: "201-500",
    value: "201-500",
    key: "201-500",
  },
  {
    label: "501+",
    value: "501+",
    key: "501+",
  },
];

export const DOUCMENT_TITLE_CONFIG = {
  [JobSeekerDocumentKeyEnum.RESUME]: "Professional Resume.pdf",
  [JobSeekerDocumentKeyEnum.VIDEO_RESUME]: "Professional Video Resume.mp4",
  [JobSeekerDocumentKeyEnum.CERTIFICATE]: "Certificate.pdf",
  [JobSeekerDocumentKeyEnum.OTHER]: "Other.pdf",
  [RecruiterDocumentKeyEnum.ORG_REGISTRATION_NUMBER]:
    "Organization Registration Number.pdf",
  [RecruiterDocumentKeyEnum.CIN_NUMBER]: "Organization CIN Number.pdf",
  [RecruiterDocumentKeyEnum.GST_NUMBER]: "Organization GST Number.pdf",
};

export const NOTIFICATION_DOUCMENT_TITLE_CONFIG = {
  [JobSeekerDocumentKeyEnum.RESUME]: "Professional Resume",
  [JobSeekerDocumentKeyEnum.VIDEO_RESUME]: "Professional Video Resume",
  [JobSeekerDocumentKeyEnum.CERTIFICATE]: "Certificate",
  [JobSeekerDocumentKeyEnum.OTHER]: "Other",
  [RecruiterDocumentKeyEnum.ORG_REGISTRATION_NUMBER]:
    "Organization Registration Number",
  [RecruiterDocumentKeyEnum.CIN_NUMBER]: "Organization CIN Number",
  [RecruiterDocumentKeyEnum.GST_NUMBER]: "Organization GST Number",
};

export const UPLOAD_DOC_TYPOGRAPHY_CONFIG = {
  TYPO_PROPS_CONFIG_LINE: (line: string) => {
    return {
      typographyProps: {
        children: line,
        variant: TypographyVariantEnum.BODY2,
      },
    } as TypographyProps;
  },
  TYPO_PROPS_CONFIG_DRAG: (drag: string) => {
    return {
      typographyProps: {
        children: drag,
        variant: TypographyVariantEnum.CAPTION,
      },
    } as TypographyProps;
  },
  TYPO_PROPS_CONFIG_FILE_INFO: (drag: string) => {
    return {
      typographyProps: {
        children: drag,
        variant: TypographyVariantEnum.CAPTION,
      },
    } as TypographyProps;
  },
  TYPO_PROPS_FILE_NAME: (
    documentKey: JobSeekerDocumentKeyEnum | RecruiterDocumentKeyEnum
  ) => {
    return {
      typographyProps: {
        children: getDocumentName(documentKey),
        variant: TypographyVariantEnum.CAPTION,
        color: "primary",
        sx: {
          width: "100%",
          cursor: "pointer",
        },
      },
    } as TypographyProps;
  },
};

export const SOCIAL_LINKS_CONFIG = {
  TITLE_TEXT: (linkNumber: number) => {
    return {
      typographyProps: {
        children: `Social Links ${linkNumber}`,
        variant: TypographyVariantEnum.BODY2,
        className: "mb-2",
      },
    };
  },
  PLATFORM_DROPDOWN: {
    formControlProps: {
      variant: "standard",
    } as DropdownProps["formControlProps"],
    options: [
      {
        label: "Facebook",
        value: "facebook",
        key: "facebook",
      },

      {
        label: "Twitter",
        value: "twitter",
        key: "twitter",
      },
      {
        label: "Instagram",
        value: "instagram",
        key: "instagram",
      },
      {
        label: "Google",
        value: "google",
        key: "google",
      },
      {
        label: "Other",
        value: "other",
        key: "other",
      },
    ],
  },
  FIELD_DIVIDER: {
    orientation: "vertical",
    variant: "middle",
    flexItem: true,
    className: "!my-2",
    sx: {
      my: "8px !important",
    },
  } as DividerProps,
  URL_FIELD: {
    inputProps: {
      placeholder: "Profile Link / URL",
      sx: {
        "& .MuiOutlinedInput-root": {
          height: "100%",
          ":not(.Mui-error)": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused:not(.Mui-error) fieldset": {
              borderColor: "transparent",
            },
          },
        },
      },
    },
    formControlProps: {
      sx: {
        height: "100%",
        width: "calc(100% - 220px)",
        "& .MuiTextField-root": {
          height: "100%",
        },
      },
    },
  },
  ADD_MORE_BUTTON: (addIcon: ElementRenderType) => {
    return {
      buttonProps: {
        children: "Add New Social Link",
        variant: ButtonVariantEnum.OUTLINED,
        color: ButtonColorEnum.PRIMARY,
        startIcon: addIcon,
      },
      formControlProps: {
        fullWidth: true,
      },
    };
  },
};

// 3 MB Document Limit
export const DOCUMENT_MAX_FILE_SIZE = 3 * 1024 * 1024;

export const HEADER_SEARCH_SECTION_CONFIG = {
  SEARCH_FIELD_HEIGHT: "50px",
  COUNTRY_FIELD: {
    selectProps: {
      defaultValue: "india",
      sx: {
        height: "50px",
        margin: "0px 0px 0px 8px !important",
        "::before": {
          borderBottom: "none",
          borderBottomStyle: "none !important",
        },
        "::after": {
          borderBottom: "none",
        },
        ":hover::before": {
          borderBottom: "none !important",
          borderBottomStyle: "none !important",
        },
        ".MuiSelect-select": {
          height: "30px !important",
        },
      },
    },
    formControlProps: {
      variant: "standard",
    },
    value: "india",
  } as DropdownProps,
  FIELD_DIVIDER: {
    orientation: "vertical",
    variant: "middle",
    flexItem: true,
    className: "!my-2",
    sx: {
      my: "8px !important",
    },
  } as DividerProps,
};

export const SUBSCRIPTION_CONFIG = SUBSCRIPTION[0];

export const COMPANIES_DATA_CONFIG = COMPANIESDATA;

export const BRAND_LOGO_URL =
  "https://job-portal-next-ten.vercel.app/ja_logo.png";

export const FORCE_USER_LOGIN_MODAL = {
  TITLE: {
    typographyProps: {
      children: "Please Login",
      variant: TypographyVariantEnum.H5,
      sx: {
        textAlign: "center",
      },
    },
    fontSize: TypographyFontSize.large,
    fontWeight: TypographyFontWeight.bold,
  },
  SUBTITLE: {
    typographyProps: {
      children: "This is content that only logged-in users can see.",
      variant: TypographyVariantEnum.BODY2,
    },
  },
  BUTTON: {
    buttonProps: {
      children: "Login",
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
  MODAL_STYLES: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflow: "auto",
  },
};

export const ASSESSMENT_CONFIG = {
  MAX_NO_OF_QUESTION: 20,
};

export const SAMPLE_QUESTIONS = [
  {
    type: "Q&A",
    subject: "English",
    topic: "Numerical Reasoning",
    question: "Which number should come next in the series? 2, 4, 8, 16, ?",
    options: { A: "20", B: "24", C: "30", D: "32" },
    answer: "D",
  },
  {
    type: "Q&A",
    subject: "English",
    topic: "Numerical Reasoning",
    paragraph:
      " lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus officiis alias exercitationem animi sequi repudiandae pariatur  quia dolorem odio. If in a code language, CLOCK is writt m, dolor sit amet consectetur adipisicing elit. Necessitatibus officiis alias exercitationem animi sequi repudiandae pariatur  quia dolorem odio. If in a code language, CLOCK is written as DMPDL, how is WATCH written?",
    options: { A: "21", B: "27", C: "31", D: "33" },
    answer: "C",
  },
  {
    type: "ParaQ&A",
    subject: "English",
    topic: "Logical Reasoning",
    paragraph:
      "Pointing to a woman, Raj said, “She is the daughter of my mother’s only son.     para: lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus officiis alias exercitationem animi sequi repudiandae pariatur  quia dolorem odio. If in a code language, CLOCK is writt m, dolor sit amet consectetur adipisicing elit. Necessitatibus officiis alias exercitationem animi sequi repudiandae pariatur  quia dolorem odio. If in a code language, CLOCK is written as DMPDL, how is WATCH written?",
    question: "Who is the woman to Raj?",
    options: { A: "Mother", B: "Aunt", C: "Sister", D: "Niece" },
    answer: "C",
  },
  {
    type: "Q&A",
    subject: "English",
    topic: "Verbal Reasoning",
    question: "Which word does NOT belong with the others?",
    options: { A: "Apple", B: "Banana", C: "Carrot", D: "Grapes" },
    answer: "C",
  },
  {
    type: "Q&A",
    subject: "English",
    topic: "Numerical Reasoning",
    question: "Find the missing number: 3, 6, 11, 18, ?",
    options: { A: "25", B: "27", C: "28", D: "29" },
    answer: "B",
  },
  {
    type: "Q&A",
    subject: "English",
    topic: "Technical Skill Test",
    paragraph:
      " lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus officiis alias exercitationem animi sequi repudiandae pariatur  quia dolorem odio. If in a code language, CLOCK is written as DMPDL, how is WATCH written?",
    options: { A: "XBUDI", B: "XBTDI", C: "XBVGI", D: "XCVGI" },
    answer: "B",
  },
  {
    type: "Q&A",
    subject: "English",
    topic: "Personality Test",
    question: "Which one is the odd one out?",
    options: { A: "Pen", B: "Pencil", C: "Eraser", D: "Paper" },
    answer: "C",
  },
  {
    type: "Q&A",
    subject: "English",
    topic: "Numerical Reasoning",
    question: "If ALL = 39 and BALL = 57, then CALL = ?",
    options: { A: "72", B: "75", C: "60", D: "66" },
    answer: "D",
  },
  {
    type: "Q&A",
    subject: "English",
    topic: "Numerical Reasoning",
    paragraph:
      " lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus officiis alias exercitationem animi sequi repudiandae pariatur  quia dolorem odio. If in a code language, CLOCK is writt m, dolor sit amet consectetur adipisicing elit. Necessitatibus officiis alias exercitationem animi sequi repudiandae pariatur  quia dolorem odio. If in a code language, CLOCK is written as DMPDL, how is WATCH written?",
    options: { A: "21", B: "27", C: "31", D: "33" },
    answer: "C",
  },
  {
    type: "Q&A",
    subject: "Aptitude",
    topic: "Verbal Reasoning",
    question: "Which word does not belong with the others?",
    options: { A: "Tulip", B: "Rose", C: "Lily", D: "Mango" },
    answer: "D",
  },
  {
    type: "Q&A",
    subject: "Aptitude",
    topic: "Numerical Reasoning",
    question: "Choose the number that is 1/4 of 64.",
    options: { A: "16", B: "20", C: "18", D: "12" },
    answer: "A",
  },
  {
    type: "Q&A",
    subject: "Technical",
    topic: "Technical Skill Test",
    question: "If ‘EARTH’ is written as ‘HZVIG’, how is ‘MOON’ written?",
    options: { A: "NLLM", B: "NLLZ", C: "NLLO", D: "NLLX" },
    answer: "D",
  },
  {
    type: "Q&A",
    subject: "Aptitude",
    topic: "Numerical Reasoning",
    question: "Which number is missing? 121, 144, 169, ?, 225",
    options: { A: "185", B: "196", C: "210", D: "205" },
    answer: "B",
  },
  {
    type: "Q&A",
    subject: "Aptitude",
    topic: "Logical Reasoning",
    question: "Choose the odd pair:",
    options: {
      A: "Dog – Bark",
      B: "Cat – Meow",
      C: "Lion – Roar",
      D: "Duck – Squeak",
    },
    answer: "D",
  },
  {
    type: "Q&A",
    subject: "Aptitude",
    topic: "Numerical Reasoning",
    question: "Which number will come next in the series: 5, 10, 17, 26, ?",
    options: { A: "35", B: "37", C: "38", D: "41" },
    answer: "B",
  },
  {
    type: "Q&A",
    subject: "Aptitude",
    topic: "Numerical Reasoning",
    question: "If A=1, B=2, ..., Z=26, then what is the value of 'FACE'?",
    options: { A: "20", B: "25", C: "27", D: "30" },
    answer: "D",
  },
  {
    type: "Q&A",
    subject: "Aptitude",
    topic: "Numerical Reasoning",
    question: "What comes next in the series: 1, 4, 9, 16, ?",
    options: { A: "20", B: "25", C: "30", D: "36" },
    answer: "B",
  },
  {
    type: "Q&A",
    subject: "Aptitude",
    topic: "Logical Reasoning",
    question:
      "Which direction will you face if you start facing North and turn 270° clockwise?",
    options: { A: "East", B: "South", C: "West", D: "North" },
    answer: "C",
  },
  {
    type: "Q&A",
    subject: "Aptitude",
    topic: "Numerical Reasoning",
    question:
      "If 3 cats can catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
    options: { A: "3", B: "10", C: "30", D: "100" },
    answer: "A",
  },
  {
    type: "Q&A",
    subject: "Aptitude",
    topic: "Numerical Reasoning",
    question: "Find the odd one out: 2, 3, 5, 7, 8, 11, 13",
    options: { A: "3", B: "5", C: "7", D: "8" },
    answer: "D",
  },
];
