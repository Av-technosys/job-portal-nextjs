import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  CreateOrUpdateQuestionInfoInput,
  MutationConfig,
} from "@/types";
import { api } from "@/helper";
import { getQuestionInfoQueryOptions } from "./useGetQuestionInfo";

export const UpdateQuestionInfo = ({
  data,
}: {
  data: CreateOrUpdateQuestionInfoInput;
}): Promise<CommonAllDataType> => {
  return api.put(`${apiConstantsURL.assessment.updateQuestion}`, data);
};

type UseUpdateQuestionInfoOptions = {
  mutationConfig?: MutationConfig<typeof UpdateQuestionInfo>;
};

export const useUpdateQuestionInfo = ({
  mutationConfig,
}: UseUpdateQuestionInfoOptions = {}) => {
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
    mutationFn: UpdateQuestionInfo,
  });
};
