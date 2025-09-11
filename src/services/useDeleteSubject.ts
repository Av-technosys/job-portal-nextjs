import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommonAllDataType, MutationConfig } from "@/types";
import { api } from "@/helper";
import { apiConstantsURL } from "@/constants";

// Define the function type explicitly
type DeleteSubjectFn = (params: { user: string }) => Promise<CommonAllDataType>;

type UseDeleteSubjectOptions = {
  mutationConfig?: MutationConfig<DeleteSubjectFn>;
};

export const useDeleteSubject = ({
  mutationConfig,
}: UseDeleteSubjectOptions = {}) => {
  const queryClient = useQueryClient();

  const deleteSubject: DeleteSubjectFn = ({ user }) => {
    return api.delete(apiConstantsURL.assessment.deleteSubject, {
      data: { id: user },
    });
  };

  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteSubject,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      queryClient.invalidateQueries();
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};
