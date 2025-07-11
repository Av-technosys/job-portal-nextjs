import * as yup from "yup";
import {
  businessEmailValidationSchema,
  confirmPasswordValidationSchema,
  emailValidationSchema,
  nameValidationSchema,
  otpValidationSchema,
  passwordValidationSchema,
  phoneNumberValidationSchema,
  userTypeValidationSchema,
} from "./common";

export const jobSeekerRegistrationValidationSchema = yup.object({
  userType: userTypeValidationSchema,
  name: nameValidationSchema,
  email: emailValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: confirmPasswordValidationSchema,
  mobileNumber: phoneNumberValidationSchema,
});

export const recruiterRegistrationValidationSchema = yup.object({
  userType: userTypeValidationSchema,
  name: nameValidationSchema,
  email: businessEmailValidationSchema,
  password: passwordValidationSchema,
  confirmPassword: confirmPasswordValidationSchema,
  mobileNumber: phoneNumberValidationSchema,
});

export const otpVerificationValidationSchema = yup.object({
  emailOtp: otpValidationSchema,
});
