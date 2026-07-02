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
      children: "Get Hired with Job Assured",
      className: "text-center mb-4 pt-10 font-extrabold text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-700 tracking-tight leading-[1.25]",
    },
  },
  HEADER_SUB_TEXT: {
    typographyProps: {
      children:
        "Job Assured connects you with top recruiters, offering personalized job matches and career support to help you secure the right job and grow professionally.",
      className: "text-center text-slate-600 mb-12 text-lg md:text-xl font-medium max-w-2xl mx-auto",
    },
  },
  BUTTON_CONFIG: {
    buttonProps: {
      children: "Free Practice Aptitude Test",
      className: "w-full transition-all duration-200 border-0",
      sx: { 
        backgroundColor: "#3b82f6", 
        color: "#fff", textTransform: "none", fontSize: "0.85rem", borderRadius: "8px", fontWeight: "600",
        padding: "12px 16px",
        "&:hover": { backgroundColor: "#2563eb" }
      },
    },
  },
  RESUME_BUTTON_CONFIG: {
    buttonProps: {
      children: "Resume Aptitude Test",
      className: "w-full transition-all duration-200 border-0",
      sx: { 
        backgroundColor: "#3b82f6", 
        color: "#fff", textTransform: "none", fontSize: "0.85rem", borderRadius: "8px", fontWeight: "600",
        padding: "12px 16px",
        "&:hover": { backgroundColor: "#2563eb" }
      },
    },
  },
  ACTUAL_APTITUDE_TEST_BUTTON_CONFIG: {
    buttonProps: {
      children: "Actual Aptitude Test",
      className: "w-full transition-all duration-200 border-0",
      sx: { 
        backgroundColor: "#3b82f6", 
        color: "#fff", textTransform: "none", fontSize: "0.85rem", borderRadius: "8px", fontWeight: "600",
        padding: "12px 16px",
        "&:hover": { backgroundColor: "#2563eb" }
      },
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
