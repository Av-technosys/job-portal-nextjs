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
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
  outline: "none",
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
          <Typography {...TITLE} />
          <Typography {...PLAN_TYPE_LABEL("Retake Test")} />

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
            <Stack
              stackProps={{
                direction: "column",
                border: `1px solid ${colorStyles.borderGreyColor}`,
                p: 3,
                borderRadius: "10px",
                gap: 2,
              }}
            >
              <Stack
                stackProps={{ direction: "row", justifyContent: "space-between" }}
              >
                <Typography {...PRICING_LABEL('Retake Test')} />
                <Typography {...AMOUNT_LABEL(amount ?? 0)} />
              </Stack>

              <Stack
                stackProps={{ direction: "row", justifyContent: "space-between" }}
              >
                <Typography {...TOTAL_LABEL} />
                <Typography {...TOTAL_AMOUNT_LABEL(amount ?? 0)} />
              </Stack>

              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#1976d2",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "16px",
                  cursor: !isRazorpayReady ? "not-allowed" : "pointer",
                  opacity: !isRazorpayReady ? 0.6 : 1,
                }}
                disabled={!isRazorpayReady}
                onClick={handleProceedToPayment}
              >
                {isRazorpayReady ? "Pay Now" : "Loading payment gateway..."}
              </button>

    
            </Stack>
          </Stack>
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
                      className="w-full md:w-auto px-8 py-3 text-sm font-bold rounded-xl bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
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
                      className="w-full md:w-auto px-8 py-3 text-sm font-bold rounded-xl bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
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
