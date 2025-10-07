import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export interface getApplicantPersonalDetailsQueryParams {
  UserId?: number | string | string[] | boolean;
}

export const getApplicantPersonalDetails = ({
  UserId,
}: getApplicantPersonalDetailsQueryParams) => {
  return api.get(
    `${apiConstantsURL.profile.ApplicantPersonalDetails}${UserId}`
  );
};

export const getApplicantPersonalDetailsQueryOptions = (
  queryParams: getApplicantPersonalDetailsQueryParams
) => {
  const { UserId } = queryParams;
  return queryOptions({
    queryKey: ["applicantPersonalDetails", UserId],
    queryFn: () => getApplicantPersonalDetails({ UserId }),
  });
};

type UseApplicantPersonalDetailsQueryOptions = {
  queryConfig?: QueryConfig<typeof getApplicantPersonalDetailsQueryOptions>;
  queryParams: getApplicantPersonalDetailsQueryParams;
};

export const useGetApplicantPersonalDetails = (
  queryConfig: UseApplicantPersonalDetailsQueryOptions
) => {
  return useQuery({
    ...getApplicantPersonalDetailsQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
