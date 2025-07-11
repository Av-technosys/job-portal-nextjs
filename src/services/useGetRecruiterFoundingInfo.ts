import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export const getRecruiterFoundingInfo = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.recruiterFounding}`);
};

export const getRecruiterFoundingInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ["user_recruiter_general_founding_info"],
    queryFn: () => getRecruiterFoundingInfo(),
  });
};

type UseRecruiterFoundingInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getRecruiterFoundingInfoQueryOptions>;
};

export const useGetRecruiterFoundingInfo = ({
  queryConfig,
}: UseRecruiterFoundingInfoQueryOptions = {}) => {
  return useQuery({
    ...getRecruiterFoundingInfoQueryOptions(),
    ...queryConfig,
  });
};
