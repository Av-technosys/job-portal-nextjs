import { free_assessment, paid_assessment, resume_assessment } from "@/assets";
import {
  Typography,
  Stack,
  PaymentModal,
  SubscriptionCard,
  PaymentCard,
  Modal,
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
  const [confirmPurchaseModalOpen, setConfirmPurchaseModalOpen] = useState(false);

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
                    setConfirmPurchaseModalOpen(true);
                    return;
                  }

                  setOpen(true);
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

      {/* CONFIRM PURCHASE MODAL */}
      <Modal open={confirmPurchaseModalOpen} onClose={() => setConfirmPurchaseModalOpen(false)}>
        <Stack
          stackProps={{
            sx: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 480 },
              bgcolor: "background.paper",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              p: 0,
              borderRadius: "24px",
              outline: "none",
              overflow: "hidden",
              border: "1px solid rgba(226, 232, 240, 0.8)",
            },
          }}
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute right-12 -bottom-8 w-24 h-24 bg-blue-500/10 rounded-full blur-lg pointer-events-none"></div>

            <button
              onClick={() => setConfirmPurchaseModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all duration-200 cursor-pointer"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-4 relative z-10">
              {/* <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-inner flex-shrink-0">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div> */}
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-0.5">Active Test Found</h3>
                <p className="text-xs text-slate-300 font-medium">You have an ongoing assessment session</p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 bg-slate-50/50 flex flex-col gap-5">
            <p className="text-slate-600 font-medium text-sm leading-relaxed">
              You already have a few subjects left to complete in your active test session. Do you still want to buy a new test session?
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setConfirmPurchaseModalOpen(false);
                  setOpen(true);
                }}
                className="w-full py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98] transition-all cursor-pointer shadow-md"
              >
                Yes, Buy New Session
              </button>

              <button
                onClick={() => {
                  setConfirmPurchaseModalOpen(false);
                  router.push(`/dashboard/assessment/${testId}`);
                }}
                className="w-full py-3 px-6 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
              >
                No, Resume Existing Test
              </button>

              <button
                onClick={() => setConfirmPurchaseModalOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </Stack>
      </Modal>
    </>
  );
}