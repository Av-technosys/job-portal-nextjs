import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export interface getApplicantDetailsQueryParams {
  UserId?: number | string | string[] | boolean;
}

export const getApplicantDetails = ({
  UserId,
}: getApplicantDetailsQueryParams) => {
  return api.get(`${apiConstantsURL.profile.ApplicantDetails}${UserId}`);
};

export const getApplicantDetailsQueryOptions = (
  queryParams: getApplicantDetailsQueryParams
) => {
  const { UserId } = queryParams;
  return queryOptions({
    queryKey: ["applicantGeneralDetails", UserId],
    queryFn: () => getApplicantDetails({ UserId }),
  });
};

type UseApplicantDetailsQueryOptions = {
  queryConfig?: QueryConfig<typeof getApplicantDetailsQueryOptions>;
  queryParams: getApplicantDetailsQueryParams;
};

export const useGetApplicantDetails = (
  queryConfig: UseApplicantDetailsQueryOptions
) => {
  return useQuery({
    ...getApplicantDetailsQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
