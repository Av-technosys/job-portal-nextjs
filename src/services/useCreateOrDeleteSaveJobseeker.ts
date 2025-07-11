import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";

// API Functions
type JobseekerSaveInput = {
  student: number;
};

// Function to save a job (POST)
const saveJobseeker = async (
  data: JobseekerSaveInput
): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.profile.saveCandidate}`, data);
};

// Function to delete a saved job (DELETE)
const deleteJobseeker = async (
  id: string
): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.delete(`${apiConstantsURL.profile.saveCandidate}`, {
    data: { id },
  });
};

// Hooks
type UseSaveJobseekerOptions = {
  mutationConfig?: MutationConfig<typeof saveJobseeker>;
};

// Hook to save a jobseeker
export const useCreateSavedJobseeker = ({
  mutationConfig,
}: UseSaveJobseekerOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: saveJobseeker,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate queries to refresh saved jobseekers
      queryClient.invalidateQueries({ queryKey: ["saved_job_seeker"] });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};

type UseDeleteJobseekerOptions = {
  mutationConfig?: MutationConfig<typeof deleteJobseeker>;
};

// Hook to delete a saved jobseeker
export const useDeleteSavedJobseeker = ({
  mutationConfig,
}: UseDeleteJobseekerOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteJobseeker,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate queries to refresh saved jobseekers
      queryClient.invalidateQueries({ queryKey: ["saved_job_seeker"] });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};
