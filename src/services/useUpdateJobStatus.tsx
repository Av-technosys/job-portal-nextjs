import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";
import { getInfinitePostedJobListQueryOptions } from "./useGetPostedJobList";

type NewStatusInput = {
  id: number;
  status: string;
};

const jobUpdateStatus = async (
  data: NewStatusInput
): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.jobs.updateJobStatus}`, data);
};

const deleteJob = async (
  id: number
): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.delete(`${apiConstantsURL.jobs.updateJobStatus}`, {
    data: { id },
  });
};

type UseUpdateJobStatusOptions = {
  mutationConfig?: MutationConfig<typeof jobUpdateStatus>;
};

export const useUpdateJobStatus = ({
  mutationConfig,
}: UseUpdateJobStatusOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: jobUpdateStatus,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      queryClient.invalidateQueries({
        queryKey: getInfinitePostedJobListQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};

type UseDeleteJobOptions = {
  mutationConfig?: MutationConfig<typeof deleteJob>;
};

export const useDeleteJob = ({ mutationConfig }: UseDeleteJobOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      queryClient.invalidateQueries({
        queryKey: getInfinitePostedJobListQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};
