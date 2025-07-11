import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  CreateOrUpdateStudentProfileAdditionalInfoInput,
  MutationConfig,
} from "@/types";
import { api } from "@/helper";
import { getStudentProfileAdditionalInfoQueryOptions } from "./useGetStudentProfileAdditionalInfo";

export const CreateOrUpdateStudentProfileAdditionalInfo = ({
  data,
}: {
  data: CreateOrUpdateStudentProfileAdditionalInfoInput;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.profile.additionalInfo}`, data);
};

type UseCreateOrUpdateStudentProfileAdditionalInfoOptions = {
  mutationConfig?: MutationConfig<
    typeof CreateOrUpdateStudentProfileAdditionalInfo
  >;
};

export const useCreateOrUpdateStudentProfileAdditionalInfo = ({
  mutationConfig,
}: UseCreateOrUpdateStudentProfileAdditionalInfoOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getStudentProfileAdditionalInfoQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateOrUpdateStudentProfileAdditionalInfo,
  });
};
