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
  amount,
  planType,
  planId,
  handleClose,
  handlePaymentComplete,
}: {
  open: boolean;
  amount: number;
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

  console.log("PaymentModal mounted with props:", { open, amount, planType, planId });
  console.log("User details:", { name, phoneNumber, email });

  // Create order mutation
  const createOrderId = useCreateOrderId({
    
    mutationConfig: {
      onSuccess: (res:any) => {
        console.log("Order ID Response (onSuccess):", res);
        if (res?.data?.gateway_order_id) {
          console.log("Order ID found, initializing Razorpay:", res.data.gateway_order_id);
          initializeRazorpay(res.data.gateway_order_id);
        } else {
          console.error("Order ID missing in response:", res);
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
 
   useEffect(() => {  
    createOrderId?.isPending ? (console.log("can not create payment")) :  console.log("can create payment");
  }, [createOrderId]);
  // Capture transaction mutation  
  
  const captureTransaction = useCaptureTransaction({
    mutationConfig: {
      onSuccess: () => {
        console.log("captureTransaction onSuccess");
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

  // Initialize Razorpay payment
  function initializeRazorpay(orderId: string) {
    console.log("Initializing Razorpay with Order ID:", orderId);
    
    if (!isRazorpayAvailable()) {
      console.error("Razorpay not loaded");
      showNotification({
        message: "Payment gateway not available. Please refresh and try again.",
      
      });
      return;
    }
console.log("Razorpay Key:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

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
          console.log("Razorpay handler invoked with response:", response);
          handleCaptureTransaction(response);
        },
        modal: {
          ondismiss: () => {
            console.log("Razorpay modal dismissed");
            showNotification(PAYMENT_NOTIFICATION.CANCELLED_CONFIG);
          },
          onclose: () => {
            console.log("Razorpay modal closed");
            // Handle modal close if needed
          },
        },
        theme: {
          color: colorStyles.authPageTiltBgColor,
        },
      };
      console.log("Razorpay options prepared:", options);
      console.log("Opening Razorpay modal...");
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
    console.log("handleCaptureTransaction called with:", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    
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

  function handleRazorPaymentMethod() {
    console.log("handleRazorPaymentMethod invoked, creating order for planId:", planId);
    
    if (!razorpayLoaded) {
      console.error("Razorpay not loaded yet");
      showNotification({
        message: "Payment gateway is still loading. Please wait.",
      
      });
      return;
    }

    createOrderId.mutate({ planId });
  }

  return (
    <>
      {/* Load Razorpay script once at app level or layout level */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("Razorpay script loaded successfully");
          setRazorpayLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load Razorpay script");
          setRazorpayLoaded(false);
        }}
      />
      
      <Modal open={open} onClose={handleClose}>
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
              <Stack
                stackProps={{ direction: "row", justifyContent: "space-between" }}
              >
                <Typography {...PRICING_LABEL(planType)} />
                <Typography {...AMOUNT_LABEL(amount)} />
              </Stack>
              <Stack
                stackProps={{ direction: "row", justifyContent: "space-between" }}
              >
                <Typography {...TOTAL_LABEL} />
                <Typography {...TOTAL_AMOUNT_LABEL(amount)} />
              </Stack>
              
              <LoadingButton
                loading={createOrderId?.isPending}
                {...PAY_BUTTON}
                buttonProps={{
                  ...PAY_BUTTON.buttonProps,
                  disabled: !razorpayLoaded || createOrderId?.isPending,
                }}
                onClick={handleRazorPaymentMethod}
              />
              
              {!razorpayLoaded && (
                <div 
                >
                  Loading payment gateway...
                </div>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default PaymentModal;