import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL, PAGIANTION_LIMIT } from "@/constants";
import { PaginationSuccessResponseType, QueryConfig } from "@/types";
import { api } from "@/helper";

type GetSavedJobSeekerParams = {
  page?: number;
  pageLimit?: number;
  search?: string;
  enabled?: boolean;
};

export const getSavedJobSeeker = ({
  page = 1,
  pageLimit = PAGIANTION_LIMIT,
  search,
}: GetSavedJobSeekerParams): Promise<{
  data: PaginationSuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.saveCandidate}`, {
    params: {
      page,
      page_size: pageLimit,
      search,
    },
  });
};

export const getInfiniteSavedJobSeekerQueryOptions = (
  metaData: GetSavedJobSeekerParams
) => {
  const { pageLimit, search, enabled } = metaData;
  return infiniteQueryOptions({
    queryKey: ["saved_job_seeker", search, pageLimit],
    queryFn: ({ pageParam = 1 }) => {
      return getSavedJobSeeker({
        page: pageParam as number,
        pageLimit,
        search,
      });
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + 1;
    },
    enabled,
    initialPageParam: 1,
  });
};

type UseGetSavedJobSeeker = {
  queryConfig?: QueryConfig<typeof getSavedJobSeeker>;
  queryFnParams?: GetSavedJobSeekerParams;
};

export const useGetSavedJobSeeker = (queryConfig?: UseGetSavedJobSeeker) => {
  return useInfiniteQuery({
    ...getInfiniteSavedJobSeekerQueryOptions(queryConfig?.queryFnParams || {}),
    ...queryConfig?.queryConfig,
  });
};
