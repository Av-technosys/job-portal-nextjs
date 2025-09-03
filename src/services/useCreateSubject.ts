import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  CreateOrUpdateSubjectInfoInput,
  MutationConfig,
} from "@/types";
import { api } from "@/helper";
import { getSubjectInfoQueryOptions } from "./useGetSubjectInfo";

export const CreateSubjectInfo = ({
  data,
}: {
  data: CreateOrUpdateSubjectInfoInput;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.assessment.createSubject}`, data);
};

type UseCreateSubjectInfoOptions = {
  mutationConfig?: MutationConfig<typeof CreateSubjectInfo>;
};

export const useCreateSubjectInfo = ({
  mutationConfig,
}: UseCreateSubjectInfoOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      queryClient.invalidateQueries({
        queryKey: getSubjectInfoQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateSubjectInfo,
  });
};
