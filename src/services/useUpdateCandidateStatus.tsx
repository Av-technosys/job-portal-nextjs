import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";

type NewStatusInput = {
  student_id: number;
  job_id: number;
  status: number;
};

const candidateUpdateStatus = async (
  data: NewStatusInput
): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.patch(`${apiConstantsURL.profile.updateCandidateStatus}`, data);
};

type UseUpdateCandidateStatusOptions = {
  mutationConfig?: MutationConfig<typeof candidateUpdateStatus>;
};

export const useUpdateCandidateStatus = ({
  mutationConfig,
}: UseUpdateCandidateStatusOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: candidateUpdateStatus,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};
