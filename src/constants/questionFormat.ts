import { getDefaultWorkExperienceData } from "@/helper";
import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  FormikFieldsEnum,
  ShowNotificationProps,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyMargin,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";
import { CITY_OPTIONS, QUESTION_OPTIONS } from "./common";

export const FIELD_WIDTHS = {
  EXTRA_LARGE: { width: "100%", flexBasis: "100%" },
  LARGE: { width: "100%", flexBasis: "45%" },
  MEDIUM: { width: "100%", flexBasis: "30%" },
  CUSTOM_HEADING: { width: 1 },
};

const HEADING_CONFIG = {
  variant: TypographyVariantEnum.H6,
  sx: FIELD_WIDTHS.CUSTOM_HEADING,
};

export const QUESTION_CONFIG = {
  FORM_CONFIG: {
    QUESTION_TEXT_FIELD: {
      inputProps: {
        name: "question_text",
      },
      inputLabelProps: {
        children: "Question",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.EXTRA_LARGE,
      },
    },
    QUESTION_PARAGRAPH_FIELD: {
      inputProps: {
        name: "question_paragraph",
        placeholder: "Enter Your Paragraph Here",
        multiline: true,
        minRows: 3,
        maxRows: 3,
      },
      inputLabelProps: {
        children: "Paragraph",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.EXTRA_LARGE,
      },
    },
    QUESTION_PARAGRAPH_HEADING: {
      fieldType: FormikFieldsEnum.TYPOGRAPHY,
      typographyProps: {
        children: "Word Limit : 200 to 500",
        ...HEADING_CONFIG,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.extraSmall,
      fontColor: TypographyFontColor.black,
    },
    QUESTION_OPTIONS_HEADING: {
      fieldType: FormikFieldsEnum.TYPOGRAPHY,
      typographyProps: {
        children: "Options",
        ...HEADING_CONFIG,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.black,
    },
    OPTION_1_FIELD: {
      inputProps: {
        name: "option_1",
      },
      inputLabelProps: {
        children: "Enter First Option",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.EXTRA_LARGE,
      },
    },
    OPTION_2_FIELD: {
      inputProps: {
        name: "option_2",
      },
      inputLabelProps: {
        children: "Enter Second Option",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.EXTRA_LARGE,
      },
    },
    OPTION_3_FIELD: {
      inputProps: {
        name: "option_3",
      },
      inputLabelProps: {
        children: "Enter Third Option",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.EXTRA_LARGE,
      },
    },
    OPTION_4_FIELD: {
      inputProps: {
        name: "option_4",
      },
      inputLabelProps: {
        children: "Enter Fourth Option",
        shrink: true,
      },
      formControlProps: {
        sx: FIELD_WIDTHS.EXTRA_LARGE,
      },
    },
    CORRECT_OPTION_HEADING: {
      fieldType: FormikFieldsEnum.TYPOGRAPHY,
      typographyProps: {
        children: "Correct Option",
        ...HEADING_CONFIG,
      },
      fontWeight: TypographyFontWeight.normal,
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.black,
    },
    CORRECT_OPTION_FIELD: {
      fieldType: FormikFieldsEnum.DROPDOWN,
      options: QUESTION_OPTIONS,
      selectProps: {
        label: "Options",
        name: "correct_option",
      },
      inputLabelProps: {
        children: "Options",
      },
      formControlProps: {
        sx: FIELD_WIDTHS.EXTRA_LARGE,
      },
    },
    SAVE_BUTTON: {
      buttonProps: {
        children: "Save",
        variant: ButtonVariantEnum.CONTAINED,
        color: ButtonColorEnum.PRIMARY,
        size: ButtonSizeEnum.LARGE,
        type: "submit",
        sx: {
          marginLeft: "auto",
          marginTop: "2rem",
        },
      },
    },
  },
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Question Updated Successfully",
    } as ShowNotificationProps,
  },
};
