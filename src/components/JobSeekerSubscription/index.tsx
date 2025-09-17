import { free_assessment, paid_assessment } from "@/assets";
import {
  Typography,
  Stack,
  PaymentModal,
  SubscriptionCard,
  PaymentCard,
} from "@/components";
import {
  SUBSCRIPTION_PAGE_CONFIG,
  TEST_TYPES,
  SUBSCRIPTION_CONFIG,
  DASHBOARD_URL,
} from "@/constants";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Subscription() {
  const [open, setOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const router = useRouter();

  const handlePaymentModalOpen = () => {
    setOpen(false);
    setPaymentModalOpen(true);
  };

  function handlePaymentComplete() {
    setOpen(false);
    setPaymentModalOpen(false);
    router.push(DASHBOARD_URL);
  }

  const {
    BUTTON_CONFIG,
    HEADER_TEXT,
    HEADER_SUB_TEXT,
    ACTUAL_APTITUDE_TEST_BUTTON_CONFIG,
  } = SUBSCRIPTION_PAGE_CONFIG;

  return (
    <>
      <Stack stackProps={{ direction: "row", justifyContent: "center" }}>
        <Stack
          stackProps={{
            direction: "column",
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography {...HEADER_TEXT} />
          <Typography {...HEADER_SUB_TEXT} />
          <Stack
            stackProps={{
              direction: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 10,
              marginTop: "50px",
            }}
          >
            <SubscriptionCard
              avatarUrl={free_assessment?.src}
              onButtonClick={() => router.push("/dashboard/assessment/5")} // yeh 5 test id hai jo change hogi baad me...
              buttonConfig={BUTTON_CONFIG}
            />
            <SubscriptionCard
              avatarUrl={paid_assessment?.src}
              onButtonClick={() => setOpen(true)}
              buttonConfig={ACTUAL_APTITUDE_TEST_BUTTON_CONFIG}
            />
          </Stack>
        </Stack>
      </Stack>
      <PaymentCard
        open={open}
        handleClose={() => setOpen(false)}
        setPaymentModalOpen={handlePaymentModalOpen}
        features={TEST_TYPES}
      />
      <PaymentModal
        open={paymentModalOpen}
        {...SUBSCRIPTION_CONFIG.JOB_SEEKER_ASSESSMENT}
        handlePaymentComplete={handlePaymentComplete}
      />
    </>
  );
}
