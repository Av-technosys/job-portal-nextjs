import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonAllDataType, MutationConfig } from "@/types";
import { api } from "@/helper";

export type userId = {
  id: number;
};

export const ActivateUserInfo = ({
  id,
}: {
  id: userId;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.authentication.activate}`, { id });
};

type UseActivateUserInfoOptions = {
  mutationConfig?: MutationConfig<typeof ActivateUserInfo>;
};

export const useActivateUser = ({
  mutationConfig,
}: UseActivateUserInfoOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: ActivateUserInfo,
  });
};
