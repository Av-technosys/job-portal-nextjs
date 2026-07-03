import { ASSESSMENT_SECTION_PAGE_CONFIG } from "@/constants/assessmentSection";
import React, { useEffect, useState } from "react";
import { Button, Loader, Paper, Stack, Typography, Modal, LoadingButton } from "../common";
import { StopWatchIcon, TotalQuestionsIcon } from "@/assets";
import { useGetAssessmentAttemptsInfo } from "@/services/useGetAssessmentAttempts";
import { useGetSubjectList } from "@/services/useGetFindSubject";
import { useRouter } from "next/navigation";
import { useCreateOrderByRetakeTest } from "@/services/useCreateOrderByRetakeTest";
import { useCaptureTransaction, useNotification } from "@/services";
import { getErrorMessageFromAPI } from "@/helper";
import Script from "next/script";
import { useQueryClient } from "@tanstack/react-query";
import { colorStyles } from "@/styles";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type testProps = {
  id: string | string[] | undefined | number;
  assessmentType: string;
};

type RetakeData = {
  assesment_session_id: string;
  subject_id: string;
};

type OrderData = {
  gateway_order_id: any;
  amount: any;
  assesment_session_id: any;
  subject_id: any;
  planId: any;
};

const {
  SECTION_HEADER,
  START_TEST,
  RETAKE_TEST,
  ANALYSIS_TEST,
  BACK_BUTTON,
  MAX_TIME,
  TOTAL_QUESTIONS,
} = ASSESSMENT_SECTION_PAGE_CONFIG;

// Add modal styles
const MODAL_STYLES = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 440 },
  bgcolor: "background.paper",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  p: 0,
  borderRadius: "24px",
  outline: "none",
  overflow: "hidden",
  border: "1px solid rgba(226, 232, 240, 0.8)",
};

// Add your label configurations (adjust as needed)
const TITLE = { typographyProps: { variant: "h6", children: "Confirm Payment" } };
const PLAN_TYPE_LABEL = (planType: string) => ({ typographyProps: { variant: "body2", children: `Plan: ${planType}` } });
const PRICING_LABEL = (planType: string) => ({ typographyProps: { variant: "body1", children: `${planType}` } });
const AMOUNT_LABEL = (amount: number | string) => ({ typographyProps: { variant: "body1", children: `₹${amount}` } });
const TOTAL_LABEL = { typographyProps: { variant: "h6", children: "Total" } };
const TOTAL_AMOUNT_LABEL = (amount: number | string) => ({ typographyProps: { variant: "h6", children: `₹${amount}` } });


const AssessmentSection = ({ id, assessmentType }: testProps) => {
  const router = useRouter();
  const { showNotification } = useNotification();
  const assessmentId = Array.isArray(id) ? id[0] : id;
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedRetakeData, setSelectedRetakeData] = useState<RetakeData | null>(null);
  const [amount, setAmount] = useState<any>(null);
  const [isLoadingRetake, setIsLoadingRetake] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const isRazorpayReady =
    razorpayLoaded || (typeof window !== "undefined" && Boolean(window.Razorpay));

  const queryClient = useQueryClient();
  const allSubjectList = useGetSubjectList();
  const subdata = allSubjectList.data?.data;
  let data = [];

  if (assessmentType == "paid") {
    data = subdata?.filter((item: any) => item?.is_paid === true && item?.is_live === true);
  } else {
    data = subdata?.filter((item: any) => item?.is_paid === false && item?.is_live === true);
  }

const assessmentAttemptsDetails = useGetAssessmentAttemptsInfo({
  enabled: assessmentType !== "paid" || Boolean(assessmentId),
  queryParams: { id: assessmentId },
  queryConfig: {
    staleTime: 0,
    refetchOnMount: true, 
    refetchOnWindowFocus: true,
  },
});

  useEffect(() => {
    if (typeof window !== "undefined" && window.Razorpay) {
      setRazorpayLoaded(true);
    }
  }, [openPaymentModal]);


  // ✅ Capture payment mutation
  const captureTransaction = useCaptureTransaction({
    mutationConfig: {
      onSuccess: () => {
        showNotification({ message: "Payment captured successfully!" });
        setOpenPaymentModal(false);
        setIsLoadingRetake(false);
      },
      onError: (error) => {
        console.error("captureTransaction error:", error);
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        setIsLoadingRetake(false);
      },
    },
  });

  // ✅ Create order for retake mutation
  const createOrderId = useCreateOrderByRetakeTest({
    mutationConfig: {
      onSuccess: (res, variables) => {
        const amount = res?.data?.amount;
        const gateway_order_id = res?.data?.gateway_order_id;

        if (!gateway_order_id) {
          showNotification({ message: "Order creation failed" });
          setIsLoadingRetake(false);
          return;
        }

        // ✅ Store order data for later use when user clicks Pay Now
        setOrderData({
          gateway_order_id,
          amount,
          assesment_session_id: variables.assesment_session_id,
          subject_id: variables.subject_id,
          planId: variables.planId
        });

        setAmount(amount);
        setOpenPaymentModal(true);
        setIsLoadingRetake(false);
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
        setIsLoadingRetake(false);
        setOpenPaymentModal(false);
      },
    },
  });

  // ✅ Initialize Razorpay - This will be called only when user clicks Pay Now
  function initializeRazorpay() {
    if (!orderData || !window.Razorpay || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      showNotification({ message: "Payment gateway not available" });
      return;
    }

    const { gateway_order_id, amount } = orderData;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(amount),
      currency: "INR",
      name: "Job Portal",
      description: "Retake Assessment Test",
      order_id: gateway_order_id,
      handler: function (response) {
// ✅ In the captureTransaction onSuccess callback
      captureTransaction.mutate(
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        },
        {
          onSuccess: async () => {
            // ✅ Force refresh the attempts API with proper invalidation
            await queryClient.invalidateQueries({
              queryKey: ["assessment_attempts_full_details", assessmentId],
            });
            await queryClient.refetchQueries({ 
              queryKey: ["assessment_attempts_full_details", assessmentId],
              type: "active",
            });
            
            setOpenPaymentModal(false);
            setSelectedRetakeData(null);
            setOrderData(null);
            setAmount(null);
            setIsLoadingRetake(false);
            showNotification({ message: "Payment successful! Redirecting..." });
            
            // Small delay to ensure data is refreshed before redirect
            setTimeout(() => {
              router.push(
                assessmentId
                  ? `/dashboard/assessment/${assessmentId}`
                  : `/dashboard/assessment`
              );
            }, 1000);
          },
        }
      );
      },
      modal: {
        ondismiss: () => {
          showNotification({ message: "Payment cancelled" });
          setIsLoadingRetake(false);
        },
      },
      theme: { color: "#3399cc" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.error("Payment failed:", response);
      showNotification({ message: "Payment failed. Please try again." });
      setIsLoadingRetake(false);
    });

    rzp1.open();
  }

  const handleRetakeTest = async (assesment_session_id: string, subject_id: string) => {
    setIsLoadingRetake(true);
    setSelectedRetakeData({ assesment_session_id, subject_id });
    setAmount(null); // Reset amount to show loading state
    setOrderData(null); // Reset previous order data

    // Call create order API to get amount and order ID
    createOrderId.mutate({
      planId: "js_test",
      assesment_session_id,
      subject_id
    });
  };

  const handleClosePaymentModal = () => {
    setOpenPaymentModal(false);
    setSelectedRetakeData(null);
    setAmount(null);
    setOrderData(null);
    setIsLoadingRetake(false);
  };

  const handleProceedToPayment = () => {
    if (!orderData || !isRazorpayReady) {
      showNotification({ message: "Payment details not ready. Please try again." });
      return;
    }

    // Now initialize and open Razorpay
    initializeRazorpay();
  };

if (assessmentAttemptsDetails.isLoading || allSubjectList.isLoading || assessmentAttemptsDetails.isFetching) {
  return <Loader loaderProps={{ open: true }} />;
}
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setRazorpayLoaded(true)}
        onReady={() => setRazorpayLoaded(true)}
        onError={() => {
          setRazorpayLoaded(false);
          setIsLoadingRetake(false);
        }}
      />

      {/* Payment Modal */}
      <Modal open={openPaymentModal} onClose={handleClosePaymentModal}>
        <Stack stackProps={{ sx: MODAL_STYLES }}>
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute right-12 -bottom-8 w-24 h-24 bg-blue-500/10 rounded-full blur-lg pointer-events-none"></div>
            
            <button
              onClick={handleClosePaymentModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all duration-200 cursor-pointer"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner flex-shrink-0">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-0.5">Confirm Payment</h3>
                <p className="text-xs text-slate-300 font-medium">Complete your transaction to proceed</p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 bg-slate-50/50 flex flex-col gap-5">
            {/* Order Item Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Order Summary</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/80">
                  Plan: Retake Test
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-sm font-semibold text-slate-700">Retake Test Fee</span>
                </div>
                <span className="text-sm font-bold text-slate-800 font-mono">₹{amount ?? 199}</span>
              </div>

              <div className="border-t border-dashed border-slate-200 my-1"></div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-base font-bold text-slate-900">Total Amount Payable</span>
                <span className="text-2xl font-extrabold text-indigo-600 font-mono">₹{amount ?? 199}</span>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-800 text-xs font-semibold">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="text-emerald-600 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>100% Safe & Secure Payment via Razorpay</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 mt-1">
              <button
                onClick={handleProceedToPayment}
                disabled={!isRazorpayReady}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-base text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all duration-200 ${
                  isRazorpayReady
                    ? "bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98] cursor-pointer"
                    : "bg-slate-300 shadow-none cursor-not-allowed opacity-70"
                }`}
              >
                {!isRazorpayReady ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Loading Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Pay • ₹{amount ?? 199}</span>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
              
              <button
                onClick={handleClosePaymentModal}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </Stack>
      </Modal>

      {/* Main Content */}
      <Stack
        stackProps={{
          direction: "column",
          alignItems: "center",
          className: "max-w-6xl mx-auto mt-10 w-full px-4 md:px-8",
        }}
      >
        <Stack stackProps={{ className: "w-full mb-8" }}>
          <Stack stackProps={{ className: "mr-auto" }}>
            <button
              onClick={() => router.push("/dashboard/assessment")}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </Stack>
        </Stack>

        <h2 className="font-extrabold text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-700 tracking-tight mb-10 text-center">
          Start Your Test Now
        </h2>

        <div className="flex flex-col gap-4 w-full">
          {data?.map((item) => {
            const responseData = assessmentAttemptsDetails?.data as { data?: any[] } | undefined;
            const attempt = responseData?.data?.find(
              (att: any) => att?.subject_id === item?.id
            );
            const isCurrentRetakeLoading = isLoadingRetake &&
              selectedRetakeData?.subject_id === item?.id;

            return (
              <div 
                key={item.id}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.06)] hover:border-blue-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col mb-5 md:mb-0">
                  <h3 className="font-bold text-slate-800 text-lg mb-3">{item?.exam_name}</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                      <TotalQuestionsIcon style={{ fontSize: "14px" }} />
                      {item?.easy_question_count +
                        item?.medium_question_count +
                        item?.difficult_question_count} Questions
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                      <StopWatchIcon style={{ fontSize: "14px" }} />
                      {item?.duration_minutes} Min
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  {attempt ? (
                    <div className="flex items-center gap-3 w-full">
                      <button
                        disabled={isCurrentRetakeLoading}
                        onClick={() => handleRetakeTest(attempt.assessment_session, attempt.subject_id)}
                        className={`w-full md:w-auto px-5 py-2.5 text-sm font-bold rounded-xl border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors ${isCurrentRetakeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {isCurrentRetakeLoading ? "Loading..." : "Retake Test"}
                      </button>
                      <button
                        onClick={() => router.push(`/dashboard/assessment-score/${attempt?.id}`)}
                        className="w-full md:w-auto px-5 py-2.5 text-sm font-bold rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                      >
                        Analysis
                      </button>
                    </div>
                  ) : assessmentType == "paid" ? (
                    <button
                      onClick={() =>
                        router.push(
                          `/assessment/get_all_test_question?assesment_session_id=${id}&subject_id=${item?.id}`
                        )
                      }
                      className="w-full md:w-auto px-8 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] transition-all"
                    >
                      Start Test
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        router.push(
                          `/assessment/get_free_test_question/?subject_id=${item?.id}`
                        )
                      }
                      className="w-full md:w-auto px-8 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] transition-all"
                    >
                      Start Test
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Stack>
    </>
  );
};

export default AssessmentSection;
