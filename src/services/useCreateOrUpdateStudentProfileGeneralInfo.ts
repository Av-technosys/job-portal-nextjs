import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  CreateOrUpdateStudentProfileGeneralInfoInput,
  MutationConfig,
} from "@/types";
import { api } from "@/helper";
import { getStudentProfileGeneralInfoQueryOptions } from "./useGetStudentProfileGeneralInfo";

export const CreateOrUpdateStudentProfileGeneralInfo = ({
  data,
}: {
  data: CreateOrUpdateStudentProfileGeneralInfoInput;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.profile.generalInfo}`, data);
};

type UseCreateOrUpdateStudentProfileGeneralInfoOptions = {
  mutationConfig?: MutationConfig<
    typeof CreateOrUpdateStudentProfileGeneralInfo
  >;
};

export const useCreateOrUpdateStudentProfileGeneralInfo = ({
  mutationConfig,
}: UseCreateOrUpdateStudentProfileGeneralInfoOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getStudentProfileGeneralInfoQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateOrUpdateStudentProfileGeneralInfo,
  });
};
