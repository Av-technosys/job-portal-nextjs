import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonAllDataType, MutationConfig } from "@/types";
import { api } from "@/helper";
import { contactFormData } from "@/components/ContactUs";

export const CreateContactUsInfo = ({
  data,
}: {
  data: contactFormData;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.authentication.contacts}`, data);
};

type UseCreateContactUsInfoOptions = {
  mutationConfig?: MutationConfig<typeof CreateContactUsInfo>;
};

export const useCreateContactUsInfo = ({
  mutationConfig,
}: UseCreateContactUsInfoOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateContactUsInfo,
  });
};
