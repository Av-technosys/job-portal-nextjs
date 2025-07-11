import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { CommonObjectType, MutationConfig } from "@/types";
import { useMutation } from "@tanstack/react-query";
export const createOrderId = ({
  planId,
}: {
  planId: string;
}): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.payment.orderId}`, { planId });
};

type UseCreateOrderIdOptions = {
  mutationConfig?: MutationConfig<typeof createOrderId>;
};

export const useCreateOrderId = ({
  mutationConfig,
}: UseCreateOrderIdOptions) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: createOrderId,
  });
};
