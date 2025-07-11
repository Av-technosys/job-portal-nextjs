import { useState } from "react";
import { Stack, Typography, Divider, Button } from "@/components";
import { PLAN_CARD_TEXT } from "@/constants";
import PaymentModal from "./PaymentModal";
import { colorStyles } from "@/styles";
import { CheckCircleSharpIcon } from "@/assets";

function PlanCard({
  title,
  subTitle,
  price,
  features,
  planConfig,
  handlePaymentComplete,
}: {
  title: string;
  subTitle: string;
  price: number;
  features: string[];
  handlePaymentComplete: VoidFunction;
  planConfig: {
    amount: number;
    planType: string;
    planId: string;
  };
}) {
  const { TITLE, SUB_TITLE, PRICE, MONTH, FEATURES, BUTTON } = PLAN_CARD_TEXT;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Stack
        stackProps={{
          direction: "column",
          gap: 3,
          width: { xs: "100%", md: "30%" },
          height: "100%",
          borderRadius: "7px",
          border: `1px solid ${colorStyles.borderGreyColor}`,
          sx: {
            ":hover": {
              border: `1px solid ${colorStyles.cardHoverBorderColor}`,
              ".MuiDivider-root": {
                border: `1px solid ${colorStyles.cardHoverBorderColor}`,
              },
            },
          },
        }}
      >
        <Stack stackProps={{ direction: "column", gap: 1, p: 3 }}>
          <Typography {...TITLE(title)} />
          <Typography {...SUB_TITLE(subTitle)} />
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              gap: 1,
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <Typography {...PRICE(price)} />
            <Typography {...MONTH} />
          </Stack>
        </Stack>
        <Divider />
        <Stack stackProps={{ direction: "column", gap: 3, p: 3 }}>
          {features.map((feature) => (
            <Stack
              stackProps={{ direction: "row", gap: 1 }}
              key={`planCard-${feature}`}
            >
              <CheckCircleSharpIcon
                sx={{
                  color: colorStyles.blue,
                  fontSize: "medium",
                }}
              />
              <Typography key={feature} {...FEATURES(feature)} />
            </Stack>
          ))}
          <Button {...BUTTON} onClick={() => setOpen(true)} />
          <PaymentModal
            open={open}
            {...planConfig}
            handleClose={() => setOpen(false)}
            handlePaymentComplete={() => {
              setOpen(false);
              handlePaymentComplete();
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default PlanCard;
