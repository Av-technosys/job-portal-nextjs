import { CheckCircleSharpIcon } from "@/assets";
import { Button, Modal, Stack, Typography } from "@/components";
import { PAYMENT_CARD_TEXT_CONFIG, MODAL_STYLES } from "@/constants";
import { colorStyles } from "@/styles";

function PaymentCard({
  open,
  handleClose,
  setPaymentModalOpen,
  features,
}: {
  open: boolean;
  handleClose: () => void;
  setPaymentModalOpen: (open: boolean) => void;
  features: string[];
}) {
  const { HEADER, AMOUNT, FEATURES, BUTTON_PROPS } = PAYMENT_CARD_TEXT_CONFIG;
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Stack stackProps={{ sx: MODAL_STYLES }}>
          <Typography {...HEADER} />
          <Typography {...AMOUNT} />
          <Stack
            stackProps={{
              direction: "column",
              gap: { xs: 0.5, sm: 1 },
              margin: { xs: "15px 0", sm: "30px 0" },
              overflow: "hidden",
              sx: {
                background: "white",
                padding: { xs: "15px", sm: "20px" },
                borderRadius: "10px",
              },
            }}
          >
            {features.map((feature) => (
              <Stack
                stackProps={{ direction: "row", gap: 1, marginTop: "20px" }}
                key={`paymentCard-${feature}`}
              >
                <CheckCircleSharpIcon
                  sx={{
                    color: colorStyles.blue,
                    fontSize: "medium",
                  }}
                />
                <Typography {...FEATURES(feature)} />
              </Stack>
            ))}
            <Button
              {...BUTTON_PROPS}
              onClick={() => setPaymentModalOpen(true)}
            />
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}

export default PaymentCard;
