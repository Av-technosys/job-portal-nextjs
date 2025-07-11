import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL, PAGIANTION_NOTIFICATION_LIMIT } from "@/constants";
import { PaginationSuccessResponseType, QueryConfig } from "@/types";
import { api } from "@/helper";

export interface ChatMessageQueryParams {
  applicationId: number;
}

export const getChatMessage = ({
  page = 1,
  applicationId,
}: {
  page?: number;
  applicationId?: number;
}): Promise<{ data: PaginationSuccessResponseType }> => {
  return api.get(
    `${apiConstantsURL.communication.chatMessage}${applicationId}`,
    {
      params: { page, page_size: PAGIANTION_NOTIFICATION_LIMIT },
    }
  );
};

export const getInfiniteChatMessageQueryOptions = (
  queryParams: ChatMessageQueryParams
) => {
  const { applicationId } = queryParams;
  return infiniteQueryOptions({
    queryKey: ["chatMessage", applicationId],
    queryFn: ({ pageParam = 1 }) => {
      return getChatMessage({
        page: pageParam as number,
        applicationId: applicationId,
      });
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + 1;
    },
    initialPageParam: 1,
    enabled: !!applicationId,
  });
};

type UseGetChatMessage = {
  queryConfig?: QueryConfig<typeof getChatMessage>;
  queryParams: ChatMessageQueryParams;
};

export const useGetChatMessage = (queryConfig: UseGetChatMessage) => {
  return useInfiniteQuery({
    ...getInfiniteChatMessageQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
