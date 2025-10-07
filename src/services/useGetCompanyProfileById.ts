import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export interface getCompanyProfileByIdQueryParams {
  UserId?: number | string | string[] | boolean;
}

export const getCompanyProfileById = ({
  UserId,
}: getCompanyProfileByIdQueryParams) => {
  return api.get(`${apiConstantsURL.profile.companyProfileById}${UserId}`);
};

export const getCompanyProfileByIdQueryOptions = (
  queryParams: getCompanyProfileByIdQueryParams
) => {
  const { UserId } = queryParams;
  return queryOptions({
    queryKey: ["companyProfileById", UserId],
    queryFn: () => getCompanyProfileById({ UserId }),
  });
};

type UseCompanyProfileByIdQueryOptions = {
  queryConfig?: QueryConfig<typeof getCompanyProfileByIdQueryOptions>;
  queryParams: getCompanyProfileByIdQueryParams;
};

export const useGetCompanyProfileById = (
  queryConfig: UseCompanyProfileByIdQueryOptions
) => {
  return useQuery({
    ...getCompanyProfileByIdQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
