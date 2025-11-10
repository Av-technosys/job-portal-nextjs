import * as yup from "yup";
import {
  emailValidationSchema,
  firstNameValidationSchema,
  lastNameValidationSchema,
  minMaxValidationSchema,
  phoneNumberValidationSchema,
} from "./common";

export const contactUsFormSchema = yup.object({
  first_name: firstNameValidationSchema,
  last_name: lastNameValidationSchema,
  email: emailValidationSchema,
  phone_number: phoneNumberValidationSchema,

  subject: minMaxValidationSchema({
    min: 1,
    max: 100,
    fieldName: "Subject",
  }),
  message: minMaxValidationSchema({
    min: 1,
    max: 500,
    fieldName: "Message",
  }),
});
