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
      className: "w-full transition-all duration-200 border-0 cursor-pointer",
      sx: {
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        color: "#fff",
        textTransform: "none",
        fontSize: "0.85rem",
        borderRadius: "10px",
        fontWeight: "600",
        padding: "12px 16px",
        boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
          boxShadow: "0 6px 16px rgba(79, 70, 229, 0.35)",
          transform: "translateY(-1px)",
        }
      },
    },
  },
  RESUME_BUTTON_CONFIG: {
    buttonProps: {
      children: "Resume Aptitude Test",
      className: "w-full transition-all duration-200 border-0 cursor-pointer",
      sx: {
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        color: "#fff",
        textTransform: "none",
        fontSize: "0.85rem",
        borderRadius: "10px",
        fontWeight: "600",
        padding: "12px 16px",
        boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
          boxShadow: "0 6px 16px rgba(79, 70, 229, 0.35)",
          transform: "translateY(-1px)",
        }
      },
    },
  },
  ACTUAL_APTITUDE_TEST_BUTTON_CONFIG: {
    buttonProps: {
      children: "Aptitude Test",
      className: "w-full transition-all duration-200 border-0 cursor-pointer",
      sx: {
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        color: "#fff",
        textTransform: "none",
        fontSize: "0.85rem",
        borderRadius: "10px",
        fontWeight: "600",
        padding: "12px 16px",
        boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
          boxShadow: "0 6px 16px rgba(79, 70, 229, 0.35)",
          transform: "translateY(-1px)",
        }
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
