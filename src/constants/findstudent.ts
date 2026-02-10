import { getPluralForm } from "@/helper";
import { TypographyVariantEnum } from "@/types";
import { STUDENT_LISTING_DROPDOWN_SORT_OPTIONS } from "./common";

export const FIND_STUDENT_PAGE_CONFIG = {
  TITLE_COUNT: (totalLength: number) => {
    return {
      typographyProps: {
        children: totalLength,
        variant: TypographyVariantEnum.H5,
      },
    };
  },
  TITLE_HEADER: (totalLength: number) => {
    return {
      typographyProps: {
        children: `Total Admin${getPluralForm({ totalLength })} `,
        variant: TypographyVariantEnum.BODY2,
      },
    };
  },
  STUDENT_LISTING_SORT_DROPDOWN: {
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
    options: STUDENT_LISTING_DROPDOWN_SORT_OPTIONS,
  },
  SUCCESS: {
    message: "User deleted successfully",
  },
  SUCCESS_SUBJECT: {
    message: "Subject deleted successfully",
  },
};
