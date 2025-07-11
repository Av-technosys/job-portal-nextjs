import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  FormikFieldsEnum,
  ListItemProps,
  RecruiterDocumentKeyEnum,
  ShowNotificationProps,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";
import {
  CITY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  COUNTRY_OPTIONS,
  INDUSTRY_OPTIONS,
  ORGANIZATION_OPTIONS,
  STATE_OPTIONS,
} from "./common";
import {
  CREATE_JOB_URL,
  DASHBOARD_URL,
  MY_POSTED_JOBS_URL,
  PROFILE_URL,
  SUBSCRIPTION_URL,
} from "./navigationUrl";
import { getDocumentNameForNotification } from "@/helper";

const FIELD_WIDTHS = {
  EXTRA_LARGE: { width: "100%", flexBasis: "100%" },
  LARGE: { width: "100%", flexBasis: "45%" },
  MEDIUM: { width: "100%", flexBasis: "30%" },
  CUSTOM_HEADING: { width: 1 },
};

const HEADING_CONFIG = {
  variant: TypographyVariantEnum.H6,
  sx: FIELD_WIDTHS.CUSTOM_HEADING,
};

export const DETAILS_CONFIG = {
  ORGANIZATION_HEADING: {
    typographyProps: {
      children: "Organizations Info",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.blue1,
  },
};

export const RECRUITER_PROFILE_SIDEBAR_CONFIG = [
  {
    text: "Overview",
    listValue: DASHBOARD_URL,
  },
  {
    text: "Post A New Job",
    listValue: CREATE_JOB_URL,
  },
  {
    text: "Posted Jobs",
    listValue: MY_POSTED_JOBS_URL,
  },
  {
    text: "Subscription",
    listValue: SUBSCRIPTION_URL,
  },
  {
    text: "Recruiter's Profile",
    listValue: PROFILE_URL,
  },
] as ListItemProps[];

export const RECRUITER_COMPANY_PROFILE_CONFIG = {
  TITLE_TEXT: () => {
    return {
      typographyProps: {
        children: "Profile",
        variant: TypographyVariantEnum.BODY2,
      },
    };
  },

  FORM_CONFIG: {
    EMPTY_FIELD_FOR_ABOUT: {
      fieldType: FormikFieldsEnum.TYPOGRAPHY,
      typographyProps: {
        children: "",
        sx: FIELD_WIDTHS.LARGE,
      },
    },
    COMPANY_NAME_FIELD: {
      fieldType: FormikFieldsEnum.TEXT_FIELD,
      inputProps: {
        placeholder: "Enter Company Name *",
        name: "first_name",
      },
      inputLabelProps: {
        children: "Company Name",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
    },
    COMPANY_ABOUT_US_FIELD: {
      fieldType: FormikFieldsEnum.TEXT_FIELD,
      inputProps: {
        placeholder: "About us",
        name: "company_about_us",
        multiline: true,
        minRows: 4,
        maxRows: 4,
      },
      inputLabelProps: {
        children: "About us",
        shrink: true,
      },
      formControlProps: {
        sx: {
          ...FIELD_WIDTHS.LARGE,
          marginBottom: 2,
          alignSelf: "flex-start",
        },
      },
    },
    ADDRESS_LINE_1_FIELD: {
      fieldType: FormikFieldsEnum.TEXT_FIELD,
      inputProps: {
        name: "address_line_1",
        placeholder: "Address Line 1",
      },
      inputLabelProps: {
        children: "Adress Line 1",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    ADDRESS_LINE_2_FIELD: {
      fieldType: FormikFieldsEnum.TEXT_FIELD,
      inputProps: {
        placeholder: "Address Line 2",
        name: "address_line_2",
      },
      inputLabelProps: {
        children: "Address Line 2",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    CITY_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      options: CITY_OPTIONS,
      selectProps: {
        label: "City",
        name: "city",
      },
      inputLabelProps: {
        children: "City",
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    STATE_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "state",
      },
      inputLabelProps: {
        children: "State",
        shrink: true,
      },
      options: STATE_OPTIONS,
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    POSTAL_CODE_FIELD: {
      fieldType: FormikFieldsEnum.TEXT_FIELD,
      inputProps: {
        placeholder: "Postal Code *",
        type: "number",
        name: "postal_code",
      },
      inputLabelProps: {
        children: "Postal Code *",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    COUNTRY_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "country",
        disabled: true,
      },
      inputLabelProps: {
        children: "Country",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
      options: COUNTRY_OPTIONS,
    },

    SAVE_BUTTON: {
      buttonProps: {
        children: "Save and Next",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.LARGE,
        type: "submit",
        sx: {
          marginLeft: "auto",
          marginTop: "2rem",
        },
      },
    },
  },
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Profile Updated Successfully",
    } as ShowNotificationProps,
  },
};

export const UPLOAD_PROFILE_CONFIG = {
  fieldType: FormikFieldsEnum.UPLOAD_PROFILE_IMAGE,
};

export const RECRUITER_COMPANY_ID_CONFIG = {
  TITLE_TEXT: () => {
    return {
      typographyProps: {
        children: "Profile",
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.small,
      fontColor: TypographyFontColor.black10,
    };
  },

  UPLOAD_INFO_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Upload Documents",
      ...HEADING_CONFIG,
    },
  },
  FORM_CONFIG: {
    ORGANIZATION_TYPE: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "organization_type",
      },
      inputLabelProps: {
        children: "Organization Type",
        shrink: true,
      },
      options: ORGANIZATION_OPTIONS,
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
    },

    INDUSTRY_TYPE: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "industry_type",
      },
      inputLabelProps: {
        children: "Industry Type",
        shrink: true,
      },
      options: INDUSTRY_OPTIONS,
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
    },

    COMPANY_SIZE: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "company_size",
      },
      inputLabelProps: {
        children: "Company Size",
        shrink: true,
      },
      options: COMPANY_SIZE_OPTIONS,
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
    },
    COMPANY_WEBSITE: {
      fieldType: FormikFieldsEnum.TEXT_FIELD,
      inputProps: {
        placeholder: "Website Url *",
        name: "company_website",
      },
      inputLabelProps: {
        children: "Company Website  *",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
    },
    MISSION: {
      fieldType: FormikFieldsEnum.TEXT_FIELD,
      inputProps: {
        placeholder: "Tell us about your company mission",
        name: "mission",
        multiline: true,
        minRows: 10,
        maxRows: 10,
      },
      inputLabelProps: {
        children: "Mission (optional)",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.CUSTOM_HEADING,
      },
    },
    VISION: {
      fieldType: FormikFieldsEnum.TEXT_FIELD,
      inputProps: {
        placeholder: "Tell us about your company Vision.",
        name: "vision",
        multiline: true,
        minRows: 10,
        maxRows: 10,
      },
      inputLabelProps: {
        children: "Vision (optional)",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.CUSTOM_HEADING,
      },
    },
    SAVE_BUTTON: {
      buttonProps: {
        children: "Save and Next",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.LARGE,
        type: "submit",
        sx: {
          marginLeft: "auto",
          marginTop: "2rem",
        },
      },
    },
  },
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Founding Info Updated Successfully",
    } as ShowNotificationProps,
  },
};

export const RECRUITER_SOCIAL_LINKS_CONFIG = {
  FORM_CONFIG: {
    SOCIAL_LINK_INPUT_FIELD: {
      fieldType: FormikFieldsEnum.SOCIAL_URL_INPUT,
      socialUrlFieldName: "social_links",
    },
    SAVE_BUTTON: {
      buttonProps: {
        children: "Finish Editing",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.LARGE,
        type: "submit",
        sx: {
          marginLeft: "auto",
          marginTop: "2rem",
        },
      },
    },
  },
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Socail Links Updated Successfully",
    } as ShowNotificationProps,
  },
};

export const RECRUITER_UPLOAD_DOCUMENT_CONFIG = {
  REGISTRATION_NUMBER_FIELD: {
    fieldType: FormikFieldsEnum.UPLOAD_DOCUMENT,
    lines: ["Organization", "Registration", "Number"],
    formControlProps: {
      sx: { width: "100%", flexBasis: "45%" },
    },
    documentKey: RecruiterDocumentKeyEnum.ORG_REGISTRATION_NUMBER,
  },
  CIN_NUMBER_FIELD: {
    fieldType: FormikFieldsEnum.UPLOAD_DOCUMENT,
    lines: ["CIN Number"],
    formControlProps: {
      sx: { width: "100%", flexBasis: "45%" },
    },
    documentKey: RecruiterDocumentKeyEnum.CIN_NUMBER,
  },
  GST_NUMBER_FIELD: {
    fieldType: FormikFieldsEnum.UPLOAD_DOCUMENT,
    lines: ["GST Number", "(Optional)"],
    formControlProps: {
      sx: { width: "100%", flexBasis: "45%" },
    },
    documentKey: RecruiterDocumentKeyEnum.GST_NUMBER,
  },
  OTHER_FIELD: {
    fieldType: FormikFieldsEnum.UPLOAD_DOCUMENT,
    formControlProps: {
      sx: { width: "100%", flexBasis: "45%" },
    },
    documentKey: RecruiterDocumentKeyEnum.OTHER,
  },
  ERROR_NOTIFICATION_CONFIG: {
    FILE_SIZE_ERROR: {
      message: "File size exceeds the 3 MB limit.",
    },
  },
  UPDATE_NOTIFICATION_CONFIG: (documentKey: RecruiterDocumentKeyEnum) => {
    return {
      message: `${getDocumentNameForNotification(
        documentKey
      )} Updated Successfully`,
    } as ShowNotificationProps;
  },
  DELETE_NOTIFICATION_CONFIG: (documentKey: RecruiterDocumentKeyEnum) => {
    return {
      message: `${getDocumentNameForNotification(
        documentKey
      )} Deleted Successfully`,
    } as ShowNotificationProps;
  },
};
