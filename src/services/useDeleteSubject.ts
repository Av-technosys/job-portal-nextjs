import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/types";
import { deleteSubject } from "./useDltSubject";

type UseDeleteSubjectOptions = {
  mutationConfig?: MutationConfig<typeof deleteSubject>;
};

export const useDeleteSubject = ({
  mutationConfig,
}: UseDeleteSubjectOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteSubject,
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate queries if needed
      queryClient.invalidateQueries();
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};
