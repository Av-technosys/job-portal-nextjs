import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL, PAGIANTION_LIMIT } from "@/constants";
import {
  PaginationSuccessResponseType,
  QueryConfig,
  RecruiterListSortEnum,
} from "@/types";
import { api } from "@/helper";

type GetRecruiterListParams = {
  page?: number;
  pageLimit?: number;
  search?: string;
  enabled?: boolean;
  sort?: RecruiterListSortEnum[];
};

export const getFindRecruiterList = ({
  page = 1,
  pageLimit = PAGIANTION_LIMIT,
  search,
  sort,
}: GetRecruiterListParams): Promise<{
  data: PaginationSuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.findRecruiter}`, {
    params: { page, page_size: pageLimit, sort, search },
  });
};
export const getInfiniteFindRecruiterListQueryOptions = (
  metaData: GetRecruiterListParams
) => {
  const { pageLimit, search, sort, enabled } = metaData;
  return infiniteQueryOptions({
    queryKey: ["find_recruiter_list", search, sort, pageLimit],
    queryFn: ({ pageParam = 1 }) => {
      return getFindRecruiterList({
        page: pageParam as number,
        pageLimit,
        search,
        sort,
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

type UseGetFindRecruiterList = {
  queryConfig?: QueryConfig<typeof getFindRecruiterList>;
  queryFnParams?: GetRecruiterListParams;
};

export const useGetFindRecruiterList = (
  queryConfig?: UseGetFindRecruiterList
) => {
  return useInfiniteQuery({
    ...getInfiniteFindRecruiterListQueryOptions(
      queryConfig?.queryFnParams || {}
    ),
    ...queryConfig?.queryConfig,
  });
};
