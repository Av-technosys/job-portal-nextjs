import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import {
  CommonAllDataType,
  CreateOrUpdateRecruiterSocialLinksInput,
  MutationConfig,
  QueryConfig,
  SuccessResponseType,
} from "@/types";

// API Functions
export const CreateOrUpdateSocialLinksRecruiter = ({
  data,
}: {
  data: CreateOrUpdateRecruiterSocialLinksInput;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.profile.socialUrlsRecruiter}`, data);
};

export const getSocialLinksRecruiter = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.socialUrlsRecruiter}`);
};

// Query Options
export const getSocialLinksRecruiterQueryOptions = () => {
  return {
    queryKey: ["social_links_recruiter"],
    queryFn: () => getSocialLinksRecruiter(),
  };
};

// Hooks
type UseCreateOrUpdateSocailLinksRecruiterOptions = {
  mutationConfig?: MutationConfig<typeof CreateOrUpdateSocialLinksRecruiter>;
};

export const useCreateOrUpdateSocialLinksRecruiter = ({
  mutationConfig,
}: UseCreateOrUpdateSocailLinksRecruiterOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: CreateOrUpdateSocialLinksRecruiter,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getSocialLinksRecruiterQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};

type UseJobPostQueryOptions = {
  queryConfig?: QueryConfig<typeof getSocialLinksRecruiterQueryOptions>;
};

export const useGetSocialLinksRecruiter = ({
  queryConfig,
}: UseJobPostQueryOptions = {}) => {
  return useQuery({
    ...getSocialLinksRecruiterQueryOptions(),
    ...queryConfig,
  });
};
