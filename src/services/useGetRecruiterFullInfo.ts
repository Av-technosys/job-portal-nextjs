import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export type GetRecruiterFullInfoQueryParams = {
  id: number;
  enabled?: boolean;
};

export const getRecruiterFullInfo = ({
  id,
}: GetRecruiterFullInfoQueryParams) => {
  return api.get(`${apiConstantsURL.profile.recruiterFullDetails}${id}`);
};

export const getRecruiterFullInfoQueryOptions = (
  queryParams: GetRecruiterFullInfoQueryParams
) => {
  const { id, enabled } = queryParams;

  return queryOptions({
    queryKey: ["recruiter_full_details", id],
    queryFn: () => getRecruiterFullInfo({ id }),
    enabled: !!id && (enabled ?? true), // only fetch if id exists
  });
};

type UseGetRecruiterFullInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getRecruiterFullInfo>;
  queryParams: GetRecruiterFullInfoQueryParams;
};

export const useGetRecruiterFullInfo = ({
  queryConfig,
  queryParams,
}: UseGetRecruiterFullInfoQueryOptions) => {
  return useQuery({
    ...getRecruiterFullInfoQueryOptions(queryParams),
    ...queryConfig,
  });
};
