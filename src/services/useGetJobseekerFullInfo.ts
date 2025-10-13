import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export type GetJobseekerFullInfoQueryParams = {
  id: number;
  enabled?: boolean;
};

export const getJobseekerFullInfo = ({
  id,
}: GetJobseekerFullInfoQueryParams) => {
  return api.get(`${apiConstantsURL.profile.jobseekerFullDetails}${id}`);
};

export const getJobseekerFullInfoQueryOptions = (
  queryParams: GetJobseekerFullInfoQueryParams
) => {
  const { id, enabled } = queryParams;

  return queryOptions({
    queryKey: ["jobseeker_full_details", id],
    queryFn: () => getJobseekerFullInfo({ id }),
    enabled: !!id && (enabled ?? true), // only fetch if id exists
  });
};

type UseGetJobseekerFullInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getJobseekerFullInfo>;
  queryParams: GetJobseekerFullInfoQueryParams;
};

export const useGetJobseekerFullInfo = ({
  queryConfig,
  queryParams,
}: UseGetJobseekerFullInfoQueryOptions) => {
  return useQuery({
    ...getJobseekerFullInfoQueryOptions(queryParams),
    ...queryConfig,
  });
};
