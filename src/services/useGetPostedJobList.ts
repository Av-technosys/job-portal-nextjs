import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { PaginationSuccessResponseType, QueryConfig } from "@/types";
import { api } from "@/helper";

export const getPostedJobList = ({
  page = 1,
}: {
  page?: number;
}): Promise<{ data: PaginationSuccessResponseType }> => {
  return api.get(`${apiConstantsURL.jobs.myPostedJobs}`, {
    params: { page },
  });
};

export const getInfinitePostedJobListQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["Posted_job_list"],
    queryFn: ({ pageParam = 1 }) => {
      return getPostedJobList({ page: pageParam as number });
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + 1;
    },
    initialPageParam: 1,
  });
};

type UseGetPostedJobList = {
  queryConfig?: QueryConfig<typeof getPostedJobList>;
};

export const useGetPostedJobList = (queryConfig?: UseGetPostedJobList) => {
  return useInfiniteQuery({
    ...getInfinitePostedJobListQueryOptions(),
    ...queryConfig,
  });
};
