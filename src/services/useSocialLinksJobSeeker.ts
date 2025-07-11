import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import {
  CommonAllDataType,
  CreateOrUpdateStudentProfileSocialLinksInput,
  MutationConfig,
  QueryConfig,
  SuccessResponseType,
} from "@/types";

// API Functions
export const CreateOrUpdateSocialLinksJobSeeker = ({
  data,
}: {
  data: CreateOrUpdateStudentProfileSocialLinksInput;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.profile.socialUrlsJobSeeker}`, data);
};

export const getSocialLinksJobSeeker = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.socialUrlsJobSeeker}`);
};

// Query Options
export const getSocialLinksJobSeekerQueryOptions = () => {
  return {
    queryKey: ["social_links_jobseeker"],
    queryFn: () => getSocialLinksJobSeeker(),
  };
};

// Hooks
type UseCreateOrUpdateSocailLinksJobSeekerOptions = {
  mutationConfig?: MutationConfig<typeof CreateOrUpdateSocialLinksJobSeeker>;
};

export const useCreateOrUpdateSocialLinksJobSeeker = ({
  mutationConfig,
}: UseCreateOrUpdateSocailLinksJobSeekerOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: CreateOrUpdateSocialLinksJobSeeker,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getSocialLinksJobSeekerQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};

type UseJobPostQueryOptions = {
  queryConfig?: QueryConfig<typeof getSocialLinksJobSeekerQueryOptions>;
};

export const useGetSocialLinksJobSeeker = ({
  queryConfig,
}: UseJobPostQueryOptions = {}) => {
  return useQuery({
    ...getSocialLinksJobSeekerQueryOptions(),
    ...queryConfig,
  });
};
