import { ASSESSMENT_SECTION_PAGE_CONFIG } from "@/constants/assessmentSection";
import React, { useState } from "react";
import { Button, Loader, Paper, Stack, Typography } from "../common";
import { StopWatchIcon, TotalQuestionsIcon } from "@/assets";
import { useGetAssessmentAttemptsInfo } from "@/services/useGetAssessmentAttempts";
import { useGetSubjectList } from "@/services/useGetFindSubject";
import { useRouter } from "next/navigation";
import { useCreateOrderByRetakeTest } from "@/services/useCreateOrderByRetakeTest";
import { useCaptureTransaction, useNotification } from "@/services";
import { getErrorMessageFromAPI } from "@/helper";
import Script from "next/script";
import { useQueryClient } from "@tanstack/react-query";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type testProps = {
  id: string | string[] | undefined | number;
  assessmentType: string;
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

const AssessmentSection = ({ id, assessmentType }: testProps) => {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const queryClient = useQueryClient();
  const allSubjectList = useGetSubjectList();
  const subdata = allSubjectList.data?.data;
  let data = [];

  if (assessmentType == "paid") {
    data = subdata?.filter((item: any) => item?.is_paid === true);
  } else {
    data = subdata?.filter((item: any) => item?.is_paid === false);
  }
  console.log("Filtered subject data: this is where will get the number of questions ", data);
  const assessmentAttemptsDetails = useGetAssessmentAttemptsInfo({
    queryParams: { id },
  });

  // ✅ Capture payment mutation
  const captureTransaction = useCaptureTransaction({
    mutationConfig: {
      onSuccess: () => {
        showNotification({ message: "Payment captured successfully!" });
      },
      onError: (error) => {
        console.error("captureTransaction error:", error);
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
      },
    },
  });

  // ✅ Create order for retake mutation
  const createOrderId = useCreateOrderByRetakeTest({
    mutationConfig: {
      onSuccess: (res, variables) => {

        const gateway_order_id = res?.data?.gateway_order_id;
        const amount = res?.data?.amount;


        if (!gateway_order_id) {
          showNotification({ message: "Order creation failed" });
          return;
        }

        // ✅ Take values directly from variables (not from res)
        const { assesment_session_id, subject_id, planId } = variables;

        initializeRazorpay({
          gateway_order_id,
          amount,
          assesment_session_id,
          subject_id,
          planId
        });
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  // ✅ Initialize Razorpay like PaymentModal
  function initializeRazorpay({ gateway_order_id, amount, assesment_session_id, subject_id, planId }) {
    if (!window.Razorpay || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      showNotification({ message: "Payment gateway not available" });
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(amount),
      currency: "INR",
      name: "Job Portal",
      description: "Retake Assessment Test",
      order_id: gateway_order_id,
      planId: planId,
      handler: function (response) {
        captureTransaction.mutate(
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          },
          {
            onSuccess: () => {
              // 🔥 force refresh the attempts API
              queryClient.invalidateQueries({ queryKey: ["assessmentAttempts"] });

              // then redirect
              router.push(`/dashboard/assessment`);
            },
          }
        );
      },
      modal: {
        ondismiss: () => showNotification({ message: "Payment cancelled" }),
      },
      theme: { color: "#3399cc" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.error("Payment failed:", response);
      showNotification({ message: "Payment failed. Please try again." });
    });

    rzp1.open();
  }

  const handleRetakeTest = (assesment_session_id, subject_id) => {
    const planId = "js_test";
    createOrderId.mutate({ planId, assesment_session_id, subject_id });
  };

  if (!data || !assessmentAttemptsDetails) {
    return <Loader loaderProps={{ open: true }} />;
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => setRazorpayLoaded(false)}
      />

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
            const attempt = assessmentAttemptsDetails?.data?.data?.find(
              (att) => att?.subject_id === item?.id
            );

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
                      <Button
                        onClick={() =>
                          handleRetakeTest(
                            attempt.assessment_session,
                            attempt.subject_id
                          )
                        }
                        {...RETAKE_TEST}
                        buttonProps={{
                          ...(RETAKE_TEST as any).buttonProps,
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
