import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonAllDataType, MutationConfig } from "@/types";
import { api } from "@/helper";

export type userId = {
  id: number;
};

export const DeactivateUserInfo = ({
  id,
}: {
  id: userId;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.authentication.deactivate}`, { id });
};

type UseDeactivateUserInfoOptions = {
  mutationConfig?: MutationConfig<typeof DeactivateUserInfo>;
};

export const useDeactivateUser = ({
  mutationConfig,
}: UseDeactivateUserInfoOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: DeactivateUserInfo,
  });
};
