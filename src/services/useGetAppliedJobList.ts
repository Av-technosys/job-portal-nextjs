import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { PaginationSuccessResponseType, QueryConfig } from "@/types";
import { api } from "@/helper";

export const getAppliedJobList = ({
  page = 1,
}: {
  page?: number;
}): Promise<{ data: PaginationSuccessResponseType }> => {
  return api.get(`${apiConstantsURL.jobs.submittedJobs}`, {
    params: { page },
  });
};

export const getInfiniteAppliedJobListQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["applied_job_list"],
    queryFn: ({ pageParam = 1 }) => {
      return getAppliedJobList({ page: pageParam as number });
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + 1;
    },
    initialPageParam: 1,
  });
};

type UseGetAppliedJobList = {
  queryConfig?: QueryConfig<typeof getAppliedJobList>;
};

export const useGetAppliedJobList = (queryConfig?: UseGetAppliedJobList) => {
  return useInfiniteQuery({
    ...getInfiniteAppliedJobListQueryOptions(),
    ...queryConfig,
  });
};
