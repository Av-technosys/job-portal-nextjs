import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";

type ResentOtpInput = {
  email: string;
};

export const resendOtp = ({
  data,
}: {
  data: ResentOtpInput;
}): Promise<{ data: CommonObjectType; success: boolean }> => {
  return api.post(`${apiConstantsURL.authentication.resendOtp}`, data);
};
type UseResendOtpUserOptions = {
  email?: string;
  mutationConfig?: MutationConfig<typeof resendOtp>;
};
export const useResendOtp = ({
  mutationConfig,
}: UseResendOtpUserOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: resendOtp,
  });
};
