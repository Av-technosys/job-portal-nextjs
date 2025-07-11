import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonObjectType, MutationConfig } from "@/types";
import { api } from "@/helper";

type VerifyOtpInput = {
  email_otp: string;
  email: string;
};

export const verifyOtp = ({
  data,
}: {
  data: VerifyOtpInput;
}): Promise<{ data: CommonObjectType }> => {
  return api.post(`${apiConstantsURL.authentication.verifyOtp}`, data);
};

type UseVerifyOtpOptions = {
  email?: string;
  email_otp?: string;
  mutationConfig?: MutationConfig<typeof verifyOtp>;
};

export const useVerifyOtp = ({ mutationConfig }: UseVerifyOtpOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: verifyOtp,
  });
};
