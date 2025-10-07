import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export interface getSocialUrlsRecruiterByIdQueryParams {
  UserId?: number | string | string[] | boolean;
}

export const getSocialUrlsRecruiterById = ({
  UserId,
}: getSocialUrlsRecruiterByIdQueryParams) => {
  return api.get(`${apiConstantsURL.profile.socialUrlsRecruiterById}${UserId}`);
};

export const getSocialUrlsRecruiterByIdQueryOptions = (
  queryParams: getSocialUrlsRecruiterByIdQueryParams
) => {
  const { UserId } = queryParams;
  return queryOptions({
    queryKey: ["socialUrlsRecruiterById", UserId],
    queryFn: () => getSocialUrlsRecruiterById({ UserId }),
  });
};

type UseSocialUrlsRecruiterByIdQueryOptions = {
  queryConfig?: QueryConfig<typeof getSocialUrlsRecruiterByIdQueryOptions>;
  queryParams: getSocialUrlsRecruiterByIdQueryParams;
};

export const useGetSocialUrlsRecruiterById = (
  queryConfig: UseSocialUrlsRecruiterByIdQueryOptions
) => {
  return useQuery({
    ...getSocialUrlsRecruiterByIdQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
