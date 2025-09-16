import * as yup from "yup";
import {
  emailValidationSchema,
  minMaxValidationSchema,
  nameValidationSchema,
} from "./common";

export const contactUsFormSchema = yup.object({
  first_name: nameValidationSchema,
  last_name: nameValidationSchema,
  email: emailValidationSchema,
  phone_number: yup.number().required("Contact number is required"),

  subject: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Subject",
  }),
  message: minMaxValidationSchema({
    min: 1,
    max: 500,
    fieldName: "Subject",
  }),
});
