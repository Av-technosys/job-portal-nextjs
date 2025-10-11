import {
  TypographyVariantEnum,
  StackProps,
  ButtonVariantEnum,
  ElementRenderType,
  ButtonSizeEnum,
} from "@/types";

// Typography Configurations
export const SIDEBAR_TITLE_CONFIG = ({
  text,
}: {
  text: ElementRenderType;
}) => ({
  typographyProps: {
    children: text,
    variant: TypographyVariantEnum.H5,
    sx: { fontWeight: "bold", mb: 1 },
  },
});

export const SIDEBAR_CONTAINER_STYLE = {
  stackProps: {
    sx: {
      width: 300,
      padding: 2,
      bgcolor: "#f0f8ff",
      borderRadius: 2,
    },
  },
} as StackProps;

// Input Configurations
export const SEARCH_INPUT_CONFIG = {
  textFieldProps: {
    fullWidth: true,
    placeholder: "Job title or company",
    size: "small",
    sx: {
      bgcolor: "white",
      borderRadius: 1,
    },
  },
};

// Location Select Configurations
export const LOCATION_SELECT_CONFIG = {
  formControlProps: {
    fullWidth: true,
    size: "medium" as const,
    sx: {
      bgcolor: "white",
      borderRadius: 1,
    },
  },
  inputLabelProps: {
    children: "Choose city",
  },
  menuItems: [
    { value: "Banglore", label: "Banglore" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
  ],
};

// Checkbox Configurations
export const CATEGORY_CHECKBOX_CONFIG = {
  options: [
    "Commerce",
    "Telecommunications",
    "Hotels and Tourism",
    "Education",
    "Financial Services",
    "software-engineer",
  ],
  buttonProps: {
    children: "Show More",
    variant: ButtonVariantEnum.CONTAINED,
    size: ButtonSizeEnum.SMALL,
    sx: { mt: 1, width: "full" },
  },
};

export const JOB_TYPE_CHECKBOX_CONFIG = {
  options: ["Full Time", "Part Time", "Freelance", "Seasonal", "Fixed-Price"],
};

export const EXPERIENCE_LEVEL_CHECKBOX_CONFIG = {
  options: ["No-experience", "Fresher", "Intermediate", "Expert"],
};

export const DATE_POSTED_CHECKBOX_CONFIG = {
  options: ["All", "Last Hour", "Last 24 Hours", "Last 7 Days", "Last 30 Days"],
};

// Slider Configurations
export const SALARY_SLIDER_CONFIG = {
  sliderProps: {
    defaultValue: 50,
    min: 0,
    max: 100,
    marks: true,
    valueLabelDisplay: "auto",
    sx: { mt: 2 },
  },
  label: "Salary: ₹0 - ₹9999",
  buttonProps: {
    children: "Apply",
    variant: ButtonVariantEnum.CONTAINED,
    size: ButtonSizeEnum.SMALL,
    sx: { ml: 10 },
  },
};

// Tags Configurations
export const TAGS_CONFIG = {
  tags: ["engineering", "design", "ui/ux", "marketing", "management", "soft"],
};

// Sidebar Renderer
export const SIDEBAR_SECTIONS = {
  SEARCH: { title: "Search by Job Title" },
  LOCATION: { title: "Location" },
  CATEGORY: { title: "Category" },
  JOB_TYPE: { title: "Job Type" },
  EXPERIENCE: {
    title: "Experience Level",
  },
  DATE_POSTED: { title: "Date Posted" },
  SALARY: { title: "Salary" },
  TAGS: { title: "Tags" },
};

export const FILTER_KEYS = {
  SEARCH: "SEARCH",
  LOCATION: "LOCATION",
  CATEGORY: "CATEGORY",
  JOB_TYPE: "JOB_TYPE",
  EXPERIENCE: "EXPERIENCE",
  DATE_POSTED: "DATE_POSTED",
  SALARY: "SALARY",
  TAGS: "TAGS",
};
