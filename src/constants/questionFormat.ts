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
  QUESTION_FORM_CONFIG: {
    QUESTION_ARRAY_FIELD: {
      fieldType: FormikFieldsEnum.ARRAY_FIELD,
      childFieldArray: [
        {
          // fieldType: FormikFieldsEnum.DATE_PICKER,
          inputProps: {
            label: "",
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
        {
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
      ],
      arrayFieldName: "work_experiences",
      arrayFormItemParentClassName: "items-baseline",
      initialValue: () => getDefaultWorkExperienceData(),
      hideFirstRemoveButton: true,
      removeExtraProps: {
        fieldType: FormikFieldsEnum.TYPOGRAPHY,
        typographyProps: {
          children: "",
          sx: { width: "0%", flexBasis: "25%" },
        },
      },
      removeButtonProps: {
        buttonProps: {
          children: "Remove",
          variant: ButtonVariantEnum.OUTLINED,
          color: ButtonColorEnum.ERROR,
          size: ButtonSizeEnum.SMALL,
        },
        formControlProps: {
          sx: FIELD_WIDTHS.LARGE,
        },
      },
    },
  },
  QUESTION_FORM_OPTIONS: {
    QUESTION_ARRAY_FIELD: {
      fieldType: FormikFieldsEnum.ARRAY_FIELD,
      childFieldArray: [
        {
          // fieldType: FormikFieldsEnum.DATE_PICKER,
          inputProps: {
            label: "Enter First Option",
            name: "option_1",
            type: "number",
          },
          inputLabelProps: {
            children: "",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.EXTRA_LARGE,
          },
        },
        {
          // fieldType: FormikFieldsEnum.DATE_PICKER,
          inputProps: {
            label: "Enter Second Option",
            name: "option_2",
            type: "number",
          },
          inputLabelProps: {
            children: "",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.EXTRA_LARGE,
          },
        },
        {
          // fieldType: FormikFieldsEnum.DATE_PICKER,
          inputProps: {
            label: "Enter Third Option",
            name: "option_3",
            type: "number",
          },
          inputLabelProps: {
            children: "",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.EXTRA_LARGE,
          },
        },
        {
          // fieldType: FormikFieldsEnum.DATE_PICKER,
          inputProps: {
            label: "Enter Fourth Option",
            name: "option_4",
            type: "number",
          },
          inputLabelProps: {
            children: "",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.EXTRA_LARGE,
          },
        },
        {
          fieldType: FormikFieldsEnum.TYPOGRAPHY,
          typographyProps: {
            children: "Correct Option",
            ...HEADING_CONFIG,
          },
          fontWeight: TypographyFontWeight.normal,
          fontSize: TypographyFontSize.extralarge,
          fontColor: TypographyFontColor.black,
        },
        {
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
      ],
      arrayFieldName: "work_experiences",
      arrayFormItemParentClassName: "items-baseline",
      initialValue: () => getDefaultWorkExperienceData(),
      hideFirstRemoveButton: true,
      removeExtraProps: {
        fieldType: FormikFieldsEnum.TYPOGRAPHY,
        typographyProps: {
          children: "",
          sx: { width: "0%", flexBasis: "25%" },
        },
      },
      removeButtonProps: {
        buttonProps: {
          children: "Remove",
          variant: ButtonVariantEnum.OUTLINED,
          color: ButtonColorEnum.ERROR,
          size: ButtonSizeEnum.SMALL,
        },
        formControlProps: {
          sx: FIELD_WIDTHS.LARGE,
        },
      },
    },
  },
  QUESTION_SAVEMORE_BUTTON: {
    buttonProps: {
      children: "Save & Add more",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
      sx: {
        marginLeft: "auto",
      },
    },
  },
  QUESTION_SAVE_BUTTON: {
    buttonProps: {
      children: "Save",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
      sx: {
        marginLeft: "auto",
      },
    },
  },
  OPTION: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Options",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.black,
  },
  CORRECT_OPTION: {
    fieldType: FormikFieldsEnum.TYPOGRAPHY,
    typographyProps: {
      children: "Correct Option",
      ...HEADING_CONFIG,
    },
    fontWeight: TypographyFontWeight.normal,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.black,
  },
  // QUESTION_OPTIONS_FIELD: {
  //   fieldType: FormikFieldsEnum.DROPDOWN,
  //   options: QUESTION_OPTIONS,
  //   selectProps: {
  //     label: "Options",
  //     name: "correct_option",
  //   },
  //   inputLabelProps: {
  //     children: "Options",
  //   },
  //   formControlProps: {
  //     sx: FIELD_WIDTHS.EXTRA_LARGE,
  //   },
  // },
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
  NOTIFICATION_CONFIG: {
    SUCCESS: {
      message: "Question Updated Successfully",
    } as ShowNotificationProps,
  },
};
