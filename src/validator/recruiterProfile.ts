import * as yup from "yup";
import { minMaxValidationSchema } from "./common";

export const recruiterProfileGeneralInformationValidationSchema = yup.object({
  first_name: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Company Name",
  }),
  company_about_us: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Company About us",
  }),

  address_line_1: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Address Line 1",
  }),

  city: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "City",
  }),
  state: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "State",
  }),
  postal_code: minMaxValidationSchema({
    min: 1,
    max: 6,
    fieldName: "Postal Code",
  }),
  country: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Country",
  }),
});

export const recruiterFoundingInfoValidationSchema = yup.object({
  organization_type: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Organization Type",
  }),
  industry_type: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Industry Type",
  }),
  company_website: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Company Website",
  }),
  company_size: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Company Size",
  }),
  mission: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Mission",
    required: false,
  }),
  vision: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Vision",
    required: false,
  }),
});
