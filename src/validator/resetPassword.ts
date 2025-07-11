import * as yup from "yup";
import {
  confirmPasswordValidationSchema,
  emailValidationSchema,
  otpValidationSchema,
  passwordValidationSchema,
} from "./common";

export const forgotPasswordEmailValidationSchema = yup.object({
  email: emailValidationSchema,
});

export const forgotPasswordOtpAndPasswordValidationSchema = yup.object({
  emailOtp: otpValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: confirmPasswordValidationSchema,
});
