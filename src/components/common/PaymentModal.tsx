import { LoadingButton, Modal, Stack, Typography } from "@/components";
import { BRAND_LOGO_URL, MODAL_STYLES, PAYMENT_MODAL_TEXT } from "@/constants";
import { colorStyles } from "@/styles";
import { CommonObjectType, RazorpayResponse } from "@/types";
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
  handlePaymentComplete?: (paymentData?: CommonObjectType) => void;
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
  const { mutate: createOrder } = createOrderId;

  // Fetch order details when modal opens
  useEffect(() => {
    if (open) {
      setAmount(null);
      setOrderId(null);
      setIsOrderReady(false);
      createOrder({ planId });
    }
  }, [createOrder, open, planId]);

  // Capture transaction mutation  
  const captureTransaction = useCaptureTransaction({
    mutationConfig: {
      onSuccess: (res) => {
        refetchCommonDetails();
        showNotification(PAYMENT_NOTIFICATION.SUCCESS_CONFIG);
        handlePaymentComplete?.(res?.data);
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
            handleModalClose();
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

  if (!open) {
    return null;
  }

  return (
    <>
      {open && (
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
          onLoad={() => {
            setRazorpayLoaded(true);
          }}
          onError={() => {
            setRazorpayLoaded(false);
          }}
        />
      )}

      <Modal open={open} onClose={handleModalClose}>
        <Stack
          stackProps={{
            sx: {
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
            },
          }}
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute right-12 -bottom-8 w-24 h-24 bg-blue-500/10 rounded-full blur-lg pointer-events-none"></div>

            {/* <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all duration-200 cursor-pointer"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button> */}

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
            {captureTransaction?.isPending ? (
              <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <h4 className="text-base font-bold text-slate-800 mb-1">Verifying Payment</h4>
                  <p className="text-xs text-slate-500 max-w-[280px]">
                    We are confirming your payment transaction. Please do not close this window or refresh the page.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Order Item Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Order Summary</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/80">
                      Plan: {planType}
                    </span>
                  </div>

                  {!isOrderReady ? (
                    <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-medium text-slate-500">
                        {createOrderId.isPending ? "Calculating price details..." : "Failed to load payment details"}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                          <span className="text-sm font-semibold text-slate-700">{planType} Fee</span>
                        </div>
                        <span className="text-sm font-bold text-slate-800 font-mono">₹{amount}</span>
                      </div>

                      <div className="border-t border-dashed border-slate-200 my-1"></div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-base font-bold text-slate-900">Total Amount Payable</span>
                        <span className="text-2xl font-extrabold text-indigo-600 font-mono">₹{amount}</span>
                      </div>
                    </>
                  )}
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
                    onClick={handlePayNow}
                    disabled={!razorpayLoaded || captureTransaction?.isPending || !isOrderReady}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-base text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all duration-200 ${razorpayLoaded && !captureTransaction?.isPending && isOrderReady
                      ? "bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98] cursor-pointer"
                      : "bg-slate-300 shadow-none cursor-not-allowed opacity-70"
                      }`}
                  >
                    {!isOrderReady ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Loading Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Pay • ₹{amount ?? 0}</span>
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleModalClose}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </Stack>
      </Modal>
    </>
  );
};

export default PaymentModal;