import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  FormikFieldsEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";
import {
  JOB_ROLE_OPTIONS,
  EDUCATION_OPTIONS,
  EXPERIENCE_OPTIONS,
  JOB_TYPE_OPTIONS,
  JOB_LEVEL_OPTIONS,
  STATE_OPTIONS,
  COUNTRY_OPTIONS,
  CITY_OPTIONS,
  VACANCY_OPTIONS,
  MAX_SALARY_RANGE_OPTIONS,
  MIN_SALARY_RANGE_OPTIONS,
  SKILLS_OPTIONS,
} from "./common";

const FIELD_WIDTHS = {
  EXTRA_LARGE: { width: "100%", flexBasis: "100%" },
  SMALL: { width: "100%", flexBasis: "10%" },
  LARGE: { width: "100%", flexBasis: "45%" },
  MEDIUM: { width: "100%", flexBasis: "30%" },
  CUSTOM_HEADING: { width: 1 },
};

const HEADING_CONFIG = {
  variant: TypographyVariantEnum.H6,
  sx: FIELD_WIDTHS.CUSTOM_HEADING,
};

export const JOB_DETAILS_CONFIG = {
  JOB_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Post A New Job / Go to Dashboard",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.subtitle,
    fontColor: TypographyFontColor.black,
  },
  SALARY_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Salary (Annual CTC)",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  EXTRA_INFO_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Extra Information",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  LOCATION_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Location",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  SKILLS_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Skills Required",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  DESCRIPTION_HEADING: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Job Description",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black,
  },
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Job posted successfully",
    },
  },
  FORM_CONFIG: {
    JOB_TITLE_FIELD: {
      fieldType: FormikFieldsEnum.TEXT_FIELD,
      inputProps: {
        name: "title",
        placeholder: "Add job title, role, etc",
      },
      inputLabelProps: {
        children: "Job Title",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
    },
    JOB_ROLE_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "role",
      },
      inputLabelProps: {
        children: "Job Role",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
      options: JOB_ROLE_OPTIONS,
    },
    MIN_SALARY_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "min_salary",
      },
      inputLabelProps: {
        children: "Min. Salary",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
      options: MIN_SALARY_RANGE_OPTIONS,
    },
    MAX_SALARY_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "max_salary",
      },
      inputLabelProps: {
        children: "Max. Salary",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.LARGE,
      },
      options: MAX_SALARY_RANGE_OPTIONS,
    },
    JOB_LEVEL_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "job_level",
      },
      inputLabelProps: {
        children: "Job Level",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
      options: JOB_LEVEL_OPTIONS,
    },

    VACANCY_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "vacancies",
      },
      inputLabelProps: {
        children: "Vacancy",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
      options: VACANCY_OPTIONS,
    },

    EDUCATION_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "education",
      },
      inputLabelProps: {
        children: "Education",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
      options: EDUCATION_OPTIONS,
    },
    EXPERIENCE_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "experience",
      },
      inputLabelProps: {
        children: "Experience",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
      options: EXPERIENCE_OPTIONS,
    },
    JOB_TYPE_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "job_type",
      },
      inputLabelProps: {
        children: "Job Type",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
      options: JOB_TYPE_OPTIONS,
    },
    SKILLS_FIELD: {
      fieldType: FormikFieldsEnum.MULTI_SELECT_DROPDOWN,
      multiSelectProps: {
        name: "skills",
        multiple: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.EXTRA_LARGE,
      },
      options: SKILLS_OPTIONS,
    },

    // Location Information
    COUNTRY_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "country",
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
    STATE_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "state",
      },
      inputLabelProps: {
        children: "State",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
      options: STATE_OPTIONS,
    },
    CITY_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      selectProps: {
        name: "city",
      },
      inputLabelProps: {
        children: "City",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
      options: CITY_OPTIONS,
    },

    // Detailed Information
    DESCRIPTION_FIELD: {
      fieldType: FormikFieldsEnum.TEXT_FIELD,
      inputProps: {
        name: "description",
        placeholder: "Tell us about your company vision",
        multiline: true,
        minRows: 10,
        maxRows: 10,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.EXTRA_LARGE,
      },
    },

    // Additional Fields
    DATE_OF_BIRTH_FIELD: {
      fieldType: FormikFieldsEnum.DATE_PICKER,
      dateProps: {
        name: "date_of_birth",
        label: "Date of Birth",
      },
      formControlProps: {
        sx: FIELD_WIDTHS.MEDIUM,
      },
    },
    POST_JOB_BUTTON: {
      buttonProps: {
        children: "Post Job",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.SMALL,
        type: "submit",
        sx: {
          width: "150px",
          marginLeft: "auto",
          marginTop: "2rem",
        },
      },
    },
    TIME_DURATION: {
      fieldType: FormikFieldsEnum.CHECKBOX,
      checkboxProps: {
        name: "time_duration",
        color: "success",
      },
      formControlLabelProps: {
        label: "For 30 days",
      },
    },
  },
};
