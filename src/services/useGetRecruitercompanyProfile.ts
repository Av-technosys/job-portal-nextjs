import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export const getRecruiterCompanyProfile = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.companyProfile}`);
};

export const getRecruiterCompanyProfileQueryOptions = () => {
  return queryOptions({
    queryKey: ["user_recruiter_general_details"],
    queryFn: () => getRecruiterCompanyProfile(),
  });
};

type UseRecruiterCompanyProfileQueryOptions = {
  queryConfig?: QueryConfig<typeof getRecruiterCompanyProfileQueryOptions>;
};

export const useGetRecruiterCompanyProfile = ({
  queryConfig,
}: UseRecruiterCompanyProfileQueryOptions = {}) => {
  return useQuery({
    ...getRecruiterCompanyProfileQueryOptions(),
    ...queryConfig,
  });
};
