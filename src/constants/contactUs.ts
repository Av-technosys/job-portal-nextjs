import {
  ButtonColorEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyVariantEnum,
} from "@/types";

export const CONTACT_US_PAGE_CONFIG = {
  TITLE_TEXT: {
    typographyProps: {
      children: "Contact Us",
      variant: TypographyVariantEnum.H5,
    },
    fontSize: TypographyFontSize.largeTitle,
    fontWeight: TypographyFontWeight.bold,
  },
  SUB_TITLE_TEXT: {
    typographyProps: {
      children: "Any question or remarks? Just write us a message!",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.small,
    fontColor: TypographyFontColor.grey,
  },
  FIRST_NAME_FIELD: {
    inputProps: {
      label: "First Name",
      require: true,
      name: "first name",
    },
  },
  LAST_NAME_FIELD: {
    inputProps: {
      label: "Last Name",
      require: true,
      name: "last name",
    },
  },
  EMAIL_FIELD: {
    inputProps: {
      label: "Email",
      require: true,
      name: "email",
    },
  },
  CONTACT_FIELD: {
    inputProps: {
      label: "Contact Number",
      require: true,
      type: "number",
      name: "contact number",
    },
  },
  SUBJECT_FIELD: {
    inputProps: {
      label: "Subject",
      require: true,
      name: "subject",
    },
  },
  MESSAGE_FIELD: {
    inputProps: {
      label: "Message",
      require: true,
      name: "message",
    },
  },
  SEND_BUTTON: {
    buttonProps: {
      children: "Send Message",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
    },
  },
};
export const LEFT_SECTION_CONFIG = {
  HEADER_TEXT: {
    typographyProps: {
      children: "Contact Information",
      variant: TypographyVariantEnum.H5,
    },
    fontSize: TypographyFontSize.large,
    fontColor: TypographyFontColor.white,
  },
  SUB_TITLE_TEXT2: {
    typographyProps: {
      children: "Say something to start a live chat!",
      variant: TypographyVariantEnum.H6,
    },
    fontSize: TypographyFontSize.small,
    fontColor: TypographyFontColor.white,
  },
  LOCATION: {
    typographyProps: {
      children: "1234 Ohio Street, South Gate London 416 425",
      variant: TypographyVariantEnum.BODY2,
    },
    fontColor: TypographyFontColor.white,
  },
  EMAIL: {
    typographyProps: {
      children: "ourstudio@hello.com",
      variant: TypographyVariantEnum.BODY2,
    },
    fontColor: TypographyFontColor.white,
  },
  CONTACT: {
    typographyProps: {
      children: "+1 234-567-8901",
      variant: TypographyVariantEnum.BODY2,
    },
    fontColor: TypographyFontColor.white,
  },
};
