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

export const getFindStudentList = ({
  page = 1,
  pageLimit = PAGIANTION_LIMIT,
  search,
  sort,
}: GetStudentListParams): Promise<{
  data: PaginationSuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.findStudent}`, {
    params: { page, page_size: pageLimit, sort, search },
  });
};
export const getInfiniteFindStudentListQueryOptions = (
  metaData: GetStudentListParams
) => {
  const { pageLimit, search, sort, enabled } = metaData;
  return infiniteQueryOptions({
    queryKey: ["find_student_list", search, sort, pageLimit],
    queryFn: ({ pageParam = 1 }) => {
      return getFindStudentList({
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

type UseGetFindStudentList = {
  queryConfig?: QueryConfig<typeof getFindStudentList>;
  queryFnParams?: GetStudentListParams;
};

export const useGetFindStudentList = (queryConfig?: UseGetFindStudentList) => {
  return useInfiniteQuery({
    ...getInfiniteFindStudentListQueryOptions(queryConfig?.queryFnParams || {}),
    ...queryConfig?.queryConfig,
  });
};
