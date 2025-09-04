import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommonAllDataType, MutationConfig } from "@/types";
import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";

type DeleteUserFn = (params: { user: string }) => Promise<CommonAllDataType>;

type UseDeleteRecruiterOptions = {
  mutationConfig?: MutationConfig<DeleteUserFn>;
};

export const useDeleteRecruiter = ({
  mutationConfig,
}: UseDeleteRecruiterOptions = {}) => {
  const queryClient = useQueryClient();

  const deleteUser: DeleteUserFn = ({ user }) => {
    return api.delete(apiConstantsURL.profile.deleteRecruiter, {
      data: { id: user },
    });
  };

  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteUser,
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
