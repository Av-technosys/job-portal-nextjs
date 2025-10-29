import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL, PAGIANTION_LIMIT } from "@/constants";
import {
  JobListSortEnum,
  PaginationSuccessResponseType,
  QueryConfig,
} from "@/types";
import { api } from "@/helper";

type GetJobListParams = {
  page?: number;
  pageLimit?: number;
  search?: string;
  enabled?: boolean;
  sort?: JobListSortEnum[];
  filterSearch?: string;
};

export const getJobList = ({
  page = 1,
  pageLimit = PAGIANTION_LIMIT,
  search = "",
  sort = [],
  filterSearch = "",
}: GetJobListParams): Promise<{ data: PaginationSuccessResponseType }> => {
  return api.get(
    `${apiConstantsURL.jobs.jobList}?page=${page}&page_size=${pageLimit}&sort=${sort}&search=${search}${filterSearch}`
  );
};

export const getInfiniteJobListQueryOptions = (metaData: GetJobListParams) => {
  const { pageLimit, search = "", sort, enabled, filterSearch } = metaData;
  return infiniteQueryOptions({
    queryKey: ["job_list", search, sort, pageLimit, filterSearch],
    queryFn: ({ pageParam = 1 }) => {
      return getJobList({
        page: pageParam as number,
        pageLimit,
        search,
        sort,
        filterSearch: filterSearch,
      });
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + 1;
    },
    enabled,
    initialPageParam: 1,
  });
};

type UseGetJobList = {
  queryConfig?: QueryConfig<typeof getJobList>;
  queryFnParams?: GetJobListParams;
};

export const useGetJobList = (queryConfig?: UseGetJobList) => {
  return useInfiniteQuery({
    ...getInfiniteJobListQueryOptions(queryConfig?.queryFnParams || {}),
    ...queryConfig?.queryConfig,
  });
};
