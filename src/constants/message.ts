import { ButtonColorEnum, ButtonSizeEnum, ButtonVariantEnum } from "@/types";

export const MESSAGING_PAGE_CONFIG = {
  MODAL_STYLES: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflow: "auto",
  },
  MESSAGE_TEXT_INPUT_FIELD: {
    inputProps: {
      label: "Message",
      type: "text",
      name: "message",
      placeholder: "Type your message here...",
      minRows: 3,
      maxRows: 6,
      multiline: true,
    },
  },
  SEND_BUTTON: {
    buttonProps: {
      children: "Send",
      variant: ButtonVariantEnum.CONTAINED,
      color: ButtonColorEnum.PRIMARY,
      size: ButtonSizeEnum.LARGE,
      type: "submit",
    },
  },
};
