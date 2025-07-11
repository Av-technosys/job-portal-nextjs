import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import {
  CommonAllDataType,
  CreateOrUpdateJobPostInput,
  MutationConfig,
  QueryConfig,
  SuccessResponseType,
} from "@/types";

// API Functions
export const CreateOrUpdateJobPost = ({
  data,
}: {
  data: CreateOrUpdateJobPostInput;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.createJob.jobDetail}`, data);
};

export const getJobPost = (): Promise<{ data: SuccessResponseType }> => {
  return api.get(`${apiConstantsURL.createJob.jobDetail}`);
};

// Query Options
export const getJobPostQueryOptions = () => {
  return {
    queryKey: ["job_post_details"],
    queryFn: () => getJobPost(),
  };
};

// Hooks
type UseCreateOrUpdateJobPostOptions = {
  mutationConfig?: MutationConfig<typeof CreateOrUpdateJobPost>;
};

export const useCreateOrUpdateJobPost = ({
  mutationConfig,
}: UseCreateOrUpdateJobPostOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      queryClient.invalidateQueries({
        queryKey: getJobPostQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateOrUpdateJobPost,
  });
};

type UseJobPostQueryOptions = {
  queryConfig?: QueryConfig<typeof getJobPostQueryOptions>;
};

export const useGetJobPost = ({ queryConfig }: UseJobPostQueryOptions = {}) => {
  return useQuery({
    ...getJobPostQueryOptions(),
    ...queryConfig,
  });
};
