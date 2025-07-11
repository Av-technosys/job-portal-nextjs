import {
  ButtonSizeEnum,
  ButtonColorEnum,
  ButtonVariantEnum,
  TypographyVariantEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
} from "@/types";

export const PAYMENT_MODAL_TEXT = {
  TITLE: {
    typographyProps: {
      children: "Summary",
      variant: TypographyVariantEnum.H6,
      sx: {
        textAlign: "center",
      },
      fontWeight: TypographyFontWeight.semibold,
      fontSize: TypographyFontSize.normal,
      fontColor: TypographyFontColor.black2,
    },
    fontColor: TypographyFontColor.white,
  },
  PLAN_TYPE_LABEL: (plan: string) => ({
    typographyProps: {
      children: `Plan Type: ${plan}`,
      variant: TypographyVariantEnum.CAPTION,
      sx: {
        textAlign: "center",
      },
    },
    fontColor: TypographyFontColor.white,
  }),
  PRICING_LABEL: (plan: string) => ({
    typographyProps: {
      children: `Pricing Plans`,
      variant: TypographyVariantEnum.CAPTION,
      id: plan,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.small,
    fontColor: TypographyFontColor.black9,
  }),
  TOTAL_LABEL: {
    typographyProps: {
      children: "Total :",
      variant: TypographyVariantEnum.BODY2,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.small,
    fontColor: TypographyFontColor.black2,
  },
  AMOUNT_LABEL: (amount: number) => ({
    typographyProps: {
      children: `₹${amount}.00`,
      variant: TypographyVariantEnum.CAPTION,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.small,
    fontColor: TypographyFontColor.black2,
  }),
  TOTAL_AMOUNT_LABEL: (amount: number) => ({
    typographyProps: {
      children: `₹${amount}.00 INR`,
      variant: TypographyVariantEnum.BODY2,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.normal,
    fontColor: TypographyFontColor.black2,
  }),
  PAY_BUTTON: {
    buttonProps: {
      children: "Pay",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },
  EXPIRY_TEXT: {
    typographyProps: {
      children: "This package will expire after one month.",
      variant: TypographyVariantEnum.BODY2,
      color: "text.secondary",
      sx: {
        textAlign: "center",
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.extraSmall,
      fontColor: TypographyFontColor.black3,
    },
  },
  PAYMENT_MODAL_BUTTON_STYLES: {
    buttonProps: {
      children: "Pay",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },
  PAYMENT_NOTIFICATION: {
    SUCCESS_CONFIG: {
      message: "Payment completed successfully",
    },
    CANCELLED_CONFIG: {
      message: "Payment Cancelled",
    },
    FAILED_CONFIG: {
      message: "Payment Failed",
    },
  },
};
