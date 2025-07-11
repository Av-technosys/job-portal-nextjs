import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  TypographyVariantEnum,
} from "@/types";


export const SUCCESS_BOX_CONFIG = {
  HEADING_TEXT: {
    typographyProps: {
      children: "🎉Congratulations, Your job is successfully posted!",
      variant: TypographyVariantEnum.BODY2,
      className: "text-center mb-3.5",
    },
  },

  TITLE_TEXT: {
    typographyProps: {
      children: "Your job listing is now live and ready to attract top talent!",
      variant: TypographyVariantEnum.CAPTION,
      color: "text.secondary",
      className: "text-center mb-3.5",
    },
  },
  VIEW_JOB_BUTTON: {
    buttonProps: {
      children: "View Jobs ->",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
      sx: {
        width: "150px",
        mx : "auto",
        mt : "15px"
      },
    },
  },
};
