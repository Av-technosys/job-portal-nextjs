import * as yup from "yup";
import {
  minMaxValidationSchema,
  onlyRequiredValidationSchema,
  skillsValidationSchema,
} from "./common";

export const jobDetailsValidationSchema = yup.object({
  title: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Job Title",
  }),

  role: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Job Role",
  }),

  description: minMaxValidationSchema({
    min: 1,
    max: 500,
    fieldName: "Job Description",
    required: false,
  }),

  skills: skillsValidationSchema(),

  min_salary: minMaxValidationSchema({
    min: 1,
    max: 200,
    fieldName: "Minimum Salary",
  }),

  max_salary: minMaxValidationSchema({
    min: 1,
    max: 200,
    fieldName: "Maximum Salary",
  }),
  education: onlyRequiredValidationSchema({
    fieldName: "Education",
  }),

  experience: onlyRequiredValidationSchema({
    fieldName: "Experience",
  }),
  job_type: onlyRequiredValidationSchema({
    fieldName: "Job Type",
  }),

  vacancies: minMaxValidationSchema({
    min: 1,
    max: 200,
    fieldName: "Vacancy",
  }),
  // date_of_birth: onlyRequiredValidationSchema({
  //   fieldName: "Date of Birth",
  // }),

  job_level: onlyRequiredValidationSchema({
    fieldName: "Job Level",
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
});
