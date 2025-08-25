import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/types";
import { deleteUser } from "./usedeleteUser";

type UseDeleteRecruiterOptions = {
  mutationConfig?: MutationConfig<typeof deleteUser>;
};

export const useDeleteRecruiterOrJobseeker = ({
  mutationConfig,
}: UseDeleteRecruiterOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteUser,
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
