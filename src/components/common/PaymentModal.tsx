import { LoadingButton, Modal, Stack, Typography } from "@/components";
import { BRAND_LOGO_URL, MODAL_STYLES, PAYMENT_MODAL_TEXT } from "@/constants";
import { colorStyles } from "@/styles";
import { RazorpayResponse } from "@/types";
import {
  useCreateOrderId,
  useCaptureTransaction,
  useCommonDetails,
  useNotification,
} from "@/services";
import Script from "next/script";
import { getErrorMessageFromAPI } from "@/helper";
import { useEffect, useState } from "react";

// Add Razorpay type declaration
declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentModal = ({
  open,
  planType,
  planId,
  handleClose,
  handlePaymentComplete,
}: {
  open: boolean;
  planType: string;
  planId: string;
  handleClose?: VoidFunction;
  handlePaymentComplete?: VoidFunction;
}) => {
  const {
    TITLE,
    PLAN_TYPE_LABEL,
    PRICING_LABEL,
    TOTAL_LABEL,
    PAY_BUTTON,
    AMOUNT_LABEL,
    TOTAL_AMOUNT_LABEL,
    PAYMENT_NOTIFICATION,
  } = PAYMENT_MODAL_TEXT;
  
  const { showNotification } = useNotification();
  const { name, phoneNumber, email, refetchCommonDetails } = useCommonDetails();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isOrderReady, setIsOrderReady] = useState(false);

  // Watch for amount and orderId changes to determine if order is ready
  useEffect(() => {
    if (amount !== null && orderId !== null) {
      setIsOrderReady(true);
    } else {
      setIsOrderReady(false);
    }
  }, [amount, orderId]);

  // Fetch order details when modal opens
  useEffect(() => {
    if (open) {
      setAmount(null);
      setOrderId(null);
      setIsOrderReady(false);
      createOrderId.mutate({ planId });
    }
  }, [open, planId]);

  // Create order mutation
  const createOrderId = useCreateOrderId({
    mutationConfig: {
      onSuccess: (res: any) => {
        if (res?.data?.gateway_order_id && res?.data?.amount) {
          setAmount(res.data.amount);
          setOrderId(res.data.gateway_order_id);
        } else {
          showNotification({
            message: "Failed to create payment order",
          });
        }
      },
      onError: (error) => {
        console.error("createOrderId onError:", error);
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
      },
    },
  });

  // Capture transaction mutation  
  const captureTransaction = useCaptureTransaction({
    mutationConfig: {
      onSuccess: () => {
        refetchCommonDetails();
        showNotification(PAYMENT_NOTIFICATION.SUCCESS_CONFIG);
        handlePaymentComplete?.();
      },
      onError: (error) => {
        console.error("captureTransaction onError:", error);
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
      },
    },
  });

  // Check if Razorpay is available
  const isRazorpayAvailable = () => {
    return typeof window !== 'undefined' && window.Razorpay;
  };

  // Initialize Razorpay payment - ONLY when user clicks Pay Now
  function initializeRazorpay() {
    if (!orderId || amount === null) {
      console.error("Order ID or amount not available");
      showNotification({
        message: "Payment details not ready",
      });
      return;
    }

    if (!isRazorpayAvailable()) {
      console.error("Razorpay not loaded");
      showNotification({
        message: "Payment gateway not available. Please refresh and try again.",
      });
      return;
    }

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      console.error("Razorpay key not configured");
      showNotification({
        message: "Payment configuration error",
      });
      return;
    }

    try {
      const options = {
        name: "Job Assured",
        image: BRAND_LOGO_URL,
        amount: Math.round(amount), // Convert to paise and ensure integer
        currency: "INR",
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        description: `Plan Type: ${planType}`,
        order_id: orderId,
        prefill: {
          name: name || "Customer",
          email: email || "customer@example.com",
          contact: phoneNumber || "9999999999",
        },
        readonly: {
          name: true,
          email: true,
          contact: true,
        },
        handler: (response: RazorpayResponse) => {
          handleCaptureTransaction(response);
        },
        modal: {
          ondismiss: () => {
            showNotification(PAYMENT_NOTIFICATION.CANCELLED_CONFIG);
          },
          onclose: () => {
            // Handle modal close if needed
          },
        },
        theme: {
          color: colorStyles.authPageTiltBgColor,
        },
      };
      const rzp1 = new window.Razorpay(options);
      
      // Add error handlers
      rzp1.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response);
        showNotification(PAYMENT_NOTIFICATION.FAILED_CONFIG);
      });

      rzp1.open();
      
    } catch (err) {
      console.error("Error initializing Razorpay:", err);
      showNotification({
        message: "Failed to initialize payment",
      });
    }
  }

  function handleCaptureTransaction({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  }: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {
    if (!razorpay_payment_id) {
      console.error("Missing payment ID");
      showNotification({
        message: "Payment verification failed",
      });
      return;
    }

    captureTransaction.mutate({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
  }

  // Handle Pay Now button click
  const handlePayNow = () => {
    if (isOrderReady) {
      initializeRazorpay();
    } else {
      showNotification({
        message: "Payment details are still loading. Please wait...",
      });
    }
  };

  // Reset state when modal closes
  const handleModalClose = () => {
    setAmount(null);
    setOrderId(null);
    setIsOrderReady(false);
    handleClose?.();
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => {
          setRazorpayLoaded(true);
        }}
        onError={() => {
          setRazorpayLoaded(false);
        }}
      />
      
      <Modal open={open} onClose={handleModalClose}>
        <Stack stackProps={{ sx: MODAL_STYLES }}>
          <Typography {...TITLE} />
          <Typography {...PLAN_TYPE_LABEL(planType)} />

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
              {!isOrderReady ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  {createOrderId.isPending ? "Loading price details..." : "Failed to load payment details"}
                </div>
              ) : (
                <>
                  <Stack
                    stackProps={{ direction: "row", justifyContent: "space-between" }}
                  >
                    <Typography {...PRICING_LABEL(planType)} />
                    <Typography {...AMOUNT_LABEL(amount!)} />
                  </Stack>

                  <Stack
                    stackProps={{ direction: "row", justifyContent: "space-between" }}
                  >
                    <Typography {...TOTAL_LABEL} />
                    <Typography {...TOTAL_AMOUNT_LABEL(amount!)} />
                  </Stack>

                  <LoadingButton
                    loading={captureTransaction?.isPending}
                    {...PAY_BUTTON}
                    buttonProps={{
                      ...PAY_BUTTON.buttonProps,
                      disabled: !razorpayLoaded || captureTransaction?.isPending || !isOrderReady,
                    }}
                    onClick={handlePayNow}
                  />
                </>
              )}

 
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default PaymentModal;