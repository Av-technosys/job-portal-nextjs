import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  LinkProps,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";
import { ADMIN_USER_TYPE } from "./common";

export const ADMIN_REGISTRATION_PAGE_CONFIG = {
  HEADER_TEXT: () => {
    return {
      typographyProps: {
        children: "Create Admin Account",
        variant: TypographyVariantEnum.H5,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.black2,
    } as TypographyProps;
  },
  SUB_TITLE_TEXT: () => {
    return {
      typographyProps: {
        children: "Already have an account?",
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.normal,
      fontColor: TypographyFontColor.black5,
    } as TypographyProps;
  },
  USER_DROPDOWN_FIELD: {
    selectProps: {
      label: "User Type *",
      name: "userType",
    },
    inputLabelProps: {
      children: "User Type *",
    },
    options: ADMIN_USER_TYPE,
  },
  FIRST_NAME_FIELD: {
    inputProps: {
      label: "Name *",
      name: "name",
      type: "text",
    },
  },
  LAST_NAME_FIELD: {
    inputProps: {
      label: "Name *",
      name: "name",
      type: "text",
    },
  },
  EMAIL_FIELD: {
    inputProps: {
      label: "Email *",
      name: "email",
      type: "email",
    },
  },
  BUSINESS_EMAIL_FIELD: {
    inputProps: {
      label: "Business Email *",
      name: "email",
      type: "email",
    },
  },
  PASSWORD_FIELD: {
    inputProps: {
      label: "Password",
      type: "password",
      name: "password",
    },
  },
  CONFIRM_PASSWORD_FIELD: {
    inputProps: {
      label: "Confirm Password *",
      type: "password",
      name: "confirmPassword",
    },
  },
  MOBILE_NUMBER_FIELD: {
    inputProps: {
      label: "Mobile Number *",
      type: "number",
      name: "mobileNumber",
    },
  },
  REGISTER_BUTTON: {
    buttonProps: {
      children: "Register",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
    },
  },
  LOGIN_LINK: ({ onClick }: { onClick: () => void }): LinkProps => {
    return {
      linkProps: {
        onClick,
        className: "cursor-pointer",
      },
      children: "Log In",
    };
  },
  FORGOT_PASSWORD_LINK: ({ onClick }: { onClick: () => void }): LinkProps => {
    return {
      linkProps: {
        onClick,
        className: "cursor-pointer",
      },
      children: "Forgot Password?",
    };
  },
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Thanks! Please verify the email.",
    },
  },
  SIGN_IN_DIVIDER_CONFIG: {
    children: "Or Sign In With",
    className: "py-4",
  },
};
