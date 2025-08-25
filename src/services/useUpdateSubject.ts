import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  CreateOrUpdateSubjectInfoInput,
  MutationConfig,
} from "@/types";
import { api } from "@/helper";
import { getSubjectInfoQueryOptions } from "./useGetSubjectInfo";

export const UpdateSubjectInfo = ({
  data,
}: {
  data: CreateOrUpdateSubjectInfoInput;
}): Promise<CommonAllDataType> => {
  return api.put(`${apiConstantsURL.assessment.updateSubject}`, data);
};

type UseUpdateSubjectInfoOptions = {
  mutationConfig?: MutationConfig<typeof UpdateSubjectInfo>;
};

export const useUpdateSubjectInfo = ({
  mutationConfig,
}: UseUpdateSubjectInfoOptions = {}) => {
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
    mutationFn: UpdateSubjectInfo,
  });
};
