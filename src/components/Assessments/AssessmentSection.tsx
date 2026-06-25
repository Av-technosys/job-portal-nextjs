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
          spacing: "16px",
          alignItems: "center",
          className: "max-w-6xl mx-auto mt-10",
        }}
      >
        <Stack stackProps={{ className: "w-full" }}>
          <Stack stackProps={{ className: "mr-auto" }}>
            <Button onClick={() => router.push("/dashboard/assessment")} {...BACK_BUTTON} />
          </Stack>
        </Stack>

        <Typography {...SECTION_HEADER()} />

        <Stack
          stackProps={{
            direction: "column",
            spacing: "16px",
            className: "w-full",
          }}
        >
          {data?.map((item) => {
          const responseData = assessmentAttemptsDetails?.data as { data?: any[] } | undefined;
          const attempt = responseData?.data?.find(
            (att: any) => att?.subject_id === item?.id
          );
            const isCurrentRetakeLoading = isLoadingRetake &&
              selectedRetakeData?.subject_id === item?.id;

            return (
              <Paper key={item.id} paperProps={{ className: "p-3" }}>
                <Stack
                  stackProps={{
                    direction: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Stack>
                    <Stack>{item?.exam_name}</Stack>
                    <Stack stackProps={{ direction: "row", spacing: "20px" }}>
                      <Stack
                        stackProps={{
                          direction: "row",
                          spacing: "1px",
                          alignItems: "center",
                        }}
                      >
                        <TotalQuestionsIcon style={{ fontSize: "15px" }} />
                        <Typography
                          {...TOTAL_QUESTIONS(
                            item?.easy_question_count +
                            item?.medium_question_count +
                            item?.difficult_question_count
                          )}
                        />
                      </Stack>
                      <Stack
                        stackProps={{
                          direction: "row",
                          spacing: "1px",
                          alignItems: "center",
                        }}
                      >
                        <StopWatchIcon style={{ fontSize: "15px" }} />
                        <Typography {...MAX_TIME(item?.duration_minutes)} />
                      </Stack>
                    </Stack>
                  </Stack>

                  {attempt ? (
                    <Stack
                      stackProps={{
                        direction: { xs: "column", sm: "row" },
                        spacing: "8px",
                      }}
                    >
                      <LoadingButton
                        loading={isCurrentRetakeLoading}
                        onClick={() =>
                          handleRetakeTest(
                            attempt.assessment_session,
                            attempt.subject_id
                          )
                        }
                        {...RETAKE_TEST}
                        buttonProps={{
                          ...(RETAKE_TEST as any).buttonProps,
                          disabled: isCurrentRetakeLoading,
                        }}
                      />
                      <Button
                        onClick={() =>
                          router.push(`/dashboard/assessment-score/${attempt?.id}`)
                        }
                        {...ANALYSIS_TEST}
                      />
                    </Stack>
                  ) : assessmentType == "paid" ? (
                    <Button
                      onClick={() =>
                        router.push(
                          `/assessment/get_all_test_question?assesment_session_id=${id}&subject_id=${item?.id}`
                        )
                      }
                      {...START_TEST}
                    />
                  ) : (
                    <Button
                      onClick={() =>
                        router.push(
                          `/assessment/get_free_test_question/?subject_id=${item?.id}`
                        )
                      }
                      {...START_TEST}
                    />
                  )}
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default AssessmentSection;
