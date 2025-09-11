import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { MutationConfig } from "@/types";
import { api } from "@/helper";

export const CreateQuestionInfo = ({ data }: { data: any }) => {
  return api.post(`${apiConstantsURL.assessment.createQuestion}`, data);
};

type UseCreateQuestionInfoOptions = {
  mutationConfig?: MutationConfig<typeof CreateQuestionInfo>;
};

export const useCreateQuestionInfo = ({
  mutationConfig,
}: UseCreateQuestionInfoOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateQuestionInfo,
  });
};
