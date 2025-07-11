import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  CreateOrUpdateRecruiterFoundingInfoInput,
  MutationConfig,
} from "@/types";
import { api } from "@/helper";
import { getRecruiterFoundingInfoQueryOptions } from "./useGetRecruiterFoundingInfo";

export const CreateOrUpdateRecruiterFoundingInfo = ({
  data,
}: {
  data: CreateOrUpdateRecruiterFoundingInfoInput;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.profile.recruiterFounding}`, data);
};

type UseCreateOrUpdateRecruiterFoundingInfoOptions = {
  mutationConfig?: MutationConfig<typeof CreateOrUpdateRecruiterFoundingInfo>;
};

export const useCreateOrUpdateRecruiterFoundingInfo = ({
  mutationConfig,
}: UseCreateOrUpdateRecruiterFoundingInfoOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      queryClient.invalidateQueries({
        queryKey: getRecruiterFoundingInfoQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateOrUpdateRecruiterFoundingInfo,
  });
};
