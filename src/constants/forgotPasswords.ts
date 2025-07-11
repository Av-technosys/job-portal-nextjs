import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";

export const FORGOT_PASSWORD_CONFIG = {
  HEADER_TEXT: () => {
    return {
      typographyProps: {
        children: "Forgot Password",
        variant: TypographyVariantEnum.H5,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.black2,
    } as TypographyProps;
  },
  EMAIL_FIELD: {
    inputProps: {
      label: "Email",
      required: true,
      name: "email",
    },
  },
  VERIFY_OTP_BUTTON: {
    buttonProps: {
      children: "Verify OTP",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
    },
  },
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "OTP sent to registered email address",
    },
  },
};
export const RESET_PASSWORD_CONFIG = {
  HEADER_TEXT: () => {
    return {
      typographyProps: {
        children: "Reset Password",
        variant: TypographyVariantEnum.H5,
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.black2,
    };
  },
  SUB_TITLE_TEXT_1: () => {
    return {
      typographyProps: {
        children: `We've sent a verification code to`,

        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.normal,
      fontColor: TypographyFontColor.black3,
    } as TypographyProps;
  },
  SUB_TITLE_TEXT_2: (email: CommonObjectType) => {
    return {
      typographyProps: {
        children: `${email?.email}`,
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.normal,
      fontColor: TypographyFontColor.black3,
    } as TypographyProps;
  },
  SUB_TITLE_TEXT_3: () => {
    return {
      typographyProps: {
        children: `to verify your email address and activate your account`,
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.normal,
      fontColor: TypographyFontColor.black3,
    } as TypographyProps;
  },
  OTP_INPUT_FIELD: {
    inputProps: {
      label: "Otp *",
      type: "number",
      name: "emailOtp",
    },
  },
  EMAIL_FIELD: {
    inputProps: {
      label: "Email",
      required: true,
      name: "email",
    },
  },
  PASSWORD_FIELD: {
    inputProps: {
      label: "New Password",
      type: "password",
      name: "password",
    },
  },
  CONFIRM_PASSWORD_FIELD: {
    inputProps: {
      label: "Confirm New Password *",
      type: "password",
      name: "confirmPassword",
    },
  },
  RESET_PASSWORD_BUTTON: {
    buttonProps: {
      children: "Reset Password",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
    },
  },
  RESEND_OTP_BUTTON: {
    buttonProps: {
      children: "Resend Otp",
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
    },
  },
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Forgot Password Successfully",
    },
    RESEND_SUCCESS: {
      message: "OTP resent to registered email address",
    },
  },
  OTP_TEXT: () => {
    return {
      typographyProps: {
        children: "Didn't recive any code!",
        variant: TypographyVariantEnum.H5,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.normal,
      fontColor: TypographyFontColor.black5,
    } as TypographyProps;
  },
};
