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
    // EXPIRY_TEXT,
    PAY_BUTTON,
    AMOUNT_LABEL,
    TOTAL_AMOUNT_LABEL,
    PAYMENT_NOTIFICATION,
  } = PAYMENT_MODAL_TEXT;
  const { showNotification } = useNotification();
  const { name, phoneNumber, email, refetchCommonDetails } = useCommonDetails();
  const createOrderId = useCreateOrderId({
    mutationConfig: {
      onSuccess: (res) => {
        if (res?.data?.gateway_order_id as string) {
          initializeRazorpay(res?.data?.gateway_order_id as string);
        }
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  const captureTransaction = useCaptureTransaction({
    mutationConfig: {
      onSuccess: () => {
        refetchCommonDetails();
        showNotification(PAYMENT_NOTIFICATION.SUCCESS_CONFIG);
        handlePaymentComplete && handlePaymentComplete();
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  function initializeRazorpay(orderId: string) {
    try {
      const options = {
        name: "Job Assured",
        image: BRAND_LOGO_URL,
        key: process.env.RAZORPAY_KEY_ID as string,
        description: `Plan Type: ${planType}`,
        order_id: orderId,
        prefill: {
          name,
          email,
          contact: phoneNumber,
        },
        readonly: {
          name: true,
          email: true,
          contact: true,
        },
        config: {
          display: {
            hide: [
              {
                method: "paylater",
              },
            ],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        handler: (response: RazorpayResponse) => {
          handleCaptureTransaction(response);
        },
        modal: {
          ondismiss: function () {
            showNotification(PAYMENT_NOTIFICATION.CANCELLED_CONFIG);
          },
          oncancel: function () {
            showNotification(PAYMENT_NOTIFICATION.CANCELLED_CONFIG);
          },
          onpaymentfailed: function (responseErr: CommonObjectType) {
            showNotification(PAYMENT_NOTIFICATION.FAILED_CONFIG);
            console.error("Payment failed:", responseErr);
          },
        },
        theme: {
          color: colorStyles.authPageTiltBgColor,
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error(err);
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
    captureTransaction.mutate({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
  }

  function handleRazorPaymentMethod() {
    createOrderId.mutate({ planId });
  }

  return (
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <LoadingButton
              loading={createOrderId?.isPending}
              {...PAY_BUTTON}
              onClick={handleRazorPaymentMethod}
            />
            {/* <Typography {...EXPIRY_TEXT} /> */}
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default PaymentModal;
