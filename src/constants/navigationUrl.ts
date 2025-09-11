export const LANDING_URL: string = "/";
export const LOGIN_URL: string = "/login";
export const REGISTER_URL: string = "/register";
export const PROFILE_URL: string = "/dashboard/profile";
export const ADMIN_PROFILE_URL: string = "/admin/profile";
export const BACK_TO_ADMIN_URL: string = "/admin";
// export const ADMIN_QUESTION_URL: string = "/admin/assessment/26/excelupload";
export const ADMIN_QUESTION_URL = (id: number) => `/admin/assessment/${id}`;

export const FORGOT_PASSWORD: string = "/forgot-password";
export const RESET_PASSWORD: string = "/reset-password";
export const ENTER_OTP: string = "/otp";
export const NO_PERMISSION_URL: string = "/no-permission";
export const HOME_URL: string = "/home";
export const JOBS_URL: string = "/jobs";
export const RECRUITER_URL: string = "/recruiters";
export const DASHBOARD_URL: string = "/dashboard";
export const MY_APPLIED_JOBS_URL: string = "/dashboard/my-applied-jobs";
export const CREATE_JOB_URL: string = "/dashboard/create-job";
export const MY_POSTED_JOBS_URL: string = "/dashboard/my-posted-jobs";
export const CANDIATE_APPLICATIONS_URL: string =
  "/dashboard/candidate-applications/[id]";
export const SAVED_JOB_URL: string = "/dashboard/saved-job";
export const SUBSCRIPTION_URL: string = "/dashboard/subscription";
export const ASSESSMENT_URL: string = "/dashboard/assessment";
export const CONTACT_US_URL: string = "/contact-us";
export const ABOUT_US_URL: string = "/about-us";
export const PRIVACY_POLICY_URL: string = "/privacy-policy";
export const TERMS_AND_CONDITION_URL: string = "/terms-and-conditions";
export const HOW_IT_WORKS_URL: string = "/how-it-works";
export const SSO_REDIRECT_URL: string = "/sso";
export const JOB_DETAILS_URL: string = "/job-details/[id]";
export const CANDIATE_APPLICATIONS_PARTIAL_URL: string =
  "/dashboard/candidate-applications";
export const JOB_DETAILS_PARTIAL_URL: string = "/job-details";

export const PRIVATE_ROUTES_CONFIG: string[] = [
  HOME_URL,
  PROFILE_URL,
  JOBS_URL,
  JOB_DETAILS_URL,
  JOB_DETAILS_PARTIAL_URL,
  MY_APPLIED_JOBS_URL,
  CREATE_JOB_URL,
  MY_POSTED_JOBS_URL,
  CANDIATE_APPLICATIONS_URL,
  CANDIATE_APPLICATIONS_PARTIAL_URL,
  DASHBOARD_URL,
  SAVED_JOB_URL,
  SUBSCRIPTION_URL,
  ASSESSMENT_URL,
];

export const PRIVATE_PUBLIC_ROUTES_CONFIG: string[] = [
  LANDING_URL,
  RECRUITER_URL,
  CONTACT_US_URL,
  SSO_REDIRECT_URL,
  ABOUT_US_URL,
  HOW_IT_WORKS_URL,
  PRIVACY_POLICY_URL,
  TERMS_AND_CONDITION_URL,
];

export const NON_PRIVATE_PUBLIC_ROUTES_CONFIG: string[] = [
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  ENTER_OTP,
];

export const JOB_SEEKER_USER_TYPE_PERMISSION_ID: number = 1;
export const RECRUITER_USER_TYPE_PERMISSION_ID: number = 2;

export const ALL_USER_PERMISSION: number[] = [
  JOB_SEEKER_USER_TYPE_PERMISSION_ID,
  RECRUITER_USER_TYPE_PERMISSION_ID,
];
export const ONLY_JOB_SEEKER_USER_PERMISSION: number[] = [
  JOB_SEEKER_USER_TYPE_PERMISSION_ID,
];
export const ONLY_RECRUITER_USER_PERMISSION: number[] = [
  RECRUITER_USER_TYPE_PERMISSION_ID,
];

export const PRIVATE_ROUTE_USER_TYPE_CONFIG: {
  [P: string]: number[];
} = {
  [HOME_URL]: ALL_USER_PERMISSION,
  [NO_PERMISSION_URL]: ALL_USER_PERMISSION,
  [PROFILE_URL]: ALL_USER_PERMISSION,
  [JOBS_URL]: ONLY_JOB_SEEKER_USER_PERMISSION,
  [JOB_DETAILS_URL]: ONLY_JOB_SEEKER_USER_PERMISSION,
  [JOB_DETAILS_PARTIAL_URL]: ONLY_JOB_SEEKER_USER_PERMISSION,
  [MY_APPLIED_JOBS_URL]: ONLY_JOB_SEEKER_USER_PERMISSION,
  [DASHBOARD_URL]: ALL_USER_PERMISSION,
  [CREATE_JOB_URL]: ONLY_RECRUITER_USER_PERMISSION,
  [MY_POSTED_JOBS_URL]: ONLY_RECRUITER_USER_PERMISSION,
  [CANDIATE_APPLICATIONS_URL]: ONLY_RECRUITER_USER_PERMISSION,
  [CANDIATE_APPLICATIONS_PARTIAL_URL]: ONLY_RECRUITER_USER_PERMISSION,
  [SAVED_JOB_URL]: ONLY_JOB_SEEKER_USER_PERMISSION,
  [SUBSCRIPTION_URL]: ONLY_RECRUITER_USER_PERMISSION,
  [ASSESSMENT_URL]: ONLY_JOB_SEEKER_USER_PERMISSION,
};

export const SHOW_SIDEBAR_NON_AUTHENTICATED_CONFIG: string[] = [];

export const HIDE_SIDEBAR_AUTHENTICATED_CONFIG: string[] = [
  LANDING_URL,
  JOBS_URL,
  RECRUITER_URL,
  CONTACT_US_URL,
  SSO_REDIRECT_URL,
  JOB_DETAILS_URL,
  ABOUT_US_URL,
  HOW_IT_WORKS_URL,
  PRIVACY_POLICY_URL,
  TERMS_AND_CONDITION_URL,
];

const STATIC_BRAND_TITLE = "Job Assured";

export const NAVIGATION_PATH_MAPPING_CONFIG = {
  [LANDING_URL]: {
    title: `${STATIC_BRAND_TITLE} | Home`, // This is to show in the browser tab
    breacrumbLinkTitle: [],
  },
  [LOGIN_URL]: {
    title: `${STATIC_BRAND_TITLE} | Login`,
    breacrumbLinkTitle: [],
  },
  [REGISTER_URL]: {
    title: `${STATIC_BRAND_TITLE} | Register`,
    breacrumbLinkTitle: [],
  },
  [FORGOT_PASSWORD]: {
    title: `${STATIC_BRAND_TITLE} | Forgot Password`,
    breacrumbLinkTitle: [],
  },
  [RESET_PASSWORD]: {
    title: `${STATIC_BRAND_TITLE} | Reset Password`,
    breacrumbLinkTitle: [],
  },
  [ENTER_OTP]: {
    title: `${STATIC_BRAND_TITLE} | Enter OTP`,
    breacrumbLinkTitle: [],
  },
  [SSO_REDIRECT_URL]: {
    title: `${STATIC_BRAND_TITLE} | Single Sign on`,
    breacrumbLinkTitle: [],
  },
  [NO_PERMISSION_URL]: {
    title: `${STATIC_BRAND_TITLE} | No Permission`,
    breacrumbLinkTitle: [],
  },
  [JOBS_URL]: {
    title: `${STATIC_BRAND_TITLE} | Find Jobs`,
    breacrumbLinkTitle: ["Find Jobs"],
  },
  [JOB_DETAILS_URL]: {
    title: `${STATIC_BRAND_TITLE} | Jobs Details`,
    breacrumbLinkTitle: ["Find Jobs", "Job Details"],
  },
  [RECRUITER_URL]: {
    title: `${STATIC_BRAND_TITLE} | Find Recruiters`,
    breacrumbLinkTitle: ["Find Recruiters"],
  },
  [DASHBOARD_URL]: {
    title: `${STATIC_BRAND_TITLE} | Dashboard`,
    breacrumbLinkTitle: ["Dashboard", "Overview"],
  },
  [MY_APPLIED_JOBS_URL]: {
    title: `${STATIC_BRAND_TITLE} | My Applied Jobs`,
    breacrumbLinkTitle: ["Dashboard", "My Applied Jobs"],
  },
  [CREATE_JOB_URL]: {
    title: `${STATIC_BRAND_TITLE} | Create Job`,
    breacrumbLinkTitle: ["Dashboard", "Create Job"],
  },
  [MY_POSTED_JOBS_URL]: {
    title: `${STATIC_BRAND_TITLE} | My Posted Jobs`,
    breacrumbLinkTitle: ["Dashboard", "My Posted Jobs"],
  },
  [CANDIATE_APPLICATIONS_URL]: {
    title: `${STATIC_BRAND_TITLE} | Candidate Applications`,
    breacrumbLinkTitle: ["Dashboard", "Candidate Applications"],
  },
  [PROFILE_URL]: {
    title: `${STATIC_BRAND_TITLE} | Profile`,
    breacrumbLinkTitle: ["Dashboard", "Profile"],
  },
  [SAVED_JOB_URL]: {
    title: `${STATIC_BRAND_TITLE} | Saved Job`,
    breacrumbLinkTitle: ["Dashboard", "Saved Job"],
  },
  [SUBSCRIPTION_URL]: {
    title: `${STATIC_BRAND_TITLE} | Subscription`,
    breacrumbLinkTitle: ["Dashboard", "Subscription"],
  },
  [CONTACT_US_URL]: {
    title: `${STATIC_BRAND_TITLE} | Contact Us`,
    breacrumbLinkTitle: ["Contact Us"],
  },
  [ABOUT_US_URL]: {
    title: `${STATIC_BRAND_TITLE} | About Us`,
    breacrumbLinkTitle: ["About Us"],
  },
  [HOW_IT_WORKS_URL]: {
    title: `${STATIC_BRAND_TITLE} | How It Works ?`,
    breacrumbLinkTitle: ["How It Works ?"],
  },
  [PRIVACY_POLICY_URL]: {
    title: `${STATIC_BRAND_TITLE} | Privacy Policy`,
    breacrumbLinkTitle: ["Privacy Policy"],
  },
  [TERMS_AND_CONDITION_URL]: {
    title: `${STATIC_BRAND_TITLE} | Terms And Conditions`,
    breacrumbLinkTitle: ["Terms And Conditions"],
  },
  [ASSESSMENT_URL]: {
    title: `${STATIC_BRAND_TITLE} | Assessment`,
    breacrumbLinkTitle: ["Dashboard", "Assessment"],
  },
};
