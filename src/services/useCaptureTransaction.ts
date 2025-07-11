import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { CommonObjectType, MutationConfig } from "@/types";
import { useMutation } from "@tanstack/react-query";
export const captureTransaction = ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
}: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.payment.captureTransaction}`, {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  });
};

type UseCaptureTransactionOptions = {
  mutationConfig?: MutationConfig<typeof captureTransaction>;
};

export const useCaptureTransaction = ({
  mutationConfig,
}: UseCaptureTransactionOptions) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: captureTransaction,
  });
};
