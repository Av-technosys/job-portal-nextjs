import * as yup from "yup";
import {
  dateOfBirthValidationSchema,
  minMaxValidationSchema,
  nameValidationSchema,
  onlyRequiredValidationSchema,
  phoneNumberValidationSchema,
  scoreValidationSchema,
  skillSetsValidationSchema,
  startDateValidation,
} from "./common";
import { CommonAllDataType } from "@/types";

export const studentProfilePersonalInformationValidationSchema = yup.object({
  first_name: nameValidationSchema,
  phone_number: phoneNumberValidationSchema,
  date_of_birth: dateOfBirthValidationSchema,
  gender: onlyRequiredValidationSchema({
    fieldName: "Gender",
  }),
  address_line_1: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Address Line 1",
  }),
  address_line_2: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Address Line 2",
    required: false,
  }),
  city: onlyRequiredValidationSchema({
    fieldName: "City",
  }),
  state: onlyRequiredValidationSchema({
    fieldName: "State",
  }),
  country: onlyRequiredValidationSchema({
    fieldName: "Country",
  }),
  postal_code: minMaxValidationSchema({
    min: 1,
    max: 6,
    fieldName: "Postal Code",
  }),
});

export const studentProfileGeneralInformationValidationSchema = yup.object({
  institution_name: minMaxValidationSchema({
    min: 1,
    max: 200,
    fieldName: "Institution Name",
  }),
  qualification_type: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Highest Qualification",
  }),
  score: scoreValidationSchema,
  skill_sets: skillSetsValidationSchema,
  qualification_status: onlyRequiredValidationSchema({
    fieldName: "Qualification Status",
  }),
  start_date: startDateValidation({
    fieldName: "Start Date",
  }),
  end_date: startDateValidation({
    fieldName: "End Date",
  }),
  current_salary: minMaxValidationSchema({
    min: 1,
    max: 8,
    fieldName: "Current Salary",
  }),
  expected_salary: minMaxValidationSchema({
    min: 1,
    max: 8,
    fieldName: "Expected Salary",
  }),
  job_search_status: onlyRequiredValidationSchema({
    fieldName: "Job Search Status",
  }),
  notice_period: onlyRequiredValidationSchema({
    fieldName: "Notice Period",
  }),
});

function isFieldRequiredIfAnyFilled(keys: string[]) {
  return function (this: yup.TestContext, value: string | undefined): boolean {
    const values = this.parent as Record<string, CommonAllDataType>;
    const anyFieldFilled = keys.some((key) => !!values[key]);
    if (anyFieldFilled) {
      return value !== null && value !== undefined && value !== "";
    }
    return true;
  };
}

export const WORK_EXPERIENCE_FIELDS = [
  "organization_name",
  "designation",
  "experience",
  "salary",
  "start_date",
];

const workExperienceArrayItemSchema = yup.object({
  organization_name: minMaxValidationSchema({
    min: 1,
    max: 200,
    fieldName: "Organization Name",
    required: false,
  }).test(
    "organization-name-required",
    "Organization name is required when any other field is filled",
    isFieldRequiredIfAnyFilled(
      WORK_EXPERIENCE_FIELDS.filter((key) => key !== "organization_name")
    )
  ),
  designation: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Designation",
    required: false,
  }).test(
    "designation-required",
    "Designation is required when any other field is filled",
    isFieldRequiredIfAnyFilled(
      WORK_EXPERIENCE_FIELDS.filter((key) => key !== "designation")
    )
  ),
  experience: minMaxValidationSchema({
    min: 1,
    max: 3,
    fieldName: "Salary",
    required: false,
  }).test(
    "experience-required",
    "Experience is required when any other field is filled",
    isFieldRequiredIfAnyFilled(
      WORK_EXPERIENCE_FIELDS.filter((key) => key !== "experience")
    )
  ),
  start_date: startDateValidation({
    fieldName: "Start Date",
    required: false,
  })
    .nonNullable()
    .test(
      "start-date-required",
      "Start date is required when any other field is filled",
      isFieldRequiredIfAnyFilled(
        WORK_EXPERIENCE_FIELDS.filter((key) => key !== "start_date")
      )
    )
    .nullable()
    .typeError("Invalid date"),
  salary: minMaxValidationSchema({
    min: 1,
    max: 8,
    fieldName: "Salary",
    required: false,
  }).test(
    "salary-required",
    "Salary is required when any other field is filled",
    isFieldRequiredIfAnyFilled(
      WORK_EXPERIENCE_FIELDS.filter((key) => key !== "salary")
    )
  ),
});

export const CERTIFICATIONS_FIELDS = [
  "certification_name",
  "institution_name",
  "start_date",
];

const certificationsArrayItemSchema = yup.object({
  certification_name: minMaxValidationSchema({
    min: 1,
    max: 200,
    fieldName: "Certification Name",
    required: false,
  }).test(
    "certification-name-required",
    "Certification name is required when any other field is filled",
    isFieldRequiredIfAnyFilled(
      CERTIFICATIONS_FIELDS.filter((key) => key !== "certification_name")
    )
  ),
  institution_name: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Certifying Institution Name",
    required: false,
  }).test(
    "institution-name-required",
    "Certifying Institution Name is required when any other field is filled",
    isFieldRequiredIfAnyFilled(
      CERTIFICATIONS_FIELDS.filter((key) => key !== "institution_name")
    )
  ),
  start_date: startDateValidation({
    fieldName: "Start Date",
    required: false,
  })
    .nonNullable()
    .test(
      "start-date-required",
      "Start date is required when any other field is filled",
      isFieldRequiredIfAnyFilled(
        CERTIFICATIONS_FIELDS.filter((key) => key !== "start_date")
      )
    )
    .nullable()
    .typeError("Invalid date"),
});

export const PROJECTS_FIELDS = [
  "project_name",
  "project_organization_name",
  "start_date",
];

const projectsArrayItemSchema = yup.object({
  project_name: minMaxValidationSchema({
    min: 1,
    max: 200,
    fieldName: "Projects / Internship Name",
    required: false,
  }).test(
    "projects-name-required",
    "Projects / Internship Name is required when any other field is filled",
    isFieldRequiredIfAnyFilled(
      PROJECTS_FIELDS.filter((key) => key !== "project_name")
    )
  ),
  project_organization_name: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Projects / Internship Organization",
    required: false,
  }).test(
    "project-organization-name-required",
    "Projects / Internship Organization is required when any other field is filled",
    isFieldRequiredIfAnyFilled(
      PROJECTS_FIELDS.filter((key) => key !== "project_organization_name")
    )
  ),
  start_date: startDateValidation({
    fieldName: "Start Date",
    required: false,
  })
    .nonNullable()
    .test(
      "start-date-required",
      "Start date is required when any other field is filled",
      isFieldRequiredIfAnyFilled(
        PROJECTS_FIELDS.filter((key) => key !== "start_date")
      )
    )
    .nullable()
    .typeError("Invalid date"),
});

// Create the array schema
export const studentProfileAdditionalInfoValidationSchema = yup.object().shape({
  work_experiences: yup.array().of(workExperienceArrayItemSchema),
  certifications: yup.array().of(certificationsArrayItemSchema),
  projects: yup.array().of(projectsArrayItemSchema),
});
