import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";

export const EXCEL_UPLOAD_PAGE_CONFIG = {
  HEADER_TEXT: {
    typographyProps: {
      children: "Excel File Upload",
      variant: TypographyVariantEnum.H5,
    },
    fontWeight: TypographyFontWeight.bold,
    fontSize: TypographyFontSize.extraTitle,
    fontColor: TypographyFontColor.black15,
  },
  SUMMERY_TEXT: {
    typographyProps: {
      children: "Choose Excel File (.xlsx or .xls)",
      variant: TypographyVariantEnum.CAPTION,
    },
  },
  BACK_BUTTON: {
    buttonProps: {
      children: "Back",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.ERROR,
      size: ButtonSizeEnum.LARGE,
    },
  },
  SAMPLE_EXCEL_BUTTON: {
    buttonProps: {
      children: "Sample Download",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },
  SUBMIT_BUTTON: {
    buttonProps: {
      children: "Send File",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.SUCCESS,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
    },
  },
};
