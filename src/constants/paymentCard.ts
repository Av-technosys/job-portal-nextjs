import {
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
      variant: TypographyVariantEnum.H5,
      sx: {
        color: "#fff",
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
      className: "mt-4 mb-4",
      sx: {
        borderRadius: "10px",
        margin: "0 20px",
        padding: "10px 0",
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
