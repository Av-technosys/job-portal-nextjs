import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL, PAGIANTION_NOTIFICATION_LIMIT } from "@/constants";
import { PaginationSuccessResponseType, QueryConfig } from "@/types";
import { api } from "@/helper";

export const getNotification = ({
  page = 1,
}: {
  page?: number;
}): Promise<{ data: PaginationSuccessResponseType }> => {
  return api.get(`${apiConstantsURL.authentication.notification}`, {
    params: { page, page_size: PAGIANTION_NOTIFICATION_LIMIT },
  });
};

export const getInfiniteNotificationQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["notification"],
    queryFn: ({ pageParam = 1 }) => {
      return getNotification({ page: pageParam as number });
    },
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      const totalPages = lastPage?.data?.total_pages || 0;
      const currentPage = lastPage?.data?.current_page || lastPageParam;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0,
  });
};

type UseGetNotification = {
  queryConfig?: QueryConfig<typeof getNotification>;
};

export const useGetNotification = (queryConfig?: UseGetNotification) => {
  return useInfiniteQuery({
    ...getInfiniteNotificationQueryOptions(),
    ...queryConfig,
  });
};
