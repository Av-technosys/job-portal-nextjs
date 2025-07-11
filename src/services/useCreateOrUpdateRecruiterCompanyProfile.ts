import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  CreateOrUpdateRecruiterProfileInput,
  MutationConfig,
} from "@/types";
import { api } from "@/helper";
import { getRecruiterCompanyProfileQueryOptions } from "./useGetRecruitercompanyProfile";

export const CreateOrUpdateRecruiterCompanyProfile = ({
  data,
  id,
}: {
  data: CreateOrUpdateRecruiterProfileInput;
  id?: string;
}): Promise<CommonAllDataType> => {
  if (id) {
    return api.patch(`${apiConstantsURL.profile.companyProfile}`, {
      ...data,
      id,
    });
  }
  return api.post(`${apiConstantsURL.profile.companyProfile}`, data);
};

type UseCreateOrUpdateRecruiterCompanyProfileOptions = {
  mutationConfig?: MutationConfig<typeof CreateOrUpdateRecruiterCompanyProfile>;
};

export const useCreateOrUpdateRecruiterCompanyProfile = ({
  mutationConfig,
}: UseCreateOrUpdateRecruiterCompanyProfileOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getRecruiterCompanyProfileQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateOrUpdateRecruiterCompanyProfile,
  });
};
