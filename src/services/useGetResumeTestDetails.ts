import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export const getResumeTestInfo = () => {
  return api.get(`${apiConstantsURL.assessment.getResumeTestDetails}`);
};

export const getResumeTestInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ["resume_test_info_details"],
    queryFn: () => getResumeTestInfo(),
  });
};

type UseResumeTestInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getResumeTestInfoQueryOptions>;
};

export const useGetResumeTestDataInfo = ({
  queryConfig,
}: UseResumeTestInfoQueryOptions = {}) => {
  return useQuery({
    ...getResumeTestInfoQueryOptions(),
    ...queryConfig,
  });
};
