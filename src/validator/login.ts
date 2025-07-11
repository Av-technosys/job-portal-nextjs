import * as yup from "yup";
import { emailValidationSchema, passwordValidationSchema } from "./common";

export const loginValidationSchema = yup.object({
  email: emailValidationSchema,
  password: passwordValidationSchema,
});
