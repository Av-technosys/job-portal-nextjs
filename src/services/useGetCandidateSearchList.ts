import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL, PAGIANTION_LIMIT } from "@/constants";
import {
  CandidateSearchListSortEnum,
  PaginationSuccessResponseType,
  QueryConfig,
} from "@/types";
import { api } from "@/helper";

type GetCandidateListParams = {
  page?: number;
  pageLimit?: number;
  search?: string;
  enabled?: boolean;
  sort?: CandidateSearchListSortEnum[];
};

export const getCandidateSearchList = ({
  page = 1,
  pageLimit = PAGIANTION_LIMIT,
  search,
  sort,
}: GetCandidateListParams): Promise<{
  data: PaginationSuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.candidateSearch}`, {
    params: { page, page_size: pageLimit, sort, search },
  });
};

export const getInfiniteCandidateSearchListQueryOptions = (
  metaData: GetCandidateListParams
) => {
  const { pageLimit, search, sort, enabled } = metaData;
  return infiniteQueryOptions({
    queryKey: ["applied_job_list", search, sort, pageLimit],
    queryFn: ({ pageParam = 1 }) => {
      return getCandidateSearchList({
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

type UseGetCandidateSearchList = {
  queryConfig?: QueryConfig<typeof getCandidateSearchList>;
  queryFnParams?: GetCandidateListParams;
};

export const useGetCandidateSearchList = (
  queryConfig?: UseGetCandidateSearchList
) => {
  return useInfiniteQuery({
    ...getInfiniteCandidateSearchListQueryOptions(
      queryConfig?.queryFnParams || {}
    ),
    ...queryConfig?.queryConfig,
  });
};
