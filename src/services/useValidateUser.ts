import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";

type ValidateUserInput = {
  email: string;
  password: string;
};

export const validateUser = ({
  data,
}: {
  data: ValidateUserInput;
}): Promise<{ data: CommonObjectType }> => {
  return api.post(`${apiConstantsURL.authentication.login}`, data);
};

type UseValidateUserOptions = {
  email?: string;
  password?: string;
  mutationConfig?: MutationConfig<typeof validateUser>;
};

export const useValidateUser = ({
  mutationConfig,
}: UseValidateUserOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.clear();
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: validateUser,
  });
};
