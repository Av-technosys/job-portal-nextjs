import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  CommonObjectType,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
  TypographyVariantEnum,
} from "@/types";
import { JOB_LISTING_DROPDOWN_SORT_OPTIONS } from "./listJob";

// Admin Assessment Question Card Config
export const ADMIN_QUESTION_CARD_CONFIG = {
  QUESTION_ID: (question: CommonObjectType) =>
    ({
      typographyProps: {
        children: question?.id,
        variant: TypographyVariantEnum.CAPTION,
      },
      // fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.small,
      fontColor: TypographyFontColor.black,
      backgroundColor: "#4CAF50",
      padding: "4px 12px",
      borderRadius: "6px",
    } as TypographyProps),
  QUESTION: (question: CommonObjectType) =>
    ({
      typographyProps: {
        children: question?.question,
        variant: TypographyVariantEnum.CAPTION,
      },
      // fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.large,
      fontColor: TypographyFontColor.black,
      backgroundColor: "#4CAF50",
      padding: "4px 12px",
      borderRadius: "6px",
    } as TypographyProps),
  QUESTION_ID_TEXT: {
    typographyProps: {
      children: "QUESTION ID : ",
      variant: TypographyVariantEnum.H6,
    },
    fontColor: TypographyFontColor.black2,
    fontSize: TypographyFontSize.small,
  },
  QUESTION_TEXT: (index: number) => ({
    typographyProps: {
      children: `Q.${index + 1}`,
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.large,
  }),

  OPTION: (option: string, index: number, selected: boolean) => ({
    value: option,
    label: `Option ${index + 1}`,
    checked: selected,
    formControlLabelProps: {
      label: `Option ${index + 1}`,
      sx: { width: "100%", margin: 0 },
    },
    radioProps: {
      value: option,
      disabled: !selected,
    },
    styles: {
      width: "100%",
      border: "1px solid #e0e0e0",
      borderRadius: "4px",
      padding: "12px",
      marginBottom: "10px",
      backgroundColor: selected ? "#b9f6ca" : "#fff",
    },
  }),
  JOB_LISTING_SORT_DROPDOWN: {
    selectProps: {
      name: "sortby",
    },
    formControlProps: {
      sx: {
        minWidth: 150,
      },
    },
    inputLabelProps: {
      children: "Sort By ",
      shrink: true,
    },
    options: JOB_LISTING_DROPDOWN_SORT_OPTIONS,
  },
  ANSWER: (answer: string) =>
    ({
      typographyProps: {
        children: `Answer: ${answer}`,
        variant: TypographyVariantEnum.BODY2,
      },
      fontWeight: TypographyFontWeight.bold,
      fontSize: TypographyFontSize.small,
      fontColor: TypographyFontColor.green,
    } as TypographyProps),

  MENU_ITEMS: [
    { key: "edit", label: "Edit" },
    { key: "delete", label: "Delete" },
  ],

  ADD_QUESTION_BUTTON: {
    buttonProps: {
      children: "Add Question",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
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

  SEARCHBAR_TEXT: () => ({
    typographyProps: {
      children: "Search Question by id",
      variant: TypographyVariantEnum.BODY2,
    },
    fontSize: TypographyFontSize.small,
  }),
};
