import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export interface getRecruiterFoundingByIdQueryParams {
  UserId?: number | string | string[] | boolean;
}

export const getRecruiterFoundingById = ({
  UserId,
}: getRecruiterFoundingByIdQueryParams) => {
  return api.get(`${apiConstantsURL.profile.recruiterFoundingById}${UserId}`);
};

export const getRecruiterFoundingByIdQueryOptions = (
  queryParams: getRecruiterFoundingByIdQueryParams
) => {
  const { UserId } = queryParams;
  return queryOptions({
    queryKey: ["recruiterFoundingById", UserId],
    queryFn: () => getRecruiterFoundingById({ UserId }),
  });
};

type UseRecruiterFoundingByIdQueryOptions = {
  queryConfig?: QueryConfig<typeof getRecruiterFoundingByIdQueryOptions>;
  queryParams: getRecruiterFoundingByIdQueryParams;
};

export const useGetRecruiterFoundingById = (
  queryConfig: UseRecruiterFoundingByIdQueryOptions
) => {
  return useQuery({
    ...getRecruiterFoundingByIdQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
