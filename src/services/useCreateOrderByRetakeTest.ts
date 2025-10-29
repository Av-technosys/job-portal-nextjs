import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { CommonObjectType, MutationConfig } from "@/types";
import { useMutation } from "@tanstack/react-query";
export const createOrderByRetakeTest = ({
  planId,
  assesment_session_id,
  subject_id,
}: {
  planId: string;
  assesment_session_id: string | number;
  subject_id: string | number;
}): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.payment.transactionId}`, {
    planId,
    assesment_session_id,
    subject_id,
  });
};

type UseCreateOrderByRetakeTestOptions = {
  mutationConfig?: MutationConfig<typeof createOrderByRetakeTest>;
};

export const useCreateOrderByRetakeTest = ({
  mutationConfig,
}: UseCreateOrderByRetakeTestOptions) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: createOrderByRetakeTest,
  });
};
