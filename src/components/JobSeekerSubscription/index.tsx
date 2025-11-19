import { free_assessment, paid_assessment, resume_assessment } from "@/assets";
import {
  Typography,
  Stack,
  PaymentModal,
  SubscriptionCard,
  PaymentCard,
} from "@/components";
import {
  SUBSCRIPTION_PAGE_CONFIG,
  SUBSCRIPTION_CONFIG,
  DASHBOARD_URL,
} from "@/constants";
import { useGetResumeTestDataInfo } from "@/services/useGetResumeTestDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader} from "../common";

export default function Subscription() {
  const [open, setOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isTestEnd, setIsTestEnd] = useState<null | boolean>(null);
  const [testId, setTestId] = useState<null | number | string>(null);

  const router = useRouter();
  const resumeTestDetails = useGetResumeTestDataInfo();

  // ⭐ IMPORTANT: This function MUST be above loading return
  function handlePaymentComplete() {
    setOpen(false);
    setPaymentModalOpen(false);
    router.push(DASHBOARD_URL);
  }

  // Set values only after data is fully loaded
  useEffect(() => {
    if (resumeTestDetails.data?.data?.[0]) {
      setIsTestEnd(resumeTestDetails.data.data[0].is_test_end);
      setTestId(resumeTestDetails.data.data[0].id);
    }
  }, [resumeTestDetails.data]);

  // ⭐ Loading UI to prevent jumping between 2 → 3 cards
  if (resumeTestDetails.isLoading || isTestEnd === null) {
    return (
     <Loader  
       loaderProps={{
          open: true,
        }} />
    );
  }

  const {
    BUTTON_CONFIG,
    RESUME_BUTTON_CONFIG,
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
              gap: 5,
              marginTop: "50px",
            }}
          >
            {/* FREE TEST CARD */}
            <SubscriptionCard
              avatarUrl={free_assessment?.src}
              onButtonClick={() =>
                router.push("/dashboard/assessment/free-test")
              }
              buttonConfig={BUTTON_CONFIG}
            />

            {/* CONDITIONAL RESUME TEST CARD */}
            {isTestEnd === false && (
              <SubscriptionCard
                avatarUrl={resume_assessment?.src}
                onButtonClick={() =>
                  router.push(`/dashboard/assessment/${testId}`)
                }
                buttonConfig={RESUME_BUTTON_CONFIG}
              />
            )}

            {/* PAID TEST CARD */}
            <SubscriptionCard
              avatarUrl={paid_assessment?.src}
              onButtonClick={() => setOpen(true)}
              buttonConfig={ACTUAL_APTITUDE_TEST_BUTTON_CONFIG}
            />
          </Stack>
        </Stack>
      </Stack>

      {/* PAYMENT CARD */}
      <PaymentCard
        open={open}
        handleClose={() => setOpen(false)}
        setPaymentModalOpen={() => {
          setOpen(false);
          setPaymentModalOpen(true);
        }}
      />

      {/* PAYMENT MODAL */}
      <PaymentModal
        open={paymentModalOpen}
        {...SUBSCRIPTION_CONFIG.JOB_SEEKER_ASSESSMENT}
        handlePaymentComplete={handlePaymentComplete}
      />
    </>
  );
}
