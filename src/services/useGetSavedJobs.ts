import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL, PAGIANTION_LIMIT } from "@/constants";
import { PaginationSuccessResponseType, QueryConfig } from "@/types";
import { api } from "@/helper";

type GetSavedJobParams = {
  page?: number;
  pageLimit?: number;
  search?: string;
  enabled?: boolean;
};

export const getSaveJob = ({
  page = 1,
  pageLimit = PAGIANTION_LIMIT,
  search,
}: GetSavedJobParams): Promise<{ data: PaginationSuccessResponseType }> => {
  return api.get(`${apiConstantsURL.jobs.saveJobs}`, {
    params: {
      page,
      page_size: pageLimit,
      search,
    },
  });
};

export const getInfiniteSaveJobQueryOptions = (metaData: GetSavedJobParams) => {
  const { pageLimit, search = "", enabled } = metaData;
  return infiniteQueryOptions({
    queryKey: ["saved_jobs", search, pageLimit],
    queryFn: ({ pageParam = 1 }) => {
      return getSaveJob({
        page: pageParam as number,
        pageLimit,
        search,
      });
    },
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      const totalPages = lastPage?.data?.total_pages || 0;
      const currentPage = lastPage?.data?.current_page || lastPageParam;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled,
    initialPageParam: 1,
  });
};

type UseGetSaveJob = {
  queryConfig?: QueryConfig<typeof getSaveJob>;
  queryFnParams?: GetSavedJobParams;
};

export const useGetSaveJob = (queryConfig?: UseGetSaveJob) => {
  return useInfiniteQuery({
    ...getInfiniteSaveJobQueryOptions(queryConfig?.queryFnParams || {}),
    placeholderData: (previousData) => previousData,
    ...queryConfig?.queryConfig,
  });
};
