import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonAllDataType, MutationConfig } from "@/types";
import { api } from "@/helper";
import { useSSOAuth } from "./useSSOAuth";
import { useSSOSession } from "./useSSOSession";

export const LogoutUser = ({ data: {} }): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.authentication.logout}`, {});
};

type UseLogoutUserOptions = {
  mutationConfig?: MutationConfig<typeof LogoutUser>;
};

export const useLogoutUser = ({
  mutationConfig,
}: UseLogoutUserOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  const { ssoLogout } = useSSOAuth();
  const { isSSOData } = useSSOSession();
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.clear();
      if (isSSOData) {
        ssoLogout().finally(() => {
          onSuccess?.(...args);
        });
      } else {
        onSuccess?.(...args);
      }
    },
    onError: (...args) => {
      queryClient.clear();
      if (isSSOData) {
        ssoLogout().finally(() => {
          onError?.(...args);
        });
      } else {
        onError?.(...args);
      }
    },
    ...restConfig,
    mutationFn: LogoutUser,
  });
};
