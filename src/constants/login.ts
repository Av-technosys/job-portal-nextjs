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

export const LOGIN_PAGE_CONFIG = {
  HEADER_TEXT: () => {
    return {
      typographyProps: {
        children: "Login",
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
        children: "Get started for free",
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.normal,
      fontColor: TypographyFontColor.black5,
    } as TypographyProps;
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
      label: "Password",
      required: true,
      type: "password",
      name: "password",
    },
  },
  LOGIN_BUTTON: {
    buttonProps: {
      children: "Login",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
    },
  },
  CREATE_ACCOUNT_LINK: ({ onClick }: { onClick: () => void }): LinkProps => {
    return {
      linkProps: {
        onClick,
        className: "cursor-pointer",
      },
      children: "Create Account",
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
      message: "Logged In Successfully",
    },
  },
};
