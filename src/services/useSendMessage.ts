import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonAllDataType, MutationConfig } from "@/types";
import { api } from "@/helper";
import { getInfiniteChatMessageQueryOptions } from "./useGetChatMessage";

type SendMessageInput = {
  message: string;
  application: number;
};

export const sendMessage = ({
  data,
}: {
  data: SendMessageInput;
}): Promise<CommonAllDataType> => {
  return api.post(
    `${apiConstantsURL.communication.chatMessage}${data.application}`,
    {
      message: data.message,
    }
  );
};

type UseSendMessageOptions = {
  mutationConfig?: MutationConfig<typeof sendMessage>;
};

export const useSendMessage = ({
  mutationConfig,
}: UseSendMessageOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getInfiniteChatMessageQueryOptions({
          applicationId: args?.[1]?.data?.application as number,
        }).queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: sendMessage,
  });
};
