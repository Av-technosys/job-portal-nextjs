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
  DASHBOARD_URL,
} from "@/constants";
import { useGetPaymentPlans } from "@/services";
import { useGetSubjectList } from "@/services/useGetFindSubject";
import { useGetResumeTestDataInfo } from "@/services/useGetResumeTestDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CommonObjectType } from "@/types";
import { CircularProgress } from "@mui/material";

export default function Subscription() {
  const [open, setOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [testId, setTestId] = useState<null | number | string>(null);

  const router = useRouter();
  const resumeTestDetails = useGetResumeTestDataInfo();
  const subjectList = useGetSubjectList();
  const paymentPlans = useGetPaymentPlans();
  const paidAssessmentPlan = paymentPlans.data?.data?.find(
    (plan) => plan.name === "js_assesment"
  );
  const liveSubjects = ((subjectList.data?.data || []) as CommonObjectType[])
    .filter((subject) => subject?.is_live === true);
  const hasFreeAssessments = liveSubjects?.some(
    (subject) => subject?.is_paid === false
  );
  const hasPaidAssessments = liveSubjects?.some(
    (subject) => subject?.is_paid === true
  );
  const hasPurchasedAssessment = Boolean(testId);

  // ⭐ IMPORTANT: This function MUST be above loading return
  async function handlePaymentComplete(paymentData?: CommonObjectType) {
    setOpen(false);
    setPaymentModalOpen(false);

    const assessmentSessionId =
      paymentData?.assessment_session_id || paymentData?.assesment_session_id;

    if (assessmentSessionId) {
      router.push(`/dashboard/assessment/${assessmentSessionId}`);
      return;
    }

    const refreshedSession = await resumeTestDetails.refetch();
    const resumeSessionId =
      refreshedSession.data?.data?.[0]?.id ||
      refreshedSession.data?.data?.[0]?.assessment_session_id ||
      refreshedSession.data?.data?.[0]?.assesment_session_id;

    router.push(
      resumeSessionId ? `/dashboard/assessment/${resumeSessionId}` : DASHBOARD_URL
    );
  }

  // Set values only after data is fully loaded
  useEffect(() => {
    const resumeSession = resumeTestDetails.data?.data?.[0];

    if (resumeSession) {
      setTestId(resumeSession.id);
      return;
    }

    if (resumeTestDetails.isSuccess) {
      setTestId(null);
    }
  }, [resumeTestDetails.data, resumeTestDetails.isSuccess]);

  // ⭐ Loading UI to prevent jumping between 2 → 3 cards
  if (resumeTestDetails.isLoading || subjectList.isLoading) {
    return (
      <Stack
        stackProps={{
          alignItems: "center",
          justifyContent: "center",
          sx: { minHeight: "55vh" },
        }}
      >
        <CircularProgress />
      </Stack>
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
            width: "100%",
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
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 5,
              marginTop: "50px",
              width: "100%",
            }}
          >
            {/* FREE TEST CARD */}
            {hasFreeAssessments && (
              <SubscriptionCard
                avatarUrl={free_assessment?.src}
                onButtonClick={() =>
                  router.push("/dashboard/assessment/free-test")
                }
                buttonConfig={BUTTON_CONFIG}
              />
            )}

            {/* CONDITIONAL RESUME TEST CARD */}
            {hasPurchasedAssessment && (
              <SubscriptionCard
                avatarUrl={resume_assessment?.src}
                onButtonClick={() =>
                  router.push(`/dashboard/assessment/${testId}`)
                }
                buttonConfig={RESUME_BUTTON_CONFIG}
              />
            )}

            {/* PAID TEST CARD */}
            {hasPaidAssessments && (
              <SubscriptionCard
                avatarUrl={paid_assessment?.src}
                onButtonClick={() => {
                  if (testId) {
                    router.push(`/dashboard/assessment/${testId}`);
                    return;
                  }

                  setPaymentModalOpen(true);
                }}
                buttonConfig={ACTUAL_APTITUDE_TEST_BUTTON_CONFIG}
              />
            )}
          </Stack>
        </Stack>
      </Stack>

      {/* PAYMENT CARD */}
      <PaymentCard
        open={open}
        handleClose={() => setOpen(false)}
        amount={paidAssessmentPlan?.price}
        isAmountLoading={paymentPlans.isLoading}
        setPaymentModalOpen={() => {
          setOpen(false);
          setPaymentModalOpen(true);
        }}
      />

      {/* PAYMENT MODAL */}
      {paidAssessmentPlan && (
        <PaymentModal
          open={paymentModalOpen}
          planId={paidAssessmentPlan.name}
          planType={paidAssessmentPlan.name}
          handlePaymentComplete={handlePaymentComplete}
        />
      )}
    </>
  );
}
