import { ModalProps } from "@/types";
import { Modal as MuiModal } from "@mui/material";
import { forwardRef, ReactNode } from "react";

const ModalChildrenComponent = forwardRef<
  HTMLDivElement,
  { children: ReactNode }
>(({ children }, ref) => {
  return (
    <div ref={ref} tabIndex={-1}>
      {children}
    </div>
  );
});

ModalChildrenComponent.displayName = "ModalChildrenComponent";

function Modal(props: ModalProps) {
  const { children, ...rest } = props;

  return (
    <MuiModal {...rest}>
      <ModalChildrenComponent>{children}</ModalChildrenComponent>
    </MuiModal>
  );
}

export default Modal;
