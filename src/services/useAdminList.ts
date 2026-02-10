import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL, PAGIANTION_LIMIT } from "@/constants";
import {
  PaginationSuccessResponseType,
  QueryConfig,
  StudentListSortEnum,
} from "@/types";
import { api } from "@/helper";

type GetStudentListParams = {
  page?: number;
  pageLimit?: number;
  search?: string;
  enabled?: boolean;
  sort?: StudentListSortEnum[];
};

export const getAdminList = ({
  page = 1,
  pageLimit = PAGIANTION_LIMIT,
  search,
  sort,
}: GetStudentListParams): Promise<{
  data: PaginationSuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.authentication.listAllAdmin}`, {
    params: { page, page_size: pageLimit, sort, search },
  });
};
export const getInfiniteAdminListQueryOptions = (
  metaData: GetStudentListParams
) => {
  const { pageLimit, search, sort, enabled } = metaData;
  return infiniteQueryOptions({
    queryKey: ["admin_list", search, sort, pageLimit],
    queryFn: ({ pageParam = 1 }) => {
      return getAdminList({
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

type UseGetAdminList = {
  queryConfig?: QueryConfig<typeof getAdminList>;
  queryFnParams?: GetStudentListParams;
};

export const useGetAdminList = (queryConfig?: UseGetAdminList) => {
  return useInfiniteQuery({
    ...getInfiniteAdminListQueryOptions(queryConfig?.queryFnParams || {}),
    ...queryConfig?.queryConfig,
  });
};
