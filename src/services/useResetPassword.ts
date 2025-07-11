import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";

type ResetPasswordInput = {
  email: string;
  email_otp: string;
  new_password: string;
  confirm_password: string;
};

export const ResetPasswordUser = ({
  data,
}: {
  data: ResetPasswordInput;
}): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.authentication.resetPassword}`, data);
};

type UseResetPasswordUserOptions = {
  email?: string;
  email_otp?: string;
  new_password?: string;
  confirm_password?: string;
  mutationConfig?: MutationConfig<typeof ResetPasswordUser>;
};

export const useResetPasswordUser = ({
  mutationConfig,
}: UseResetPasswordUserOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: ResetPasswordUser,
  });
};
