import {
  ButtonVariantEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";

export const SUBSCRIPTION_PAGE_CONFIG = {
  HEADER_TEXT: {
    typographyProps: {
      children: "Get Hired with Job Assured : Your Path to Success Success",
      variant: TypographyVariantEnum.H6,
      color: "text.secondary",
      className: "text-center mt-4",
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.subtitle,
    fontColor: TypographyFontColor.black12,
  },
  HEADER_SUB_TEXT: {
    typographyProps: {
      children:
        "Job Assured connects you with top recruiters, offering personalized job matches and career support to help you secure the right job and grow your professionally.",
      variant: TypographyVariantEnum.BODY2,
      color: "text.secondary",
      className: "text-center mt-4",
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.black11,
  },
  BUTTON_CONFIG: {
    buttonProps: {
      variant: ButtonVariantEnum.OUTLINED,
      children: "Free Practice Aptitude Test",
      className: "mt-4",
      sx: {
        borderRadius: "50px",
        backgroundColor: "#123a59",
        padding: "10px 20px",
        color: "#fff",
      },
    },
  },
  ACTUAL_APTITUDE_TEST_BUTTON_CONFIG: {
    buttonProps: {
      variant: ButtonVariantEnum.OUTLINED,
      children: "Actual Aptitude Test",
      className: "mt-4",
      sx: {
        borderRadius: "50px",
        backgroundColor: "#123a59",
        padding: "10px 20px",
        color: "#fff",
      },
    },
  },

  STACK_CONFIG: {
    direction: "column",
    alignItems: "center",
    gap: 2,
    sx: {
      background: "#f5f9ff",
      minHeight: "100px",
      padding: "40px 20px",
      width: "300px",
    },
  },
};

export const TEST_TYPES = [
  "Numerical reasoning",
  "Verbal reasoning",
  "Logical reasoning",
  "Personality test",
  "Technical skill assessment",
];
