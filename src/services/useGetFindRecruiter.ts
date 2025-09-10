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
  console.log("recived sort value: ", sort);
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

    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + 1;
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
