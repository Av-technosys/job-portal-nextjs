import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export interface getApplicantSocialLinksQueryParams {
  UserId?: number | string | string[] | boolean;
}

export const getApplicantSocialLinksDetails = ({
  UserId,
}: getApplicantSocialLinksQueryParams) => {
  return api.get(`${apiConstantsURL.profile.ApplicantSocialLinks}${UserId}`);
};

export const getApplicantSocialLinksQueryOptions = (
  queryParams: getApplicantSocialLinksQueryParams
) => {
  const { UserId } = queryParams;
  return queryOptions({
    queryKey: ["applicantSocialLinks", UserId],
    queryFn: () => getApplicantSocialLinksDetails({ UserId }),
  });
};

type UseApplicantSocialLinksQueryOptions = {
  queryConfig?: QueryConfig<typeof getApplicantSocialLinksQueryOptions>;
  queryParams: getApplicantSocialLinksQueryParams;
};

export const useGetApplicantSocialLinks = (
  queryConfig: UseApplicantSocialLinksQueryOptions
) => {
  return useQuery({
    ...getApplicantSocialLinksQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
