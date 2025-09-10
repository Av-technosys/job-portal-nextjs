import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  CreateOrUpdateQuestionInfoInput,
  MutationConfig,
} from "@/types";
import { api } from "@/helper";
import { getQuestionInfoQueryOptions } from "./useGetQuestionInfo";

export const CreateQuestionInfo = ({
  data,
}: {
  data: CreateOrUpdateQuestionInfoInput;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.assessment.createQuestion}`, data);
};

type UseCreateQuestionInfoOptions = {
  mutationConfig?: MutationConfig<typeof CreateQuestionInfo>;
};

export const useCreateQuestionInfo = ({
  mutationConfig,
}: UseCreateQuestionInfoOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      queryClient.invalidateQueries({
        queryKey: getQuestionInfoQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateQuestionInfo,
  });
};
