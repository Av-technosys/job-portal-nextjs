import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  CreateOrUpdateStudentProfilePersonalInfoInput,
  MutationConfig,
} from "@/types";
import { api } from "@/helper";
import { getStudentProfilePersonalInfoQueryOptions } from "./useGetStudentProfilePersonalInfo";

export const CreateOrUpdateStudentProfilePersonalInfo = ({
  data,
}: {
  data: CreateOrUpdateStudentProfilePersonalInfoInput;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.profile.personalInfo}`, data);
};

type UseCreateOrUpdateStudentProfilePersonalInfoOptions = {
  mutationConfig?: MutationConfig<
    typeof CreateOrUpdateStudentProfilePersonalInfo
  >;
};

export const useCreateOrUpdateStudentProfilePersonalInfo = ({
  mutationConfig,
}: UseCreateOrUpdateStudentProfilePersonalInfoOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getStudentProfilePersonalInfoQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateOrUpdateStudentProfilePersonalInfo,
  });
};
