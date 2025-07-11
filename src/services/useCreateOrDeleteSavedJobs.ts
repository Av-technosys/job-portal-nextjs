import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";
import { getInfiniteJobListQueryOptions } from "./useGetJobList";
import { getOverallDataJobSeekerQueryOptions } from "./useGetOverallJobSeekerRecruiterData";

// API Functions
type JobSaveInput = {
  job: number;
};

// Function to save a job (POST)
const saveJob = async (
  data: JobSaveInput
): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.jobs.saveJobs}`, data);
};

// Function to delete a saved job (DELETE)
const deleteJob = async (
  id: number
): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.delete(`${apiConstantsURL.jobs.saveJobs}`, {
    data: { id },
  });
};

// Hooks
type UseSaveJobOptions = {
  mutationConfig?: MutationConfig<typeof saveJob>;
};

// Hook to save a job
export const useCreateSavedJob = ({
  mutationConfig,
}: UseSaveJobOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: saveJob,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate the query to refetch the data on List Jobs Page
      queryClient.invalidateQueries({
        queryKey: getInfiniteJobListQueryOptions({}).queryKey,
        exact: false,
      });

      // Invalidate the query of the common dashboard to reflect the changes
      queryClient.invalidateQueries({
        queryKey: getOverallDataJobSeekerQueryOptions().queryKey,
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

// Hook to delete a saved job
export const useDeleteSavedJob = ({
  mutationConfig,
}: UseDeleteJobOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate the query to refetch the data on List Jobs Page
      queryClient.invalidateQueries({
        queryKey: getInfiniteJobListQueryOptions({}).queryKey,
        exact: false,
      });

      // Invalidate the query of the common dashboard to reflect the changes
      queryClient.invalidateQueries({
        queryKey: getOverallDataJobSeekerQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};
