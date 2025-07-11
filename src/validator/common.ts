import * as yup from "yup";

export const BUSINESS_EMAIL_REGEX =
  /^(?!.+@(gmail|google|yahoo|outlook|hotmail|msn)\..+)(.+@.+\..+)$/;

export const PHONE_NUMBER_REGEX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const emailValidationSchema = yup
  .string()
  .required("Email is required")
  .email("Enter a valid email");

export const businessEmailValidationSchema = yup
  .string()
  .required("Business email is required")
  .email("Enter a valid business email")
  .matches(BUSINESS_EMAIL_REGEX, "Please enter business email");

export const passwordValidationSchema = yup
  .string()
  .required("Password is required")
  .min(8, "Password should be of minimum 8 characters length");

export const confirmPasswordValidationSchema = yup
  .string()
  .required("Confirm Password is required")
  .min(8, "Password should be of minimum 8 characters length")
  .oneOf([yup.ref("password"), ""], "Passwords must match");

export const userTypeValidationSchema = yup
  .string()
  .required("User selection is required");

export const phoneNumberValidationSchema = yup
  .string()
  .matches(PHONE_NUMBER_REGEX, "Phone number is not valid")
  .required("Phone number is required")
  .min(10, "Phone number is too small")
  .max(10, "Phone nunber is too large");

export const nameValidationSchema = yup
  .string()
  .min(3, "Name is too small")
  .max(100, "Name is too large")
  .required("Name is required");

export const otpValidationSchema = yup
  .string()
  .min(6, "Otp is too small")
  .max(6, "Otp is too large")
  .required("Otp is required");

export const dateOfBirthValidationSchema = yup
  .date()
  .required("Date of birth is required")
  .nullable()
  .max(new Date(), "Date of birth can't be in the future")
  .test("age", "You must be at least 18 years old", (value) => {
    if (!value) return false;
    const today = new Date();
    const age = today.getFullYear() - value.getFullYear();
    const month = today.getMonth() - value.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < value.getDate())) {
      return age > 18;
    }
    return age >= 18;
  });

export const scoreValidationSchema = yup
  .number()
  .required("Score is required")
  .min(1, "Score must be at least 1")
  .max(100, "Score must be at most 100")
  .positive("Score must be a positive number")
  .typeError("Score must be a valid number");

export const skillsValidationSchema = () =>
  yup.array().required("Skills are required");

export const onlyRequiredValidationSchema = ({
  fieldName,
  requiredMessage,
}: {
  fieldName: string;
  requiredMessage?: string;
}) => yup.string().required(requiredMessage ?? `${fieldName} is required.`);

export const minMaxValidationSchema = ({
  required = true,
  min,
  max,
  fieldName,
  minMessage,
  maxMessage,
  requiredMessage,
}: {
  required?: boolean;
  min: number;
  max: number;
  fieldName: string;
  minMessage?: string;
  maxMessage?: string;
  requiredMessage?: string;
}) => {
  let yupString = yup
    .string()
    .min(min, minMessage ?? `${fieldName} is too small.`)
    .max(max, maxMessage ?? `${fieldName} is too large.`);

  if (required) {
    yupString = yupString.required(
      requiredMessage ?? `${fieldName} is required.`
    );
  }

  return yupString;
};

export const startDateValidation = ({
  required = true,
  requiredMessage,
  fieldName,
}: {
  required?: boolean;
  requiredMessage?: string;
  fieldName: string;
}) => {
  let yupString = yup.string().nullable().typeError("Invalid date");

  if (required) {
    yupString = yupString.required(
      requiredMessage ?? `${fieldName} is required`
    );
  }

  return yupString;
};

export const skillSetsValidationSchema = yup
  .array()
  .of(
    yup.object({
      skill_name: minMaxValidationSchema({
        min: 1,
        max: 100,
        fieldName: "Skill Name",
      }),
      proficiency_level: onlyRequiredValidationSchema({
        fieldName: "Proficiency Level",
      }),
    })
  )
  .min(1, "At least one skill is required")
  .required("Skills are required");

export const socialLinksValidationSchema = yup.object({
  social_links: yup
    .array()
    .of(
      yup.object({
        platform: minMaxValidationSchema({
          min: 1,
          max: 100,
          fieldName: "Platform",
        }),
        url: minMaxValidationSchema({
          min: 1,
          max: 100,
          fieldName: "Url",
        }).url("Please enter a valid URL"),
      })
    )
    .min(1, "At least one social link is required")
    .required("Social Links are required"),
});
