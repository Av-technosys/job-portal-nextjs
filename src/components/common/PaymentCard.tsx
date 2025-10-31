import { Button, Modal, Stack, Typography } from "@/components";
import { PAYMENT_CARD_TEXT_CONFIG, SECOND_MODAL_STYLES } from "@/constants";

function PaymentCard({
  open,
  handleClose,
  setPaymentModalOpen,
}: {
  open: boolean;
  handleClose: () => void;
  setPaymentModalOpen: (open: boolean) => void;
}) {
  const {
    DESCRIPTION_TEXT,
    DESCRIPTION_TITLE,
    BUTTON_PROPS,
    CANCEL_PAYMENT_PROPS,
  } = PAYMENT_CARD_TEXT_CONFIG;
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Stack stackProps={{ sx: SECOND_MODAL_STYLES }}>
          <Stack
            stackProps={{
              direction: "column",
              alignItems: "center",
              justifyItems: "center",
              gap: { xs: 1, sm: 2 },
              margin: { xs: "15px 0", sm: "30px 0" },
              sx: {
                background: "white",
                padding: { xs: "15px", sm: "20px" },
                borderRadius: "10px",
              },
            }}
          >
            <Typography {...DESCRIPTION_TITLE} />
            <Typography {...DESCRIPTION_TEXT} />
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                justifyItems: "center",
                spacing: 2,
              }}
            >
              <Button {...CANCEL_PAYMENT_PROPS} onClick={handleClose} />
              <Button
                {...BUTTON_PROPS}
                onClick={() => setPaymentModalOpen(true)}
              />
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}

export default PaymentCard;
