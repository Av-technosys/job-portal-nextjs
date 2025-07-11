import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";
import { getOverallDataJobSeekerQueryOptions } from "./useGetOverallJobSeekerRecruiterData";

type JobApplyInput = {
  job: number;
};

export const applyForJob = ({
  data,
}: {
  data: JobApplyInput;
}): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.jobs.applyJob}`, data);
};

type UseJobApplyOptions = {
  jobId?: string;
  mutationConfig?: MutationConfig<typeof applyForJob>;
};

export const useJobApply = ({ mutationConfig }: UseJobApplyOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);

      // Invalidate the query of the common dashboard to reflect the changes
      queryClient.invalidateQueries({
        queryKey: getOverallDataJobSeekerQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: applyForJob,
  });
};
