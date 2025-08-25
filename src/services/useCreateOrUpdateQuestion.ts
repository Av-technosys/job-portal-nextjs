import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  CreateOrUpdateQuestionInfoInput,
  MutationConfig,
} from "@/types";
import { api } from "@/helper";
import { getQuestionInfoQueryOptions } from "./useGetQuestionInfo";

export const CreateOrUpdateQuestionInfo = ({
  data,
}: {
  data: CreateOrUpdateQuestionInfoInput;
}): Promise<CommonAllDataType> => {
  return api.put(`${apiConstantsURL.assessment.updateQuestion}`, data);
};

type UseCreateOrUpdateQuestionInfoOptions = {
  mutationConfig?: MutationConfig<typeof CreateOrUpdateQuestionInfo>;
};

export const useCreateOrUpdateQuestionInfo = ({
  mutationConfig,
}: UseCreateOrUpdateQuestionInfoOptions = {}) => {
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
    mutationFn: CreateOrUpdateQuestionInfo,
  });
};
