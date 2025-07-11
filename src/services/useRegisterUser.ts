import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig, UserType } from "@/types";
import { api } from "@/helper";

type RegisterUserInput = {
  user_type: number;
  email: string;
  password: string;
  first_name: string;
  phone_number: string;
};

export const registerUser = ({
  data,
}: {
  data: RegisterUserInput;
}): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.authentication.register}`, data);
};

type UseRegisterUserOptions = {
  email?: string;
  password?: string;
  user_type?: UserType;
  name?: string;
  phone_number?: string;
  mutationConfig?: MutationConfig<typeof registerUser>;
};

export const useRegisterUser = ({
  mutationConfig,
}: UseRegisterUserOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: registerUser,
  });
};
