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
  // Build query params — Django's get_job_listing uses getlist("sort") for sorting
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("page_size", String(pageLimit));
  if (search) params.set("search", search);
  sort.forEach((s) => params.append("sort", s));
  const baseUrl = `${apiConstantsURL.jobs.jobList}?${params.toString()}${filterSearch}`;
  return api.get(baseUrl);
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
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      const totalPages = lastPage?.data?.total_pages || 0;
      const currentPage = lastPage?.data?.current_page || lastPageParam;

      return currentPage < totalPages ? currentPage + 1 : undefined;
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
    placeholderData: (previousData) => previousData,
    ...queryConfig?.queryConfig,
  });
};
