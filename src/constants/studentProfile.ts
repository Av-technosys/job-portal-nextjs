import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  DocumentTypeEnum,
  FormikFieldsEnum,
  JobSeekerDocumentKeyEnum,
  ListItemProps,
  ShowNotificationProps,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";
import {
  CITY_OPTIONS,
  COUNTRY_OPTIONS,
  GENDER_OPTIONS,
  NOTICE_PERIOD_OPTIONS,
  PROFICIENCY_LEVEL_OPTIONS,
  QUALIFICATION_STATUS_OPTIONS,
  SEARCH_STATUS_OPTIONS,
  STATE_OPTIONS,
} from "./common";
import {
  ASSESSMENT_URL,
  DASHBOARD_URL,
  MY_APPLIED_JOBS_URL,
  PROFILE_URL,
  SAVED_JOB_URL,
} from "./navigationUrl";
import {
  getDefaultCertificationData,
  getDefaultProjectsData,
  getDefaultWorkExperienceData,
  getDocumentNameForNotification,
} from "@/helper";

const FIELD_WIDTHS = {
  EXTRA_LARGE: { width: "100%", flexBasis: "90%" },
  LARGE: { width: "100%", flexBasis: "45%" },
  MEDIUM: { width: "100%", flexBasis: "30%" },
  CUSTOM_HEADING: { width: 1 },
};

const HEADING_CONFIG = {
  variant: TypographyVariantEnum.H6,
  sx: FIELD_WIDTHS.CUSTOM_HEADING,
};

export const STUDENT_PROFILE_HEADING_DETAILS_CONFIG = {
  CORRESPONDENCE_ADDRESS_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Correspondence Address",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black13,
  },
  ACADEMIC_QUALIFICATION_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Academic Qualification",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  PROFESSIONAL_SKILLS_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Professional Skills",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  SALARY_EXPECTATIONS_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Salary Expectation (Annual CTC)",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  WORK_EXPERIENCE_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Work Experience (Optional)",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  CERTIFICATION_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Certification (Optional)",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  PROJECTS_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Projects / Internship (Optional)",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  UPLOAD_DOCUMENTS_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Upload Documents",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
};

export const STUDENT_PROFILE_PERSONAL_CONFIG = {
  FORM_CONFIG: {
    EMPTY_FIELD_FOR_NAME: {
      fieldType: FormikFieldsEnum.TYPOGRAPHY,
      typographyProps: {
        children: "",
        sx: { width: "0%", flexBasis: "25%" },
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.normal,
      fontColor: TypographyFontColor.black,
    },
    NAME_FIELD: {
      inputProps: {
        name: "first_name",
      },
      inputLabelProps: {
        children: "Name",
        shrink: true,
      },
      formControlProps: {
        sx: { width: "100%", flexBasis: "65%" },
      },
    },
    EMPTY_FIELD: {
      fieldType: FormikFieldsEnum.TYPOGRAPHY,
      typographyProps: {
        children: "",
        sx: { width: "0%", flexBasis: "30%" },
      },
    },
    EMAIL_FIELD: {
      inputProps: {
        name: "email",
        disabled: true,
      },
      inputLabelProps: {
        children: "Email",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
        disabled: true,
      },
    },
    PHONE_NUMBER_FIELD: {
      inputProps: {
        name: "phone_number",
      },
      inputLabelProps: {
        children: "Phone number",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    GENDER_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "gender",
      },
      inputLabelProps: {
        children: "Gender",
        shrink: true,
      },
      options: GENDER_OPTIONS,
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    DATE_OF_BIRTH_FIELD: {
      fieldType: FormikFieldsEnum.DATE_PICKER,
      dateProps: {
        name: "date_of_birth",
        disableFuture: true,
      },
      inputLabelProps: {
        children: "Date of Birth",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    ADDRESS_LINE_1_FIELD: {
      inputProps: {
        label: "Address Line 1",
        name: "address_line_1",
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    ADDRESS_LINE_2_FIELD: {
      inputProps: {
        label: "Address Line 2",
        name: "address_line_2",
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
        label: "State",
        name: "state",
      },
      inputLabelProps: {
        children: "State",
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
      options: STATE_OPTIONS,
    },
    POSTAL_CODE_FIELD: {
      inputProps: {
        label: "Postal Code",
        type: "number",
        name: "postal_code",
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    COUNTRY_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        label: "Country",
        name: "country",
        disabled: true,
      },
      inputLabelProps: {
        children: "Country",
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
        disabled: true,
      },
      options: COUNTRY_OPTIONS,
    },
    SAVE_BUTTON: {
      buttonProps: {
        children: "Save And Next",
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

export const STUDENT_PROFILE_PROFILE_CONFIG = {
  ACADEMIC_QUALIFICATION_FORM_CONFIG: {
    INSTITUTION_NAME_FIELD: {
      inputProps: {
        name: "institution_name",
      },
      inputLabelProps: {
        children: "Institute or University Name",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    HIGHEST_QUALIFICATION_FIELD: {
      inputProps: {
        name: "qualification_type",
      },
      inputLabelProps: {
        children: "Highest Qualification",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    QUALIFICATION_STATUS_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "qualification_status",
      },
      inputLabelProps: {
        children: "Pursuing / Completed",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
      options: QUALIFICATION_STATUS_OPTIONS,
    },
    SCORE_FIELD: {
      inputProps: {
        type: "number",
        name: "score",
      },
      inputLabelProps: {
        children: "CGPA / Percentage",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    START_DATE_FIELD: {
      fieldType: FormikFieldsEnum.DATE_PICKER,
      dateProps: {
        name: "start_date",
      },
      inputLabelProps: {
        children: "Starts From",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    END_DATE_FIELD: {
      fieldType: FormikFieldsEnum.DATE_PICKER,
      dateProps: {
        name: "end_date",
      },
      inputLabelProps: {
        children: "To",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    SAVE_BUTTON: {
      buttonProps: {
        children: "Save",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.LARGE,
        type: "submit",
      },
    },
  },
  PROFESSIONAL_SKILLS_FORM_CONFIG: {
    SKILL_SET_ARRAY_FIELD: {
      fieldType: FormikFieldsEnum.ARRAY_FIELD,
      childFieldArray: [
        {
          inputProps: {
            name: "skill_name",
          },
          inputLabelProps: {
            children: "Skills",
            shrink: true,
          },
          formControlProps: {
            sx: { width: "100%", flexBasis: "32%" },
          },
        },
        {
          fieldType: FormikFieldsEnum.DROPDOWN,
          selectProps: {
            name: "proficiency_level",
          },
          inputLabelProps: {
            children: "Level",
            shrink: true,
          },
          formControlProps: {
            sx: { width: "100%", flexBasis: "32%" },
          },
          options: PROFICIENCY_LEVEL_OPTIONS,
        },
      ],
      arrayFieldName: "skill_sets",
      arrayFormItemParentClassName: "items-baseline",
      initialValue: {
        skill_name: "",
        proficiency_level: "",
      },
      addMoreButtonProps: {
        buttonProps: {
          children: "Add More",
          variant: ButtonVariantEnum.OUTLINED,
          color: ButtonColorEnum.PRIMARY,
          size: ButtonSizeEnum.LARGE,
        },
      },
      removeButtonProps: {
        buttonProps: {
          children: "Remove",
          variant: ButtonVariantEnum.OUTLINED,
          color: ButtonColorEnum.ERROR,
          size: ButtonSizeEnum.SMALL,
        },
        formControlProps: {
          sx: { width: "100%", flexBasis: "20%" },
        },
      },
    },
  },
  FORM_CONFIG: {
    CURRENT_SALARY_FIELD: {
      inputProps: {
        name: "current_salary",
        type: "number",
      },
      inputLabelProps: {
        children: "Current Salary *",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
    },
    EXPECTING_SALARY_FIELD: {
      inputProps: {
        name: "expected_salary",
        type: "number",
      },
      inputLabelProps: {
        children: "Expecting Salary *",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
    },
    JOB_SEARCH_STATUS_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "job_search_status",
      },
      inputLabelProps: {
        children: "Job Search Status *",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
      options: SEARCH_STATUS_OPTIONS,
    },
    NOTICE_PERIOD_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "notice_period",
      },
      inputLabelProps: {
        children: "Notice Period *",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
      options: NOTICE_PERIOD_OPTIONS,
    },
    COVER_LATER_PARAGRAPH_FIELD: {
      inputProps: {
        name: "cover_later",
        placeholder: "Enter Your Cover Later Here",
        multiline: true,
        minRows: 5,
        maxRows: 5,
      },
      inputLabelProps: {
        children: "Cover Later",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.EXTRA_LARGE,
      },
    },
    SAVE_BUTTON: {
      buttonProps: {
        children: "Save And Next",
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

export const STUDENT_PROFILE_ADDITIONAL_INFORMATION_CONFIG = {
  WORK_EXPERIENCE_FORM_CONFIG: {
    WORK_EXPERIENCE_ARRAY_FIELD: {
      fieldType: FormikFieldsEnum.ARRAY_FIELD,
      childFieldArray: [
        {
          inputProps: {
            name: "organization_name",
          },
          inputLabelProps: {
            children: "Organization Name",
            shrink: true,
          },
          formControlProps: {
            sx: { width: "100%", flexBasis: "65%" },
          },
        },
        {
          inputProps: {
            name: "designation",
          },
          inputLabelProps: {
            children: "Designation",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
        {
          inputProps: {
            name: "experience",
            type: "number",
          },
          inputLabelProps: {
            children: "Experience",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
        {
          inputProps: {
            name: "salary",
            type: "number",
          },
          inputLabelProps: {
            children: "Annual Salary",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
        {
          fieldType: FormikFieldsEnum.DATE_PICKER,
          dateProps: {
            name: "start_date",
          },
          inputLabelProps: {
            children: "Starts From",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
        {
          fieldType: FormikFieldsEnum.DATE_PICKER,
          dateProps: {
            name: "end_date",
          },
          inputLabelProps: {
            children: "To",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
      ],
      arrayFieldName: "work_experiences",
      arrayFormItemParentClassName: "items-baseline",
      initialValue: () => getDefaultWorkExperienceData(),
      addMoreButtonProps: {
        buttonProps: {
          children: "Add More",
          variant: ButtonVariantEnum.OUTLINED,
          color: ButtonColorEnum.PRIMARY,
          size: ButtonSizeEnum.LARGE,
        },
      },
      hideFirstRemoveButton: true,
      removeExtraProps: {
        fieldType: FormikFieldsEnum.TYPOGRAPHY,
        typographyProps: {
          children: "",
          sx: { width: "0%", flexBasis: "25%" },
        },
      },
      removeButtonProps: {
        buttonProps: {
          children: "Remove",
          variant: ButtonVariantEnum.OUTLINED,
          color: ButtonColorEnum.ERROR,
          size: ButtonSizeEnum.SMALL,
        },
        formControlProps: {
          sx: FIELD_WIDTHS.LARGE,
        },
      },
    },
  },
  CERTIFICATION_FORM_CONFIG: {
    CERTIFICATION_ARRAY_FIELD: {
      fieldType: FormikFieldsEnum.ARRAY_FIELD,
      childFieldArray: [
        {
          inputProps: {
            name: "certification_name",
          },
          inputLabelProps: {
            children: "Certificate Name",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
        {
          inputProps: {
            name: "institution_name",
          },
          inputLabelProps: {
            children: "Certifying Institution Name",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
        {
          fieldType: FormikFieldsEnum.DATE_PICKER,
          dateProps: {
            name: "start_date",
          },
          inputLabelProps: {
            children: "Starts From",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
        {
          fieldType: FormikFieldsEnum.DATE_PICKER,
          dateProps: {
            name: "end_date",
          },
          inputLabelProps: {
            children: "To",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
      ],
      arrayFieldName: "certifications",
      arrayFormItemParentClassName: "items-baseline",
      initialValue: () => getDefaultCertificationData(),
      addMoreButtonProps: {
        buttonProps: {
          children: "Add More",
          variant: ButtonVariantEnum.OUTLINED,
          color: ButtonColorEnum.PRIMARY,
          size: ButtonSizeEnum.LARGE,
        },
      },
      removeExtraProps: {
        fieldType: FormikFieldsEnum.TYPOGRAPHY,
        typographyProps: {
          children: "",
          sx: { width: "0%", flexBasis: "25%" },
        },
      },
      hideFirstRemoveButton: true,
      removeButtonProps: {
        buttonProps: {
          children: "Remove",
          variant: ButtonVariantEnum.OUTLINED,
          color: ButtonColorEnum.ERROR,
          size: ButtonSizeEnum.SMALL,
        },
        formControlProps: {
          sx: FIELD_WIDTHS.LARGE,
        },
      },
    },
  },
  PROJECTS_FORM_CONFIG: {
    PROJECTS_ARRAY_FIELD: {
      fieldType: FormikFieldsEnum.ARRAY_FIELD,
      childFieldArray: [
        {
          inputProps: {
            name: "project_name",
          },
          inputLabelProps: {
            children: "Projects / Internship Name",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
        {
          inputProps: {
            name: "project_organization_name",
          },
          inputLabelProps: {
            children: "Projects / Internship Organization",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
        {
          fieldType: FormikFieldsEnum.DATE_PICKER,
          dateProps: {
            name: "start_date",
          },
          inputLabelProps: {
            children: "Starts From",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
        {
          fieldType: FormikFieldsEnum.DATE_PICKER,
          dateProps: {
            name: "end_date",
          },
          inputLabelProps: {
            children: "To",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.LARGE,
          },
        },
      ],
      arrayFieldName: "projects",
      arrayFormItemParentClassName: "items-baseline",
      initialValue: () => getDefaultProjectsData(),
      removeExtraProps: {
        fieldType: FormikFieldsEnum.TYPOGRAPHY,
        typographyProps: {
          children: "",
          sx: { width: "0%", flexBasis: "25%" },
        },
      },
      addMoreButtonProps: {
        buttonProps: {
          children: "Add More",
          variant: ButtonVariantEnum.OUTLINED,
          color: ButtonColorEnum.PRIMARY,
          size: ButtonSizeEnum.LARGE,
        },
      },
      hideFirstRemoveButton: true,
      removeButtonProps: {
        buttonProps: {
          children: "Remove",
          variant: ButtonVariantEnum.OUTLINED,
          color: ButtonColorEnum.ERROR,
          size: ButtonSizeEnum.SMALL,
        },
        formControlProps: {
          sx: { width: "100%", flexBasis: "50%" },
        },
      },
    },
  },
  SAVE_BUTTON: {
    buttonProps: {
      children: "Save",
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
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Profile Updated Successfully",
    } as ShowNotificationProps,
    SUCCESS_SUBJECT: {
      message: "Subject Updated Successfully",
    } as ShowNotificationProps,
    SUCCESS_CREATE_SUBJECT: {
      message: "Subject Created Successfully",
    } as ShowNotificationProps,
  },
};

export const STUDENT_PROFILE_SIDEBAR_CONFIG = [
  {
    text: "Overview",
    listValue: DASHBOARD_URL,
  },
  {
    text: "Applied Jobs",
    listValue: MY_APPLIED_JOBS_URL,
  },
  {
    text: "Saved Jobs",
    listValue: SAVED_JOB_URL,
  },
  {
    text: "Assessments",
    listValue: ASSESSMENT_URL,
  },
  {
    text: "Job Seeker’s Information",
    listValue: PROFILE_URL,
  },
] as ListItemProps[];

export const STUDENT_PROFILE_WORKING_EXPERIENCE_CONFIG = {
  TITLE_TEXT: () => {
    return {
      typographyProps: {
        children: "Work Experience",
        variant: TypographyVariantEnum.BODY2,
      },
    };
  },
  FORM_CONFIG: {
    ORGANIZATION_NAME_FIELD: {
      inputProps: {
        label: "Organization Name *",
        name: "organization_name",
      },
    },
    DESIGNATION_FIELD: {
      inputProps: {
        label: "Designation *",
        name: "designation",
      },
    },
    START_DATE_FIELD: {
      fieldType: FormikFieldsEnum.DATE_PICKER,
      dateProps: {
        label: "Start Date *",
        name: "start_date",
      },
    },
    END_DATE_FIELD: {
      fieldType: FormikFieldsEnum.DATE_PICKER,
      dateProps: {
        label: "End Date",
        name: "end_date",
      },
    },
    SAVE_BUTTON: {
      buttonProps: {
        children: "Save",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.LARGE,
        type: "submit",
      },
    },
    UPDATE_BUTTON: {
      buttonProps: {
        children: "Update",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.LARGE,
        type: "submit",
      },
    },
    DELETE_BUTTON: {
      buttonProps: {
        children: "Delete",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.LARGE,
      },
    },
  },
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Work Experience Updated Successfully",
    } as ShowNotificationProps,
    DELETE_SUCCESS: {
      message: "Work Experience Deleted Successfully",
    } as ShowNotificationProps,
  },
};

export const JOB_SEEKER_UPLOAD_PROFILE_CONFIG = {
  fieldType: FormikFieldsEnum.UPLOAD_PROFILE_IMAGE,
};

export const QUESTION_UPLOAD_CONFIG = {
  fieldType: FormikFieldsEnum.UPLOAD_QUESTION_IMAGE,
};

export const JOB_SEEKER_UPLOAD_DOCUMENT_CONFIG = {
  RESUME_FIELD: {
    fieldType: FormikFieldsEnum.UPLOAD_DOCUMENT,
    lines: ["Resume"],
    formControlProps: {
      sx: { width: "100%", flexBasis: "45%" },
    },
    documentKey: JobSeekerDocumentKeyEnum.RESUME,
  },
  VIDEO_FIELD: {
    fieldType: FormikFieldsEnum.UPLOAD_DOCUMENT,
    lines: ["Video Resume", "(Optional)"],
    fileInfo: "MP4 (max. 3MB)",
    accept: DocumentTypeEnum.MP4,
    formControlProps: {
      sx: { width: "100%", flexBasis: "45%" },
    },
    documentKey: JobSeekerDocumentKeyEnum.VIDEO_RESUME,
  },
  CERTIFICATE_FIELD: {
    fieldType: FormikFieldsEnum.UPLOAD_DOCUMENT,
    lines: ["Certificate", " (if any)"],
    formControlProps: {
      sx: { width: "100%", flexBasis: "45%" },
    },
    documentKey: JobSeekerDocumentKeyEnum.CERTIFICATE,
  },
  OTHER_FIELD: {
    fieldType: FormikFieldsEnum.UPLOAD_DOCUMENT,
    formControlProps: {
      sx: { width: "100%", flexBasis: "45%" },
    },
    documentKey: JobSeekerDocumentKeyEnum.OTHER,
  },
  ERROR_NOTIFICATION_CONFIG: {
    FILE_SIZE_ERROR: {
      message: "File size exceeds the 3 MB limit.",
    },
  },
  UPDATE_NOTIFICATION_CONFIG: (documentKey: JobSeekerDocumentKeyEnum) => {
    return {
      message: `${getDocumentNameForNotification(
        documentKey
      )} Updated Successfully`,
    } as ShowNotificationProps;
  },
  DELETE_NOTIFICATION_CONFIG: (documentKey: JobSeekerDocumentKeyEnum) => {
    return {
      message: `${getDocumentNameForNotification(
        documentKey
      )} Deleted Successfully`,
    } as ShowNotificationProps;
  },
};

export const JOB_SEEKER_SOCIAL_LINKS_CONFIG = {
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
