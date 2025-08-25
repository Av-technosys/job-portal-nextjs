import { useMutation } from "@tanstack/react-query";
import { api } from "@/helper";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";

// API
const deleteAssessmentQuestion = async (
  id: number
): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.delete(`${apiConstantsURL.assessment.deleteQuestion}`, {
    data: { id },
  });
};

// Hook
export const useDeleteAssessmentQuestion = (
  mutationConfig?: MutationConfig<typeof deleteAssessmentQuestion>
) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteAssessmentQuestion,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};
