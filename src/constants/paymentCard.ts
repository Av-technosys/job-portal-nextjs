import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";

export const PAYMENT_CARD_TEXT_CONFIG = {
  HEADER: {
    typographyProps: {
      children: "Enroll For The Actual Aptitude Test",
      variant: TypographyVariantEnum.H6,
      className: "text-center ",
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.subtitle,
    fontColor: TypographyFontColor.white,
  },
  DESCRIPTION_TITLE: {
    typographyProps: {
      children: "You already have an ongoing test session.",
      variant: TypographyVariantEnum.H6,
      className: "text-center ",
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.normal,
  },
  DESCRIPTION_TEXT: {
    typographyProps: {
      children:
        "Would you like to resume your previous tests or purchase new ones to start fresh?",
      variant: TypographyVariantEnum.H5,
      sx: {
        textAlign: "center",
      },
      fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.extraHeading,
      fontColor: TypographyFontColor.white,
    },
  },
  AMOUNT: {
    typographyProps: {
      children: "₹ 999",
      variant: TypographyVariantEnum.H5,
      className: "mt-4",
      sx: {
        color: "#fff",
        textAlign: "center",
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.extraTitle,
      fontColor: TypographyFontColor.white,
    },
  },
  FEATURES: (features: string) => ({
    typographyProps: {
      children: features,
      variant: TypographyVariantEnum.BODY2,
    },
  }),
  BUTTON_PROPS: {
    buttonProps: {
      children: "Make Payment",
      variant: ButtonVariantEnum.CONTAINED,
      // size: ButtonSizeEnum.LARGE,
      className: "mt-4 mb-4 w-full",
      sx: {
        borderRadius: "10px",
        margin: "0 10px",
        padding: "12px 0",
      },
    },
  },
  CANCEL_PAYMENT_PROPS: {
    buttonProps: {
      children: "Cancel",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.ERROR,
      className: "mt-4 mb-4 w-full",
      sx: {
        borderRadius: "10px",
        margin: "0 10px",
        padding: "12px 0",
      },
    },
  },
};

export const MODAL_STYLES = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "400px",
    md: "600px",
  },
  bgcolor: "#123a59",
  background: `linear-gradient(180deg, #123a59 0%, #123a59 100%)`, //  doubt
  borderRadius: "10px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
  p: {
    xs: 2,
    sm: 4,
  },
  maxHeight: "95vh",
  overflow: "auto",
};

export const SECOND_MODAL_STYLES = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "400px",
    md: "600px",
  },
  borderRadius: "10px",
  p: {
    xs: 2,
    sm: 4,
  },
  maxHeight: "95vh",
  overflow: "auto",
};
