import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";

type ForgotUserInput = {
  email: string;
};

export const forgotPasswordUser = ({
  data,
}: {
  data: ForgotUserInput;
}): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(
    `${apiConstantsURL.authentication.sendOtpForForgotPassword}`,
    data
  );
};

type UseForgotPasswordUserOptions = {
  email?: string;
  mutationConfig?: MutationConfig<typeof forgotPasswordUser>;
};

export const useForgotPasswordUser = ({
  mutationConfig,
}: UseForgotPasswordUserOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: forgotPasswordUser,
  });
};
