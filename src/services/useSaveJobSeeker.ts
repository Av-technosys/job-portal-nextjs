import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";

type SavedJobSeekerInput = {
  job: number;
};

export const savedJobSeeker = ({
  data,
}: {
  data: SavedJobSeekerInput;
}): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.jobs.applyJob}`, data);
};

type UseSavedJobSeekerOptions = {
  jobId?: string;
  mutationConfig?: MutationConfig<typeof savedJobSeeker>;
};

export const useSavedJobSeeker = ({
  mutationConfig,
}: UseSavedJobSeekerOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: savedJobSeeker,
  });
};
