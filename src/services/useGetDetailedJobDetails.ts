import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export interface DetailedJobDetailsQueryParams {
  jobId: number;
}

export const getDetailedJobDetails = ({
  jobId,
}: {
  jobId: number;
}): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.createJob.jobDetailsById}${jobId}`);
};

export const getDetailedJobDetailsQueryOptions = (
  queryParams: DetailedJobDetailsQueryParams
) => {
  const { jobId } = queryParams;
  return queryOptions({
    queryKey: ["job_details", jobId],
    queryFn: () => getDetailedJobDetails({ jobId }),
    enabled: !!jobId,
  });
};

type UseDetailedJobDetailsQueryOptions = {
  queryConfig?: QueryConfig<typeof getDetailedJobDetailsQueryOptions>;
  queryParams: DetailedJobDetailsQueryParams;
};

export const useGetDetailedJobDetails = (
  queryConfig: UseDetailedJobDetailsQueryOptions
) => {
  return useQuery({
    ...getDetailedJobDetailsQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
