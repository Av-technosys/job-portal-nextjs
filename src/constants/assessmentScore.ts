import { getDefaultWorkExperienceData } from "@/helper";
import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  FormikFieldsEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";

export const ASSESSMENT_SCORE_PAGE_CONFIG = {
  SCORE_TEXT: () => {
    return {
      typographyProps: {
        children: " Your Score ",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  SCORE_VALUE_1: (marks) => {
    return {
      typographyProps: {
        children: `${marks}`,
        variant: TypographyVariantEnum.H5,
      },
      fontSize: TypographyFontSize.largeTitle,
      fontColor: TypographyFontColor.white,
      fontWeight: TypographyFontWeight.extrabold,
    };
  },
  SCORE_VALUE_2: () => {
    return {
      typographyProps: {
        children: "  of 100 ",
        variant: TypographyVariantEnum.H6,
      },
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.white,
      fontWeight: TypographyFontWeight.extrabold,
    };
  },
  SCORE_VALUE_3: (section: CommonObjectType) => {
    return {
      typographyProps: {
        children: section?.value,
        variant: TypographyVariantEnum.CAPTION,
      },
    } as TypographyProps;
  },
  ASSESSMENT_TOTAL_QUESTIONS: () => {
    return {
      typographyProps: {
        children: "Total no. of Questions",
        variant: TypographyVariantEnum.CAPTION,
      },
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.blue,
      fontWeight: TypographyFontWeight.extrabold,
    };
  },

  ASSESSMENT_TOTAL_ATTEMPTED_QUESTIONS: () => {
    return {
      typographyProps: {
        children: "Total Attempted Questions",
        variant: TypographyVariantEnum.CAPTION,
      },
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.green,
      fontWeight: TypographyFontWeight.extrabold,
    };
  },
  ASSESSMENT_TOTAL_REMAINING_QUESTIONS: () => {
    return {
      typographyProps: {
        children: "Remaining Questions",
        variant: TypographyVariantEnum.CAPTION,
      },
      fontSize: TypographyFontSize.extralarge,
      fontColor: TypographyFontColor.red,
      fontWeight: TypographyFontWeight.extrabold,
    };
  },
  ASSESSMENT_SPREAD_TEXT: () => {
    return {
      typographyProps: {
        children: " Assessment Spread ",
        variant: TypographyVariantEnum.CAPTION,
      },
    };
  },
  CONGRATS_TEXT: () => {
    return {
      typographyProps: {
        children:
          " Congratulations, your score exceeds 65% and you are cleared to move forward with the next phase of the process. ",
        variant: TypographyVariantEnum.CAPTION,
      },
      fontWeight: TypographyFontWeight.extrabold,
    };
  },
  SUMMERY: (section: CommonObjectType) => {
    return {
      typographyProps: {
        children: section?.summery,
        variant: TypographyVariantEnum.CAPTION,
      },
    } as TypographyProps;
  },
  ASSESSMENT_PAID: {
    typographyProps: {
      children: "Paid Assessment",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.black16,
  },
  ASSESSMENT_FREE: {
    typographyProps: {
      children: "Free Assessment",
      variant: TypographyVariantEnum.H6,
    },
    fontWeight: TypographyFontWeight.semibold,
    fontSize: TypographyFontSize.extralarge,
    fontColor: TypographyFontColor.black16,
  },
  RETAKE_TEST: {
    buttonProps: {
      children: "Retake Test",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },

  CONTINUE_BUTTON: {
    buttonProps: {
      children: "Continue",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.SUCCESS,
      size: ButtonSizeEnum.LARGE,
    },
  },
  ASSESSMENT_ADD_BUTTON: {
    buttonProps: {
      children: "+ Add",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
      type: "submit",
    },
  },
  ASSESSMENT_EDIT_BUTTON: {
    buttonProps: {
      children: "Edit",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
    },
  },
  ASSESSMENT_EDITSAVE_BUTTON: {
    buttonProps: {
      children: "Save",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
      sx: {
        marginTop: "2rem",
      },
    },
  },

  ASSESSMENT_VQ_BUTTON: {
    buttonProps: {
      children: "View Question",
      variant: ButtonVariantEnum.TEXT,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.SMALL,
    },
  },
  ASSESSMENT_DELETE_BUTTON: {
    buttonProps: {
      children: "Delete",
      variant: ButtonVariantEnum.OUTLINED,
      color: ButtonColorEnum.ERROR,
      size: ButtonSizeEnum.SMALL,
    },
  },
};

export const FIELD_WIDTHS = {
  EXTRA_LARGE: { width: "100%", flexBasis: "100%" },
  LARGE: { width: "100%", flexBasis: "100%" },
  MEDIUM: { width: "100%", flexBasis: "100%" },
  CUSTOM_HEADING: { width: 1, marginTop: "5px" },
};

const HEADING_CONFIG = {
  variant: TypographyVariantEnum.H6,
  sx: FIELD_WIDTHS.CUSTOM_HEADING,
};

export const ASSESSEMENT_EDIT_CONFIG = {
  ASSESSEMENT_EDIT_FORM_CONFIG: {
    ASSESSEMENT_EDIT_ARRAY_FIELD: {
      fieldType: FormikFieldsEnum.ARRAY_FIELD,
      childFieldArray: [
        {
          // fieldType: FormikFieldsEnum.DATE_PICKER,
          inputProps: {
            label: "",
            name: "exam_name",
          },
          inputLabelProps: {
            children: "Exam Name",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.EXTRA_LARGE,
          },
        },
        {
          // fieldType: FormikFieldsEnum.DROPDOWN,
          inputProps: {
            label: "",
            name: "section_name",
          },
          inputLabelProps: {
            children: "Enter Section Name",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.EXTRA_LARGE,
          },
        },
        {
          // fieldType: FormikFieldsEnum.TYPOGRAPHY,
          inputProps: {
            label: "",
            name: "duration_minutes",
            type: "number",
          },
          inputLabelProps: {
            children: "Set Exam Time",
            shrink: true,
          },
          formControlProps: {
            sx: FIELD_WIDTHS.EXTRA_LARGE,
          },
        },
        {
          fieldType: FormikFieldsEnum.TYPOGRAPHY,
          typographyProps: {
            children: "Total Number Of Questions",
            ...HEADING_CONFIG,
          },
          fontWeight: TypographyFontWeight.normal,
          fontSize: TypographyFontSize.large,
          fontColor: TypographyFontColor.black,
        },
        {
          inputProps: {
            label: "Easy",
            name: "easy_question_count",
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
          inputProps: {
            label: "Moderate",
            name: "medium_question_count",
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
          inputProps: {
            label: "Hard",
            name: "difficult_question_count",
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
            children: "Marks Score",
            ...HEADING_CONFIG,
          },
          fontWeight: TypographyFontWeight.normal,
          fontSize: TypographyFontSize.large,
          fontColor: TypographyFontColor.black,
        },
        {
          inputProps: {
            label: "Attempted",
            name: "marks_correct",
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
          inputProps: {
            label: "Incorrect",
            name: "marks_incorrect",
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
          inputProps: {
            label: "Not Attempted",
            name: "marks_unattempted",
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
};
