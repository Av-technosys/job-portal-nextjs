import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { PaginationSuccessResponseType, QueryConfig } from "@/types";
import { api } from "@/helper";

export interface CandidateApplicationQueryParams {
  jobId: number;
}

export const getCandidateApplication = ({
  page = 1,
  jobId,
}: {
  page?: number;
  jobId: number;
}): Promise<{ data: PaginationSuccessResponseType }> => {
  return api.get(`${apiConstantsURL.jobs.candidateApplication}`, {
    params: { page, id: jobId },
  });
};
export const getInfiniteCandidateApplicationQueryOptions = ({
  jobId,
}: {
  jobId: number;
}) => {
  return infiniteQueryOptions({
    queryKey: ["candidate_application", jobId],
    queryFn: ({ pageParam = 1 }) => {
      return getCandidateApplication({ page: pageParam as number, jobId });
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + 1;
    },
    initialPageParam: 1,
  });
};
type UseGetCandidateApplication = {
  queryConfig?: QueryConfig<typeof getCandidateApplication>;
  queryParams: CandidateApplicationQueryParams;
};

export const useGetCandidateApplication = (
  queryConfig: UseGetCandidateApplication
) => {
  return useInfiniteQuery({
    ...getInfiniteCandidateApplicationQueryOptions(queryConfig.queryParams),
    ...queryConfig,
  });
};
